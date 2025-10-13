// packages/adapters/src/GoHttp/go/types.go
package GoHttpadapter

import (
	"encoding/json"
	"io"
	"net/GoHttp"
)

type GoHttpRequest struct {
	Params  map[string]string
	Query   map[string][]string
	Body    map[string]interface{}
	Headers map[string]string
	Cookies map[string]string
}

type GoHttpResponse struct {
	StatusCode int
	Headers    map[string]string
	Body       any
}

func (r *GoHttpResponse) Status(code int) *GoHttpResponse {
	r.StatusCode = code
	return r
}

func (r *GoHttpResponse) SetHeader(key, value string) *GoHttpResponse {
	r.Headers[key] = value
	return r
}

func (r *GoHttpResponse) JSON(data any) {
	r.Headers["Content-Type"] = "application/json"
	r.Body = data
}

func (r *GoHttpResponse) Send(data any) {
	r.Body = data
}

type GoHttpHandler func(req *GoHttpRequest, res *GoHttpResponse)
type GoHttpMiddleware func(req *GoHttpRequest, res *GoHttpResponse, next func())

type GoHttpAdapter struct {
	mux *http.ServeMux
}

func NewGoHttpAdapter() *GoHttpAdapter {
	return &GoHttpAdapter{mux: http.NewServeMux()}
}

func (h *GoHttpAdapter) Init() error {
	return nil
}

func (h *GoHttpAdapter) Start(port string) error {
	return http.ListenAndServe(":"+port, h.mux)
}

func (h *GoHttpAdapter) Stop() error {
	// Graceful shutdown can be added using http.Server
	return nil
}

func (h *GoHttpAdapter) RegisterRoute(method, path string, handler GoHttpHandler) {
	h.mux.HandleFunc(path, func(w http.ResponseWriter, r *http.Request) {
		req := &GoHttpRequest{
			Query:   r.URL.Query(),
			Headers: make(map[string]string),
			Cookies: make(map[string]string),
			Params:  make(map[string]string),
			Body:    make(map[string]interface{}),
		}

		for k, v := range r.Header {
			req.Headers[k] = v[0]
		}

		for _, c := range r.Cookies() {
			req.Cookies[c.Name] = c.Value
		}

		if r.Method == "POST" || r.Method == "PUT" || r.Method == "PATCH" {
			bodyBytes, _ := io.ReadAll(r.Body)
			json.Unmarshal(bodyBytes, &req.Body)
		}

		res := &GoHttpResponse{StatusCode: 200, Headers: map[string]string{}}
		handler(req, res)

		for k, v := range res.Headers {
			w.Header().Set(k, v)
		}
		w.WriteHeader(res.StatusCode)
		if res.Body != nil {
			if data, err := json.Marshal(res.Body); err == nil {
				w.Write(data)
			}
		}
	})
}

func (h *GoHttpAdapter) Use(middleware GoHttpMiddleware) {
	// Middleware chaining can be added later
}

# packages/adapters/src/http/python/types.py

from typing import Any, Dict, Callable, Awaitable, Optional
import asyncio

try:
    from fastapi import FastAPI, Request, Response
except ImportError:
    FastAPI = None
    Request = None
    Response = None


class PyHttpRequest:
    def __init__(self, params: Dict[str, Any], query: Dict[str, Any], body: Any,
                 headers: Dict[str, Any], cookies: Dict[str, str]):
        self.params = params
        self.query = query
        self.body = body
        self.headers = headers
        self.cookies = cookies

    @classmethod
    async def from_fastapi(cls, request: "Request"):
        body = {}
        if request.method in ("POST", "PUT", "PATCH"):
            try:
                body = await request.json()
            except Exception:
                body = await request.body()
        return cls(
            params=request.path_params,
            query=dict(request.query_params),
            body=body,
            headers=dict(request.headers),
            cookies=request.cookies
        )


class PyHttpResponse:
    def __init__(self):
        self.status_code = 200
        self.headers: Dict[str, str] = {}
        self.body: Any = None

    def status(self, code: int) -> "PyHttpResponse":
        self.status_code = code
        return self

    def set_header(self, key: str, value: str) -> "PyHttpResponse":
        self.headers[key] = value
        return self

    def json(self, data: Any) -> None:
        import json
        self.body = json.dumps(data)
        self.headers["Content-Type"] = "application/json"

    def send(self, data: Any) -> None:
        self.body = data


HttpHandler = Callable[[PyHttpRequest, PyHttpResponse], Awaitable[None] | None]
HttpMiddleware = Callable[[PyHttpRequest, PyHttpResponse, Callable], Awaitable[None] | None]


class PythonHttpAdapter:
    """
    Framework-agnostic HTTP adapter for Python runtimes.
    Works with FastAPI, Flask, or Django (via wrapper).
    """

    def __init__(self, framework: str = "fastapi"):
        self.framework = framework
        self.app = None
        self.middleware_stack = []
        self.routes = []

        if framework == "fastapi":
            self._init_fastapi()
        elif framework == "flask":
            from flask import Flask
            self.app = Flask(__name__)
        else:
            raise NotImplementedError(f"Framework '{framework}' not yet supported")

    def _init_fastapi(self):
        from fastapi import FastAPI, Request, Response
        self.app = FastAPI()

    async def init(self):
        # Setup hooks, middleware, or runtime client connections
        pass

    async def start(self, port: int = 8000):
        if self.framework == "fastapi":
            import uvicorn
            uvicorn.run(self.app, host="0.0.0.0", port=port)
        elif self.framework == "flask":
            self.app.run(host="0.0.0.0", port=port)
        else:
            raise NotImplementedError

    async def stop(self):
        # Optional graceful shutdown
        pass

    def register_route(self, method: str, path: str, handler: HttpHandler):
        if self.framework == "fastapi":
            from fastapi import Request, Response

            async def route_fn(request: Request):
                req = await PyHttpRequest.from_fastapi(request)
                res = PyHttpResponse()
                maybe_coro = handler(req, res)
                if asyncio.iscoroutine(maybe_coro):
                    await maybe_coro
                return Response(content=res.body, status_code=res.status_code, headers=res.headers)

            self.app.add_api_route(path, route_fn, methods=[method.upper()])

        else:
            self.routes.append((method, path, handler))

    def use(self, middleware: HttpMiddleware):
        self.middleware_stack.append(middleware)

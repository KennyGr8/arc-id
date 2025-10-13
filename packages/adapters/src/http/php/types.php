<?php
// packages/adapters/src/http/php/types.php

namespace ArcId\Http;

use Closure;
use Exception;

class PhpHttpRequest {
    public array $params = [];
    public array $query = [];
    public mixed $body = [];
    public array $headers = [];
    public array $cookies = [];

    public function __construct(array $params = [], array $query = [], mixed $body = [], array $headers = [], array $cookies = []) {
        $this->params = $params;
        $this->query = $query;
        $this->body = $body;
        $this->headers = $headers;
        $this->cookies = $cookies;
    }

    public static function fromSymfony($request): self {
        return new self(
            $request->attributes->all(),
            $request->query->all(),
            json_decode($request->getContent(), true) ?? [],
            $request->headers->all(),
            $request->cookies->all()
        );
    }

    public static function fromLaravel($request): self {
        return new self(
            $request->route()->parameters(),
            $request->query(),
            $request->all(),
            $request->headers->all(),
            $request->cookies->all()
        );
    }
}


class PhpHttpResponse {
    protected int $status = 200;
    protected array $headers = [];
    protected mixed $body = null;

    public function status(int $code): self {
        $this->status = $code;
        return $this;
    }

    public function setHeader(string $key, string $value): self {
        $this->headers[$key] = $value;
        return $this;
    }

    public function json(mixed $data): void {
        $this->headers['Content-Type'] = 'application/json';
        $this->body = json_encode($data);
    }

    public function send(mixed $data): void {
        $this->body = $data;
    }

    public function toSymfonyResponse(): \Symfony\Component\PhpHttpFoundation\Response {
        return new \Symfony\Component\PhpHttpFoundation\Response(
            $this->body,
            $this->status,
            $this->headers
        );
    }

    public function toLaravelResponse(): \Illuminate\PhpHttp\Response {
        return response($this->body, $this->status)->withHeaders($this->headers);
    }
}


class PhpHttpAdapter {
    protected string $framework;
    protected array $routes = [];
    protected array $middleware = [];

    public function __construct(string $framework = 'laravel') {
        $this->framework = strtolower($framework);
    }

    public function init(): void {
        // Setup if needed (e.g. runtime connection)
    }

    public function start(int $port = 8000): void {
        // Usually handled by the framework (e.g. `php artisan serve`)
    }

    public function stop(): void {
        // Optional shutdown tasks
    }

    public function registerRoute(string $method, string $path, callable $handler): void {
        if ($this->framework === 'laravel') {
            app('router')->$method($path, function($request) use ($handler) {
                $req = PhpHttpRequest::fromLaravel($request);
                $res = new PhpHttpResponse();
                $handler($req, $res);
                return $res->toLaravelResponse();
            });
        } elseif ($this->framework === 'symfony') {
            // You can attach dynamically via routing component
        } else {
            throw new Exception("Unsupported framework: {$this->framework}");
        }
    }

    public function use(callable $middleware): void {
        $this->middleware[] = $middleware;
    }
}

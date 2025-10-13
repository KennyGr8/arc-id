<?php
require 'vendor/autoload.php';
use Illuminate\Foundation\Application;

class LaravelAdapter implements HttpAdapter {
    private $app;

    public function init(): void {
        $this->app = new Application();
    }

    public function start(int $port): void {
        // Laravel normally uses artisan serve
        echo "🚀 Laravel running on port {$port}\n";
        passthru("php artisan serve --port={$port}");
    }

    public function stop(): void {
        // stopping Laravel is not trivial, usually handled by process manager
    }

    public function registerRoute(string $method, string $path, callable $handler): void {
        $this->app->router->{$method}($path, function() use ($handler) {
            $req = request();
            $res = response();
            return $handler($req, $res);
        });
    }

    public function use(callable $middleware): void {
        $this->app->middleware([$middleware]);
    }
}

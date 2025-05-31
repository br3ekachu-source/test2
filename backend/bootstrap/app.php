<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Symfony\Component\HttpFoundation\Request;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->api(prepend: [
            \App\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
            //\Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
        ]);

        $middleware->alias([
            'verified' => \App\Http\Middleware\EnsureEmailIsVerified::class,
        ]);
        //удалить чтобы вкл
        $middleware->validateCsrfTokens(except: [
            '*'
        ]);
        $middleware->trustProxies('*');
        $middleware->trustProxies(headers: Request::HEADER_X_FORWARDED_FOR |
            Request::HEADER_X_FORWARDED_HOST |
            Request::HEADER_X_FORWARDED_PORT |
            Request::HEADER_X_FORWARDED_PROTO |
            Request::HEADER_X_FORWARDED_AWS_ELB
        );
    })
    // ->withMiddleware(function (Middleware $middleware) {
    //     $middleware->trustProxies('*');
    // })
    // // ->withMiddleware(function (Middleware $middleware) {
    // //     $middleware->trustProxies(headers: Request::HEADER_X_FORWARDED_FOR |
    // //         Request::HEADER_X_FORWARDED_HOST |
    // //         Request::HEADER_X_FORWARDED_PORT |
    // //         Request::HEADER_X_FORWARDED_PROTO |
    // //         Request::HEADER_X_FORWARDED_AWS_ELB
    // //     );
    // // })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();

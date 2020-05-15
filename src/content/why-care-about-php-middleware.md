---
layout: post
author: [Phil]
title: Why Care About PHP Middleware?
date: 2016-05-31 14:38:00+00:00
tags: [php, psr7, psr15, phpfig, http-middleware, http]
comments: true
disqus_identifier: why-care-about-php-middleware
alias: 2016/05/31/why-care-about-php-middleware/
alias_1: php/2016/05/31/why-care-about-php-middleware/
---

Recently there has been a lot of buzz about HTTP middleware in PHP. Since [PSR-7][psr7] was accepted, everyone and their friend Sherly has been knocking out middleware implementations, some of them stunning, some of them half-arsed, and some of them rolled into existing frameworks. HTTP Middleware is a wonderful thing, but the [PHP-FIG] is working on a specific standard for middleware, which will standardise this mess of implementations. Some folks don't seem to think that would be useful.

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">IMO it remains to be demonstrated that sharing &quot;generic&quot; middleware saves more than about 5 min of dev time to begin with. <a href="https://twitter.com/hashtag/psr7?src=hash">#psr7</a></p>&mdash; Taylor Otwell (@taylorotwell) <a href="https://twitter.com/taylorotwell/status/734049190460817408">May 21, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

Let's look into middleware a little closer, to show you why it's something to smile about.

## Background

HTTP Middleware is by no means a new concept, either in general, or to PHP. The idea is to wrap your application logic (eg: controllers) up in a way that looks like an onion, having concentric layers of stuff happening before and after the central logic runs: reading from the request and writing to the response. Some layers might notice a problem and exit early skipping your application logic altogether. Others will add headers to the response, or do other fancy stuff.

Anthony Ferrara wrote an example of that here:

~~~php
<?php

use Tari\ServerMiddlewareInterface;
use Tari\ServerFrameInterface;

use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Message\ResponseInterface;

class Foo implements ServerMiddlewareInterface
{
    public function handle(
      ServerRequestInterface $request,
      ServerFrameInterface $frame
    ): ResponseInterface
    {
        if ($this->isBadRequest($request)) {
            return $frame->factory()
              ->createResponse("Bad Request", 400);
        }

        return $frame->next($request);
    }
}
~~~

I stole this image from Slim Framework to help explain the general concept.

![Diagram stolen from Slim Framework showing how HTTP middleware layers wrap an application. ](/img/2016-05-31-why-care-about-php-middleware/middleware.png)

PHP was a bit late to the game with HTTP middleware, because of the way PHP's web interaction code happened. Seeing as PHP was built intentionally for the web from scratch, we've always had a bunch of ways to get to web related data. PHP had `get_apache_headers()` to read headers if it's on Apache or `$_SERVER['HTTP_FOO']` to read kinda headers, `header()` to manually set response headers, `$_GET` to access query string parameters, `$_POST` to access the HTTP body if the `Content-Type` is `application/x-www-form-urlencoded` and `fopen('php://input', 'r')` for the raw body otherwise.

That is quite clearly a bit shit, inconsistent and can be rather hard to fake for the purposes of testing. Regardless of being shit, it _was_ possible to access all of this stuff. Other languages like Python and Ruby didn't really have the same level of access, so they ended up building themselves some nice systems to handle it: [Rack for Ruby][rack-intro] and [WSGI for Python](http://wsgi.tutorial.codepoint.net/).

A bountiful supply of HTTP middlewares sprung forth for these systems, including things like:

- A/B Testing
- Debugging
- Caching
- CORS
- CSRF Protection
- HTTP Basic Auth
- OAuth 2.0
- OpenID
- Rate Limiting
- Referrals
- IP Restriction

These are just a few examples of things that middleware can provide any web framework that supports a HTTP middleware standard. Here is a [non-extensive list of what Rack has](https://github.com/rack/rack/wiki/List-of-Middleware). If not provided by middleware, the framework has to offer it, or application developers need to build it. That's a lot of work that multiple people need to do instead of working on business requirements.

These systems became de-facto standards, allowing web servers and web frameworks alike to agree on an interface for requests and responses, allowing HTTP middlewares to be constructed and shared around regardless of the framework.

PHP however didn't do that. Unhappy with the way PHP provided access to the request/response stuff, various frameworks wrapped up the request and the response with their own implementations, allowing some frameworks to build their own middleware on top of that logic. These custom request and response implementations made it impossible to build any sort of re-usable middleware because they were all completely different, with different classes and different methods and it was impossible to work with them. [Symfony's HttpFoundation][httpfoundation] did emerge as the most popular, but just didn't manage to become the defacto standard for HTTP Messages as we could have hoped.

[StackPHP] came along as an attempt to show the PHP world how middlewares could be built and shared, and was built on top of Symfony's HttpFoundation, but the project was largely ignored by the major frameworks and it ultimately ended up not really doing anything. It was in Laravel for a bit, but they ended up tossing it and rolling their own. There are also ~20 dead Rack ports written in PHP floating around on GitHub and Packagist that didn't try anywhere near as hard as StackPHP to get going. Simply put HTTP Middleware in PHP is not a technical problem, or a failure of the language, it's a community issue.

Unlike the way the Ruby and Python communities ability to align on a single solution, PHP needs the elders of the large framework tribes to come together to pick standard interfaces for these things to get the same affect. This in turn pushes large swathes of the community towards a single standard, and if it comes with framework approval people end up using it regardless. Luckily we're half way to that solution with [PSR-7][psr7], which specifies interfaces for HTTP requests and responses. Awesome!

## PSR-7 Isn't Enough

PSR-7 only defines the request and response, not the "handler" itself, which is the logic that accepts a request, returns a response and "does stuff" in the middle. The handler needs a new PSR, and the FIG are working on that as we speak.

Whilst you can build a HTTP Middleware implementation with [PSR-7][psr7], each implementation looks a little different, meaning the handlers are a little different. This is where standardization comes in.

There is currently a healthy amount of discussion between a few interested parties on the FIG mailing list about which approach to HTTP Middleware should be used for the standard itself. There's the way [Slim Framework] works (along with a bunch of smaller implementations), and the way that [StackPHP] and [Laravel] implement middleware, which is much closer to how Rack works.

One looks like this:

> fn(request, response, next): response

Another looks like this:

> fn(request, frame): response

For a big long super in depth hardcore technical explanation of the difference between the two approaches, check out Anthony Ferrara's article ["All About Middleware"][anthony-about-middleware]. Anthony is certainly no fan of the first approach, and points out a bunch of potential technical downsides. [Woody Gilk](https://twitter.com/shadowhand) - editor for the [HTTP Middleware PSR][fig-middleware-psr-pr] - writes up a response in his article ["All About PSR-7 Middleware"][woody-about-middleware].

Yesterday this proposed PSR [passed the Entrance Vote](https://groups.google.com/forum/#!msg/php-fig/v9AijALWJhI/s3TPH-0pAQAJ), meaning it will henceforth be known as PSR 15. Now that is has passed the Entrance Vote it's time to hash out the specifics of the implementation, and I'm excited to see what happens. There are a bunch of issues to work through, but the important thing to take away from the discussion is: clearly there are at least two rather different ways of doing this.

## How Useful Is Middleware?

Other than the specific technical details of the interface, the only question left is the one from Taylor:

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">IMO it remains to be demonstrated that sharing &quot;generic&quot; middleware saves more than about 5 min of dev time to begin with. <a href="https://twitter.com/hashtag/psr7?src=hash">#psr7</a></p>&mdash; Taylor Otwell (@taylorotwell) <a href="https://twitter.com/taylorotwell/status/734049190460817408">May 21, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

The assertion that middleware is "only five minutes of work" is quite off, and the idea that it is unproven is just not accurate. Middleware has been insanely useful in many other languages. I've used it in Ruby and Go extensively, and I'm excited to see it come to PHP in a useful way.

Chatting with Taylor the idea of "middleware is only five minutes of work" is based on the idea that there is a single, generic, framework agnostic package for whatever needs to be done. Now, I'm excited to hear Laravelfolk suggest this because normally I'm wanting those people to think this way. In the past I've [begged people to build framework agnostic code](https://phil.tech/php/2014/01/02/the-tribal-framework-mindset/) instead of tying it to Laravel.

Even _if_ we can rely on there being a single, generic, framework agnostic package for literally anything me might want to build into our middleware, the idea that it would only be five minutes of work is still just not.

Looking at one of the most simple StackPHP middlewares:

~~~ php
<?php namespace Alsar\Stack;

use Symfony\Component\HttpKernel\HttpKernelInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class IpRestrict implements HttpKernelInterface
{
    /**
     * @var HttpKernelInterface
     */
    private $app;

    /**
     * @var array
     */
    private $allowedIps;

    /**
     * @param HttpKernelInterface $app
     * @param array               $allowedIps
     */
    public function __construct(
      HttpKernelInterface $app,
      array $allowedIps
    )
    {
        $this->app = $app;
        $this->allowedIps = $allowedIps;
    }

    /**
     * {@inheritdoc}
     */
    public function handle(
      Request $request,
      $type = self::MASTER_REQUEST,
      $catch = true
    )
    {
        $ip = $request->getClientIp();
        if (!in_array($ip, $this->allowedIps)) {
            return new Response(
              sprintf('IP %s is not allowed.', $ip),
              403
            );
        }
        return $this->app->handle($request, $type, $catch);
    }
}
~~~

If you can write that code, with dependency injection, docblocks, find the correct HTTP status code (remembering not to use `401` as so many people incorrectly do) and write the unit tests for it in less than five minutes you're an absolute champion.

Even _if_ you're an absolute champion, the idea that you _should_ need to write this < 5 minutes of code is odd.

Most middleware implementations offer the ability to pile up a bunch of classes containing the handlers, and it'll run through them in order:

~~~ php
<?php

Equip\Application::build()
// ...
->setMiddleware([
    Relay\Middleware\ResponseSender::class,
    Equip\Handler\ExceptionHandler::class,
    Equip\Handler\DispatchHandler::class,
    // ...
    Equip\Handler\ActionHandler::class,
])
// ...
->run();
~~~

_Example taken from [Equip](http://equip.github.io/), a little middleware implementation Woody is working on._

Would you rather reference a class or get involved with writing your own handlers every single time, for each application?

I know I'd rather not. I'd rather be out on my bike or in the pub! :D

## Summary

HTTP Middleware is awesome. It lets frameworks do far less, it lets people distribute logic in a way often unseen popularly in PHP, it lets more of your application be reusable, and it lets PHP catch up with other popular languages used to build stuff on the web.

[PSR-7][psr7] was a great step towards this goal, but we need another PSR to get the whole way there.

[psr7]: http://www.php-fig.org/psr/psr-7/
[httpfoundation]: http://symfony.com/doc/master//components/http_foundation/index.html
[rack-intro]: http://chneukirchen.org/blog/archive/2007/02/introducing-rack.html
[PHP-FIG]: http://php-fig.org/
[StackPHP]: http://stackphp.com/
[Slim Framework]: http://www.slimframework.com/docs/concepts/middleware.html
[Laravel]: https://laravel.com/docs/master/middleware
[anthony-about-middleware]: http://blog.ircmaxell.com/2016/05/all-about-middleware.html
[woody-about-middleware]: http://shadowhand.me/all-about-psr-7-middleware/
[fig-middleware-psr-pr]: https://github.com/php-fig/fig-standards/pull/755

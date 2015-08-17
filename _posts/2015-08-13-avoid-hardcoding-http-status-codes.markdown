---
layout: post
title: Avoid Hardcoding HTTP Status Codes
date: '2015-08-16 21:00:00 +0000'
category: http
tags: http api
comments: true
---

A lot of things in programming are argued to death, but one subject where people almost unanimously agree is that magic numbers can be a pain in the ass, and they should be avoided whenever possible. Sadly when it comes to HTTP status codes, people keep on hardcoding them, and it leads to all sorts of confusion.

1. Remembering which code is which is incredibly difficult, even when you have spent 5 years of your life building APIs
2. There are an awful lot of codes
3. Even if you remember them, you are inviting trouble when new programmers are let loose on the codebase

What is 409?

If you answer without looking it up on [Dash](https://kapeli.com/dash) or [HTTP Status Dogs](http://httpstatusdogs.com) then you are a machine.

Ruby on Rails utilizes Rack to help solve this problem. The [render option of Rails](http://guides.rubyonrails.org/layouts_and_rendering.html#the-status-option) offers a `:status` attribute, which defaults to `:ok` and can be set to any of the following options:

Status | Symbol
--------|-------
300	| :multiple_choices
301	| :moved_permanently
302	| :found
303	| :see_other
304	| :not_modified
305	| :use_proxy
306	| :reserved
307	| :temporary_redirect
308	| :permanent_redirect

The list goes on, and is built on [a big old array in Rack](https://github.com/rack/rack/blob/master/lib/rack/utils.rb#L470).

Rack (and Rails) are not the only frameworks in the world to provide these options, [Symfony has a go too](https://github.com/symfony/HttpFoundation/blob/master/Response.php
) in `HttpFoundation`:

{% highlight php %}
public function someAction(Request $request)
{
  return new Response('', Response::HTTP_NO_CONTENT);
}
{% endhighlight %}

I'd say that seeing `HTTP_NO_CONTENT` is quite a lot more useful than seeing `204` right? And any half decent IDE will let you know that `HTTP_NO_CONTENT` has the value of `204` anyway.

Sadly, the PHP tools outside of Symfony have been a bit lacking. 

Laravel has a bunch of hardcoded status codes in [Custom HTTP Error Documention](http://laravel.com/docs/5.1/errors#http-exceptions), even though their responses are built on top of HttpFoundation.

Guzzle, and all PSR-7 stuff, provides the status code and the reason phrase (which can theoretically change if your API developer is a smart-ass), so again you're working with magic numbers.

{% highlight php %}
$response = $client->get('http://www.amazon.com')->send();

echo $response->getStatusCode();      // >>> 200
echo $response->getReasonPhrase();    // >>> OK
{% endhighlight %}

Most folks who become fed up with hardcoding status codes end up implementing their own solution, but this is just more code that needs to be tested and I've seen a few people actually get some of the codes wrong... 

The solution here is to provide a reusable package, which contains the constants without needing all of Symfony HttpFoundation available to work. 

Recently one turned up on [The League mailing list](https://groups.google.com/forum/#!topic/thephpleague/iBfghcg3TJc) which ended up being built as [lukasoppermann/http-status](https://github.com/lukasoppermann/http-status). Since then I noticed another one, called [Teapot](https://github.com/shrikeh/teapot).

{% highlight php %}
<?php
use \Teapot\StatusCode;
$code = $response->getStatusCode();
$this->assertNotEquals(StatusCode::NOT_FOUND, $code);
$this->assertNotEquals(StatusCode::FORBIDDEN, $code);
$this->assertNotEquals(StatusCode::MOVED_PERMANENTLY, $code);
$this->assertEquals(StatusCode::CREATED, $code);
{% endhighlight %}

Nice and simple. 

There is some room for the PHP-FIG to improve this situation I think, as the PHP community does not have a single Rack-like system where all this stuff is done already.

I don't mind how you go about avoiding hardcoded HTTP status codes in your projects, but please avoid doing it somehow.

If you want more advice on HTTP/API stuff, grab a copy of my book [Build APIs You Won't Hate](http://apisyouwonthate.com/).

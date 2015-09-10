---
layout: post
title: Laravel is Awesome
category: php
alias: blog/2012/05/laravel-is-awesome
excerpt: You might not expect to hear that from a CodeIgniter and FuelPHP developer,
  but it's true. Taylor has done a brilliant job writing code that is clean, functional
  and has built a huge community of smart developers in less than a year of active
  development. People are flooding to Laravel from other frameworks and that's great
  for the PHP community, read on to find out why.
date: '2012-05-22 11:52:00'
comments: true
disqus_identifier: laravel-is-awesome
---

You might not expect to hear that from a CodeIgniter and FuelPHP developer, but it's true. Taylor has done a brilliant job writing code that is clean, functional and has built a huge community of smart developers in less than a year of active development. People are flooding to Laravel from other frameworks and that's great for the PHP community.

### Hold on, what?

So if you know me you'll know I have a history in CodeIgniter development. CodeIgniter is a slow moving framework with an API that has barely ever changed and historically the framework has always supported several versions of PHP behind the current active.

CodeIgniter supported PHP 4 when PHP 5.2 was popular, and has only switched to requiring PHP 5.2 now that PHP 5.4 is available. This has always been absolutely brilliant for developers like me who are involved with projects like PyroCMS and PancakeApp, which are distributed applications that work on any environment.

While developers have always been keen to move to the newest versions of PHP it's a well known fact that sometimes you just can't do that. Much like how designers and frontend guys wanted to use all the new HTML 5 JS API's as soon as they come out, but still had 60% of their users on IE6 - distributed application developers like myself are forced to work in a slightly different world where versions matter more than personal preference.

To put this simply, if right now upped the CI and PyroCMS requirements to PHP 5.3 then I would lose 26% of my community. My conversion rate of Community to Professional users is 1 in 5, so loosing that many sales would mean I would have to fire my support guy - which would make the project crumble.

These are the sort of things that need to be thought about when working with PHP projects - as remember, not everybody is in the same situation as you. This is why I still use CodeIgniter, and this is why it's a great framework for others in my situation.

### But I thought CodeIgniter was dead?

This is an obvious reference to a blog post that has been going around recently: [Why CodeIgniter is Dead](http://heybigname.com/2012/05/06/why-codeigniter-is-dead/). I am fine with people having opinions, but this article makes several assertions that are entirely incorrect, and makes many comments that lead me to believe the author has never actually looked at the 3.0 branch at all. To me, this article comes across as this: one of the Laravel developers decided that he was no longer in a position where he required a slow-moving API for his applications, and a PHP 5.2 requirement base, so he decided instead of just using Laravel he would blog about how shit CodeIgniter was. That is pretty low and entirely inaccurate. I call it FUD.

CodeIgniter 3.0 is still actively worked on by a whole team of developers, including a new Reactor Engineer Alex Bilbie. Unit testing for 3.0 is complete and the framework is up on Travis: [![Build Status](https://secure.travis-ci.org/EllisLab/CodeIgniter.png?branch=develop)](http://travis-ci.org/EllisLab/CodeIgniter), meaning bigger changes can be made without any worry of stability, PDO drivers have been included and there is even some progress being made on breaking free from the CI singleton without breaking the API. CodeIgniter doesn't break the API unless it's ridiculously minor, so that's important even at the cost of "not being cool".

Remember, this is not the first "death knell" for CodeIgniter. Developers have proclaimed the end of CI a few times before, and each time we saw a brain-drain from the CI community of bored developers going somewhere else to build something else.

It happened in about 2007 when a few CodeIgniter developers got fed up with the lack of community contributions being merged in, so they made BlueFlame and then eventually recoded everything to make Kohana. CodeIgniter carried on just fine for a while until about 2010 when even more developers got fed up with the lack of community contributions - [myself included](/blog/2010/10/what-happens-next) - which was the last time CI really had any issues in the community. Since then EllisLab have moved things to GitHub, the community has been put in charge and new features and bug fixes are flying in. This means since the last death knell CodeIgniter has never been more active - and while it might not be using namespaces and callbacks, it certainly makes writing PHP 5.2 code much more fun.

### But you like Laravel?

Absolutely! Taylor has done a brilliant job of building up a framework that takes advantage of callbacks, IoC and event driven behaviour very well. Unit Tests are baked in nicely, the Migrations are very neat (and look pretty familiar to my CI migrations *cough*) and their Schema class is a beauty, very close to the way Rails handles things with the way callbacks and $table objects instead of shit-loads of procedural code.

### Then why don't you use it?

Every single framework goes through the same trouble that every single piece of software goes through: Change.

As a framework developer you are always met with two extremes:

1. Change a lot
2. Don't change

We saw 1 happen during the Kohana switch to 2.4 to 3.x, where the entire framework was redeveloped and users of the original system were left in the cold. Development fractured, they even had two different websites with different sets of documentation. That was extremely unfortunate, but that is what happens when you change a lot.

1 annoys developers who are trying to build large-scale stable applications.
2 annoys developers who have been using your system for years and want new things

The lesser suggested 3rd option is "only change a bit" which CodeIgniter has been doing for a while, which still bores people who want the excitement of the bleeding edge.

It's pretty safe to say that Laravel is on the bleeding edge. Taylor has created one of the nicest looking frameworks around by building 3 major versions within the year, most of which have required a fair bit of application redevelopment. v3.x is looking amazing, but what happens when v4.x comes out? Will it require a lot of work? I don't know, but with all due respect to Taylor: that is something that worries me a little bit.

### So you'll never use it?

I wouldn't say that. When I know that the API has settled down I will be happy to dive in and have a go. If Laravel support Composer packages like FuelPHP 2.0 plan on doing then I'll be able to drag and drop components between the two easily, so my framework choice will be far less important and I can play with either one.

### Final Thoughts

Laravel has become the new, snazzy framework which gives bored PHP developers a new way to do things. CodeIgniter (and FuelPHP for that matter) are both similar projects which handle things in very similar ways. 

What right minded developer wants to work in the same way for 5+ years without exploring other options? Not me that's for sure, and most developers eventually reach the same level. For years the solution for these bored PHP developers was "Fuck it, I am going to learn Rails", or Python, or Node, or whatever the hell else is a bit different - just to stop the boredom. 

The thing that makes me truly happy for Laravel's existence is the fact that the project has now started acting as a catchment base for those developers and keeping them in the language. Instead of developers outgrowing the simplicity of CodeIgniter - which most of them cut their teeth using - and wondering off into the "grown up world" of Python/Ruby/etc, we're keeping a lot of smart developers in the PHP community to build cool stuff.

If Laravel start playing ball with the [PHP-FIG group](https://groups.google.com/group/php-standards) and building their components as [PSR-0](https://github.com/php-fig/fig-standards/blob/master/accepted/PSR-0.md) and using Composer -much like FuelPHP 2.0 will be doing - then we'll start to see the whole PHP community really improving together instead of silioing our efforts into fragmented framework communities. We aren't CI devs, or Laravel devs, or FuelPHP devs, we are PHP developers and it's time to make that mean something respectable.

Interoperability for the win.
Trolling for the lose.
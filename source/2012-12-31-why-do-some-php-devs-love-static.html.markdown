---
layout: post
title: Why do some PHP Developers &lt;3 Static APIs?
category: php
alias: blog/2012/12/why-do-some-php-devs-love-static
excerpt: " \n\tThere are two kinds of PHP developers. Those who absolutely love static
  methods because they are easy to work with and those who think they are spawned
  by satan to test our devotion to proper programming practises.  This article is
  not intended to explain why static apis are ok, I instead hope to use my experience
  with a few PHP frameworks - and the power of hindsight - to explain why some developers
  ignore best practises and use a whole bunch of statics. "
date: '2012-12-31 16:25:00'
comments: true
disqus_identifier: why-do-some-php-devs-love-static
---

There are two kinds of PHP developers. Those who absolutely love static methods because they are easy to work with and those who think they are spawned by satan to test our devotion to proper programming practises. 

This article is not intended to explain why statics are ok, I instead hope to use my experience with a few PHP frameworks - and the power of hindsight - to explain why some developers ignore best practises and use a whole bunch of statics.

## Who loves statics?

Most people who have ever used [CodeIgniter](http://codeigniter.com).

That means most Kohana developers, a bunch of you Laravel types and people who have moved away from using CodeIgniter to write their own stuff.

Why you might ask?

CodeIgniter's PHP 4 design obviously came before static methods were added into PHP 5.0. CodeIgniter uses a "super-global" instance which allows equal access to all loaded classes, which are all basically assigned to the controller, so they can be used throughout the system. 

This means they can be accessed from any model method using a \_\_get() which will look for that requested property using `get_instance()->{$var}`. Before that (obviously \_\_get() wasn't around in PHP 4) they used to foreach through CI_Controller properties, then assign them to $this in the model.

In a library you have to call get\_instance yourself (because libraries do not force you to inherit any class, so there is no way to hack in a \_\_get().

## Gross...

Yeah, this is some fairly crazy hackery to give you access to your code. Using statics can achieve the exact same functionality without the hackery.

Even the reasoning for the hackery didn't make much sense. "Oh good, I can access my session data in my model". AHHH! Why are you accessing your session data in your model? I will beat you with the bad-practise stick until you move it back out.

## The "Solution"

The Kohana developers were the first to get serious hard-ons for statics, and thought they had fixed this by making changes like the following:

	$this->input->get('foo');
	// becomes
	Input::get('foo');

This was like candy for many CI developers, who outright shunned CodeIgniter for it's PHP 4 global code and moved to Kohana to use its PHP 5 style global code. That's not much of an improvement overall, but at least it did not require multiple secret background hacks to make the logic work. Besides, less characters is always better, "right"? 

## Why is this bad?

Many PHP developers (especially those well versed in Symfony and Zend) will say "Dependency Injection, obviously!" but not many developers in the CodeIgniter community have any real experience with DI is as the framework makes it pretty difficult - so that's not an argument I can use to explain things to those guys.

Instead another argument, one which was very valid for FuelPHP - which while mostly using statics as an interface for instance logic still had issues with statics, especially when HMVC was involved.

_This is all pseudo-code as I haven't used FuelPHP since about 1.1 and things have probably changed, but I know these general issues still exist._

	class ControllerA extends Controller
	{	
		public function action_foo()
		{
			echo Input::get('param');
		}
	}
	
Fairly standard stuff. This method will output the value of `?bar=` in the method.

What happens when we make a HMVC request to this method?

	class ControllerB extends Controller
	{	
		public function action_baz()
		{
			echo Input::get('param');
			echo " & ";
			echo Request::forge('controllera/foo?param=val1')->execute();
		}
	}
	
If you call `controllerb/baz` in your browser then you'll see "val1" output, but if you call `controllerb/baz?param=override` then you're going to get both calls to the get method return the same value.

## Relevance

Global code gives you no relevance, or scope might be a better word. In this example we would actually want to reference:

	$this->request->input->get('param');

The Request object would contain a brand-new instance for each request, then input would again be another object instantiated for each request that contained only input data for that specific request. This is exactly how [FuelPHP 2.0 plans to work](http://fuelphp.com/blogs/2012/03/why-the-20-changes), and solves the DI problem as well as the issues for HMVC.

## But that syntax is gross!

You'll never hear that from a Symfony or Zend developer, but anyone using CodeIgniter will flip their shit at the thought of "going back to PHP 4".

Referencing code from $this to many seems like a PHP 4 approach, while static is PHP 5 and this is frustrating to try to get past.

$this should refer to the "current" object. Always.

Using $this to access all global code ever is terrible. Fact.

So, while $this->request->input->get() might look like it's even longer-form CodeIgniter syntax, really we're just sat in a controller. When the controller is instantiated an instance of new Request is assigned to it, and the constructor of Request gets an instance on Input too.

If you're sat in a model or other class, then accessing $this->request->input->foo() is not going to work, because $this is not a controller. Instead you would need to pass the request object into the method as an argument instead.

## So… no static ever?

At this point there are just so many people tied to static love that it's hard to break them away. FuelPHP 2.0 and Laravel 4.0 are trying to cater for this by implementing a "Facade" layer of some description. See this writeup of [how the Facade will work in Laravel 4](http://www.thenerdary.net/post/30859565484/laravel-4).

That means, while you CAN access Input::get('foo') it's actually acting as a facade for instantiated logic in the background. That said, it still has all of the issues of global code, so if folks want to be lazy they can do it that way - then once they get bitten in the ass a few times trying to test their applications they can start to make the switch, without needing to totally use a new framework.

A great video by Taylor Otwell (creator or Laravel 4) outlines why and how you can replace static code with unit-testable instances via his DiC container. 

<iframe src="http://player.vimeo.com/video/53029232" width="500" height="279" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe> <p><a href="http://vimeo.com/53029232">Laravel 4 - IoC Controller Injection & Unit Testing</a> from <a href="http://vimeo.com/userscape">UserScape</a> on <a href="http://vimeo.com">Vimeo</a>.</p>

This hopefully shows off that static usage in Laravel is extremely optional, and while some modern-day frameworks certainly look like Kohana on the first glance they absolutely are not still doing things the same-old way.

## Side/Sad Note

Right now I am converting [PyroCMS](https://www.pyrocms.com/) from CodeIgniter to Laravel, and trying to take it straight from PHP 4 global code to perfect dependency injected code is absolute murder. So, an in-between step is being made to switch from using the CI loader to at least using PHP 5, PSR-2 autoloaded code, with a bunch of statics while we're still in CodeIgniter.

Then, switching from those statics to DiC code as highlight in the video will be made easy when we finally make the switch to Laravel.

Going from tightly-coupled CodeIgniter code to testable PSR-2 is an absolute mission, but the Pyro team are on it - and it's going to be epic.
---
layout: post
title: Introducing FuelPHP
category: fuelphp
permalink: blog/2011/01/introducing-fuelphp
excerpt: " \n\tFuelPHP has been in development for the last two months but the new
  PHP 5.3 framework is nearly ready to see the light of day. We're just about to roll
  out the v1.0.0-beta1 and so far it is holding up pretty well. Another PHP framework
  you say? Read this article and I'll try to explain why you should be excited about
  \"yet another framework\". "
date: '2011-01-04 17:34:00'
comments: true
disqus_identifier: introducing-fuelphp
---

It's been in development for the last two months but the new PHP 5.3 framework [FuelPHP](http://fuelphp.com/) is ready to see the light of day and <s>we're just about to roll out the v1.0.0-beta1</s> we've just rolled out [v1.0.0-beta1](http://fuelphp.com/blog/2011/01/fuel-reaches-v1.0.0-beta1).

Now I know every developer and their dog has their own framework these days and it has become the new "entry script" like phpBB clones used to be, but being built by experienced framework "connoisseurs" FuelPHP is a good way towards breaking this stereotype.

### Why does the world need a new PHP framework?

I'm a CodeIgniter fan and I have been for a long time. It is a brilliant, lightweight, configuration based framework which is fairly extend-able and doesn't force users to learn much to get going. It has great documentation and a brilliant community. The downside? It was created for PHP 4 and things like $this->load will always be a core part. CodeIgniter Reactor will help us make CodeIgniter better, but it will always be of a certain pattern. For most that is fine, we're just making something with sexy new PHP 5.3 syntax.

Like CodeIgniter, FuelPHP will be keeping things simple but moving to a better PHP 5 syntax. Sounds like Kohana right? Well... kinda. Kohana got a lot of things right in 2.x but the 3.x re-write was a confusing one. Lots of their syntax and libraries are confusing and although incredibly well written they are poorly documented.. Kohana generally leaves people feeling confused unless they are ready to dive into the source and work it out for themselves. For many that is fine, we are just trying to make things easier.

Others are too simple, too complicated, badly documented, poorly thought out or just slow as hell.

### So it's a fork?

Nope! CodeIgniter and Kohana are the two main frameworks FuelPHP is based around but all of the base code is original with only some small parts sourced from other places. We have taken a few ideas from Rails for parts like code generation but this will not be a huge complicated convention-based framework. The idea is if we can improve on CodeIgniter and Kohana a little then we already have a player in the world of frameworks.

### Who else is working on this?

This is not just me, I'm not even in charge of the project. This project belong to Dan Horrigan who started things rolling, then invited me in soon to be followed by [Jelmer Schreuder](http://twitter.com/#!/jelmer_fuel) and [Harro "WanWizard" Verton](http://twitter.com/#!/wanwizard). Unlike other frameworks this is very community driven and we've already had contributions in planning, code and documentation from plenty of people. The FuelPHP way will be to always give feedback on pull requests with constructive feedback. Nothing will be ignored.

### What features should I be excited about?

#### Cascading File System

We've borrowed the Cascading File System from Kohana and improved it greatly. The use of namespaces help to keep Core classes, App classes and Package classes from conflicting and we have added some path definitions to the auto-load logic to drastically speed up the ![Fuel Directory Structure](https://s3.amazonaws.com/philsturgeon-blog/Screen_shot_2011-01-04_at_18.14_.24_.png)calling of classes.

The Cascading File System is a hierarchy of similar directory structures that cascade. The hierarchy in used when a file is loaded by `Fuel::find_file()` and checks core, packages / modules, application. At a very basic level this means you can have default config in the core and your own config in the application but it opens up awesome new options for things like default base controllers.

By default you have a [Controller\_Rest](http://fuelphp.com/docs/general/controllers/rest.html) and [Controller\_Template](http://fuelphp.com/docs/general/controllers/template.html) which any controller can extend instead of the usual "Controller" to get extra logic.

The way autoloader works means each `_` translates to being a `/` in the filepath. This means your controllers can do crazy stuff like:

* `Controller_API_Users extends Controller_API` = `app/classes/controller/api/users.php`

* `Controller_API extends Controller_Rest` = `app/classes/controller/api.php`

* `Controller_Rest extends Controller` = `core/classes/controller/rest.php`

Madness? It might look it at first, but this is incredibly useful when you understand the use of base controllers and it all works out of the box. No hacking around [like in CodeIgniter](/blog/2010/02/CodeIgniter-Base-Classes-Keeping-it-DRY).

#### HMVC

The whole system has been written to work with HMVC so you can make requests to other controllers and module controllers within your own controllers meaning you can do things like:

{% highlight php %}
Request::factory('errors/twitter')->execute()
{% endhighlight %}

#### Packages

Not like the new packages feature in CodeIgniter, packages are installable module-like directories that store classes and are added to the cascading file system. By default you are provided with two packages, ActiveRecord and Oil. Oil is a slick command line utility that (amongst many other things) can be used to install other packages.

> php oil install test-package
> Downloading package: http://github.com/philsturgeon/fuel-test-package/zipball/master
> Installing package "test-package"
> /Users/phil/Sites/fuel/fuel/packages/test-package/LICENSE.txt
> /Users/phil/Sites/fuel/fuel/packages/test-package/README
> /Users/phil/Sites/fuel/fuel/packages/test-package/classes/test.php
> /Users/phil/Sites/fuel/fuel/packages/test-package/classes/exception.php

More on this kick-ass command line tool later.

#### Lightweight ActiveRecord

FuelPHP contains a very simple, lightweight and powerful ActiveRecord/ORM implementation based on the old but rather tastey [ActiveRecord-in-PHP](http://lukebaker.org/projects/activerecord-in-php/).

{% highlight php %}
$slug = Model_Slug::find('first'); # SQL query to grab first slug
$slug->post; # an SQL query occurs behind the scenes to find the slug’s post

$p = Model_Post::find('first', array('include' => 'slug')); # SQL join
$p->slug; # no SQL query here because we already got this post’s slug in the SQL join in the previous line

$p = Model_Post::find('first');

$s = new Model_Slug(array('slug' => 'super-slug'));
$p->slug = $s; # assign a slug to this post

$p->slug->slug = 'foobar';
$p->save(); # cascading save (post and slug are saved)
{% endhighlight %}

Why do you have to add `Model_` at the start? Because models are in the `/classes/model/` folder just the same as controllers and any other classes.

#### Oil command line utility

Oil is the name of the command line utility in Fuel. Unlike some other frameworks you do not, **ever** , have to use this. It is an optional utility that speeds up things like package installation, MVC code generation, runs tasks and various other things.

> If you are not interested in using a command line utility with your application, do not run it. Nothing will ever be loaded and it will never slow your application down.

[![Fuel Robots](https://s3.amazonaws.com/philsturgeon-blog/Screen_shot_2011-01-04_at_18.38_.56_.png)](https://s3.amazonaws.com/philsturgeon-blog/Screen_shot_2011-01-04_at_18.38_.56_.png)So what can it do?

Run [tasks](http://fuelphp.com/docs/general/tasks.html) which are similar to controllers but command line only. Controllers run on the command line too, but this is a more direct an "native" approach. Tasks are a neat way to create structured cron jobs that you don't want to be publicly accessible, or if you want to accept some basic input to your application over SSH. Why? Who knows, but you can!

One task included in the core you may well use a lot is Migrate.

> $ php oil refine migrate --version=5

Guess what that does? [Migrations](http://fuelphp.com/docs/general/migrations.html) rock.

You can create and run unit tests with php oil test testname, test your code interactively via the php oil console and talk to models, and plenty more will come soon.

### Summary

We already have our [documentation](http://fuelphp.com/docs/) in place with not much [left to go](http://typewith.me/4cfbj6hLHL). It is still early says and you will most likely find bugs. Hell, it's not BETA yet but on the whole this framework is nearly there and it's [pretty damn quick](http://dhorrigan.com/blog/article/how-fast-is-fuel).

Download it, give it a try and let me, Dan and the team know what you think! Swing by the IRC channel [#fuelphp](irc://irc.freenode.net/#fuelphp) to have a chat and if you find bugs you can put them on GitHub.

> _ **Note:** Please do not take any of this article as me expressing any concern, issue or negative points about CodeIgniter. I still love the framework and use it every day. I am a man with many mistresses, hell I use Rails and still write in PHP. This is another new option, not a replacement. I'm not stopping working with CodeIgniter and am still contributing to [CodeIgniter Reactor](http://codeigniter.com/news/reactor_update/)._

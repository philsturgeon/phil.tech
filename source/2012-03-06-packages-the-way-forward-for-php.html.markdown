---
layout: post
title: 'Packages: The Way Forward for PHP'
category: php
alias: blog/2012/03/packages-the-way-forward-for-php/
excerpt: "A package is a piece of reusable code that can be dropped into any
  application and be used without any tinkering to add functionality to that code.
  You don't need to know what is happening inside, only what the API for the class(es)
  are so that you can archive your goal. This is how most modern programming languages
  work, but to make a generalisation: PHP developers hate packages. Why? "
date: '2012-03-06 10:41:00'
comments: true
disqus_identifier: packages-the-way-forward-for-php
---

What is a package? A package is a piece of reusable code that can be dropped into any application and be used without any tinkering to add functionality to that code. You don't need to know what is happening inside, only what the API for the class(es) are so that you can archive your goal. Maybe this package uses another package, that is called a dependency. 

Most package systems also allow for something called dependencies. This will basically allow "Package A" to sit on top of "Package B". What is great about this is that if I want to work on one chunk of code I can reuse another chunk. Instead of adding more code this can reduce the amount of extra code in your package, because "Package C" can sit on top of "Package B" too.

This is how most modern programming languages work, but to make a generalisation: **PHP developers hate packages**. Why? Well while other languages have great systems like [CPAN](http://www.cpan.org/) for Perl, [Gems](http://rubygems.org/) for Ruby, [PIP](http://pypi.python.org/pypi/pip), PHP has had a terrible history with package management going back years.

### What about PEAR?

PHP has had a packaging system for years called [PEAR](http://pear.php.net/). Let's get this understood right off the bat:

> **PEAR sucks**

To get code onto the main PEAR repository you need to get a certain number of up-votes, otherwise it will not be accepted. This was meant to ensure quality but has only helped to detur contributions and promote elitism. 

Another knock-on effect is that you have to install pretty much any code you need to add a new repository, because so many people are using their own to avoid using the default repo. That makes it harder to search, harder to contribute and just generally more of a bitch to work with.

Of the packages already on on PEAR, most of them are massively out of date, inactive and no longer maintained, or never made it out of alpha. I have heard a few developers say "PEAR is awesome, they have a package for everything!" Maybe, but when I see that amongst a team of 4 developers, 2 are inactive and the code only got to 0.2.1 (alpha) in 2006-04-22, I am not full of hope for the stability of that codebase.

The nail in the coffin for me with PEAR is one of the biggest bug bears of the Gem system: system-wide installation. If I want to use a specific package, which requires a newer version of an already installed package, then I have to update it on my whole installation. That means an application I have not touched in weeks might break next time I try loading it on my local box. WAT?

### The community gave up on PEAR

With frameworks like [Ruby on Rails](http://rubyonrails.org/) doing a cracking job of helping developers get things done faster, PHP frameworks started springing up.

CodeIgniter set out in 2006 suggesting it was for developers who "are not interested in large-scale monolithic libraries like PEAR". Almost instantly people were hooked. They could make an entire application with the most useful libraries guaranteed to work with their code. Everything was versioned as one, released as one and had the same team.

In a time where nobody in the PHP community could decide on a standard, PHP frameworks would each adopts a coding standard. No matter what those standards were, at least they were the same in all the classes.

CodeIgniter was not the only framework around, with [CakePHP](http://cakephp.org/) and [Symfony](http://symfony.com/) starting out at similar times. They all had the intention of helping developers build applications without the hassle of dependencies, so people got used to building everything with a framework.

### Let's all start building frameworks

Since late 2005 / early 2006 when these projects set out, hundreds of PHP frameworks have been developed by single developers, companies, community projects, everyone and their dog seems to have been involved with creating a PHP framework at some point or other, hell I've been involved in two: CodeIgniter and [FuelPHP](http://fuelphp.com/). 

PHP frameworks themselves have taken some flak for building up all this new code, bundling in ORM's (I've always said ORM's should not be part of a framework), adding in their own DB abstraction layers, etc. Some see this as a barrier as to switch to a new framework means throwing out everything you know and starting again.

One problem with PHP frameworks is that when one framework doesn't do exactly what a developer wants, they either dump it and start building their own, or fork the existing one until there is no resemblance. This all or nothing approach is what has lead to our main problem: ** Reusable Code **.

Does a library written for Kohana work with CodeIgniter - which was at one point a CodeIgniter fork itself? **Nope**.

Does a package written for Symfony work with FuelPHP? **Not even close!**

### Stuff frameworks, let's go native

You wouldn't be the first to suggest it. As you know, creator of PHP Rasmus Lerdorf is all about procedural code and suggested years back that you [write your own basic MVC architecture](http://toys.lerdorf.com/archives/38-The-no-framework-PHP-MVC-framework.html) and not a full "framework". 

Why do that? I have to build my own code that turns a URL into a loaded PHP file, I have to sort out a configuration system, handle "templates", do a million things that I could have done in seconds with a framework. Also, when I get another developer in I love just saying "this is CodeIgniter so you know whats going on" and not spend hours taking them through all my random code, which is probably different for each project.

The MVC wrappers were never the problem here, the problem was the lack of reusable code. Classes that developers can use to build their applications quickly. For years we Googled for PHP libraries and found them from places like [SourceForge](http://sourceforge.net/), [PHP Classes](http://www.phpclasses.org/), [Google Code](http://code.google.com/) but this lead to a million different coding standards, no way to get notified about new versions and was generally just a shit way to manage code. 

### Let's build an unframework!

This is a fun term that started sprining up with projects like [Flourish](http://flourishlib.com/) and [Spoon](http://www.spoon-library.com/) starting to build reusable components that you could drop into any application.

Thats idea is lovely and all but Flourish never made it out of BETA after years of development.

Spoon looks brilliant - mainly thanks to their shiny design - but is a one-man-army. How can we expect one guy to take care of all that code? It took a year for the developer to get from 1.2.0 to 1.3.0 which is not a speed of progress I am happy with.

Somebody is even working on a new unframework called [Phrame](http://www.phrame.org/) which is only a splash page with a subscription box. Do we need more of these small-team solutions?

### So… what?

Packages were never the problem. The PHP community has coded itself round in circles for years without ever actually fixing the problem and we're back where we started.

**We need a better packages system.** PEAR2 happened, but it still just sucks.

Frameworks have been used to the idea that they were the solution to a problem - and they are. They are fixing a lot of problems but a problem all the frameworks have been trying to fix over the last year are - wait for it… packages!

* CodeIgniter has [Sparks](http://getsparks.org/)
* FuelPHP has [Cells](http://docs.fuelphp.com/general/packages.html) (website never went live)
* Laravel has [Bundles](http://bundles.laravel.com/)
* CakePHP has [The Bakery](http://bakery.cakephp.org/) 
* ZF2 just got [Modules](http://akrabat.com/zend-framework-2/modules-in-zf2/)

Not even Zend are using PEAR? Funny that.

These framework specific packages - especially those with command line install / update utilities - are a breath of fresh air are and the communities are happy with the added functionality they can instantly put into their applications.

The downside is that the same code is being written over and over again for different frameworks, which is a massive waste of man-hours.

Let's take a personal example. I noticed recently that Laravel has a [OAuth2 Bundle](http://bundles.laravel.com/bundle/laravel-oauth2), which was forked from my [CodeIgniter Spark](http://getsparks.org/packages/oauth2/versions/HEAD/show). I converted that OAuth2 Spark from a [FuelPHP Cell](https://github.com/fuel-packages/fuel-oauth2) when I had a project that called for it.

_**WHAT THE HELL?**_

The realisation hit me like kipper to the face. Why are we all sat around building out identical solutions to each other or forking and maintaining separate codebases when we could just be finishing projects? 

I on average spend 70% of my working day on client projects and 30% building or fixing, writing or porting packages and libraries. That 30% could make me 30% richer, or give me 30% more time doing something more interesting than writing code. Maybe I could get around to writing an even BIGGER rant about something else?

Whatever it is we would end up doing with this extra time, we need to find a way to get there.

> The PHP community needs to get together behind a new solution and the framework developers need to lead the charge.

### The Plan

Two very talented PHP developers (<a href="http://www.naderman.de">Nils Adermann</a> and <a href="http://seld.be/">Jordi Boggiano</a>) have been working on a PEAR-killer called [Composer](http://getcomposer.org/), which has a single default repository called [Packagist](http://packagist.org/). Composer is based on systems like npm (NodeJS Package Manager) and Bundler / RubyGems. 

There is another solution called [Phark](https://github.com/lox/phark) but it's still unfinished and their syntax is horrid. Sorry guys but Phark just doesn't look any good to me - and the website linked from your GitHub repo is giving DNS errors. Moving on.

I am happy to see that Symfony are all over packages like a wet flannel. They have been helping out and a huge number of their packages are now using Composer - they've even been sending in pull requests.

Other well known developers like [Ed Finkler](http://funkatron.com/) and [Chris Hartjes](http://www.littlehart.net/atthekeyboard/) who record the [/dev/null postcast](http://itunes.apple.com/us/podcast/dev-hell/id489840699) are behind it too. Check the first episode for some of their reasoning. Ed has a bunch of code on Packagist and I'll be joining him with as much code as I can - such as my [NinjAuth](/blog/2011/09/ninjauth-social-integration-php) multi-provider user authentication system.

More than that I am really happy to say that after talking to the FuelPHP team they are all convinced this is the right way for FuelPHP to go. By removing the different between modules and packages, making pretty much everything into a package and fully supporting the PSR-0 standard of file and class naming, we become fully package based.

FuelPHP will still have Cells, but they will be a Composer package that uses a FuelPHP repository. That means our command line utility will be able to install FuelPHP specific code from the FuelPHP repo, and fall back to generic packages. We'll be amending our Autoloader in 2.0 to support Composer packages, and if there is no FuelPHP autoloader in there (which of course generic packages won't) then FuelPHP will just crack on and find the files, instead of being told where they are. Minor speed loss for full support of generic packages sounds reasonable to me!

Hopefully Laravel, Lithium and anyone developing a PHP 5.3 framework will see the light. Don't build out a new system, don't silo your users, don't waste time building code that already exists and for god's sake stop building un-frameworks.

### What Can You Do?

Got a good PHP class? Is it only on GitHub, or maybe it's just sitting around on your blog? 

**Stop that. Stop that right now.** Make it into a Composer package and host it on Packagist. While you're at it add [unit testing](http://www.youtube.com/watch?v=Iq6wvboGU-A&noredirect=1), set up [Travis](http://travis-ci.org/) with a GitHub service hook and show off how stable it is.

This all makes it easier for anyone use your code, so anyone can contribute to it. The more we reuse the same packages, the more pull requests we can expect to see on that same code, which makes it more portable, more extensive, reduces bugs and means we can all spend a little more time working on that side-project that will eventually pay for us to get out of this coding lark, marry a fashion model and move to our private island for an early retirement.

Only half of that plan is far fetched, the other half you can do right now.

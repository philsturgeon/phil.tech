---
layout: post
author: [Phil]
title: 5 Things CodeIgniter Cannot Do (without a rewrite)
tags: [codeigniter]
excerpt: CodeIgniter was build a long time ago and since its inception it has maintained
  the same API, without making sizable breaking changes through 3 major versions.
  Sadly, the API is at a point where it needs to be rewritten to support several fundamental
  features, which most other frameworks support. This is a walk through those features
  with a little insight as to what why and how from an ex core contributor.
date: '2012-12-05 20:00:00'
comments: true
disqus_identifier: 5-things-codeigniter-cannot-do-without-a-rewrite
alias: blog/2012/12/5-things-codeigniter-cannot-do-without-a-rewrite/
alias_1: codeigniter/2012/12/05/5-things-codeigniter-cannot-do-without-a-rewrite/
---

Now that PHP 5.2 is gone from my life entirely I am a happy man. As I don't use PHP 5.2 anymore I no longer need a 5.2 framework, so I quit the CodeIgniter team and started focusing on my new job.

[Kapture](http://kaptu.re/) is all PHP 5.4, and [PyroCMS is moving to be PHP 5.3](https://www.pyrocms.com/blog/2012/11/foundations-for-our-future), so I can use anonymous functions, short ternary operators, namespaces, go fully PSR-2 and use Composer all the way. PHP 5.3 is a massive change from PHP 5.2 as of course it was meant to be PHP 6, so while it might SEEM like a small update it's really not. It opens up doors to whole new possibilities, a newer more mature style of programming and sucks SO MUCH LESS than earlier versions of PHP.

Most of the features added to PHP before this have not fundamentally changed the way a framework should look. This served CodeIgniter well and it has managed to maintain the same API for as long as I can remember. Since I started using v1.4.1 back in 2007 or whatever I can name the breaking changes:

* Validation was deprecated and replaced with an improved Form_validation library
* Constructors changed to use `__construct()` instead of PHP 4-style constructors
* Plugins were deleted
* extends Controller became extends CI_Controller
* Instead of returning FALSE for unknown data it will now return `NULL` (like PHP does itself)

Other than that, nothing has happened to break existing applications even though we managed to add a whole bunch of features. So what features are missing from CodeIgniter that pretty much every other framework either currently has, or is working on adding?

### 1. Autoloading

As features started popping in to PHP 5.1, 5.2 a rewrite was suggested by hundreds of users. The folks that wanted more static and more autoloading tried pushing it, but EllisLab put their foot down, which lead to those users rage-quitting and built Kohana, which autoloaded static classes like they were going out of fashion.

CodeIgniter instead has a feature called "Autoload", which most other frameworks refer to as "Always-load" or "Eager-load". Basically it's an array of stuff to include - that's it.

Multiple times I looked into how I could work autoloading into CodeIgniter properly, but never came up with anything feasible. The main reason here is that there is no indicator to what you are actually trying to load, so when you try "new Foo;" it could be a library, a model, some random third-party code you found on a blog, a Zend class you've bundled in, anything.

CodeIgniter would need to do a series of file_exists() checks throughout to try and guess, then once the class is found we could generate a class-map cache (like Kohana). That not only seems like a slightly crazy solution, but would almost certainly confuse the large number of beginners in the CodeIgniter community that would not understand why their changes were not reflected instantly.

One solution is to use suffixes or prefixes on the classes (like FuelPHP) as Model_Foo is clearly a model, so that cut's things down a bit, but every time I proposed it on the forums half of the people involved were screaming that they hated it, and the rest were arguing over suffix or prefix, so I gave up trying.

The ideal solution would be to include the composer autoloader, but that won't happen because the community in general has always been extremely against command-line utilities being used.

### 2. Namespaces

CodeIgniter does not use namespaces at all. The requirement for namespaces can be somewhat avoided if you prefix or suffix classes, but that is just a workaround and not a solution. Really a namespace should be applied to all of the code in the core, then each "Spark" or package should have it's own namespace.

This drastically improves autoloading as you give the autoload class a pointer as to where it should be looking for this code, instead of how packages currently work: foreach through EVERYTHING until it finds one that matches. If two packages contain a "Curl" library then it's going to load the first one it finds. The second will never be loaded thanks to the "singleton" approach, meaning if package B requires functionality in a different version of "Curl" then it's going to break.

The other issue is one that can be seen in PyroCMS. Add-on developers can't create a module called "events". It would need a controller called "Events", but there is a class called "Events" which is a library. This is extremely frustrating and could be solved with prefix or suffix support. I would have loved to work that in, but of course namespaces are PHP 5.3 only.

### 3. Database Schema Abstraction

So this kinda happened in 2.0 and actually worked by 2.1. When I say it worked, I mean if you were using PDO for MySQL you could SELECT, INSERT, UPDATE, DELETE perfectly, but DBForge does not work at all - and still doesn't in the 3.0 branch.

Andrey Andreev did a great job here and created "PDO Sub-drivers" which mostly worked. He had a damn good try and getting everything working and as far as I know it's the last feature the team is working on before 3.0 is released, but really the DBForge system is modeled much too closely around MySQL for this to ever really work.

Do you know how you create a full-text searchable field in SQLite3 using DBForge? You can't.

This almost by itself is why I have spent the last little while transitioning PyroCMS' installer over the the Laravel 4 database component, because it is capable of installing PyroCMS on MySQL, PostgreSQL and SQLite - which will be a feature in PyroCMS 2.3.

### 4. Unit-Testing

Until [3.0-dev](https://github.com/EllisLab/CodeIgniter/tree/develop/tests) CodeIgniter never had any unit-tests on the core. They were added by some heroic work by [Greg Aker](http://www.gregaker.net/) (ex-Reactor team member), Pascal Kriete (EllisLab employee) and multiple contributors. I use the word heroic, because getting CodeIgniter unit-tested was a MISSION and a half.

The core is getting fairly well covered (when I left a few months ago it was 40-50% somewhere) but there is going to be a lot of CodeIgniter that you just can't test - especially your applications.

To draw yet another comparison to Laravel 4, you can [unit-test](http://vimeo.com/53029232) your applications perfectly.

### 5. Good Migrations

I wrote Migrations for CodeIgniter, so I am not offending anyone by saying they suck.

Why did I write shitty migrations for CodeIgniter? Because it was the best that could be done without a command-line helper much like Oil for FuelPHP or Artisan for Laravel. Really migrations should be generated with simple arguments, use a timestamp instead of a generic number and run with some command like "php ci migrate", but instead you need to implement $this->migration->current() in a hook or some crap to make it run on page load.

I'm sorry.

## So break the API!

Every project has to walk the line between "Never Change Anything" and "Fuck You Start Again". We've seen these changes rip communities apart at one end of the spectrum, and let others rot and fade away. While I am over the moon that CodeIgniter has not rewritten itself a million times (that would really screw with PyroCMS), there needs to be some sort of middle ground and that just isn't happening.

It's not that development just isn'y happening, because it is. CodeIgniter has had more bug fixes, tweaks, improvements and new features than any other version in history.

![Number of commits in each version of CodeIgniter so far](img/2012-12-05-5-things-codeigniter-cannot-do-without-a-rewrite/commits-in-codeigniter.jpg)

The issue here, is that if it's going to move to PHP 5.3 there are only three logical outcomes.

### A) Major Changes

To take advantage of the missing features I've mentioned (especially the ones that PHP 5.3 brings) and removing ALL of that old PHP 4 "tech debt" would essentially make it a new framework, and need serious effort to migrate an application.

### B) Trivial Changes

The API will stay pretty much the same, but some new PHP 5.3 syntax will be used in the core like short ternary operators. If that happens then there would be little point updating the framework version requirement in the first place, and people will complain that the new features were not enough to warrent them having to change their code at all.

### C) Change Nothing

CodeIgniter keeps on as it has been and flagrantly ignores new PHP 5.3 features, ignores PSR-0, ignores Composer and ignores all the new stuff out there in PHP.

## It's not "A"

I say this for a few reasons. Firstly, who would do it? Right now Andrey and Alex Bilbie are doing an amazing job of keeping on top of issues but they are not paid to do this, they do it because they use CodeIgniter and want to make sure it stays working - the same reason I asked to be on the team.

There are other Reactor engineers, but as their friend I know what they're up to these days - and it's not CodeIgniter.

The logical question to ask next is why don't EllisLab do it? They've not rewritten it in the last 6 years, why would they start now? All of the CodeIgniter developers in EllisLab that I knew from the old days have quit the company, so who is there to do it? Derek Jones is the new CEO so he's going to be busy running the whole company, not writing a PHP framework.

## Fork CodeIgniter?

That's happened three times already. Kohana and FuelPHP were both created for this reason, Kohana aiming at PHP 5.2 and FuelPHP utilizing PHP 5.3 and namespaces. Laravel 3 was also based _heavily_ on CodeIgniter, Kohana and FuelPHP - so they've already done the hard work, built a community, built a website, set up the Twitter account, trademarked a name, organized the conference - I don't see how another fork is going to help anything.

## Is CodeIgniter Dead?

**Absolutely not;** and nobody is in a position to suggest that it is (looking at you Shawn McCool). CodeIgniter is simply never going to change, and maybe that is ok.

Thousands of companies of all sizes are using CodeIgniter so whatever happens the framework is always going to be around, but it will be exactly the same as it is now for years to come, which means you aren't going to have to upgrade any legacy apps any time soon. Yay!

I wrote this because people have been asking why I've ditched CodeIgniter for PyroCMS, and started moving it to Laravel 4 instead. I'm sure people will think I'm just wildly slagging CodeIgniter off, but I think its possible to respectfully highlight a products shortcomings without there being any hatred or resentment.

The main reason - and I will repeat this over and over again until everybody is tired of hearing it - is that PHP is going through a massive change. Composer, PSR's, the PHP-FIG, Travis-CI making unit-testing suddenly become cool, etc ALL mean that there is a whole new world being built out there. New PSR components doing amazing things, and making things like my CodeIgniter Curl library look like an absolute piece of shit. New times call for new tools, so use something new.

Laravel 4 has become the "go-to" framework for me because it's built exactly how I would have wanted to see FuelPHP 2.0 built. Components of Laravel can be used in any framework and the framework itself is extremely skinny and unassuming. It's all PHP 5.3, namespaced, PSR-1 compliant, and feels extremely familiar if you've ever built anything with CodeIgniter, Kohana, FuelPHP or even Sinatra.

Something that makes Laravel stand out from the crowd is that it swallows it's pride to leverage any existing tool that does the job instead of bullishly reinventing the wheel for the sake of it. Monolog, Symfony Console, Doctrine Common, etc are all used where needed to perform the tasks they were built for.

## Make Your Own Decisions

Don't blindly go and switch everything to a new framework just because some guy said so on a blog, that would be ridiculous. If PHP 5.2 support is your thing then stay where you are. If you like CodeIgniter and it does everything you need then _awesome_, carry on.

If like me you've hit the limit on what CodeIgniter will actually let you do, or you just feel bored and want to try something new, then absolutely check [Laravel 4](https://github.com/illuminate) out.

That is the GitHub repo for all of the composer components, take a look at /app and run composer install to get started.

Whatever you do, if your framework does not support Composer then fuck that noise. Use Composer to install your packages, and if you are trying to use something that does not have a composer.json then shout at the until they do - or send in a pull request.

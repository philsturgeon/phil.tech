---
layout: post
author: [Phil]
title: Send PSR-0 to the Standards Farm in the Sky
tags: [psr0, php, php-fig]
excerpt: This article attempts to convince you that deprecating the PSR-0 auto-loading
  standard in favor of the PSR-4 auto-loading standard is not only a good idea, but
  a problemless wonderland of happy benefits, in the hope that when I try to get this
  done on the FIG mailing list, people will be happy about it instead of sad or rage-mode.
date: '2014-07-19 16:21:00'
# alias: blog/2014/07/send-psr0-to-the-standards-farm-in-the-sky/
# comments: true
# disqus_identifier: send-psr0-to-the-standards-farm-in-the-sky
---

This article attempts to convince you that deprecating the PSR-0 auto-loading standard in favor of the PSR-4 auto-loading standard is not only a good idea, but a problem-less wonderland of happy benefits, in the hope that when I try to get this done on the FIG mailing list, people will be happy about it instead of sad or rage-mode.

In December 2013, the PHP-FIG voted PSR-4 into place, which Paul Jones and a few others always billed as an "alternative" to PSR-0. I believe it was talked about as an alternative at the time because we _knew_ that the PHP community would drop their collective bricks if we tried to pull PSR-0 out from under them, right as they were just slowly getting used to using it. It was always going to be bumped off at some point - in my head, but left to co-exist with PSR-0 for a while to ease the transition.

In February 2014, the PHP-FIG [approved](https://groups.google.com/forum/#!searchin/php-fig/amendment$20bylaw/php-fig/4ivPkEZZlPo/lZXwusvNdoYJ) the [Amendments Bylaw](https://github.com/php-fig/fig-standards/blob/master/bylaws/006-psr-amendments.md), which was pushed by me for two reasons:

1. PSR-1 had a hard dependency on PSR-0, and I wanted PSR-4 [to be able to play](https://www.youtube.com/watch?v=hd9t6jgGcYE) too. They're basically compatible. 
2. I knew that at some point, I would want to put a bolt through PSR-0.

## "Why the hate for PSR-0?"

I am actually very impressed with PSR-0 in general. Thanks to Composer, in the last two years PSR-0 adoption has gone through the roof, and it has revolutionized auto-loading in the PHP community. As of some time a few months ago (when I pestered Jordi for some obscure but apparently very important statistics for my O-1 US visa), of the 20,097 packages hosted on Composer, 15,668 of them use PSR-0.

That is nuts. 

**75% of the PHP community agreed on something.**

Literally never happened.

## "So why deprecate a great standard?"

Well imaginary interviewer who has been constructed purely as a narrative device, PSR-0 might have done some great things but with the power of hindsight, various people have come to realize that PSR-0 is not all unicorn farts and rainbow kisses. 

PSR-0 was made back in 2009 when the group was smaller, less experienced (it was their first standard), and it had some troubles that only came to light at a later date. 

Anthony Ferrara [listed a bunch of troubles](http://blog.ircmaxell.com/2011/11/on-psr-0-being-included-in-phps-core.html). He was mostly talking about why it should not be included in the core of PHP, and - as a quick side-note - I agree with that part entirely. If PSR-0 is ever deprecated at some point then having it baked into PHP means it will be stuck with us for about 15 years. No ta.

Other than the "why it shouldn't be in the core" arguments, he listed some inconsistencies:

> If a file doesn't exist, PSR-0 doesn't play nice with other auto-loaders. It will try to require the file, but then the require will fail and fatal error out. This is a problem since a later autoloader may know how to load it. So it's not following the normal convention of "if you can't load it, don't error out".

That is only the "sample implementation" which the PHP-FIG consider to be only an example, not a canonical piece of code, but yeah he is right, PSR-0 looks pretty broken in that example.

PSR-4 fixed that.

> With PSR-0, multiple classes actually map to the same file. For example, all of the following map to the same file (Foo/Bar/Baz.php): 
>
>  - \Foo\Bar\Baz
>  - \Foo\Bar_Baz
>  - \Foo_Bar_Baz

Absolutely, that is a mess. I explained this in the [PSR-0 Naming Oddity](https://github.com/philsturgeon/psr0-naming-oddity). This has only once caused me a problem in development and never any sort of issue in production, but it is a WTF that should be taken care of.

PSR-4 fixed that.

## "Ok I get that PSR-4 is awesome, but we still need PSR-0!"

Absolutely, PSR-0 will not be going anywhere. I asked for feedback about deprecating PSR-0 and got a lot of responses I wasn't expecting, like this one:

<blockquote class="twitter-tweet" lang="en"><p><a href="https://twitter.com/philsturgeon">@philsturgeon</a> <a href="https://twitter.com/benmarks">@benmarks</a> deprecating it would mean to set every framework lib and app to be depricates who still uses it</p>&mdash; Daniel Fahlke (@Flyingmana) <a href="https://twitter.com/Flyingmana/statuses/490474082262339584">July 19, 2014</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

That is simply not true. Deprecating the standard has no effect on existing projects. It would have no effect on the usage of Composer, Packagist, existing code, Travis or GitHub any more than it would mess with the migratory patterns of dolphins in mating season. Deprecating PSR-0 does literally nothing, other than let people know at some point they should probably consider upgrading their packages to use PSR-4 instead. 

They can also just ignore the deprecation message forever.

The FIG wont be sending out heavies to break kneecaps if people are still on PSR-0 in a year.

I think some people have a slight misunderstanding of the word "deprecation." Maybe I do, but it seems like [Wikipedia agrees](https://en.wikipedia.org/wiki/Deprecation) with my understanding. The first bit:

> Deprecation is an attribute applied to a computer software feature, characteristic, or practice to indicate that it should be avoided (often because it is being superseded). Beyond describing software, the term is also used for a feature, design, or practice that is permitted but no longer recommended in other areas, such as hardware design or compliance to building codes.

Yep, that is about right. We have effectively superseded it with PSR-4. The next bit says:

> While a deprecated software feature remains in the software, it is use may raise warning messages recommending alternative practices; deprecated status may also indicate that feature will be removed in the future.

Notice that it says "may also indicate that feature will be removed." The "removal" bit is optional, and that optional step is something that the [Amendment Bylaw](https://github.com/php-fig/fig-standards/blob/master/bylaws/006-psr-amendments.md) does not allow at all. The FIG does not remove, delete, invalidate or expire in any way a standard once it is accepted.

So again, put simply, PSR-0 is not going anywhere. It **can't** go anywhere, and auto-loaders like Composer will still support it.

Deprecation in this instance is just the FIG saying "Hey buddy, there is a new thing over there you should probably use instead."

## "What about PHPUnit and Twig?!"

In previous conversations about PSR-4 or potential PSR-0 deprecation, Twig and PHPUnit have been used as examples of large projects that could not easily switch to PSR-4 because they use "poor-mans namespaces" (underscores with special meaning instead of actual namespaces). Somehow, people have the idea that deprecating PSR-0 would somehow either a) shame these projects and make them feel bad, or b) force them to bump their PHP version requirement to PHP 5.3 to use namespaces.

Well, since those conversations, PHPUnit has bumped the [minimum dependencies](https://github.com/sebastianbergmann/phpunit/blob/a29e4505867735f4f4457cfc6a6386f96dda6eef/composer.json#L25) to PHP >=5.3.3. Comically PHPUnit does not even use PSR-0, so the deprecation of PSR-0 does not effect them either.

I asked Fabien Potencier if he would consider switching Twig to PSR-4, and he is now asking [if Twig v2.0 should drop 5.2 support](https://twitter.com/fabpot/status/490475547412406273). Many people are saying yes.

<blockquote class="twitter-tweet" data-conversation="none" lang="en"><p><a href="https://twitter.com/fabpot">@fabpot</a> Do it. Kill 5.2 with fire.</p>&mdash; David McKay (@rawkode) <a href="https://twitter.com/rawkode/statuses/490481522433331200">July 19, 2014</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

## "What about us poor PHP 5.2 users?"

There are plenty of people stuck on PHP 5.2, and judging by recent tweets I've seen that number is as high as about 5, maybe even 6.

Old legacy systems have old legacy code, and they have Composered in some PHP 5.2-only PSR-0 code. They don't want their dependencies to suddenly switch to PHP 5.3 and force them to upgrade their systems, leading them down a path of pain and suffering. I understand everyone, really, but this is what [SemVer](http://semver.org/) is for.

<blockquote class="twitter-tweet" lang="en"><p><a href="https://twitter.com/fabpot">@fabpot</a> there&#39;ll still be 1.x branch, which is great software for 5.2. Up req for V2 and see if PHP&#39;s newer features allow for new ideas.</p>&mdash; Jelmer Schreuder (@jelmer_php) <a href="https://twitter.com/jelmer_php/statuses/490496818879660032">July 19, 2014</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

If you are releasing packages, a framework, a CMS, etc then tag a new major version which drops support for PHP 5.2 and switch to some namespaces. PyroCMS did this for the last version, and our community seems happy.

Keep a branch around for 5.2 and do some patches now and then, but use this 5.3 jump as a chance to go and clean up your package. Maybe see if you can use closures to make some of your API a little nicer, and take advantage of all the other PHP 5.3 packages out there to offload some of your code onto hard-baked dependencies.

Have fun with it. Major versions are a time for change and prosperity, but you can't just support PHP 5.2 forever because "legacy systems require it."

<blockquote class="twitter-tweet" data-conversation="none" lang="en"><p><a href="https://twitter.com/philsturgeon">@philsturgeon</a> The only reason Major versions exist, is to allow for BC.</p>&mdash; Zack Kitzmiller (@zackkitzmiller) <a href="https://twitter.com/zackkitzmiller/statuses/490185999226765312">July 18, 2014</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

In my experience, most of these old legacy systems are barely worked on, and when they are it is only minor updates. Minor updates do not require using the very latest major version of a package, so they can stick to the PHP 5.2 version until that legacy app gets ditched, at which point they can use PHP 5.3, 5.4, 5.5 or 5.6, but PHP 5.2 can piss right off. 

## "But upgrading is haaaaaard!"

If you have code that you are trying to upgrade from PSR-0 to PSR-4 and you already use namespaces (the vast majority of you) then upgrading your code could take you as little as 10 seconds.

I explained this with more detail in [PHP-FIG: Autoloaders, Amendments and The "15th Standard"](/blog/2014/02/phpfig-autoloaders-amendments-and-the-15th-standard), but basically you have two options:

1. Keep the folder structure identical as it was in PSR-0.
2. Simplify the folder structure by removing the namespace prefix. 

Some people don't like that second option, so... don't use it. If you want to keep the PSR-0 style folder structure but use PSR-4 then you can keep doing that, again: **Forever**.

Upgrading is either: 

* Insanely easy
* Relatively easy
* Fairly easy

You can pick your own path, but none of them are hard, even if you have to switch `_` to `\` and add some `use` statements to your code. If you are trying to upgrade an entire application and that seems hard then yeah, it might be, so don't do it. Make your next application PSR-4 because why the shit aren't you using namespaces already.

_Somebody could also almost certainly produce a "poor-man namespace" to "actual namespace" converter, much along the lines of Nikita Popov's [varVar script](https://gist.github.com/nikic/ffd019ef78b72934c7cc), used to detect variable variable usages of stuff that might break in his [Uniform Variable Syntax RFC](https://wiki.php.net/rfc/uniform_variable_syntax). That would be awesome. If you do this, please get in touch._

## "Ok I get it, we should deprecate, but why the rush?"

I would like to have PSR-0 deprecated at some point. It does not _have to be_ right now, but I don't understand any benefit of waiting. There will always be poor souls stuck using 5.2, there will always be people using PSR-0 who don't want to change, but we need to clean up any confusion for new users coming into the world of PHP and wondering why the hell we have two autoloaders.

If deprecation simply directs users from one PSR to the other and has zero effect on anyone actually using it, then the negatives are literally nothing and the benefits are a slight shunt in the right direction for getting a version of packages onto PHP 5.3 and improved clarity for beginners.

**There is no perfect time to deprecate PSR-0, so let's just do it now.**

## Next Step

If you want to upgrade your own code, take a look at the [Composer autoloading documentation](https://getcomposer.org/doc/04-schema.md#autoload).

I wanted to get this discussion started in public before voting on the FIG mailing list to see how people feel about the situation. If the vast majority of people are freaking out then I can wait a while to deprecate, but I really cannot see the point of doing that.

The tl;dr here is that I am going to make a PR shortly with this being added to the top of the PSR-0 standard, and when I do that it would be great to have some support.

> Deprecated - As of 2014-12-30 PSR-0 has been marked as deprecated. [PSR-4](https://github.com/php-fig/fig-standards/blob/master/accepted/PSR-4-autoloader.md) is now recommended as an alternative.

Answer in the comments with a +1, or tell me why my arguments have not swayed you.

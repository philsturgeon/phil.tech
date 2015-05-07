---
layout: post
title: "A Quick Note on PSR Numbering"
date: '2015-05-05 18:04:00 +0500'
category: php
tags: php phpfig psr7
comments: true
excerpt: "The last PSR from the FIG to be sent out into the world, to be used by whoever felt like using it, was PSR-4: Autoloader. Now people are starting
to hear about PSR-7, and they're starting to lolphp, wondering what has happened to PSR-5 and PSR-6."
---

The last PSR from the FIG to be sent out into the world, to be used by whoever felt like using it, was [PSR-4: Autoloader]. Now people are starting
to hear about PSR-7, and they're starting to "lolphp", wondering what has happened to PSR-5 and PSR-6. I am no longer part of the FIG after PyroCMS
was acquired and the voting seat was swapped to the new owner, but I do have a few things to say on PSR numbering still.

This is not like [The Neverending Muppet Debate of PHP 6 v PHP 7], despite it being the first thought to pop into many peoples heads. Instead, this
is down to the [Workflow Bylaw] I put into place last year.

PSR generation in the FIG used to work like this:

* **Squabble:** Fuck knows just keep changing stuff
* **Accepted:** Oh you were on holiday? Well... it's done now, and it's just `$new_id = end($psrs)->id + 1`

Now, with the new workflow, it looks more like this:

* **Pre-Draft:** Random markdown on the Internet and nobody cares
* **Draft:** The FIG will definitely get to work on this and see what happens. Lets give it a number now
* **Review:** Time to check it out Internet, it _should not_ change too much now without going back to Draft
* **Accepted:** Done, it passed the vote! Whatever number it was, it still is

Other than the few extra stages, the main difference is that something doesn't have to be completely finished before it gets a number.

At first, that might seem a little complicated, but it is exactly how [PEPs](https://www.python.org/dev/peps/) are done in Python. Just like Python,
PSRs have an index [in Git](https://github.com/php-fig/fig-standards/blob/master/index.md), which is also displayed [on the website] for users to see.

Python do it, great, but _why_ does this help?

Initially the FIG was only working on one PSR at a time. Sure, PSR-1 and PSR-2 landed at the same time, but that was only because PSR-2 was
split off from PSR-1 to make PSR-1 a bit less controversial. They were not meant to be two different things at inception.

### Nicknames are weird

After PSR-3, and before anything else was being worked on, people referred to what is now PSR-4 as PSR-X or PSR-next. This was only meant
to be a nickname and ended up sticking as a thing. Then people started saying things like PSR-C or PSR-Cache, and PSR-R was some
alternative to PSR-X, and it got fucking mental. Bloggers and people on twitter thought those names were legit what was going to be used,
and all hell broke loose when they found out it wasn't PSR-X anymore.

### PSR Concurrency

Now, with people working on caching, HTTP messaging, phpdoc, etc., there is even more room for confusion. We can't even
shorten HTTP messaging because there have been discussions of a HTTP client in the past, so giving these all a single, stable number
which can be used regardless of its status just made sense.

We could potentially have a "draft number" and an "accepted number" but what is the point? Who cares? All we needed was an index to keep
track of what is what, avoid multiple conversations confusing which PSR is being talked about, and keep that number the same when and if
things are done.

### But 0, 1, 2, 3, 4...7?!!?

So what? PSRs are not software, they are not SemVer, and they are not important. They are an arbitrary assignment which could have been
A, B, C or Roman Numerals.

If people keep complaining about interruptions in the accepted auto-increment I'd be tempted to suggest switching the version numbers to sha1
hashes of the content like Git commits.

The identifier does not matter.

### But what if PSR-5 never comes out?!

Then PSR-5 will remain in Draft or whatever status it is in until somebody decides to have another go.

Even if PSR-1023482 just came out in the year 2050, PSR-5 could happily make its way to the stage. There is no semantic meaning to the order of these
numbers, even though a lot of people inferred meaning from 0, 1, 2 being so closely related.

We have near unlimited integers to use for these things, so worrying about 5 being a missed opportunity is just not a valid concern, especially when it could come back later.

PSR-8 is a dead number. It is assigned to the silly April Fools joke from 2014: [Huggable Interface]. PSR-8 will never be anything else. It will never be useful.
It will _hopefully_ never be accepted.

### Fingers crossed for PSR-7

I am very impressed with the work and dedication to this PSR. It's had a few people come and go during the process for various reasons, but an
[Acceptance Vote] is underway and it is looking good.

Learn more about PSR-7 [from MWOP's blog](http://mwop.net/blog/2015-01-08-on-http-middleware-and-psr-7.html), or from [MWOP's interview on
PHP Town Hall](http://phptownhall.com/blog/2015/02/02/episode-36-psr-7-the-world-of-tomorrow/).

[PSR-4: Autoloader]: http://www.php-fig.org/psr/psr-4/
[Huggable Interface]: https://github.com/php-fig/fig-standards/blob/master/proposed/psr-8-hug/psr-8-hug.md
[on the website]: http://www.php-fig.org/psr/
[put into place last year]: /blog/2013/08/progress-in-the-phpfig/
[The Neverending Muppet Debate of PHP 6 v PHP 7]: /php/2014/07/23/neverending-muppet-debate-of-php-6-v-php-7/
[Workflow Bylaw]: https://github.com/php-fig/fig-standards/blob/master/bylaws/004-psr-workflow.md
[Acceptance Vote]: https://groups.google.com/forum/#!topic/php-fig/0baLqR6Rvcg

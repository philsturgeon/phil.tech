---
layout: post
title: 'PHP-FIG: Autoloaders, Amendments and The &quot;15th Standard&quot;'
category: php
permalink: blog/2014/02/phpfig-autoloaders-amendments-and-the-15th-standard
excerpt: Recently I've been putting in lots of time for bits around the PHP-FIG, and
  I wanted to highlight what they were, what they are and what I personally think
  needs to happen in the near future to make things better.
date: '2014-02-13 19:53:00'
comments: 'true'
disqus_identifier: phpfig-autoloaders-amendments-and-the-15th-standard
---

I've managed to get myself involved in a lot of projects in and around the PHP community because I like to offer my advice, experience and time to trying to make things better. Recently, I've been putting in _lots_ of time for bits around the PHP-FIG.

Like it or not, tabs or spaces, PSR-2 or no, the PHP-FIG has had a huge impact on the PHP community and it's going to continue to do so. We have more PSR's in the works now that at any point before, and they're awesome ones. 

## PSR-5: PHPDoc

In Draft status and being worked on hard, most actively on GitHub. My guess? 6 months... probably.

## PSR-6: Cache

Two years in the making? Ha. Well, we never used to have a workflow, so I spent a few months creating, editing, convincing and pushing through a [workflow bylaw] for that. The workflow stops multiple alternative proposals from being supported by different members and having this crazy duel between two totally disparate files. That was nuts! 

This workflow should get PSR-6 moving along, and I've suggested to the chap in charge that now would be a great time to bump it up to "Review". getting it one step closer to completion and forcing updates to be small. There's nothing big left on the todo list, so that seems like a decent plan.

## PSR-7: HTTP Message

[This one](https://github.com/php-fig/fig-standards/pull/244) is mainly being worked on by [Michael Dowling](https://twitter.com/mtdowling), from AWS and Guzzle fame, but has my name on the bill as a coordinator much like PSR-4 and PSR-5. This one is very fresh and still in Draft stage, but will start picking up steam once the rest of the FIG take a look and offer feedback. I'll be pushing that if it doesn't happen fairly soon.

You can see a full index of PSR's along with their statuses [here](https://github.com/php-fig/fig-standards/wiki/PHP-Standard-Recommendations).

So, progress is happening but I feel like we still have some problems at the FIG, and I would like to solve these issues. 

_The following is almost entirely just my opinion, so others in the FIG do not necessarily agree. If we all agreed about everything it wouldn't be very representative of the PHP community at large._

## Problem 1: PSR-0 AND PSR-4?

Some people have been calling the FIG a laughing stock because we have two active PSR's that achieve the same goal: autoloading.

This "You can use either one" approach was (in my head at least, as coordinator of this PSR) intended to provide a "grace period" for people to upgrade without making them freak out and think they had to rush.

PSR-0 and PSR-4 both do the exact same thing: they autoload code, and they do it in a 100% compatible way unless you're a PHP 5.2 project making use of legacy "poor mans namespaces", which was an old convention where _ would be converted to folder separator. Zend, Symfony, PEAR all did this for their code and a lot of projects like PHPUnit and Twig currently require that, and PHP 5.2. Those projects are big, and sometime they should upgrade, but that is what deprecation means: put it on your todo list.

I've seen some people piss and moan about PSR-4 and it's namespace prefix support. For those of you unfamiliar with the feature, it means this:

> vendor/league/fractal/src/League/Fractal/Resource/Collection.php

... can be shortened to this:

> vendor/league/fractal/src/Resource/Collection.php

But let me be clear, that is an optional usage of PSR-4, and an optional feature in Composer too. If you would like to continue to be that verbose structure in your own code you're welcome to. 

To compare, this is how I achieved the shorter folder structure in the example above:

        "psr-4": {
            "League\\Fractal\\": "src",
            "League\\Fractal\\Tests\\": "tests"
        }
        
If you would like to continue using the more verbose folder structure known in PSR-0 then great, simply change the above to this:

        "psr-4": {
            "League\\Fractal\\": "src/League/Fractal",
            "League\\Fractal\\Tests\\": "tests/League/Fractal/Tests"
        }

Once again, PSR-0 folder structures are supported, and that example loads this identical path to the PSR-0 example:

> vendor/league/fractal/src/League/Fractal/Resource/Collection.php

That means PSR-4 is a completely compatible replacement for PSR-0, with the exception of dropping support for a long unsupported version of PHP, which helps us gladly ditch an [edge case bug], and provides a great optional feature to those who felt like it was frustrating as f**k to have to replicate their entire folder structure every time. Literally no downside there.

Paul Jones and myself agreed (I think) that once PSR-4 was approved then the two would be "alternatives" for a while, then we'd eventually deprecate one. Deprecating PSR-0 now (or soon) sends a message, that PSR-4 is the preferred successor, and you should work on getting onto it at some point. You can still use a "deprecated" PSR, and no PSR will ever be "deleted" (maybe it could be "unrecommended"), but we should definitely deprecate it as we do not need both to be considered "recommended".

If you're using PHP 5.2 forever, then you can keep on using PSR-0 forever, but The PHP Group suggests you should upgrade to PHP 5.4 and the FIG suggests you upgrade to PSR-4. That's fine. You can ignore both of us forever.

I'm going to try and get PSR-0 deprecated, but first I have to complete a sub-quest...

## Problem 2: Amendments

We have a situation where PSR-1 depended on PSR-0, and if PSR-0 is ever deprecated or not, anyone who switched from PSR-0 to PSR-4 is suddently technically in violation of PSR-1.

> - Namespaces and classes MUST follow [PSR-0].

Well, that should say:

> - Namespaces and classes MUST follow [PSR-0] or [PSR-4].

Right? WRONG. I'm not going to complain about that again because I did it in a video already.

<iframe width="560" height="315" src="//www.youtube.com/embed/hd9t6jgGcYE" frameborder="0" allowfullscreen></iframe>

People were super against our potential future selves saying "Look, they edited this file once, so now we can change things willy nilly!".

Erf. So to avoid that I've come up with an [amendment bylaw] which states that you can't make changes _except_ some reasonable conditions. Here is a real short summary:

### Deprecation and Replacement

Shove a link at the top of the old one saying: you should use this newer one instead, if you can.

### Dependencies

PLEASE try and avoid them, but if you have to then put them in a "dependency list" which can always have new items pushed onto the stack but never have any removed. This is dependency injection for markdown. BOOM.

### Annotations

If something needs to be clarified with errata, we can shove a link into the original document to link to the errata line in the meta document, otherwise people have literally no idea it exists.

### Formatting & Typos

Our table syntax on GitHub is broken, or some fucking Englishman snuck a British spelling past the group? Or straight up spelled something wrong? Fix that.


The full [Pull Request](https://github.com/php-fig/fig-standards/pull/247/files) is here. 

I'm probably going to put this to a vote for the rest of the group over the weekend, but as people who potentially use these standards, do you love or hate the idea of new standards coming out, old ones being deprecated and new ones being recommended? I know that it might seem like a lot of fuss as PSR-0 and PSR-4 is the first replacement, it's not the only time its going to happen, because...


## Problem 3: PSR-2 needs to be replaced

I'm into that idea, and Pádraic Brady (ZF's FIG rep) [is not against the idea](http://blog.astrumfutura.com/2014/02/coding-standards-humans-are-not-computers/) if you have a look in the comments.

PSR-2 was never intended to be a 100% complete style guide. It was essentially split off of PSR-1 (considered for a while to be named PSR-1 Basic and PSR-1 Advanced) because some of the rules were considered so contentious that they would effect uptake of PSR-1 itself. So, we have this extra PSR-2 code style guide that huge projects like Laravel flagrantly ignore and which SF2 and ZF2 say they use but technically violate a few things in every file.

What we need is... 

![14 standards...](http://www.explainxkcd.com/wiki/images/6/60/standards.png)

So replacing PSR-2 with PSR-Whatever would definitely get us up to 15 standards, but if we have a deprecation and replacement process set up then we're back down to 14... so it's not all that insane.

If we take the extensive guides from Drupal, Symfony, etc into account and can make something that is truly a logical merge of them, then we can potentially cut things down from 14 to maybe about 5. With PSR-1 and PSR-2 helping to bring a LOT of projects closer to the same style we're definitely making improvements to the situation, but we have a long way to go. 

How would you feel about a more involved PSR for code style based off of PSR-2 but drastically improved? 

It would almost definitely still involve spaces instead of tabs so don't freak out over that one, but it would take care of all the weird edge cases that have come up during the lifespan of PSR-2, like [this](https://github.com/php-fig/fig-standards/blob/master/accepted/PSR-2-coding-style-guide-meta.md#31---multi-line-arguments-09082013) or [this](https://github.com/php-fig/fig-standards/blob/master/accepted/PSR-2-coding-style-guide-meta.md#32---multi-line-arguments-10172013) or [any of these](https://github.com/php-fig/fig-standards/wiki/Further-Style-Guide-Considerations). That last link is a list of "further style guide considerations" of questions, irregularities or omissions that have been raised over the last few years, and would make for a good start for this. 

The whole time I'm keeping an eye on Python's PEP system and the IETF rules for doing this. We cannot outright copy their processes, but they are definitely influencing the bylaws.

### Summary

I feel like the FIG is a great project/organisation/group with a lot of smart people working on/in it. I got the chance to meet many more FIG reps at [SunshinePHP](http://2014.sunshinephp.com), meaning I've met about half of the group now and it's a great crowd.

While I consider the rest of them to be smart as hell, we do have an issue where this thing has kinda grown in a really ad-hoc way, been more successful than probably anyone expected and now we're dealing with the artifacts of that growth and early naivety.

* Dependencies are a bad idea
* No "Review" phases existed, where projects could implement standards before use
* PSR-2 was not implemented by anyone before it was approved, and hardly even still
* Nobody ever discussed how to deprecate/replace a standard

I'm trying to help solve these issues, better the workflows and processes and help people learn from the mistakes, while the entire time taking flack from a lot of the community who just want to troll the FIG for not being perfect. To those people I feel like saying: do better, or go home. I'm doing what I can to make the situation better, and I'd be really grateful to hear feedback from the rest of the community about how to make the situation better. 

Agree, disagree, have alternative ideas, etc, all great. Just keep it positive.

[workflow bylaw]: https://github.com/php-fig/fig-standards/blob/master/bylaws/004-psr-workflow.md
[edge case bug]: https://github.com/philsturgeon/psr0-naming-oddity
[amendment bylaw]: https://groups.google.com/forum/#!topic/php-fig/1-cVtxoGDRU
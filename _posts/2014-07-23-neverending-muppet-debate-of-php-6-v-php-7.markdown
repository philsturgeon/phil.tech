---
layout: post
title: The Neverending Muppet Debate of PHP 6 v PHP 7
category: php
redirect_from: /blog/2014/07/neverending-muppet-debate-of-php-6-v-php-7/
excerpt: There are a few major, important conversations happening in the PHP internals
  mailing list as we speak... and then there is the discussion about calling the version
  that comes after PHP 5 either PHP 6 or PHP 7. Um?
date: '2014-07-23 15:24:00'
comments: true
disqus_identifier: neverending-muppet-debate-of-php-6-v-php-7
---

There are a few major, important conversations happening in the PHP internals mailing list as we speak:

* [The Facebook lot heading up a specification based off of PHP 5.6](http://grokbase.com/t/php/php-internals/147p423vvz/php-language-specification)
* Should [phpng](https://wiki.php.net/rfc/phpng) be [moved into master](http://grokbase.com/t/php/php-internals/147nyavwwv/rfc-move-phpng-to-master) to be the base of the next major PHP version
* How can we best go about [scalar typehinting](http://grokbase.com/t/php/php-internals/147dp561xm/rfc-scalar-type-hinting-with-casts-re-opening)

There is also another conversation:

* Should it be PHP 6 or PHP 7

Wait... what? 

## A little history

PHP 6 was [attempted back in about 2010](https://wiki.php.net/todo/php60) and it ended up getting stuck in the mud. One of the largest changes that caused the troubles was that they tried to tackle Unicode support in the core of the language, then - as I remember it - kinda ditched out due to being [unable to get the feature](http://www.slideshare.net/andreizm/the-good-the-bad-and-the-ugly-what-happened-to-unicode-and-php-6) exactly right. 

There is no doubt more to it than that, but the end result was that each feature slated for PHP 6 was back-ported into the 5.x branch, which is why we saw such a jump in awesome useful features for PHP 5.3. 

## The current argument

The question "Should we use PHP 6 as the name for the next version?" has been asked many times, but this time it is really taking off because the next major version of PHP is getting much closer. The timeframe of that is of course being discussed too, and bets currently range from 12 months to 3 years, but it is coming and it should probably have a name other than "PHP.next".

To try and answer once and for all whether it should be 6 or not, which seemed like a simple call. "Can we call it PHP 6" was the aim, but he was shouted down for not making a definitive "Make it PHP 6 or PHP 7" vote. 

After some back and forth, and some bickering, and some squabbling, and one side deleting part of the argument from the others section of the RFC, we have [a new vote on PHP 6 v PHP 7](https://wiki.php.net/rfc/php6).

## Arguments for PHP 7

Unfortunately, this whole conversation has been based around the mindset of: "If you cannot prove why PHP 6 is better than PHP 7, then we should use PHP 7."

I am totally down for letting whichever side piles up the most number of logical arguments to win, as that is pretty much how a discussion works. Sadly, it feels a little less like a discussion and more like a railroad of irrelevant arguments. One side has a lot of reasons, the other just has the one:

**5 + 1 = 6**

That is the strongest reason. Doing the logical thing should not be something that needs to be proved with 20 arguments from 20 different angles. But whatever, lets look at the pro-7 arguments in the RFC:

> First and foremost, PHP 6 already existed and it was something completely different. The decimal system (or more accurately the infinite supply of numbers we have) makes it easy for us to skip a version, with plenty more left for future versions to come.

The idea of PHP 6 actually existing ever is a weird one. I've worked in all sorts of open-source projects and often a release will be scheduled for one version, then end up being done differently. 

I've made a 3.0 branch before, then decided it didn't warrant a major release at this point.

I've made a 3.2 branch before, then decided that it actually needed to be a major after a few more additions came in. 

Things change.

The only releases that exist are those that are actually released.

> While it's true that the other PHP 6 never reached General Availability, it was still a very widely published and well-known project conducted by php.net that will share absolutely nothing with the version that is under discussion now. Anybody who knew what PHP 6 is (and there are many) will have a strong misconception in his or her mind as to the contents and features of this new upcoming version (essentially, that it's all about Unicode).

So, to my earlier point, "PHP 6 never reached General Availability." This mainly means that only "those in the know" really have any idea what PHP 6 is, and "those in the know" know enough to be fine with this lot having another crack at getting PHP 6 done.

> PHP 6, the original PHP 6, has been discussed in detail in many PHP conferences. It was taught to users as a done-deal, including detailed explanations about features and behavior (by php.net developers, not 'evil' book authors).

Oh the book argument. Kill me.

Some authors jumped the gun a little, and some publishers forced the authors to make the title PHP 6, because they wanted to be relevant for a long time. 

The book argument for years has been the strongest "pro-7" argument, but it is not something I find to be even slightly valid. Most of those books are low quality, and they're all years old and irrelevant. Shit books exist now, and will always exist, but the way we know a book is shit is down to reviews.

One review on there saying "This book is outdated and nothing to do with PHP 6" and that book is shot.

The conference argument is also not particularly relevant, as again "those in the know" know better.

> PHP 6 was widely known not only within the Internals community, but around the PHP community at large. It was a high profile project that many - if not most - PHP community members knew about.

I'd love to see a survey on this. My experience is that most developers have not got a clue that PHP 6 was ever even half a thing, and most drop a jaw when calling it PHP 7 is mentioned.

<blockquote class="twitter-tweet" lang="en"><p>“Unless you can’t prove why we shouldn’t do a stupid thing, we’re gonna do the stupid thing” <a href="https://t.co/R0bLgCISES">https://t.co/R0bLgCISES</a> Voted PHP 6.</p>&mdash; Phil Sturgeon (@philsturgeon) <a href="https://twitter.com/philsturgeon/statuses/491947247118991361">July 23, 2014</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

> There's lots of PHP 6 information, about the original PHP 6, that exists around the web. Books are the smallest part of the problem.

Lots of old, shit, useless information.

1. People know where to go to get their quality information, otherwise we'd all still be using mysql_connect() in our view files
2. Responsible tutorial writes redact, or add a bit of errata
3. In the world of a tech an article that is a few years old is hardly relevant anymore

> Unlike the 'trivia question' of 'why did we skip into 7?', reusing version 6 is likely to call real confusion in people's minds, with ample information on two completely different versions with entirely different feature sets that have the exact same name.

Ample is misleading. There are a few hits on Google about PHP 6 as a thing, but mostly its me and a few other people making of, or explaining, what did happen to 6. 

As soon as we release PHP 6, there will be a lot of us writing blogs, books and talks about PHP 6. I'll make it my personal mission to dominate the homepage if you like, but I'm sure others will help me. NetTuts, Reddit, SitePoint, YouTube and the like will all have fresh content saying "PHP 6 is out! They tried a while back, but we got it now."

Assuming that 4 year old content will ever somehow outweigh the sheer force of an actual new release is truly absurd.

> Skipping versions isn't unprecedented or uncommon in both open source projects and commercial products. MariaDB, jumped all the way up to version 10.0 to avoid confusion, Netscape Communicator skipped version 5.0 directly into 6.0, and Symantec skipped version 13. Each and every one of those had different reasons for the skipping, but the common denominator is that skipping versions is hardly a big deal.

Yeah and Salt jumped from 0.10.0 to 10, or something, and everyone called them out on marketing bullshit. 

People jump around with their numbers and it is usually a dumb marketing ploy that gets called out as a dumb marketing ploy. This is less of a marketing ploy, than a poor marketing choice.

"Oh, they went from 5 to 7 because they fucked up 6 and couldn't get it out?"

and 

"PHP developers can't count to 6"

Instead of just:

"A second attempt PHP 6 is out"

> Version 6 is generally associated with failure in the world of dynamic languages. PHP 6 was a failure; Perl 6 was a failure. It's actually associated with failure also outside the dynamic language world - MySQL 6 also existed but never released. The perception of version 6 as a failure - not as a superstition but as a real world fact (similar to the association of the word 'Vista' with failure) - will reflect badly on this PHP version.

OMFG DONT CARE

> The case for 6 is mostly a rebuttal of some of the points above, but without providing a strong case for why we *shouldn't* skip version 6. If we go with PHP 7, the worst case scenario is that we needlessly skipped a version. We'd still have an infinite supply of major versions at our disposal for future use. If, however, we pick 6 instead of 7 - the worst case scenario is widespread confusion in our community and potential negative perception about this version.

Sure, nobody is arguing 6 to protect the environment from wasted integers, they're just saying that the number that comes after 5 is 6.

## Not Actually Caring

I, like many knowledgeable onlookers don't actually care which is picked. I am totally in favour of a vote and a series of arguments, but I feel like every argument in that pro-7 list is completely invalid, and the attitude is "well, 7 have more arguments than 6 so... 7!"

The whole time I've been watching this I've just been thinking about the Ministry of Silly Walks:

<iframe width="640" height="360" src="//www.youtube.com/embed/9ZlBUglE6Hc" frameborder="0" allowfullscreen></iframe>

I have no arguments that are valid to tell John or his friends to _not_ walk like that. Other than, it is not logical, it looks silly to everyone outside of the ministry and it just is not necessary. 

Do what you want internals, just don't cancel the vote [[again](http://grokbase.com/t/php/php-internals/147kc487cb/vote-rfc-name-of-next-release-of-php)]. Pick an answer and everyone on the losing side needs to bite their tongue, and hopefully the winning side will too.


## Alternatives

Here are some of my favourite alternative name suggestions.

<blockquote class="twitter-tweet" data-conversation="none" lang="en"><p><a href="https://twitter.com/jensaronsson">@jensaronsson</a> <a href="https://twitter.com/philsturgeon">@philsturgeon</a> PHP XP Ultimate Edition</p>&mdash; Matthew Wheeler (@afoozle) <a href="https://twitter.com/afoozle/statuses/485744250504478720">July 6, 2014</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" data-conversation="none" lang="en"><p><a href="https://twitter.com/jensaronsson">@jensaronsson</a> <a href="https://twitter.com/philsturgeon">@philsturgeon</a> PHP 5se.</p>&mdash; Luke John Steadman (@steadweb) <a href="https://twitter.com/steadweb/statuses/485768068598333440">July 6, 2014</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" data-conversation="none" lang="en"><p><a href="https://twitter.com/philsturgeon">@philsturgeon</a> PHPX &quot;Rabid Ocelot&quot;</p>&mdash; Ben (@benmarks) <a href="https://twitter.com/benmarks/statuses/485864709535825920">July 6, 2014</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" data-conversation="none" lang="en"><p><a href="https://twitter.com/philsturgeon">@philsturgeon</a> PHP 8 Sophisticated Sturgeon (the fish, obviously)</p>&mdash; Andrea Faulds (@AndreaFaulds) <a href="https://twitter.com/AndreaFaulds/statuses/486124612602712067">July 7, 2014</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" lang="en"><p><a href="https://twitter.com/philsturgeon">@philsturgeon</a> PHP Episode VII</p>&mdash; Aalaap (@aalaap) <a href="https://twitter.com/aalaap/statuses/486135234883502080">July 7, 2014</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

I'll take any name that internals pick, but for crying out loud please pick something and let this vote actually go through.
---
layout: post
title: Why some people hate PHP
category: php
permalink: blog/2012/12/why-some-people-hate-php
excerpt: I answered a question on Quora a while ago, which was long enough to deserve
  it's own blog post. Basically I explain some of the reasons people hate on PHP so
  hard, and while some of them are founded there are plenty of unfounded reasons that
  people whine about that either don't matter - or are being worked on for future
  versions.
date: '2012-12-02 21:02:00'
comments: true
disqus_identifier: why-some-people-hate-php
---

_This is a repost of my answer to the Quora question: [Do a large majority of people hate PHP solely because other people do so?](http://www.quora.com/Do-a-large-majority-of-people-hate-PHP-solely-because-other-people-do-so)_

There are a lot of reasons people "hate" PHP, or at least look down on it. Some of them are founded, some are not, and some of them are circumstantial.

1.) "Inconsistent haystack / needle"

You hear a lot of people banging on about inconsistent haystack needle, but this can be read with a single rule:

array: needle, haystack<br>string: haystack, needle

It's as simple as that, but people often forget and assume its more complicated.

<u>Reference</u>

<img src="http://qph.cf.quoracdn.net/main-qimg-fa201f1217c396cd88685d386714c5d7" master_src="http://qph.cf.quoracdn.net/main-qimg-8cff392ef81d828c05e4437d195332db" master_w="1680" master_h="1050"></div>

2.) PHP is a HTML file, with logic

PHP assumes the file will be HTML first, which can lead to some stupid output problems where whitespace sneaks in before or after those <?php ?> tags. There are some plans to change that, but it can lead to trouble and reminds everyone that PHP has a history of "templating first, programming later".
  

<b>[New File Type for Pure-Code PHP Scripts](https://wiki.php.net/rfc/phpp)</b>

3.) No standards

There are a million frameworks with a million standards, people fight over snake_case v camelCase and have no clear plans as to what is correct. That means people coming from Ruby to PHP (say they have to build a PHP library for a REST API they just built) they have no idea what to do. I've seen this problem a lot, but the PHP-FIG (Previously known as the PHP Standards Group) is working on that.

<b>[PHP-FIG](https://github.com/php-fig/fig-standards)</b><br><b>[Google Group](https://groups.google.com/group/php-standards)</b>

4.) Lack of Quality Packages

NPM, Bundler/Gems, PIP, CPAN etc all provide quality code packages for developers to plug into their code, meaning they can write less and do more. PHP does not have a consistent package system other than PEAR, which is an aging beast which most people ignore due to the low quality or old age of the packages. 

PSR-0 (part of the PHP-FIG) is a standard that has been generated to help code packages work together, and Composer is a project that has been built to make NPM-style dependency handling for PHP. In time we'll see the quality increase, meaning much less bad code is going to be rebuilt time and time again by every developer - and much more time can be saved instead of developers working on fragmented "framework specific" solutions.

[<b>Packages: </b>The way forward for PHP](/blog/2012/03/packages-the-way-forward-for-php)<br><b>[Composer](http://getcomposer.org)</b>

5.) Misconception

I know a bunch of incredibly smart Ruby developers who used to use PHP back in the PHP 4 days, who seem to think nothing has changed. PHP 4 to 5 was a massive jump and PHP 5.2 to PHP 5.3 was another HUGE leap forward (after-all, PHP 5.3 was meant to be PHP 6 but they back-ported every feature other than Unicode which was not going to work).

The fact that they go around telling all their Ruby friends that PHP has no "method_missing" (we do, it's called __call()) and complain about other things that no longer exist, or have been improved, or added, means that a lot of people who laugh about PHP are laughing about a 7 year old version of PHP. Somebody said PHP was terrible for not having a built in server like Ruby... well it does.

<b>[PHP Built in Webserver](http://php.net/manual/en/features.commandline.webserver.php)</b>

6.) You were doing it wrong

"You can mix MySQL, HTML and PHP in the same files. PHP is disgusting!"

I've said the same about ColdFusion and had it politely explained to me that I was just doing it wrong. This is a good point. Just because a language is flexible enough to let you do whatever you want does not make it bad.

The structure comes from a framework. I don't know many people using Ruby who aren't using Sinatra or Rails, and I don't know many Node guys who don't use Express, CanJS, etc.

7.) Elitism

Not using PHP is cool. Who wants to use the same language you used when you first started writing code as a kid? Who wants to use something that has loads of terrible script kiddies using it? It must not be a challenge, it's not smart enough for a smart programmer like you. 

You need something that will challenge you and anyone using PHP is just not smart enough to learn something else...

I hate that point of view so much. In the lift today on the way in, my colleaue overheard a conversation from two total strangers: "You can't trust these PHP shops, why don't they learn a real language?". This covers a lot of the views of people around, and if it's not elitist then it is at least short sighted.

So, why do people still use PHP?

If nothing else; <i>Momentum</i>

The latest stats from the W3Techs show that almost 78% of the top million sites are built with PHP. Now, while you can sniff at the quality of the language itself you can't sniff at that.

<u><a href="http://w3techs.com/technologies/overview/programming_language/all" rel="nofollow" target="_blank" class="external_link">http://w3techs.com/technologies/overview/programming_language/all</a></u>

I am proficient in PHP, Ruby, Python and have dabbled with NodeJS. Why am I&nbsp; using PHP? Because it has the biggest market.

Lots of developers want to chase "the perfect language", "the perfect IDE", "the perfect hosting platform". The answer is that there is no perfect tool, just options. Nobody should be "hating" any of them.
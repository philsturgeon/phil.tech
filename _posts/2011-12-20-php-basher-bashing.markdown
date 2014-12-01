---
layout: post
title: PHP Basher Bashing
category: php
permalink: blog/2011/12/php-basher-bashing
excerpt: " \n\tAnyone who has used PHP for a while knows that it has its ugly parts.
  Recently I've seen a whole swathe of PHP-bashing articles and that would be fine
  if they were making a valid point, but some of it has just been - as I tweeted recently
  - \"absolute drivel\". He didn't like that very much so I thought I'd follow his
  follow-up with an article of my own. "
date: '2011-12-20 23:12:00'
comments: true
disqus_identifier: php-basher-bashing
---

Anyone who has used PHP for a while knows that it has its ugly parts. Recently I've seen a whole swathe of PHP-bashing articles and that would fine if they were they are making a valid point, but some of it has just been - as I tweeted recently - "absolute drivel". 

The article I am referring to is [PHP is not an acceptable COBOL](http://chipotle.tumblr.com/post/13908062333/php-is-not-an-acceptable-cobol) by Watts Martin in which he started explaining how PHP was:

<blockquote>a powerful enough language to do nearly anything you want, ubiquitous, easy to get up and running (on many web hosts it’s pre-installed), and forgiving of shitty code.</blockquote>

I for one think that is absolutely excellent. If your employee or team-mate is writing shitty code - in any language - then discipline them, fire them or train them better, but don't blame the language for being flexible enough to allow them to complete a given task.

<blockquote>It started as a set of scripts written in C, but over the years has turned into a huge, shambling mutation.</blockquote>

I'm not sure about this at all. OOP in PHP 4 sucked. In 5.1 it was ok, 5.2 was considerably better and the logic in PHP 5.3 has allowed us on the FuelPHP development team to make some truly lovely laid out code. PHP 5.4 will bring us [traits](http://php.net/manual/en/language.oop5.traits.php) which allows us to manage multiple inheritance neatly and I'm pretty excited about that but in no way do I consider PHP to be a "shambling mess".

<blockquote>What nearly all other languages have in libraries PHP shoves into the language core, often in multiple incompatible ways.</blockquote>

Like what? There are quite a few PECL extensions kicking around and there's a whole lot of PEAR available, but what of that is in the core that shouldn't be there?

Watts entire article was full of similar statements to this with his complaints ranging from things I absolutely do not care about to things that are just not true. I toyed with the idea of writing a response at the time but in the end couldn't be bothered and put up a [lazy negative tweet](https://twitter.com/#!/philsturgeon/status/146340934001504256). To be fair this was rude and non-constructive as he pointed out in his latest article: [PHP Redux](http://chipotle.tumblr.com/post/14517072245/php-redux).

There's a reference in there to one of the PHP Advent 2011 articles [Cracks in the Foundation](http://phpadvent.org/2011/cracks-in-the-foundation-by-gwynne-raskind) written by the smart Gwynne Raskind. The quote says:

<blockquote>Over time, PHP has suffered everything from security failures to bad design decisions. Some of these problems were avoidable, but others weren’t. […] If asked what the problem [with PHP] is today, I would say, "no design and no plan."</blockquote>

He missed out the sentence before that which says "Unfortunately, nothing’s perfect — PHP included.". Absolutely, there have been security issues and bugs in PHP's past like any other language. One thing I'll say here is that none of them have ever had any effect on me, developers in my network of contacts or any of the teams I have ever worked with. That's not to say that the bugs never effected anyone and I am sure people will provide random examples, but I spent a few years developing for a massive team in a financial services company with a PHP platform doing all sorts of crazy stuff and guess what? <em>Nobody there had ever had any problems with those security bugs in that job or any of their others.</em> PHP bugs crop up and they are fixed before the exploits are made widely available. If your host is slow to upgrade then move away from that host instead of complaining about the language - it's their job to apply security patches in a timely fashion. If you have an SLA and you get hacked then sue the host's ass off for being incompetent.

As for the "no design and no plan" that can probably be said for PHP 1-4 but I haven't used PHP 4 since I was 13 and the last decade has been just fine. We do of course have the issue with string function needle and haystack orders being impossible to remember but this is on the list of "things I just don't give a damn about". An upcoming version of PHP will some day walk in and set strings to be primitive objects, add new string methods to those objects and deprecate procedural string functions. When that happens the one and only true "PHP has evolved badly" argument will be squashed and until then I will continue to build applications and still not care.

### Anything else?

Plenty! As a contributor to CodeIgniter and FuelPHP his comments about PHP frameworks really got my back up:

<blockquote>We've learned a lot about how to make web frameworks over the last decade, and we want to bring that to PHP. Hence, frameworks in PHP!</blockquote>

It's not like PHP developers are only just working out how to make toolkits now. Just to make one example:

* **Rails 1.0** - December 13, 2005
* **CodeIgniter 1.0** - February 28, 2006

CodeIgniter was never far behind Rails and it copied nothing.

<blockquote>But by building frameworks on what is itself a (bad) framework, instead of fixing poor design decisions from way back when, we stuff our new framework full of workarounds.</blockquote>

Is this not what jQuery is doing? It sits on top of JavaScript to help neater traversing of arrays, simplifies access to the DOM, replicates features that are missing in certain versions or implementations of JavaScript and gives one uniform way to handle your interaction logic across a broad range of browsers. For years people LOVED the way CodeIgniter added a compatibility layer providing PHP 4 with some of the new PHP 5 features. That may be less relevant now but it was bloody important at the time.

<blockquote>I've spent the day - I now suspect needlessly - setting up an Amazon EC2 instance to mirror that architect’s own dev setup, as it appeared I’d lost the wrestling match on my local machine with PEAR and PECL2 and Symfony’s own dependency management system.</blockquote>

I've had entire days lost to dependency hell during projects in Rails - yes I'm not a all-PHP-all-the-time zealot - and I can imagine this happening for any system that requires versioned tools. If it's not PEAR or PECL it will be CPAN, Gem, pip or whatever your language uses, don't pretend like PHP is the only system that ever struggled with dependencies. Besides by complaining about this you contradict yourself as this is the exact reason frameworks like CodeIgniter were born in the first place. By providing the developer with one set of classes in a framework they know all the classes available work with each other - no dependencies, easy deployment, one code style.

<blockquote>Symfony 2’s coders are doing everything as right as possible, and that’s probably true of most of the other mysterious floating bits in the gumbo our new de facto chief architect has cooked up. But we’ve still ended up with a mishmash of patterns from Django, Rails, and enterprise Java, all held together by melted licorice jellybeans.</blockquote>

Well in that case Watts you should probably go and have a word with Fabien Potencier with your feedback. I've heard that he quite likes Symfony - and so do quite a few others - but us framework types are always open to constructive feedback.

### Done now?

Sure, I could probably go on but I feel I have justified my comments. 

The main problem I see is this; when people learn a new language like Ruby or Python they notice a lot of interesting differences, cleaner syntax, funky new cloud-hosting services and they get their "nerd-on". Then they run around going on and on about how amazing it is and become a zealot, looking down their noses at people who are "still" using PHP because "us stupid PHP developers aren't smart enough to code in anything else". Thats elitist bullcrap and it has no merit.

### So why do I "still" use PHP?

I use a range of tools. Sometimes Ruby in the form of Sinatra or Rails but most often it's CodeIgniter or FuelPHP. Why? Because PHP is the language of the internet right now and has been for years, and that means my applications sell more! PyroCMS is compatible with PHP 5.2 and that means a huge number of people can download, contribute to and buy my software - that makes me pretty happy. I could probably recode it in NodeJS or Closure and tell everyone how awesome I am for using a new system but then I'll get less sales, less people will be able to build addons or extend it.

### Are my commercial applications the only reason I use PHP?

Despite known flaws and imperfections I continue to use PHP as my primary language because during all the time I spend worrying about which technology is the neatest, coolest or shiniest I could have built a new application to sell or finished another client site. In the words of Captain Ed Murphy in Lethal Weapon 2, "Sometimes you have to know when to say 'I don't give a fuck' or you'll give yourself a hernia.".
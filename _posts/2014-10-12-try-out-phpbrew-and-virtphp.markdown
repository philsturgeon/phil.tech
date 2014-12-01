---
layout: post
title: Try out PHPbrew and VirtPHP
category: php
redirect_from: /blog/2014/10/try-out-phpbrew-and-virtphp/
excerpt: As a developer working with multiple languages regularly, I come across a
  lot of different ways of doing things. Some of the flows and development tools available
  in other languages are nothing at all to do with the language, they were just something
  a developer using that language decided to do. Now and then, those things cross
  the "barriers" between languages, and PHP gets some nice new toys.
date: '2014-10-12 22:59:00'
comments: true
disqus_identifier: try-out-phpbrew-and-virtphp
---

As a developer working with multiple languages regularly, I come across a lot of different ways of doing things. Some of the flows and development tools available in other languages are nothing at all to do with the language, they were just something a developer using that language decided to do. 

For those of you familiar with Ruby or Python at any decent level, you'll probably know all about [rbenv](https://github.com/sstephenson/rbenv), [RVM](http://rvm.io/), or [virtualenv](http://virtualenv.readthedocs.org/en/latest/). These tools are all a little bit same-but-different, but they are all powerful and awesome.

The main use of these tools is to allow you to use all sorts of different versions of Ruby or Python on your development machine, play around with configuration in one environment, install various versions of different PIP packages or whatever else you feel like doing. 

In PHP, we've never really had that. We had XAMPP/WAMP/MAMP and for the last few years Vagrant has been taking off like a rocket giving us easy control over virtual machines. These are two extreme ends of the solution spectrum. 

*AMP all-in-one installers are rather shit for easily switching between versions, or having two versions active at the same time for different applications, and Vagrant can be somewhat of a nuclear option if you have a simple application.

I know that Vagrant is amazing for tight dev/prod parity, and I [wrote all about that](http://code.tutsplus.com/tutorials/vagrant-what-why-and-how--net-26500) for NetTuts a while back, but if you just need to run some unit-tests in a different version of PHP then you probably don't need a full Vagrant install. If you do, then you've probably done your unit-tests wrong. 

Anyhow, I wrote an article called [How to Use PHPbrew and VirtPHP](http://www.sitepoint.com/use-phpbrew-virtphp/) for SitePoint, and it covers how you can get going with them. [PHPbrew](http://phpbrew.github.io/phpbrew/) helps you manage multiple versions of PHP, and VirtPHP can sit on top of that and help you isolate PECL extensions, php.ini files and even... gulp... PEAR.

Keep in mind that [VirtPHP](http://virtphp.org/) is still in alpha. I noticed a few issues getting started, but a few PR's later and the problems were all solved. 

Please, before you run off and delete all your Vagrant installs, please keep in mind my article [The Tale of Tom, Dick and Harry](/blog/2014/05/the-tale-of-tom-dick-and-harry). If I was being "Dick" from that article, I'd be telling you to use this for everything and it's amazing because I heard about it somewhere, and you'd be a "Dick" to parrot this advice on to anyone without context. This is very much not just me getting excited over the "next new thing, which will replace the old thing." This is more of a suggestion, to try out a way of working that has been doing extremely well in other language communities for years. 

Vagrant is often going to be what you want to use if you have complex architectures, or your only major project is the day-job and you have a lot of developers who you don't want to have to force to learn about multiple tools. Sometimes just installing Vagrant on a juniors computer and telling them to vagrant up in the morning is all you want.

That said, if you flit around between a lot of different PHP projects like me, use TDD more than you refresh a browser and need to switch PHP versions regularly, then these tools are incredibly useful. 

For more information on VirtPHP, watch/listen to [PHP Town Hall Episode 23: VirtPHP - Managing Your Herd of ElePHPants](http://phptownhall.com/blog/2014/04/09/virtphp-managing-your-herd-of-php-versions/).

<iframe width="640" height="360" src="//www.youtube.com/embed/94wOO8P13wA" frameborder="0" allowfullscreen=""></iframe>
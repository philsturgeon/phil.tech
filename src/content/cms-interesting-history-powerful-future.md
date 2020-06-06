---
layout: post
author: [Phil]
title: 'CMS: Interesting History, Powerful Future'
tags: [php]
excerpt: As a CMS developer on the PyroCMS team, a common problem I have to deal with
  on an almost daily basis is peoples strange fear of using a CMS as a base for a
  project. People often suggest the tools of my trade are not appropriate, are only
  for "small sites" or should not be used as a base for an application. I know there
  are plenty of awful content management systems around, but I propose a few rules
  for CMS developers to follow so we can shirk this dark cloud that hangs over us.
date: '2012-04-24 21:18:00'
comments: true
disqus_identifier: cms-interesting-history-powerful-future
alias: blog/2012/04/cms-interesting-history-powerful-future/
alias_1: php/2012/04/24/cms-interesting-history-powerful-future/
---

As a CMS developer on the PyroCMS team, a common problem I have to deal with on an almost daily basis is peoples strange fear of using a CMS as a base for a project. People often suggest the tools of my trade are not appropriate, are only for "small sites" or should not be used as a base for an application. I know there are plenty of awful content management systems around, but I propose a few rules for CMS developers to follow so we can shirk this dark cloud that hangs over us.

In many places I will talk about from the side of an end user - often a client, or whoever is in charge of looking after the website, and the side of a developer - who wants to (or is being paid to) extend and improve the system.

### CMS History, from where I stood

I've been building sites since I was about 12. I started off messing around with phpBB which was just a bulletin board but it started getting all sorts of hacks to allow certain forum posts to be pages. Weird, but it was better than making everything with HTML.

PostNuke and PHP-Nuke came along and blew that approach out of the water. Suddenly there was a full on CMS that could do... ANYTHING. Sadly it was an ugly piece of crap, had a horrible code-base and building modules for it was a chore. It wasn't the fault of the team, it was 2001 and who knew any better?

I used it for years - and even got involved with the PNphpBB team who tirelessly fought to keep phpBB and Postnuke integrated - but it was terrible. Drupal and Joomla were other solutions to the same problem, but were still way too complicated for the every-man and still lacked the clean MVC core, meaning that more PHP soup was to be found. For both end users clicking around on the backend and developers trying to build something up, it was not easy to learn how to work with these beasts and for anyone not interested in paying for training, other solutions were still sought after.

Simpler "blogging platforms" started springing up. WordPress and pMachine came along to save the day. Suddenly we had awesome blogging systems that could blog, and... well write blogs... They were cool, but people wanted to have a blog AND a site, so these systems started allowing certain posts to act as pages. Weird, seems a bit like that old phpBB approach but... lets go with it for now.

Blogging platforms get Add-ons! What better way to stop them just being about Posts and kinda-Pages-almost, now they can do ANYTHING! They have e-Commerce solutions, and all sorts of other bits strapped to the side. Getting people to build part of your application for you is fun, because you don't need to write it yourself. Sadly that is only a good thing if the code is any good, and that relies on the API provided to the developers being well thought out, wide reaching through the system and done with clean OOP code.

Sadly this is not how WordPress does things.

### The Wrong Way

While everything in WordPress is a post in a weblog, they can extend functionality with "Plugins", but let's take a look at the WordPress definition of a Plugin:

> WordPress Plugin: A WordPress Plugin is a program, or a set of one or more functions, written in the PHP scripting language, that adds a specific set of features or services to the WordPress weblog, which can be seamlessly integrated with the weblog using access points and methods provided by the WordPress Plugin Application Program Interface (API).

__Source:__ [WordPress.com: Writing a Plugin](https://codex.wordpress.org/Writing_a_Plugin)

To give the WordPress community their due they have managed to integrate a LOT into their "weblog". Using Plugins they can do all sorts of crazy stuff, including e-Commerce and building entire social networks. <img src="http://thereifixedit.files.wordpress.com/2009/06/tifi-redneckhouseboater.jpg" style="float:right; width: 300px; margin: 1em 0 0 1em;" />That in itself does not mean they are doing it right and I come into contact on a daily basis with people who are jaded against developing with CMS systems because of this, even some friends in the start-up world who are painfully trying to find funding after their first prototype got smashed together with WP-tape and string. With a little bit of hacking you'll soon find anything is possible, for more evidence of this check out the [There I Fixed It!](http://thereifixedit.failblog.org/) blog, topically enough on WordPress itself.

### The Even Wronger Way

The best "I Fixed It" was working for Hargreaves Lansdown when they put in a £500,000 Content Management System to replace an in-house CMS. Sure the one we used had basic MVC, could use just a TPL or PHP and worked perfectly, but it took the Marketing team a few hours to make text changes and that meant we had to ditch all of our well structured code and use some shiny does-everything CMS to help them change text quicker...

Almost straight away we pointed out to the developers of the CMS that although we had all sorts of "Assets" available to us, there was nothing to actually access our content. They came up with the solution: the "REST Resource JavaScript Asset". This allows us to consume a REST endpoint, handle the response (XML only) with ECMAScript (not even any known version of valid JavaScript) on the server-side (years before node, potentially some Java emulator but we never found out) and output HTML with document.write() which didn't actually go to the browser then, no, it was cached and the response was saved as HTML and eventually shoved into page content after a bunch of MySQL queries had been run to find the cached output.

Slow? Yes.
Confusing? Yes.
Ridiculous? Absolutely.

To this day I maintain that if we DID have to shove a CMS in there, a copy of ExpressionEngine 2 and my [Rest plugin](http://devot-ee.com/add-ons/rest) would have done a better job and saved us about £499,600.

As soon as the project was complete - and management went off for their lobster celebrations - I threw down my crow-bar and quit. That is not the right way.

### The Right Way

A Content Management System by definition just means that you should be able to manage your content. Outside of that a CMS should really not be interfering at all. If a CMS tries to make everything into one thing, be that "everything is a page", "everything is an asset", or whatever, then you are going to make it WAY too complicated for any mere mortal to ever effectively do anything. 

As a developer you want to be given freedom to create custom URLs that aren't always a page, that can handle their own forms, their own HTML views, DB models that can talk to the database or some Mongo DB server somewhere in a far off land, or whatever the hell you like. If you want to build a module then your application should be given everything it requires to do that, and every module should be treated as a first class citizen of your application.

As a client you want to have access to well built add-ons that just make sense. You can't do that if you have to learn how to add everything as an asset or a channel or whatever, because it means that every single aspect of a website has been reduced and abstracted so far that it barely resembles anything logical. That goes for making everything into a Sitemap too. THAT DOES NOT WORK, so stop it, all of you.

A few more points for consideration:

* __Don't be a hero, use a framework__ - you instantly have a bigger community and greatly improved security.
* __Plan your add-on system well__ - Modularity is king. Every module should be a mini application with first-class access to everything.
* __Dont try and give EVERYTHING an interface__ - the internets will always at some point need a geek to poke some code, don't be scared of that.
* __On the contrary, don't force clients to code__ - complex "tag syntax" should absolutely be there for adding power, but learning it should never be __required__ for an end user.

### Conclusion

If you are building your own CMS then try and stick to some of these rules. There are enough systems out there and many of them are convoluted, confusing, restrictive and are giving my software a bad name. 

PyroCMS will continue to develop along these lines and I will still use PyroCMS as a base for all sorts of random projects. People suggest you can only really build basic web sites, but I have recently used it for everything from massive boring corporate sites to iPhone backends and REST API driven websites that users can get a API Key for to do some cool things.

I generally see no need to "build it all from scratch" unless I am doing something really REALLY custom, for which I am always happy to have CodeIgniter and FuelPHP in my arsenal, but if I EVER have to write another blog or forgotten password system I will probably rage-quit the internet and become a kayak instructor.

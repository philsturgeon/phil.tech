---
layout: post
title: The &quot;Framework&quot; is Dead, Long live the Framework
category: php
permalink: blog/2014/01/the-framework-is-dead-long-live-the-framework
excerpt: There have been a few posts over the last few months saying that the age
  of the framework is dead, and that Composer is the true savior, and other similar
  messages. This is half-true, but lots of people have been using the word "framework"
  differently over the years and I wanted to really work out a good definition of
  what a "framework" was in relation to PHP development, and in relation to these
  discussions. 
date: '2014-01-13 22:15:00'
comments: 'true'
disqus_identifier: the-framework-is-dead-long-live-the-framework
---

There have been a few posts over the last few months saying that the age of the framework is dead, and that Composer is the true savior, and other similar messages. This is half-true, but lots of people have been using the word "framework" differently over the years and I wanted to really work out a good definition of what a "framework" was in relation to PHP development, and in relation to these discussions.

I had my own idea of what a framework really meant, but after reading an article by Brandon Savage, named [You don't need a framework](http://www.brandonsavage.net/you-dont-need-a-framework/) I felt really confused. 

<blockquote class="twitter-tweet" lang="en"><p><a href="https://twitter.com/philsturgeon">@philsturgeon</a> My stance: people have been using FW wrong for years. FW is the architecture. Libraries are the &quot;components&quot;...</p>&mdash; Anthony Ferrara (@ircmaxell) <a href="https://twitter.com/ircmaxell/statuses/421061661311508480">January 8, 2014</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

If you read through that thread I was certainly wrong about a few bits and didn't immediately notice, but as I said I was genuinely confused. This conversation helped me get my own definition clear in my head, and now I think it is a good one.

**Frameworks dictate architecture, handle your bootstrapping and essentially give you a set of lines to color inside.**

Components, libraries and packages are all interchangeable-ish words that can add functionality to a framework, but really are not A) part of the framework, or B) a framework themselves. 

## Back in Time

I got on the PHP framework train with CodeIgniter back in 2006. Before that I was munging together abominations with phpBB, Postnuke and all sorts of other systems that did not make for clean living as a programmer. 

CodeIgniter came around and it had two clear goals:

* Provide a clean "OOP" architecture for your applications
* Avoid systems like PEAR, bundling lots of useful components with it

CakePHP and the other similar systems were all doing the same around the same time, some before and some shortly after.

That was the beginning of 8 years of thousands of us using the term "framework" incorrectly.

CodeIgniter is a framework. CodeIgniter had a bunch of libraries including file uploads and a query builder. File uploads and the query builder were not part of the framework, they were simply bundled with it because dependency management at the time was shitty. If it wasn't bundled then it would need to be PEAR or some other ZIP download, which would be awful.

Kohana is a framework. It added an ORM. People said Kohana was a better framework **because** it had an ORM. Wrong, it might have been a better framework **and** it just so happened to have an ORM bundled with it, which made it a nice ZIP file to use.

## Modern Frameworks

Things like Zend Framework and SF2 are clearly a bunch of components, but call themselves frameworks.

> Basically, a framework consists of:  
> **A toolbox** - a set of prefabricated, rapidly integratable software components. This means that you will have to write less code, with less risk of error. This also means greater productivity and the ability to devote more time to doing those things which provide greater added value, such as managing guiding principles, side effects, etc.  
> **A methodology** – an "assembly diagram" for applications. A structured approach may seem constraining at first. But in reality it allows developers to work both efficiently and effectively on the most complex aspects of a task, and the use of Best Practices guarantees the stability, maintainability and upgradeability of the applications you develop.

**[Source](http://symfony.com/at-a-glance)**

That seems to me to be the old definition of a PHP framework, back in the days where we used to bundle all of our shit together in a ZIP file. That was SF1, so is it possible for SF2 they just kept the name because it was easier? 

### FuelPHP

The name FuelPHP applies to a component vendor AND a framework.

* [fuelphp](https://github.com/fuelphp) - A collection of components.
* [fuelphp/fuelphp](https://github.com/fuelphp/fuelphp/) - This is a sample application which defines the architecture of your code. This is "correctly" described called a framework.
* [fuelphp/foundation](https://github.com/fuelphp/foundation) - This is required by the framework to run, but is not a framework by itself, just an important component.

### Laravel

Laravel is a framework, but not a component vendor. It uses a component vendor called Illuminate.

* [illuminate](https://github.com/illuminate) - A collection of components. I'd call this the "Component Vendor".
* [laravel/laravel](https://github.com/laravel/laravel/) - This is a "sample application", which would be better named as "framework"
* [laravel/framework](https://github.com/laravel/framework) - Unfortunately named. This should be something other than "framework", like "foundation" or "kernel". 

_I mentioned that to Taylor, and he agreed but wasn't too fussed. It's not a complaint, I just wanted to point out how it fits in with this definition. IM NOT ATTACKING YOU LARAVEL PEOPLE. ;-)_

### Aura

The name Aura is a component vendor AND a framework. More specifically, one of the Aura components is called "Aura Framework".

* [Packages v2](http://auraphp.com/packages/v2)
* [Framework](https://github.com/auraphp/Aura.Framework_Project)

Again, Aura points out the different between the two things, even if it does happen to share the same name.

### Semantic Wankery?

Maybe. I didn't start this conversation to argue the meaning of vague terms, I did however want to know if I agreed or disagreed with Brandon, and it turns out the answer is… both.

> ... we all preached a common message of “you need to adopt one of the common, established frameworks! Don’t do it alone!”
> This message makes a lot of sense. Developing your own framework limits your options and opens you up to security problems and architectural challenges that most of the other frameworks are already solving. Not to mention the fact that most of the time, adding a collective set of brains together results in a better product. And I’ll be the first to admit I don’t want to compete with Matthew Weier O’Phinney in a battle of intellect; he’s smarter than I am.

Absolutely. Sure [Reinventing the Wheel](http://blog.ircmaxell.com/2012/08/reinvent-wheel.html) can be a great move if you are interested in learning how things are done, but putting your home-made framework into production can be scary if you're a junior dev. You're potentially opening yourself up to all sorts of security issues that just don't need to be toyed with.

And Brandon is of course right that dependency managers have given us the return of components which can be used outside of frameworks, as Composer (PEAR on crack, but… smart too) helped developers distribute code outside of just lumping it into a framework.

But where we start to disagree a bit is right here:

> New libraries like Aura allow for the integration of framework-like components without the heavy framework. 

With Composer becoming considerably more widespread, ALL major frameworks short of CodeIgniter (trollololol) have moved their components out into separate packages, meaning this whole "heavy framework" is: "the application architecture" + "whatever components your application structure would like".

So, the application architecture IS the framework. The rest of it is components. 

Brandon here is suggesting that we don't need the "framework" anymore because we can just use components and make our own application layer. But... the application layer **is** the framework.

So going by the "correct" definition of a PHP framework, Brandon is actually suggesting that we code our own frameworks - something that he at the start of the article advised against:

> Developing your own framework limits your options and opens you up to security problems and architectural challenges that most of the other frameworks are already solving.

See why the article caused some confusion? 

### Framework GOOD or Framework BAD?

So, old-style "heavy frameworks" no longer exist. GREAT. In retrospect, those things fucking sucked.

These days all you need to do is grab a bunch of components that work together (relying on each other, or working despite each other), bootstrap them altogether, set up some routing, hook up a config system, lay your controllers out, handle session configuration and connect to your database.

You can do that completely with random pick-and-mixed Composer components. But when you've done writing that application layer... guess what you've done? 

**You've just written a framework.**

As I said above, writing your own can be a good learning experience for beginners, but it's terrible for getting things into production. It's terrible for hitting deadlines, terrible for hack projects, terrible for prototypes, terrible for a lot of things.

If you know what you're doing it can be excellent. You can custom build a real pride and joy, it might be faster, and it will probably work just how you want it to. Yaaaaay.

But, it's really not as easy as people keep saying. 

Composer is not also some magic bullet, and lots of these components are more difficult to set up than people say. Brandon gave the FIG some props which was kind of him, and I have seen [this sort of idea before](http://happyaccidents.me/do-we-need-a-framework-for-that/), but unless you want a logger these shared interfaces just have not had a chance to be completed yet. 

Cache and HTTP Messages are on the cards, but the former has been going for two years and the latter is going in for an entrance vote probably tomorrow, meaning we're going to be at least 3 months away from completion, probably 6.

So... what is the harm in letting a framework do this for you?

### Frameworks are bad for Beginners

Not something that Brandon said, but a mentality I've seen around a lot.

<blockquote class="twitter-tweet" lang="en"><p>“Beginners should not use frameworks” is idealistic tripe. Not everyone wants to be a world class programmer, some just wanna ship. :)</p>&mdash; Phil Sturgeon (@philsturgeon) <a href="https://twitter.com/philsturgeon/statuses/422829649652383745">January 13, 2014</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

(Yeah I'm pasting in my own quotes. Deal with it.)

This came from people saying things like:

> Newbies should stay away from frameworks! Ever seen a bricklayer easily become an engineer. First he should study, if not want to follow good practices will never have a good credential to do the job.

This was a conversation on the [Stop Using Facades](http://programmingarehard.com/2014/01/11/stop-using-facades.html) article comments, and I had another the day before on Reddit:

> And I'm not really sure the user with no discernible understanding of programming is the right demographic to be targeting with a framework in the first place. I believe firmly that no user should touch a framework before she has a firm grasp on a language. Anything else is asking for trouble.

These are not just comments from Reddit and a blog, but something I have heard a lot recently. 

I feel like this is a very idealistic view of development. I know a shitload of people who do not want to become a top-level programmer, who couldn't care less. One of my close friends is a top-level DJ in the UK, playing in London at a bunch of fancy clubs. He is also a businessman, with a startup that is about to launch. He has his interests and he is great at what he does.

**He does however have literally no interest in becoming a world-class programmer. He barely even wants to code, but he can thanks to frameworks like Laravel.**

Using frameworks he can get shit done. He's written an awful lot of extremely good applications - that work - and that has made him some money. Ship ship ship. 

This was mostly done with CodeIgniter back in the day, then he hoped over to Laravel last year.

Does he know what separation of concerns means? Ha.

Is his code SOLID? Nope.

Is the Laravel application he made unit-testable? Fuck no.

Is it going to function well enough to get him to his next round of funding? Absolutely.

Is he going to have to throw the whole thing away? Not at all.

Frameworks are great for beginners, who literally could not possibly smash together a series of random components if they wanted to. Regardless of the efforts of the FIG and PHP The Right Way combines, now or even what we've done in 3 years time, frameworks are not going to go away.

They are however moving away from being heavy, bloated omnishamble ZIP files that require all of the rest of it to work, and they _are_ improving their interoperability slowly. So that's nice.

## Polarization is misleading

Generally speaking, it's impossible to be so polar about whether a "framework" is "good" or "bad". You can't say whether you need one or not, because there are a lot of factors.

1. Literally every single PHP framework out there has a different definition of what a framework is
1. What "framework" means is to you is different than what it means to me
1. I only worked out a decent definition for what a framework was the other day
1. Even if we all had the same definition, saying they are good or bad for beginners is insane. Everyone learns in a different way. Seeing, doing, building, all are different
1. If you ask me how "heavy" a framework is I have no idea what you mean
1. Composer is a great tool, but not all packages work together as well as a lot of people seem to think. Yet...
1. Even the most advanced developers sometimes just want to smash out a website in a night, and using a framework will save you a lot of time bullshitting around. Not every project is a flagship enterprise product

So... let's ship stuff? 

No, that's a shitty bail-out ending.

I think Brandon had a great point. We are moving away from the age of requiring these monolithic ZIP files, and we have some great tools that let us distribute these framework agnostic packages. We have a group of people working really fucking hard on making standards that help these packages work together better, so by the looks of things everything is on the up-and-up.

What is popularly called a framework will change over time to reflect changes in the ecosystem - right or wrong - and that's cool. We just shouldn't be too quick to throw the baby out with the bathwater when a nice shiny thing comes out, and notice the changes to the tools that we used to hate as they notice the changes and follow along.

Old-frameworks are old. Modern frameworks are lovely. You should probably use one. But maybe you don't _need_ to, and that's ok too.

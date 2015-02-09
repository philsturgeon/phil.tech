---
layout: post
title: Why Write A New Framework?
category: 
permalink: blog/2011/04/why-write-a-new-framework
excerpt: " \n\tSo we all know that the internet is full of frameworks. They've been
  the popular thing for the last 5 or 6 years and it seems to have become the \"barrier
  for entry\" or the \"passage of rights\" that 8 or 9 years ago used to be \"hey
  I just wrote a phpBB clone!\". There are plenty around but in this day in age, why
  would anyone write a new one? As somebody involved in a new PHP framework \"Fuel\"
  that has shaken a few opinions up I thought it would be interesting to share my
  thoughts and views on the situation. "
date: '2011-04-11 00:51:00'
comments: true
disqus_identifier: why-write-a-new-framework
---

So we all know that the internet is full of frameworks. They've been the popular thing for the last 5 or 6 years and it seems to have become the "barrier for entry" or the "passage of rights" that 8 or 9 years ago used to be "hey I just wrote a phpBB clone!"

There are plenty around but in this day in age, why would anyone write a new one? As somebody involved in a new PHP framework - [Fuel](http://fuelphp.com) - that has shaken a few opinions up I thought it would be interesting to share my thoughts and views on the situation.

Let's look at a few opinions to start off with and give then some quick answers.

### There are already plenty of frameworks out there

Sure, but there are plenty of cars out there and Ford haven't stopped trying to make a better car just yet.

### There are too many for people to choose from

There are a shitload of popular bands out there in the charts, but the bands that don't sell any singles just fade away and drop off the radar. New artists pop up and irrelevant artists go away, keeping a constantly fresh amount of new music out there that everyone can benefit from. The competition keeps them all going strong and sometimes collaborations happen between artists or genres cross over, which can lead to some of the best new music around.

### Why not help improve an existing framework?

Well sure you could, but if you don't like how a framework does X, what options do you have? Go and tell them that X is rubbish or rewrite it and hope they merge it? If they do then people will complain that X is different to how it used to work and that they now have to go and recode their application. On the other hand, if they don't you are left with an unmerged feature that you have to maintain yourself in a fork of the framework that will never be part of the mainstream. How annoying.

### Why reinvent the wheel?

What if I don't like the wheels that are out there? Working with a framework is all about developing things in the quickest way possible, not just to help make yourself more efficient but to make the most of your time and to keep client costs down. Every time I have to do some silly workaround in a framework is extra time I could spend either working on a new feature for the client or having a well deserved pint.

Personally I love CodeIgniter, Kohana and Rails for certain parts of how their frameworks work, but other parts of the system frustrate the hell out of me. If I can develop a new framework that encompasses the best parts of those wheels and make a new shinny one then that has to be the best way for me to build code right? 

The same rule applies for any business, open-source project, web-app or whatever else. Firstly, make something that is useful to you. If you can open it up in a way that others can use then brilliant, they might find it useful to. The one downside here is that the second it hits a large news site you end up with an influx of idiots giving half-baked opinions with no real research behind them. Ignore this, it is standard.

### So where does Fuel sit in with all this?

Working with a framework can really speed you up if it jives with how you develop but this only works if there is a) enough documentation and b) the developers work in the same way as you. Rails is essentially learning how 37signals like to write code. They have their conventions and their automagic that to them make a whole bunch of sense and speed them up in developing applications. Great! Now, if I don't agree with those conventions and assumptions, what can I do? Um.... nothing.

Most of the time the Rails automagic is bloody brilliant. Over the years several frameworks have tried to copy the Rails magic and failed horrifically. CakePHP has tried and without wanting to rip on them too much, they have just ended up with a complicated piece of software that has the worst performance of any PHP framework I have ever seen benchmarked. It would be great to see more of the Rails way of working in the world of PHP. Why? Because although as a single developer I can pick and choose whatever language I wish to work in, I don't always have that level of choice when working for clients.

Sure, I can use Rails for a webapp (and hell, I have, [TravlrApp](http://travlrapp.com/) uses Rails and I love it) but if a client asks me to build them a project I have to listen to what they want and normally that will be PHP. Why? Because their existing systems use PHP, their servers all support PHP, their developers all know how to write PHP and everything everywhere is PHP. Rails is great, some of their developers might dabble with it or even a bit of Django, but at the end of the day PHP is still the most used and most widely supported web scripting language around and I cannot see that changing any time soon.

So, let's make PHP as fun to use as we possibly can right?

Some of the best things I love about Rails are gems, Migrations, irb, Scaffolding (useful in small doses) and rakes. So how great would it be if I could do all that in PHP?

Well you can. I wrote [all of those features](/blog/2011/03/fuelphp-oil-introduction-scaffolding) into the optional command line utility "Oil" for Fuel. Whoop! I could have written those features into Kohana, but then I would have had to ask the core developers if they thought it was in their interests, if it met their standards, if anyone else was working on anything similar, if it was the way their framework was interested in going, which version it should be merged with, bla bla bla. Why do that if I can put it into a framework I have helped to build with people who are not just friends, but some of the most talented PHP developers I know?

### Summary

A framework is essentially a way to put all of your best practises into a single place so that you can reuse them over and over again. This should make you more efficient and make your time more financially viable to clients. If the framework you use slows you down or does not cater for the way you like to develop then sack it off and do your own thing. A vast majority of the framework community seems to have a massive fanboy attitude which is totally unnecessary. You can use a framework for a few years then change your mind and write a few apps in a different one. It doesn't make you a traitor, it just makes you a free thinking logical developer who uses the best tools for the job at the right time.

Use whatever you like and don't be negative to anyone who wants to work in a different way. There is no one framework that does everything right for everyone and there never will be. I have my three favourites and I'll be using those until I change my mind. I prefer to have my options and you're welcome to yours, just don't tell me I'm wrong for wanting to work in the best way I can or I won't have anything polite to say.


---
layout: post
title: FuelPHP - Oil Introduction &amp; Scaffolding
category: fuelphp
alias: blog/2011/03/fuelphp-oil-introduction-scaffolding
excerpt: " \n\tDevelopment of FuelPHP has come a long way since Dan and myself started
  work on the system a few months ago and it's command line utility has progressed
  amazingly. I spent all of yesterday polishing off this package and now we have Rails-style
  scaffolding and migrations working perfectly. This video shows off the basic functionality
  of Oil by running through scaffolding creation and quickly brushing on migration
  work. "
date: '2011-03-06 15:09:00'
comments: true
disqus_identifier: fuelphp-oil-introduction-scaffolding
---

Development of FuelPHP has come a long way since Dan and myself started work on the system a few months ago and it's command line utility has progressed amazingly. I spent all of yesterday polishing off this package and now we have Rails-style scaffolding and migrations working perfectly. This video shows off the basic functionality of Oil by running through scaffolding creation and quickly brushing on migration work.

<embed allowfullscreen="true" allowscriptaccess="always" height="683" src="http://blip.tv/play/g7lmgqmIcAA%2Em4v" type="application/x-shockwave-flash" width="875"></embed>

You can see here I have created a basic controller with template support, my model, all of my basic views, the schema and even run the schema just by using two commands:

> $ php oil generate scaffold monkey name:varchar[100] biography:text favourite\_number:integer  
> $ php oil refine migrate

I could then deploy this code ( [maybe with git](/blog/2010/02/Deploying-websites-with-Git)) and run the migrate command on the live server and those features would be live!

If you are not used to this way of working it borrows _heavily_ from Rails which I have been doing a fair bit of work with recently. I don't want to start  massive PHP vrs Ruby argument because there is nothing new to be said here, but suffice it to say we don't always have the option to work with Ruby. FuelPHP is taking ideas from Rails in how the command line utility works and helping to speed up PHP development. For me that is pretty exciting!

I'll be posting more screencasts soon focusing on other aspects of Oil, covering the console and migrations in more detail. I'll also be working on a write-up for setting up [Readline for PHP](http://www.php.net/manual/en/book.readline.php) so you can interact with the Oil Console like it is part of bash.


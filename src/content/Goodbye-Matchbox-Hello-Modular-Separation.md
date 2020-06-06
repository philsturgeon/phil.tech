---
layout: post
author: [Phil]
title: Goodbye Matchbox, Hello Modular Separation
tags: [codeigniter]
excerpt: 'I''ve been using Matchbox in one of its many forms for several years - almost
  as long as I have been using CodeIgniter - and it got to the point where I could
  not use CodeIgniter without it. After all this time an alternative has come along
  with all Matchbox''s features and more. '
date: '2009-11-19 17:08:00'
comments: true
disqus_identifier: Goodbye-Matchbox-Hello-Modular-Separation
alias: blog/2009/11/Goodbye-Matchbox-Hello-Modular-Separation/
alias_1: codeigniter/2009/11/19/goodbye-matchbox-hello-modular-separation/
---

I've been using Matchbox in one of its many forms for several years - almost as long as I have been using CodeIgniter - and it got to the point where I could not use CodeIgniter without it. After all this time I have finally found an alternative to handle my CodeIgniter applications modular structure.

Matchbox is a modular system written by Zacharias Knudsen - a very talented young developer who is sadly not as active as he used to be. Modular CodeIgniter basically means you can group your controllers, models and views for a specific section of the site together.

The new system I have been implementing to my applications is Modular Separation\* by [wiredesignz](http://codeigniter.com/forums/member/45875/ "CodeIgniter user profile for wiredesignz"). Modular Separation is purely PHP 5 which gives it a slight edge over Matchbox from the get-go as it can leave out a lot of the extra PHP 4 support and go right for the much cleaner & quicker full OOP approach.

That said, dropping PHP 4 support by itself was not quite enough to make me want to drop Matchbox from my applications. Matchbox still had a few features over Modular Separation such as multiple module directories ( [PyroCMS](http://pyrocms.com/) has both /modules and /core\_modules) which helps to separate out different types of modules. After some pestering and nagging, wiredesignz added that feature (and a few others) and made Modular Separation seem much more appealing to me.

One of those brilliant features - added in 1.9 - is 404 routing. I have worked on many applications that like to control how the 404 works. This could be for many reasons, be it sending the user to a controller that has a full design instead of the usual <acronym title="Red Box of Doom">R.B.O.D</acronym> 404 page, or it could be for more advanced systems that use some sort of page manager: E.g http://example.com/page-name.

`$route['404'] = 'pages';`

That route will send any 404 errors off the the pages module. More routing can be done from withing the module as Modular Separation supports another brilliant feature: modular routing.

Modular routing for CodeIgniter is nothing new - I wrote a simple patch to [support modular routes in Matchbox](/blog/2008/06/Matchbox-with-modular-routes-in-CodeIgniter) a while back and the feature eventually made it into Matchbox 2. Zacharias and I both used a very similar approach, which was effectively adding extra routes into the main $routes array.

Modular Separation will match a result in the main config/routes.php file, then look at the module to see if any more routes match the routed URL. This means you can keep general rules in the global file, then module specific rules can be kept in the module itself. Keeping control of a modules routes to the specific module is brilliant and cuts down on the possibility of routes conflicting with each other too.

[PyroCMS](http://pyrocms.com/) has now been converted to use Modular Separation and it has shaved a few 100ths of a second off here and there. That's good enough for me, especially as I now have fewer extended libraries in my applications/libraries folder.

I am not suggestion you drop Matchbox right now, I have no idea where is going and I may some day switch back. Right now however, I will be using Modular Separation and suggest you give it a try if you are starting a new project.

<small>* Confusingly, Matchbox used to be called Modular Separation a year or two back, so be careful when looking around the web for details. The forum thread to look for help on the new Modular Separation (PHP 5) by wiredesignz is <a href="http://codeigniter.com/forums/viewthread/121820/">this one</a>.</small>

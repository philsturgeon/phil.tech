---
layout: post
author: [Phil]
title: Create an Admin panel with CodeIgniter
tags: [codeigniter]
excerpt: A topic I see come up on the CodeIgniter forums quite a lot is "How do I
  create an admin panel" in CodeIgniter? This article will show you the best structure
  for your admin panel, but leave the actual code to you.
date: '2009-07-08 09:49:00'
comments: true
disqus_identifier: Create-an-Admin-panel-with-CodeIgniter
alias: blog/2009/07/Create-an-Admin-panel-with-CodeIgniter/
alias_1: codeigniter/2009/07/08/create-an-admin-panel-with-codeigniter/
---

As I see it there are three methods to creating an admin system using the MVC framework [CodeIgniter](http://codeigniter.com). In this article I will show examples of the structures for each and mention the pro's and con's of using each.

This article will only outline the theory and suggest the structures to you. I do not plan on writing yet another "How to make a user login system and add admins to it" type article.

### 1.) Two applications

In CodeIgniter you can easily set up multiple applications to run off the same CodeIgniter install, simply by creating a copy of index.php and renaming it to something else.

> / applications/ frontend/ controllers/ home.php blog.php comments.php models/ blog_model.php comment_model.php views/ blogs/ index.php view.php comment/ view.php index.php backend/ config/ controllers/ dashboard.php blog.php comments.php models/ blog_model.php comment_model.php views/ blogs/ index.php form.php comment/ index.php dashboard.php login.php system/ index.php admin/ index.php

Here you can see I have put index.php into an admin/ folder of its own. Both index.php files will point to a single folder within /applications and this can be done by setting:

**index.php**

` $application_folder = "applications/frontend"; `

**admin/index.php**

` $application_folder = "applications/backend"; `

This method does work, but is only really any good for big sites that have _very_ different content for their front and back ends. You cannot use the same libraries, helpers, models, etc which will mean its very easy to end up with duplicated code. I'm not a big fan of such frontend/backend separation as for most sites, an admin panel will use the same models and code but this varies entirely on the spec of the site you are building.

### 2.) Sub-directories

This method follows a more usual CodeIgniter set-up and is the way that most new CodeIgniter users will try things at first.

> / application/ config/ controllers/ admin/ blog.php dashboard.php comments.php blog.php comments.php models/ blog_model.php comments_model.php views/ admin/ blog/ index.php form.php comments/ index.php form.php dashboard.php login.php blog/ index.php view.php comments/ view.php system/ index.php

Here we are keeping the default MVC structure of CodeIgniter and using sub-directories for our controllers to give us the http://example.com/admin/blog URL structure. You'll need to set a $route['admin'] = 'admin/dashboard'; to get example.com/admin working but that's easy enough.

This method has the advantage of being able to share models, libraries and helpers across both the front and backend. If you really need to separate models for front and back ends, why not just have a models/admin/ folder and put them in there?

The down side is that when your site expands and more controllers are required, it can be a real pain to have your content so loosely linked across the entire application directory. You can see in the example above that we have several folders for blog and comment content, where really we should only have one. This one folder is called a module...

### 3.) Modules

To keep all the content under one single folder we can adopt the HMVC approach. This stands for Hierarchical MVC which essentially is just modular CodeIgniter. Two systems have been developed for this: [HMVC](http://codeigniter.com/wiki/Modular_Extensions_-_HMVC/) and [Matchbox](http://code.google.com/p/matchbox/ "Matchbox - lets you organize your codeigniter resources in modules"). I personally prefer use the latter but have never tried HMVC so i'll leave that one up to you.

A strange thing that many CodeIgniter users seem to do is create a blog module, comment module and admin module. This strikes me as a very strange separation of content that goes against the point of using modules in the first place! I have a single admin.php controller in the main controllers folder to act as the default admin page which will handle login, logout and the main dashboard. Then I add another admin.php controller in each module and use [URI Routing](http://codeigniter.com/user_guide/general/routing.html "CodeIgniter User Guide: URI Routing") to get my URL structure as http://example.com/admin/.

> / application/ config/ controllers/ admin.php modules/ blog/ controllers/ admin.php blog.php models/ blog_model.php views/ admin/ index.php form.php comments/ controllers/ admin.php comments.php models/ comment_model.php views/ admin/ index.php form.php views/ admin/ dashboard.php login.php system/ index.php

Right now to get at the blog admin you would have to go to http://example.com/blog/admin which may well be fine with you. If not, you can add the following routes to your **application/config/routes.php** to swap the segments around and emulate a /admin/ folder.

~~~php
$route['admin/([a-zA-Z_-]+)/(:any)'] = '$1/admin/$2'; $route['admin/login'] = 'admin/login'; $route['admin/logout'] = 'admin/logout'; $route['admin/([a-zA-Z_-]+)'] = '$1/admin/index'; $route['admin'] = 'admin';
~~~

This way you have your admin controllers kept with the frontend controllers, you are sharing models, libraries and helpers and you still have some nice URL's.

### Summary

If your front and back end applications share nothing in common and never will do, use method #1. If you have a small site with one a few controllers and do not want the small overhead HMVC adds, use method #2. If you are working on a massive site that is modular and shares code between front and back ends, use method #3.

Got any more methods to handle admin structures? Let me know in the comments.

    dashboard.php

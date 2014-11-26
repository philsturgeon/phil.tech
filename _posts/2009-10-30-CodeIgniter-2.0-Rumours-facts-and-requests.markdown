---
layout: post
title: 'CodeIgniter "2.0": Rumours, facts and requests'
category: codeigniter
permalink: blog/2009/10/CodeIgniter-2.0-Rumours-facts-and-requests
excerpt: 'Ever since it was announced that ExpressionEngine 2.0 would be running on
  CodeIgniter, the forums have been jammed full of "CodeIgniter 2.0" questions. I
  have answer this so many times I wanted to clear things up and put some useful suggestions
  forward. '
date: '2009-10-30 12:45:00'
comments: 'true'
disqus_identifier: CodeIgniter-2.0-Rumours-facts-and-requests
---

_ **Update 22/03/2010:** Now that CodeIgniter 2.0 development code has been release this article is irrelevant. Please have a look at [CodeIgniter 2.0: Everything you need to know](/blog/2010/03/codeigniter-2)._

Ever since it was announced that ExpressionEngine 2.0 would be running on CodeIgniter, the forums have been jammed full of "CodeIgniter 2.0" questions. I have answer this so many times I wanted to clear things up. I have jammed this post full of "CodeIgniter 2.0" keywords so hopefully this will be the first thing these muppets spot - if they are smart enough to even Google search a query before posting it on the forums... again.

What started this off was Yet Another CI 2 question on the forums titled _ [CodeIgniter 2.0](http://codeigniter.com/forums/viewthread/133529/)_. This blew a restraint fuse and I had a bit of a rant.

> It’s not happening just yet. All the awesome features written for EE 2.0 are entirely separate to the CodeIgniter codebase. They have just extended and overridden the system to hell and will EVENTUALLY backport the features to CodeIgniter, therefore creating something that COULD be called CodeIgniter 2.0. It may be CodeIgniter 1.8, who knows.

This started off a brilliant follow-up topic, named _ [CodeIgniter 2.1](http://codeigniter.com/forums/viewthread/133546/)_ and it seems I have now been marked as "The go-to guy" for CodeIgntier 2 questions (mainly to piss me off).

I figured, instead of just ranting about it, I could use this oppertunity to discuss what is, what is not and what **should** be going into CodeIgniter over the next few versions. This list is compiled from the Bug Report section of the forums, #codeigniter IRC chat room and a few replies to [@philsturgeon](http://twitter.com/philsturgeon).

_ **Note:** I have filtered quite a few "Can I haz YouTubes?!" from this list._

### Confirmed features

These features will make it into the CodeIgniter repository **at some point** after ExpressionEngine 2 is released.

#### Modular MVC

This is a feature I have wanted in CodeIgniter for a _long_ time, and at [EECI2009](http://eeci2009.com/) Derek Allard has confirmed it (unofficially, wandering through a back alley on the way to a pub). Details on what features this will support are rather vague, but assuming it will be similar to a basic Matchbox or HMVC does not seem ridiculous. Modularity in CodeIgniter basically allows your controllers, models, views and other files to be grouped not just by type, but by module and then type - allowing you to keep your application broken down into logical groups which we call "modules". Eg: blog, users, gallery, etc would all be a separate module.

#### JavaScript library

My first reaction to having a JavaScript library within CodeIgniter was "Why?!". After time my feelings have lessened to a "Hmm..." but they will probably never get to the stage of "Yay!!!1". Basically this library abstracts common JavaScript framework functions such as show, hide, fade, basic event binding, etc. This to me seemed useless as server-side code cannot respond to the client-side events it builds, but after thinking it over for a while there may be a ways to take advantage of this.

### Missing features

There are features I need in nearly every application I work on that I have extended libraries to include. It drives me mad that some of these are not included in the core as they are not drastic changes to the core and are already developed and tested by many developers.

#### Add download() to FTP library

I have to add this in every time I work with FTP on a project. We have upload(), why not download()? I wrote this very simple method over 2 years ago and it was never included into the core. Why? Who knows.

#### FTP groups (like DB groups) for connecting to common servers

FTP connections to multiple servers right now is a pain. You have to either place multiple config arrays around your controllers or find some other solution to doing it. This should be supported out of the box in the same was as connections to database servers. This code has also been written up and can be found [here](http://codeigniter.com/forums/viewthread/57498/) along with my download() function.

#### DELETE with JOIN in DB-class

Another handy feature is SQL _DELETE_ via join. This allows you to delete lots of joined data spread over different tables without having to run separate queries. Those of you lucky enough to be using cascading foriegn keys in your tables need not worry about this, but for the rest of us it is a pain to use multiple queries. Supporting JOIN is a feature supported by MySQL, Oracle and PostgreSQL but it looks like MSSQL may have a bit more trouble.

A [workaround](http://codeigniter.com/forums/viewreply/366063/) that I have tested to work with MySQL is available from [Elliot Haughin](http://www.haughin.com/). This was written a while ago but looks like nobody ever got behind it enough to get it included into the core.

#### prep\_url() ignores https:// ftp:// etc

When using prep\_url() if your pass a link https://example.com you will end up with http://https://example.com. Enough said.

### Minor syntax changes

Small tweaks to simplify the syntax of things we do all the time.

#### Allow libraries to accept non-array params in constructor

Mainly just because I get pissed off writing _$this->load->library('piwik', array('server' => 'http://something.com/'));_ when _$this->load->library('piwik', 'http://something.com/');_ would do the job just as well. Not every library needs multiple constructor parameters. CodeIgniter not only does not support strings, ints and floats in the constructor but actively removes anything that is not an array.

#### Language helper support for sprintf()

It's not very often you have a language string that is entirely static. For example, if you want to write "Hello username and welcome to the site" you can either do it as two language strings with a variable in between, or the smooth "Hello %s and welcome to the site" and implement it with sprintf(lang('whole\_string'), $variable). I would like to see something like slang('whole\_string', $variable) just to make it neater and easier for new users to pick up.

### Crazy but helpful

#### Add hook to the end Controller constructor

CodeIgniter already has several hooks, the most used being pre\_controller and post\_controller\_constructor. The problem for me is that pre\_controller exists very early in the system flow and has no access to the database or a great deal of the CodeIgniter instance. The pre\_controller\_constructor hook has access to everything CodeIgniter has to offer, but it runs _after_ your controller constructor meaning any code in the constructor will ignore whatever you have done in the Hook.

To pick an example here, my pick\_language.php hook uses $\_SESSION and $\_GET to work out language then sets it using load\_class('Config'). I have no access to the database so users cannot pick a language and store it in the db. Why not use a post\_controller\_constructor hook? Well by that point I have loaded my language files, run database queries and all sorts of logic that is shared across all methods in a controller. With this new hook it would run after the CodeIgniter instance is loaded, but before any of my Controller code has started.

#### Form validation and JavaScript library integration to build validation rules

Using the JavaScript library as an abstraction layer over the framework libraries such as jQuery, the Form Validation library could use the provided validation rules to build up a string of JavaScript that could help validate your work. It would require a little configuration but imagine the benefits of automatically generated client-side _and_ server-side validation that you only need to write once. I had planned to do this quite some time ago, but with the addition of the JavaScript library this could be made a whole lot easier.

### What we wont see

EllisLab will not drop PHP 4 overnight and rewrite the whole core. We wont be seeing any "Automatic DRUD generators" that require one command line prompt and integration with telepathic control. And we wont be seeing anything amazing until some time after the ExpressionEngine release at he start of December '09. So stop asking everyone and be patient. The only people who know wont tell you, and as soon as the code is available it will be in the SVN.


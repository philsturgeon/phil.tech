---
layout: post
title: Upgrading to CodeIgniter 2.0
category: codeigniter
permalink: blog/2010/05/upgrading-to-codeigniter-2.0
excerpt: " \n\tThe CodeIgniter 2.0 branch is still coming together and has not yet
  been released, but it is getting considerably more stable as time goes on. If you
  want a smooth ride upgrading your application to run on CodeIgniter 2.0 then read
  this guide. "
date: '2010-05-05 23:31:00'
comments: 'true'
disqus_identifier: upgrading-to-codeigniter-2.0
---

As soon as I saw the tweet from EllisLab that [CodeIgniter 2.0-dev](http://bitbucket.org/ellislab/codeigniter/) was available on BitBucket I instantly converted [PyroCMS](http://pyrocms.com/) to run on it. I got it all working in a few hours after LOTS of headbanging, mouse throwing and blaspheming. All the bugs I found along the way have since been fixed in the 2.0 branch by the Ellis developers or myself.

While this does not mean everything is running perfectly, at the time of writing all the worrying bugs are squashed so it should be safe for us to have a play.

### Grab those new files

[Download](http://bitbucket.org/ellislab/codeigniter/get/tip.zip) the new files from BitBucket.

### What goes where

Slight change in the folder structure for some of you, the application/ folder and the system/ folder now sit next to each other.

So move your application folder up one level to sit next to system/ then delete that system/ folder. That has killed off CodeIgniter 1.7.2. Bye!

Now you need to copy the new downloaded system/ folder to the empty gap where the old one was.

Sadly that is not entirely it. You must also copy the following files from the new download to your installation:

- index.php
- application/config/foreign\_chars.php
- application/config/profiler.php

### Noticed that your controllers and models are broked?

CodeIgniter Controllers and Models used to be defined extend like this:

    class Blog_model extends Model

Now in CodeIgniter 2.0 you write:

    class Blog_model extends CI_Model

_ **Update 10/11/2010:** Remember to do this for Controllers too. Instead of Foo extends Controller, you must now write Foo extends CI\_Controller and all parent::Controller() calls must be changed to parent::\_\_construct()!_

Let's not argue about why, what, who, where, when, the fact is you have to do this. It can be achieved with some simple Find & Replace over your folder if your IDE/Text editor will allow it. For most applications (especially ones built primarilry during the 1.7.x era) you are nearly there now. Unless you use plugins or the old Validation class...

### Oh shit, I use plugins!

Well not any more you don't. Plugins are dead and gone so you need to convert them to be [Helpers](http://codeigniter.com/user_guide/general/helpers.html). Move them to the application/helpers and rename from "whatever\_pi.php" to "whatever\_helper.php". Theoretically there is more to what should be a plugin or helper than the name of the file but TBH they will work like this so who gives a damn at this stage?

Make sure you have moved any array values in application/config/autoload.php from $autoload['plugins'] to $autoload['helpers'] or you will notice stuff break.

### Validation is no more

You all had fair warning, it has been deprecated for several versions and now it is gone completely. You can:

> A.) Move to using the new [Form Validation class](http://codeigniter.com/user_guide/libraries/form_validation.html).
> 
> B.) Grab the old [Validation.php](http://bitbucket.org/ellislab/codeigniter/raw/3b6f3beea126/system/libraries/Validation.php) class and put it in your application/libraries/ folder.
> 
> C.) Whine like a little girl on the [forums](http://codeigniter.com/forums/).
### Strange change to $config['permitted\_uri\_chars']

I had to change "a-z 0-9~%.:\_-" to "a-z 0-9~%.:\_-" in my application/config/config.php. Notice the backslash () before the hyphen (-).

### Modular Separation / Modular Extensions

Out of the box Modular Separation won't work with CodeIgniter 2.0. Good thing I picked up the project and released a patch then huh? Grab the latest version in the 2.x branch from the [Modular Sepearation Wiki](http://codeigniter.com/wiki/Modular_Separation).

_Update 12/10/2010: Modular Separation has been merged back into Modular Extensions so they are now the same project. I wrote [a post explaining the merge](/news/2010/09/what-happened-to-modular-separation) which details the differences and explains how to upgrade._

### MY\_Controller and other extended libs

A new /system/core/ folder has been created for some libraries considered more core than others such as Router, Loader and Controller. If you extend any library that has now moved to /system/core/ you must now place it in /application/core/.

### CI\_Language has a new name

The core library CI\_Language has been renamed to CI\_Lang. For 80% of apps this will mean nothing at all. If you refference the library or extend it then you will of course need to rename this.

### Deprecated DB methods removed

After being deprecated since 1.6.x we finally see the back of the DB methods orwhere, orlike, groupby, orhaving, orderby and getwhere. They should now be or\_where, or\_like, group\_by, or\_having, order\_by and get\_where which is just a few more find/replace changes to run on your projects.

### Disable query strings or expect weirdness

This didn't happen in previous CodeIgniter versions but in 2.0 if you enable $config['enable\_query\_strings'] it will now generate links like http://example.php/index.php?/controller, or http://example.php/?/controller. You need to set enable\_query\_strings to false which will disable GET support. You can re-enable that with a MY\_Controller or hook that runs:

    parse_str($_SERVER['QUERY_STRING'], $_GET);

### Summary

That should be it! Up and running on CodeIgniter 2.0. Most of you won't need to have bothered with all the steps but they are worth keeping in mind for the future. If you spot anything I have missed please pester me in one of the usual ways.


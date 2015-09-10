---
layout: post
title: 'CodeIgniter 2.0: Everything you need to know'
category: codeigniter
alias: blog/2010/03/codeigniter-2
excerpt: " \n\tIt has been 6 months since the last CodeIgniter minor update and 18
  months since the last major update. Through all this time we were given no information
  about the next release of CodeIgniter, but finally 2.0 is on the way. "
date: '2010-03-11 17:42:00'
comments: true
disqus_identifier: codeigniter-2
---

It has been 6 months since the last CodeIgniter minor update and 18 months since the last major update. Through all this time we were given no information about the next release of CodeIgniter, but _finally_ 2.0 is on the way.

The EllisLab team have decided to drop [Subversion](http://subversion.apache.org/), use [Mercurial](http://mercurial.selenic.com/), track their tickets on [Assembla](http://www.assembla.com/) and host their code on [BitBucket](http://bitbucket.org/ellislab/codeigniter/)

### So what?

The change of Version Control System to us (the general public) makes no real difference, but it wil let the team work much quicker.

The change to Mercurial would not be as interesting if it was not for the fact they were hosting the code on BitBucket, which is the Mercurial equivalent of GitHub. This is potentially the best piece of news in this entire article.

By moving to a social-coding platform like this, CodeIgniter can face the same attention from the community that jQuery and CakePHP have recently received. jQuery 1.4 massively benefited by being moved to GitHub, as v1.4 was made up almost entirely of community patches and suggestions.

Essentially, if you spot a bug then you can fork CodeIgniter and make the change. Then if they like it, it may well get added in. Win!

### What about the code?

Well, there are a LOT of changes in the Changelog for 2.0 so far. Many of these are small tweaks, but the best?

> PHP 4 support is deprecated. Features new to 2.0.0 may not be support PHP 4, and all legacy features will no longer support PHP 4 as of 2.1.0.

Well thank fuck for that. It was not a huge surprise as ExpressionEngine 2.0 had dropped support for PHP 4, but the fact it has come down to CodeIgniter is brilliant. It means slowly but surely CodeIgniter can progress forwards with great new features without having to worry about coding it in a long-winded PHP 4 compatible fashion.

_ **Update 11/11/2010:** Support for PHP4 is now no longer deprecated, but totally removed. You must now use PHP 5.1.x and change your parent::Controller()'s to parent::\_\_construct()._

### Drivers

Drivers are a really useful feature that Kohana has had implemented for a while, but is rather difficult to explain. I'll let EllisLab do it for me:

> Drivers are a special type of Library that has a parent class and any number of potential child classes. Child classes have access to the parent class, but not their siblings. Drivers provide an elegant syntax in your [controllers](file:///Users/phil/Sites/classes/codeigniter-pre2/user_guide/general/controllers.html) for libraries that benefit from or require being broken down into discrete classes.

A great example of this is the new JavaScript library. That is the main "parent" class, then the jQuery "driver" inherits and does more specific code.

Another example could be a Cache class, which then has File, Memcache, APC, etc as drivers.

### Application "Packages"

This is a feature I have wanted for as long as I have been using CodeIgniter. It basically allows you to set extra directories that contain libraries, models, helpers, etc.

Example:

> /system/application/third\_party/foo\_bar  
>   
> config/  
> helpers/  
> language/  
> libraries/  
> models/

Using $this->load->add\_package\_path() you can set any full server path to use any shared location you like. No more faffing with symlinks or infecting system/libraries with your third party code.

### Core libraries

Core libraries like Router, Loader, Output, etc are all system/core, but look like they can still be extended/replaced by placing yours in system/application/core.

### Reserved Controller Names

The "reserved controller name" list is now tiny (if you are using PHP 5). They can be anything other than:

- \_ci\_initial
- Default
- index

That gives you a LOT more flexibility on what you can call your controllers after the massive list in PHP 4 support.

### More database config

- **swap\_pre** - A default table prefix that should be swapped with <var>dbprefix</var>. This is useful for distributed applications where you might run manually written queries, and need the prefix to still be customizable by the end user.
- **autoinit** - Whether or not to automatically initialize the database.
- **stricton** - TRUE/FALSE (boolean) - Whether to force "Strict Mode" connections, good for ensuring strict SQL while developing an application.

The most exciting of the lot there for me is **stricton**. I have had some real problems with [PyroCMS](http://pyrocms.com/) on MySQL Strict Mode installations as my local environment is not strict. Using this switch you can just turn MySQL Strict Mode on and make sure it lets you know about any possible errors that _would occur if you were running using Strict Mode._

### Goodbye plugins!

Plugins have been removed which should really help with the "Library, Helper or Plugin?" confusion. Now your code can be boiled down much eaiser:

**Helpers** - One or more functions  
**Libraries** - Lots of functions that share properties (and therefore needs to be a class)

Now the ambiguous "Plugins" have been replaced this is a much easier choice, as previously a plugin could be a function or a class. This should be the hardest upgrade step, but essentially all you need to do is find & replace "load->plugin(" with "load->helper(" and move _system/application/plugins/foo\_pi.php_ to _system/application/helpers/foo\_helper.php_ - no biggy.

### Summary

By the looks of it, CodeIgniter 2.0 brings along some brilliant new changes, a heap of bug-fixes for us to be content with. Nothing massive, nothing scary and nothing incompatible. With PHP 4 support on the way out we can all dance a little jig and look forward to a much more interesting future in CodeIgniter feature development.

For now, check out the [Changelog](http://bitbucket.org/ellislab/codeigniter/src/tip/user_guide/changelog.html) and subscribe to the [RSS feed](http://bitbucket.org/ellislab/codeigniter/rss/?token=b1ff7f584323d32165103f65e1bc60d6) or follow the [BitBucket project](http://bitbucket.org/ellislab/codeigniter/) to keep up to date with the progress.

**Edit:** [Michael Wales](http://www.michaelwales.com/2010/03/codeigniter-2-0-and-mercurial-transition/) and [Elliot Haughin](http://www.haughin.com/2010/03/11/codeigniter-2-critical-changes-implications/) have also written their views on the new CodeIgniter 2.0 announcement. Read their articles to get a good base of opinions on the subject.


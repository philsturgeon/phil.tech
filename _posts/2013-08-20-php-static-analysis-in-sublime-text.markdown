---
layout: post
title: PHP Static Analysis in Sublime Text
category: php
permalink: blog/2013/08/php-static-analysis-in-sublime-text
excerpt: While learning Python I really enjoyed how Sublime Text 2 would shout at
  me for using too many empty lines, using tabs instead of spaces and even things
  like declaring unused local variables, importing modules that were never used, etc.
  This was pretty cool, and I was soon writing beautiful Python code without any concern
  over which way things should be done, so lets get it working for PHP.
date: '2013-08-20 17:20:00'
comments: 'true'
disqus_identifier: php-static-analysis-in-sublime-text
---

Coding Standards have been around for the longest time and recently they're starting to become more widespread in PHP. While learning Python I really enjoyed how Sublime Text 2 would shout at me for using too many empty lines, using tabs instead of spaces and even things like declaring unused local variables, importing modules that were never used, etc. This was pretty cool, and I was soon writing beautiful Python code without any concern over which way things should be done.

I've been doing this with PHP for the last year, but trying to get a new-hire going with this stuff was hard. We smashed through it taking notes so now I've written it up for you guys.

## Step 1: Match PHP versions with your dev environment

If you locally develop using [Vagrant](http://www.vagrantup.com) or some other VM (and you really should be) you will most likely have a different local version of PHP to the one in the box.

_For me, on OSX `php -v` displayed PHP 5.3.15 and vagrant is on 5.4.6. Using [homebrew](http://brew.sh/) and the [homebrew-php](https://github.com/josegonzalez/homebrew-php) repo this was relatively easy._

You don't need to install all the extensions and everything to make it a fully operational environment, you just need to make sure that when `php -l` runs, Sublime Text 2 is using a version that understands the same syntax. For example, if you skip this step and your local version of php is 5.3, Sublime Text is going to shout errors at you every time you try to use a trait or short array syntax.

## Step 2: Moar Static Analysis Tools

There are several tools we'll be using: [PHP Mess Detector](http://phpmd.org/), [PHP CodeSniffer](https://github.com/squizlabs/PHP_CodeSniffer) and [PHP Coding Standards Fixer](https://github.com/fabpot/PHP-CS-Fixer).

<s>_Depending on how you have PEAR installed, you might need to prefix these commands with `sudo`._</s>

{% highlight console %}
$ pear channel-discover pear.phpmd.org
$ pear channel-discover pear.pdepend.org
$ pear install --alldeps phpmd/PHP\_PMD
$ pear install PHP\_CodeSniffer
{% endhighlight %}

**Update 13/12/2013:** The reason I originally suggested PEAR was down to homebrew doing some fairly odd shit when I tried installing these packages. It was trying to install a .phar but PHP was not allowed to create a phar itself, so I had to switch phar.readonly to Off in php.ini. It might be worth doing that - just to avoid PEAR - so once you've made the change run this:

{% highlight console %}
$ brew tap josegonzalez/homebrew-php
$ brew install phpmd
$ brew install php-code-sniffer
$ brew install php-cs-fixer
{% endhighlight %}

## Step 3: Install the Sublime PHP CS plugin

This is [the plugin](http://www.soulbroken.co.uk/code/sublimephpcs/) that brings it all together.

You'll need to go to "Preferences > Package Settings > PHP CodeSniffer > Settings - Default". Set these values:

{% highlight javascript %}
// Show the errors in the quick panel so you can then goto line
"phpcs\_show\_quick_panel": false,
{% endhighlight %}

Switching that to false will avoid the obnoxious pop-up that lists all errors in your face. Sometimes you want to ignore a few errors, this won't let you.

{% highlight javascript %}
// It seems python/sublime cannot always find the phpcs application
// If empty, then use PATH version of phpcs, else use the set value
"phpcs\_executable\_path": "/usr/bin/phpcs",
{% endhighlight %}

Set the full path to phpcs. You can use `which phpcs` for this.

{% highlight javascript %}
"phpcs\_additional\_args": {
    "--standard": "psr2",
    "-n": ""
},
{% endhighlight %}

Because you know you love spaces over tabs.

{% highlight javascript %}
// Path to where you have the php-cs-fixer installed
"php\_cs\_fixer\_executable\_path": "/usr/local/bin/php-cs-fixer",
{% endhighlight %}

Find the fixer.

{% highlight javascript %}
// Are we going to run php -l over the file?
"phpcs\_linter\_run": true,
{% endhighlight %}

Here is the linting we were taking about.

{% highlight javascript %}
// Execute phpmd
"phpmd\_run": true,
{% endhighlight %}

Will shout at you for producing stupidly complex functions and methods. If it says a method is complicated, try splitting it in half.

{% highlight javascript %}
// It seems python/sublime cannot always find the phpmd application
// If empty, then use PATH version of phpmd, else use the set value
"phpmd\_executable\_path": "/usr/bin/phpmd",
{% endhighlight %}

Tell Sublime where phpmd is.

Play around with the other settings if you like, but do that in "Settings - User" so you still have this default to fall back on. This default is the least invasive and most useful setup I have so far, but can certainly be tweaked.

## Other IDEs

If you want to do this with something other than Sublime Text then there are plenty of other options.

Only one IDE I've spotted so far has CodeSniffer support out of the box:

* [PHPStorm](http://www.jetbrains.com/phpstorm/webhelp/code-sniffer.html)

Some require extensions but have some simple tutorials:

* [Eclipse](http://www.rdeeson.com/weblog/89/enforce-coding-standards-with-php_codesniffer-and-eclipse-ide-on-ubuntu-linux.html)
* [NetBeans](http://www.amaxus.com/cms-blog/coding-standards-netbeans-php-codesniffer)
* [VIM](http://joncairns.com/2012/03/vim-with-php-code-sniffer-mess-detector-and-code-coverage/)


Wether you think coding standards are important or not, at some point in your career you are almost certainly going to be forced to use one. Some Lead Developers like me will use CodeSniffer to detect invalid formatting on the Continuous Integration server (Jenkins, Travis-CI, Bamboo, etc). Depending on how the thresholds for checkstyle warnings are configured, a developer placing too many brackets and new lines in the wrong place could mark the build as unstable, or even fail it.

This might all sound petty, but some rules have extremely valid reasons. You put a new line at the end of the file? That could let whitespace sneak into the output, which will cause bugs in production. I figure it is better for your IDE/editor to shouts at you, rather than the whole dev team.
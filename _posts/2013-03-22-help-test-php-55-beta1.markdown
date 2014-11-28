---
layout: post
title: Help test PHP 5.5 beta1
category: php
permalink: blog/2013/03/help-test-php-55-beta1
excerpt: Yesterday PHP.net announced the release of PHP 5.5 Beta-1. This is a great
  news after the concerns that merging Zend Optimizer would really slow things down,
  but the releases are still ticking along. So, what can you do to help out? Test
  it, without doing any work.
date: '2013-03-22 11:26:00'
comments: 'true'
disqus_identifier: help-test-php-55-beta1
---

Yesterday PHP.net announced the release of PHP 5.5 Beta-1. This is a great news after the concerns that [merging Zend Optimizer+](https://wiki.php.net/rfc/optimizerplus) would really slow things down, but the releases are still ticking along. So, what can you do to help out? Test it, without doing any work.

If you're on Ubuntu you can run these commands:

{% highlight console %}
$ sudo apt-get install re2c  
$ sudo apt-get install bison
{% endhighlight %}

If you're on OSX then you can install using Homebrew:

{% highlight console %}
$ sudo brew install re2c  
$ sudo brew install bison
{% endhighlight %}

Thinking about running any of this on Windows makes my brain itch, so you'll have to work that out for yourself.

With those tools installed simply clone the repo, build and run tests:

{% highlight console %}
$ cd /tmp  
$ git clone http://git.php.net/repository/php-src.git -b PHP-5.5  
$ cd php-src  
$ ./buildconf  
$ ./configure --disable-all --enable-debug --enable-maintainer-zts  
$ make test
{% endhighlight %}

60% of the time, this works every time. If it fails you'll see a summary of the failed test(s)


<pre><blockquote>
 =====================================================================
 FAILED TEST SUMMARY
 ---------------------------------------------------------------------
 Test fileperms() & chmod() functions: usage variation - misc. perms [    
 ext/standard/tests/file/006_variation2.phpt]
 chmod() basic functionality [ext/standard/tests/file/chmod_basic.phpt]
 =====================================================================
 
 You may have found a problem in PHP.
 This report can be automatically sent to the PHP QA team at
 http://qa.php.net/reports and http://news.php.net/php.qa.reports
 This gives us a better understanding of PHP's behavior.
 If you don't want to send the report immediately you can choose
 option "s" to save it.  You can then email it to qa-reports@lists.php.net later.
 Do you want to send this report now? [Yns]: Y
 
 Please enter your email address.
 (Your address will be mangled so that it will not go out on any
 mailinglist in plain text): me@example.com
 
 Posting to http://qa.php.net/buildtest-process.php
 
 Thank you for helping to make PHP better.
</blockquote></pre>

Any errors will be reported for you, and there you have it, you've helped make PHP more stable.

If you have multiple operating systems available to you (various Vagrant boxes rocking different environments, or a work laptop) then go and run the tests there too. The more this is run on different environments the better.

Finally, if you're using PHP 5.4 on your servers, why not make a PHP 5.5 branch in your repo and test this out on a vagrant box somewhere? If your code needs changes then you can keep that branch up to date, so when PHP 5.5.0 final releases you're ready to go as soon as your servers upgrade. No harm, no foul.

PHP 5.5 looks awesome, so anything you can do to help get it stable means we all get it faster and less buggy.
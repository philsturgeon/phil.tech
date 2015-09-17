---
layout: post
title: CodeIgniter on PHP 5.3
category: codeigniter
alias: blog/2009/12/CodeIgniter-on-PHP-5.3/
excerpt: "Find out how to make PHP 5.3 shut up complaining about \"warning: date():
  It is not safe to rely on the system's timezone settings\" and deprecated functions
  in your CodeIgniter applications. "
date: '2009-12-10 11:45:00'
comments: true
disqus_identifier: CodeIgniter-on-PHP-5.3
---

Last night I set up Zend Community Server with PHP 5.3 and gave PyroCMS (running CodeIgniter 1.7.2) a spin. Out of the box v0.9.7.3 and v0.9.8-dev seemed to work fine, except for a single Warning at the top of each page:

_"warning: date(): It is not safe to rely on the system's timezone settings. You are \*required\* to use the date.timezone setting or the date\_default\_timezone\_set() function. In case you used any of those methods and you are still getting this warning, you most likely misspelled the timezone identifier."_

To fix this, you only need to edit the main index.php for your CodeIgniter application:

~~~php
/*
 |---------------------------------------------------------------
 | DEFAULT TIMEZONE
 |---------------------------------------------------------------
 |
 | Set the default timezone for date/time functions to use if
 | none is set on the server.
 |
 */

if( ! ini_get('date.timezone') )
{
   date_default_timezone_set('GMT');
}
~~~

This modification is something you will probably need to make for any CodeIgniter application running on PHP 5.3 and can easily be modified to your local timezone. There is a full list of supported timezones in the PHP manual [here](http://uk2.php.net/manual/en/timezones.php "Full list of supported timezones in PHP").

Another tweak that might be worth trying (although not something I had an issue with on my apps) will be removing error messages for deprecated functions. I personally would prefer to see these so I know what to fix, but if you are trying to fix an app running on PHP 5.3 quickly, change your error reporting level in index.php like so:

~~~php
/*
 |---------------------------------------------------------------
 | PHP ERROR REPORTING LEVEL
 |---------------------------------------------------------------
 |
 | By default CI runs with error reporting set to ALL. For security
 | reasons you are encouraged to change this when your site goes live.
 | For more info visit: http://www.php.net/error_reporting
 |
 */

error_reporting(E_ALL & ~E_DEPRECATED);
~~~

Have you noticed any other problems when upgrading your CodeIgniter applications to PHP 5.3? If so (and the damn captchas are actually working...) please let me know in the comments.

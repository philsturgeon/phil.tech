---
layout: post
author: [Phil]
title: UTF-8 support for CodeIgniter
tags: [codeigniter]
excerpt: 'Writing a CodeIgniter application is easy. Writing a CodeIgniter application
  that supports all characters from multiple languages? Not so easy. Find out how
  to support UTF-8 content in CodeIgniter. '
date: '2009-08-17 15:05:00'
comments: true
disqus_identifier: UTF-8-support-for-CodeIgniter
alias: blog/2009/08/UTF-8-support-for-CodeIgniter/
alias_1: codeigniter/2009/08/17/utf-8-support-for-codeigniter/
---

Writing an application is easy. Writing an application that supports all characters from multiple languages? Not so easy.

The main problem comes from way back, when the main language in computing was English. The ASCII characters were given numbers from 1 to 128 a-z, A-Z, 0-9 and punctuation. That is fine for the English language but pretty much every other language out there has characters that don't fit in there. To address this, we have UTF-8, which can store extra characters as multiple-bits and is backwards compatible with ASCII.

To make your [CodeIgniter](http://codeigniter.com/ "CodeIgniter - PHP MVC Framework") application play nicely with UTF-8 you have a few things to think about.

### Set the HTTP header in index.php

All requests to CodeIgniter are made through the index.php file which by default sits outside the system/ folder. For this reason it makes a perfect place to add a PHP header for me.

~~~php
header('Content-Type: text/html; charset=utf-8');
~~~

### Tell CodeIgniter what's going on

CodeIgniter by default is set to use UTF-8 for much of its internal functionality, so just make sure the charset is set to UTF-8 in your **application/config/config.php** file.

~~~php
$config['charset'] = "UTF-8";
~~~

### Configure database connection

~~~php
$db['default']['char_set'] = "utf8"; $db['default']['dbcollat'] = "utf8_unicode_ci";
~~~

The default here is normally utf8\_general\_ci which is a pretty weak for of Unicode. This is a quote from [StackOverflow](http://stackoverflow.com/questions/1036454/what-are-the-diffrences-between-utf8generalci-and-utf8unicodeci) which I think explains things pretty well.

> "utf8\_unicode\_ci is generally more accurate for all scripts. For example, on Cyrillic block: utf8\_unicode\_ci is fine for all these languages: Russian, Bulgarian, Belarusian, Macedonian, Serbian, and Ukrainian. While utf8\_general\_ci is fine only for Russian and Bulgarian subset of Cyrillic. Extra letters used in Belarusian, Macedonian, Serbian, and Ukrainian are sorted not well."
### Set up or convert your MySQL

To get this working you need to use MySQL 4.1 (or higher) with utf8 support enabled, but this is pretty standard for most web-hosts.

~~~sql
CREATE DATABASE example     CHARACTER SET utf8     DEFAULT CHARACTER SET utf8     COLLATE utf8_unicode_ci     DEFAULT COLLATE utf8_unicode_ci;
~~~

If you already have the database set up and running, you can use the following code to convert the database to use UTF-8.

~~~sql
ALTER DATABASE example    CHARACTER SET utf8    DEFAULT CHARACTER SET utf8    COLLATE utf8_unicode_ci    DEFAULT COLLATE utf8_unicode_ci;
~~~

Now the database is ready, you need to add in some tables.

~~~sql
CREATE TABLE blog (    id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,    title VARCHAR(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',    body TEXT COLLATE utf8_unicode_ci NOT NULL DEFAULT '',) DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
~~~

As with the database, if your tables already exist then you can use the following code to convert your data. You might get some fairly strange results if it is full of data in another non-English character set, but on the whole this has never been an issue for me.

~~~sql
ALTER TABLE blog (    id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,    title VARCHAR(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',    body TEXT COLLATE utf8_unicode_ci NOT NULL DEFAULT '',) DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
~~~

### And finally, set up your Meta Data.

The last place to set for UTF-8 support is in your HTML in the `<head>` tag. You can use CodeIgniter's meta() function in the [HTML helper](http://codeigniter.com/user_guide/helpers/html_helper.html "CodeIgniter User Guide: HTML Helper") or plain HTML. 

~~~php
<html>   <head>     <?php echo meta('Content-type', 'text/html; charset='.config_item('charset'), 'equiv');?>

<!-- or -->

<meta http-equiv="content-type" content="text/html; charset=<?php echo config_item('charset');?>" />   </head>
~~~
     

I have used the config item instead of just putting in UTF-8 as it makes more sense from a programming point of view. If for any reason your charset is changed in the future, that is one less place to change it.

Now your CodeIgniter application is ready, you need to make sure your database GUI is too. I regularly use Navicat and phpMyAdmin and on both you can set the "MySQL connection collation", so make sure that is set to "utf8\_unicode\_ci" too or it could show characters wrong and will most likely corrupt your data as you work on it.

For more help developing with UTF-8, take a look at " [Handling UTF-8 with PHP](http://www.phpwact.org/php/i18n/utf-8)" which will explain some of the problems of using the normal string functions on UTF-8 strings, then take a look at PHP's " [Multibyte String Functions](http://uk3.php.net/manual/en/ref.mbstring.php)" manual pages to learn how to handle your new happily stored UTF-8 data.

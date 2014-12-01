---
layout: post
title: 'How to: Multi-site CodeIgniter Set-up'
category: codeigniter
permalink: blog/2009/06/How-to-Multi-site-CodeIgniter-Set-up
excerpt: 'A few people have asked me recently about setting up CodeIgniter to run
  across multiple domains based on the same codebase, so here are a few tips on how
  to get this working on your CodeIgniter set-up. '
date: '2009-06-22 21:35:00'
comments: true
disqus_identifier: How-to-Multi-site-CodeIgniter-Set-up
---

A few people have asked me recently about setting up CodeIgniter to run across multiple domains based on the same codebase. This can be handy for sites than run different databases for different geographical areas, all of which need the same code but different content.

To get this working I took a little code from [PyroCMS](http://pyrocms.com/) and modded a previous article " [How to: Support multiple production environments in CodeIgniter](news/2009/01/How-to-Support-multiple-production-environments-in-CodeIgniter.html)" and found a relatively simple solution.

### Setting the base URL

The first step of getting CodeIgniter working anywhere automatically is curing it of it's most pointless configuration setting. It seems CodeIgniter would like to be told where it is, which really doesn't need to happen. We could solve this in many ways, but instead of extending or replacing any core code, I would prefer to put a little snippet of code into the main application/config/config.php. Enter this code into the file and it will automatically support pretty much any kind of URL.

    <?php if (!defined('BASEPATH')) exit('No direct script access allowed');/*|--------------------------------------------------------------------------| Base Site URL|--------------------------------------------------------------------------|| URL to your CodeIgniter root. Typically this will be your base URL,| WITH a trailing slash:|| http://www.your-site.com/|*/if(isset($_SERVER['HTTP_HOST'])){    $config['base_url'] = isset($_SERVER['HTTPS']) && strtolower($_SERVER['HTTPS']) == 'on' ? 'https' : 'http';    $config['base_url'] .= '://'. $_SERVER['HTTP_HOST'];    $config['base_url'] .= str_replace(basename($_SERVER['SCRIPT_NAME']), '', $_SERVER['SCRIPT_NAME']);}else{    $config['base_url'] = 'http://localhost/';}

### Setting a SITE constant

So the website URL is now set and links are fully working around the site. Next we need a way to work out throughout our code which site is currently being used. Amongst other things, this will help us with selecting the right database settings later.

    /*|--------------------------------------------------------------------------| Site| Set a constant for whichever site you happen to be running, if its not here| it will fatal error.|--------------------------------------------------------------------------*/switch($_SERVER['HTTP_HOST']){    case 'example.com':    case 'www.example.com':        define('SITE', 'example');    break;        case 'example2.com':    case 'www.example2.com':        define('SITE', 'example2');    break;        default:        define('SITE', 'default');    break;}

### Domain based database settings

Now that CodeIgniter has its links working and it knows what site it is trying to run, it needs to know the database configuration for this domain. To do that, we can break down our config into domain specific "Database groups".

    <?php if (!defined('BASEPATH')) exit('No direct script access allowed');/*| -------------------------------------------------------------------| DATABASE CONNECTIVITY SETTINGS| -------------------------------------------------------------------| This file will contain the settings needed to access your database.|| For complete instructions please consult the "Database Connection"| page of the User Guide.|| -------------------------------------------------------------------| EXPLANATION OF VARIABLES| -------------------------------------------------------------------|| ['hostname'] The hostname of your database server.| ['username'] The username used to connect to the database| ['password'] The password used to connect to the database| ['database'] The name of the database you want to connect to| ['dbdriver'] The database type. ie: mysql. Currently supported: mysql, mysqli, postgre, odbc, mssql| ['dbprefix'] You can add an optional prefix, which will be added| to the table name when using the Active Record class| ['pconnect'] TRUE/FALSE - Whether to use a persistent connection| ['db_debug'] TRUE/FALSE - Whether database errors should be displayed.| ['active_r'] TRUE/FALSE - Whether to load the active record class| ['cache_on'] TRUE/FALSE - Enables/disables query caching| ['cachedir'] The path to the folder where cache files should be stored|| The $active_group variable lets you choose which connection group to| make active. By default there is only one group (the "default" group).|*/$active_record = TRUE;$db['default']['hostname'] = "localhost";$db['default']['username'] = "";$db['default']['password'] = "";$db['default']['database'] = "";$db['default']['dbdriver'] = "mysql";$db['default']['dbprefix'] = "";$db['default']['pconnect'] = TRUE;$db['default']['db_debug'] = TRUE;$db['default']['cache_on'] = FALSE;$db['default']['cachedir'] = "";$db['default']['char_set'] = "utf8";$db['default']['dbcollat'] = "utf8_general_ci";// example$db['example']['hostname'] = "localhost";$db['example']['username'] = "root";$db['example']['password'] = "";$db['example']['database'] = "example";$db['example']['dbdriver'] = "mysql";$db['example']['dbprefix'] = "";$db['example']['active_r'] = TRUE;$db['example']['pconnect'] = TRUE;$db['example']['db_debug'] = TRUE;$db['example']['cache_on'] = FALSE;$db['example']['cachedir'] = "";$db['example']['char_set'] = "utf8";$db['example']['dbcollat'] = "utf8_general_ci";// Example 2$db['example2']['hostname'] = "localhost";$db['example2']['username'] = "root";$db['example2']['password'] = "root";$db['example2']['database'] = "testfoo";$db['example2']['dbdriver'] = "mysql";$db['example2']['dbprefix'] = "";$db['example2']['active_r'] = TRUE;$db['example2']['pconnect'] = TRUE;$db['example2']['db_debug'] = TRUE;$db['example2']['cache_on'] = FALSE;$db['example2']['cachedir'] = "";$db['example2']['char_set'] = "utf8";$db['example2']['dbcollat'] = "utf8_general_ci";// Check the configuration group in use exists, if not use the default$active_group = (defined('SITE') && array_key_exists(SITE, $db)) ? SITE : 'default';?>

The little snippet of code at the bottom will check to see if the SITE constant you have set matches up with a database group. If it doesn't, it will use the default configuration group.

Your CodeIgniter set-up should now work with any domain you happen to point to it. You even run simple little if(SITE == 'example2') checks anywhere within your code to do special code for a certain site, although I would not recommend you doing this too heavily.


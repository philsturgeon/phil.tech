---
layout: post
author: [Phil]
title: Composer with CodeIgniter
tags: [php]
excerpt: Composer is the best thing for PHP since sliced arrays and using it in your
  applications means you have easy access to a large selection of well written PHP
  packages that plug and play with any framework that supports PSR-0 namespacing.
  This is BRILLIANT as it means less reliability on the framework and framework-specific
  code, and helps you get towards the goal of portable code where the framework is
  essentially just the wrapper. FuelPHP will support Composer packages out of the
  box as does Symfony2 and I hear Drupal are working it in too. This interoperability
  is brilliant, but how do you use it with CodeIgniter?
date: '2012-05-07 12:08:00'
comments: true
disqus_identifier: composer-with-codeigniter
alias: blog/2012/05/composer-with-codeigniter/
alias_1: php/2012/05/07/composer-with-codeigniter/
---

Composer is the [best thing for PHP since sliced arrays](/blog/2012/03/packages-the-way-forward-for-php) and using it in your applications means you have easy access to a large selection of well written PHP packages that plug and play with any framework that supports PSR-0 namespacing. This is BRILLIANT as it means less reliability on the framework and framework-specific code, and helps you get towards the goal of portable code where the framework is essentially just the wrapper. FuelPHP 1.x works with an optional autoloader and 2.0 will support Composer packages out of the box as does Symfony2 and I hear Drupal are working it in too. This interoperability is brilliant, but how do you use it with CodeIgniter?

People have suggested that [CodeIgniter 3.0](https://github.com/EllisLab/CodeIgniter) should be rewritten entirely around Composer and we make it PHP 5.3 only, but rewriting is a silly suggestion and PHP 5.3 still only has about 30% coverage on servers so that is not going to happen. Besides if CodeIgniter 3.0 became PHP 5.3 over night then either it would break everyone's application because it changed so much, or change so little that it would not merit a PHP version bump.

That said, if you want to start using Composer components in your application there is no reason why you should not. The code is mainly PHP 5.3 but by slowing moving the majority of your application from framework specific code to generic packages that work in any framework you free yourself from being limited to a specific framework and will find a transition to FuelPHP 2.0, Laravel or Symfony2 much easier in the future.

Sadly Laravel have not announced any plans to exclusively support Composer out of the box, but it is just as easy to work with [Composer in Laravel](http://www.keithloy.me/2012/04/composer-with-laravel/) as it is in CodeIgniter, so let's get going:

### Step 1

Navigate to your project and install composer:

~~~bash
$ cd /path/to/my/project
$ curl -s http://getcomposer.org/installer | php
~~~

You could instead use [Homebrew](http://mxcl.github.com/homebrew/) to install composer system-wide, which is my preference:

__Update: __ It turns out the homebrew package is pretty old. I installed a few weeks previous to this post, but users are having problems. Use the .phar method for now.

~~~bash
$ brew install composer
~~~

### Step 2

Next you need to make a __composer.json__ in the root of your project (not the application folder):


~~~json
{
    "require": {
        "kriswallsmith/buzz": "*"
    }
}
~~~

This will add a requirement for the Buzz package, which is a handy HTTP Request / Response PHP 5.3.x class. 

### Step 3

To actually install these files to your CodeIgniter project you simply run the install command:

~~~bash
$ composer.phar install
~~~

If you have installed via Homebrew then this will be:

~~~bash
$ composer install
~~~

Then you should notice composer creating a __./vendors__ folder in your application and code will be installed there. 

### Step 4

To autoload this newly installed code all you need to do is drop a single line of PHP into your __index.php__

~~~php
include_once './vendor/autoload.php';
~~~

### Done

It is as simple as that. Now in my test controller I can use Buzz happily, along with any other PSR-0 code that I install via Composer:

~~~php
class Test extends CI_Controller
{
	public function index()
	{
		$browser = new Buzz\Browser();
		$response = $browser->get('http://www.google.com');

		echo $browser->getLastRequest()."\n";
		echo $response;
	}
}
~~~

To see what is available check out [Packagist](http://packagist.org/packages/) - the default repo for Composer packages.

If you are not familiar with Composer or PSR-0 support then you should really look into it. The [PHP Standards group](http://groups.google.com/group/php-standards) or [PHP-FIG](https://github.com/php-fig) are doing a brilliant job of taming the mess that is third-party PHP code and are building some great [standards](https://github.com/php-fig/fig-standards), which are open to discussion and voted on by some of the best PHP developers around. 

Get involved and help PSR-1 and PSR-2 become something brilliant. In the mean-time enjoy all the PSR-0 code and use it wherever the hell you develop. 

Stop making CodeIgniter libraries, Laravel bundles and Zend modules, make Composer packages.

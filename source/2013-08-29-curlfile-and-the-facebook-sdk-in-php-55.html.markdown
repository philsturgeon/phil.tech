---
layout: post
title: CurlFile and the Facebook SDK in PHP 5.5
category: php
alias: blog/2013/08/curlfile-and-the-facebook-sdk-in-php-55/
excerpt: The Facebook PHP SDK is currently broken if you're running PHP 5.5 and are
  trying to upload files. I've made a little pull request and explained what is happening,
  primarily as a Google-catcher for anyone else having the same problem.
date: '2013-08-29 18:53:00'
comments: true
disqus_identifier: curlfile-and-the-facebook-sdk-in-php-55
---

One of the features implemented in PHP 5.5 was [CurlFile](http://us2.php.net/manual/en/class.curlfile.php), a nice addition to the Curl extension to allow you to specify specific arguments as a file for upload.

In previous versions (pre-PHP 5.5) the syntax looked like this:

~~~php
$facebook->api("/me/photos", 'POST', [
    'source' => '@/foo/bar.jpg',
    'message' => $message,
]);
~~~
    
If you're lucky enough to be working with PHP 5.5 that code will throw a deprecated warning:

> curl\_setopt\_array(): The usage of the @filename API for file uploading is deprecated. Please use the CURLFile class instead

I have an error handler which will throw any warnings/notices/etc as ErrorException to help me debug stuff locally and on my testing servers, and this was something that started happening. A little digging around lead me to try this syntax:

~~~php
$facebook->api("/me/photos", 'POST', [
    'source' => new CURLFile('/foo/bar.jpg', 'image/jpeg'),
    'message' => $message,
]);
~~~
    
Sadly while Curl was happy with this, the Facebook PHP SDK (v3.2.2) was not. It turns out the SDK will turn ANY value you send it in that params array into a string. Meaning this was being sent up:

~~~php
array(4) { 'source' => string(70) "{"name":"\/foo\/bar.jpg","mime":"image\/jpeg","postname":""}" 'message' => string(20) "This is another test" 'method' => string(4) "POST" 'access_token' => string(214) "sneakysneaky" }
~~~
    
So, the CurlFile instance was being converted to JSON. Not helpful.

I fixed this up with a super-simple [pull request](https://github.com/facebook/facebook-php-sdk/pull/89) which will hopefully be merged and be released as v3.2.3, as we can't have the Facebook SDK just *not work* with PHP 5.5.

If you'd like to use my fork in the mean-time, just shove this in your `composer.json` and run a `composer update`:

~~~js
    "repositories": [
        {
            "type": "vcs",
            "url": "https://github.com/philsturgeon/facebook-php-sdk"
        }
    ],
~~~

This is not a fault with the Facebook SDK directly and I'm going to patch any other libraries I come across with this issue. If you're using PHP 5.5 please do the same with anything you come across and others won't have to worry about this at all.

P.S If anyone is wondering about the usefulness of CurlFile, have you remembered to protect your user-contributed inputs to make them not start with `@`? If you don't, somebody creating a caption with "@Phil Hey Buddy!" will try to upload a file from your server called "Phil Hey Buddy!". There are more than a few security implications there, so forcing people to wrap their file uploads up is going to save a lot of problems. If you're still on PHP 5.4 do something like this:

~~~php
(substr($message, 0, 1) === '@') and $message = '.'.$message;
~~~

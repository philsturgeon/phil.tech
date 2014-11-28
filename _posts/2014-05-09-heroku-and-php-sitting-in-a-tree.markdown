---
layout: post
title: Heroku and PHP Sitting in a Tree. K.I.S.S.I.N.G
category: php
redirect_from: /blog/2014/05/heroku-and-php-sitting-in-a-tree/
excerpt: Heroku was - as far as I remember - the first (mainstream) PaaS on the market.
  It was Ruby-only but it was that symbol of modern web development at the time, with
  the whole "slinging code", "getting shit done", make a Git repo and start shipping
  bro, hack project/agile-til-it-works mindset.  Since then I've been wishing they
  would add official PHP support. And... guess what they just did.
date: '2014-05-09 12:54:00'
comments: 'true'
disqus_identifier: heroku-and-php-sitting-in-a-tree
---

Heroku was - as far as I remember - the first (mainstream) PaaS on the market. It was Ruby-only but it was that symbol of modern web development at the time, with the whole "slinging code", "getting shit done", make a Git repo and start shipping bro, hack project/agile-til-it-works mindset. 

I made a few Rails apps back in the day, one of them being [Travlr](http://travlrapp.com/) (which I should probably take down) and more recently [Bieber.ly](http://techcrunch.com/2011/01/13/bieberly-justin-bieber/) and it was always amazing to work with. Git push your code, its deployed, one-click installs and drag to scale. It sucked that it was always for Ruby, because as I was also doing a _lot_ of work in PHP I obviously wished I could have the same for my other projects.

Then PHP-Fog (later rebranded as App Fog) came along, with the slogan "Heroku for PHP!" I got excited and started using it - immediately taking my blog over to them and putting a few simple new client applications on there, but it was early days and it didn't do as much. It was ok, but it wasn't amazing. The scaling would sometimes take a REALLY long time and it would essentially delete your app and install a new copy, losing any temporary data. There was also no way to SSH in and download stuff or tweak anything or do... anything that you realistically wanted to do. 

Orchestra.io came along, and the founder [Eamon Leonard](https://twitter.com/EamonLeonard) was kind enough to give me a demo of the early versions. Again, it was early, but it didn't seem to do as much as PHP Fog did, which was already less than I wanted. 

[Pagodabox](https://pagodabox.com/) came along and offered a _lot_ more functionality. It was amazing. It had instant scaling up and down, both horizontally and vertically, it offered all sorts of caching options and had SSH access so you could rsync any user generated content down and make backups. (Yes, you should use S3 or something, but try telling that to clients using old shitty CMSs that don't support it). Pagodabox was amazing, so I moved my blog to it, and put a few simple client projects up there.

Heroku then started offering official support for Python, Node, Java... a _bunch_ of platforms but... not PHP. I mean, you could kinda hack it in there but the platform was shitty and setup was a combination of weird commands. It was a second class citizen only supported by third-party buildpacks like the -incredibly good -  [CHH](https://github.com/CHH/heroku-buildpack-php) buildpack. I played around with it a bit, but continued to wait for PHP support before moving anything substantial over there. 

Orchestra.io then was [acquired by EngineYard](http://techcrunch.com/2011/08/23/engine-yard-acquires-orchestra-to-add-php-support-to-its-paas/), Heorku's biggest competitor. Woah! I hoped Heroku would get going with PHP properly then, but no... ahh sod it though,we still have these other three options to play with. Right?

With these options available I optimistically called 2012 [The Year of PHP Cloud Hosting](/blog/2012/01/2012-the-year-of-php-cloud-hosting). By the end of the year I was [calling myself a fool](/blog/2012/10/cloud-hosting-php-pipe-dream) for ever thinking it could be done properly.

Pagodabox was the most feature complete, but as stable as a wet fart. PHP Fog stopped having work done as App Fog came along, and App Fog just seemed to be missing crucial features. A few other options came and went within the space of a few months and some were always there but... there were a lot of shit options around.

It seemed like a lot of these companies were making these platforms for the sake of making them, and not really understanding the problem space properly.

[Fortrabbit](http://fortrabbit.com) was the savior for the last year and they've been a big hit in the Laravel community, but they sadly do not have all that many addons and compared to some other hosting solutions (and some of their since failed competition) they felt a little on the expensive side.

The only time I got to use Heroku properly recently was when me and [Zack](http://twitter.com/zackkitzmiller) built [madeinproduction.com](http://madeinproduction.com) with Python/Flask. I still missed it.

Then guess who came along? 

[BLOODY HEROKU DID!](https://blog.heroku.com/archives/2014/4/29/introducing_the_new_php_on_heroku)

Heroku hired [David Zuelke](https://twitter.com/dzuelke) to help them bring PHP onto the platform as an officially supported language. I'd seen his name around GitHub plenty whilst working with the CHH buildpack and a few other pieces, and I knew this would be a good sign. A few months later there was a private beta, and now PHP is public beta on Heroku. 

![WINNING](http://www.reactiongifs.com/r/yay.gif)

It took me longer to write this blog than it did to migrate this [PyroCMS](http://pyrocms.com)-based blog to Heroku.

PyroCMS 2.2 is a little old now, and it only supports MySQL. Luckily 2.3 will be out soon which supports PostgreSQL and SQLite too, but in the mean-time I just added the [ClearDB MySQL Addon](https://addons.heroku.com/cleardb) and I'm up and running. It took me literally about 10 minutes.

I create the app on Heroku through their web interface.

I had to link my local codebase to a Heroku app.

> $ git remote add heroku git@heroku.com:philsturgeon.git

Logged into heroku on the command line. If you dont have the command-line app you will want to [install that](https://devcenter.heroku.com/articles/quickstart).

> $ heroku login

Pick an SSH key to add to your account. (No waiting 5-15 minutes like most other PHP PaaS systems, this one is instant.)

> $ heroku keys:add 

Added a database (for free, up to 5mb).

> $ heroku addons:add clearedb

Updated my system/cms/database.php to use the ENV variable they set pointing to the database. Make your own system/cms/development/database.php to override this with your local MySQL config.

{% highlight php %}
<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

$url = parse_url(getenv("CLEARDB\_DATABASE\_URL"));

// Staging and Production
$db['default'] = array(
    'hostname'		=> 	$url["host"],
    'username'		=> 	$url["user"],
    'password'		=> 	$url["pass"],
    'database'		=> 	substr($url["path"], 1),
    'dbdriver' 		=> 	'mysqli',
    'active_r' 		=>	true,
    'pconnect' 		=>	false,
    'db_debug' 		=>	true,
    'cache_on' 		=>	false,
    'char_set' 		=>	'utf8',
    'dbcollat' 		=>	'utf8_unicode_ci',
);

// Assign the group to be used
$active_group = 'default';
{% endhighlight %}


They need a composer.json in there and PyroCMS 2.2 doesn't have one. ([PyroCMS 2.3 does](https://github.com/pyrocms/pyrocms/blob/2.3/develop/composer.json).)

> $ touch composer.json && git add composer.json

Set the `PYRO_ENV` to be production, so it doesn't try using your development config. 

> $ heroku config:set PYRO_ENV='production'

Push all of that stuff up to Heroku. 

> $ git commit -am "Added all the heroku-related changes"
> $ git push heroku master

TADAAAAAAAAA.

My PyroCMS 2.2 blog here is now running on Heroku. I finally get to check that off my todo list.

Still on the list is:

* "Upgrade to 2.3.0-beta1 as soon as its out"
* "Convert to PostgreSQL because its web-scale"
* "Blog about all of it properly"

Heroku is an awesome solution because not only do they properly understand the problem, but they have been doing this for _years_. They've been around since 2007 so they completely understand how to set up simple hosting, from the basic blog to [The Twelve Factor App](http://12factor.net), which if we're honest, is becoming more and more common these days, especially with all these people going around telling you to build API-first and API-centric applications... *cough*
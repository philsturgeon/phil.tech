---
layout: post
title: '2012: The year of PHP cloud hosting'
category: php
permalink: blog/2012/01/2012-the-year-of-php-cloud-hosting
excerpt: " \n\tCloud hosting is nothing new. Seeing as \"cloud\" is such a loosely
  used term some will consider their VPS solutions on Slicehost or Rackspace to be
  \"cloud hosting\". Thats partially true, but this article covers how PHP is getting
  some serious attention in the PaaS (Platform as a Service) field. This year you
  will almost certainly find yourself making the decision wether or not to move some
  of your applications and services accross to the cloud, and this article can hopefully
  help you work out why and how. "
date: '2012-01-02 21:18:00'
comments: 'true'
disqus_identifier: 2012-the-year-of-php-cloud-hosting
---

Cloud hosting is nothing new. Seeing as "cloud" is such a loosely used term some will consider their VPS solutions on Slicehost or Rackspace to be "cloud hosting". That is partially true, but this article covers how PHP is getting some serious attention in the PaaS (Platform as a Service) field. This year you will almost certainly find yourself making the decision wether or not to move some of your applications and services across to the cloud, and this article can hopefully help you work out why and how.

The two PaaS solutions in my toolkit right now are [PHP Fog](http://phpfog.com/) and [Pagoda Box](http://pagodabox.com/). I've been using the two systems for the last year since they were kind enough to let me into their private BETA. Currently in my mind there are no clear victors as they both work a little differently, but they both achieve the same goal: get your code running online quickly and securely.

### That sounds quite a lot like Heroku?

Precisely. The Ruby community has had [Heroku](http://www.heroku.com/) since 2007 and they've been offering the same thing for quite some time. Heroku is a very simple service that is basically a Git repository that will deploy your code once you push to it and automatically handle any dependencies you might have such as Gems (think PEAR or PECL for the PHP's closest equivalent, but less clunky).

Ruby didn't just get one PaaS though, there are quite a few smaller companies and one large competitor [Engine Yard](http://www.engineyard.com/) which was founded even earlier in 2006.

### So why is this new?

Well this has not existed at a decent level in PHP for very long. The main reason for this is that for a long time PHP didn't really need it. If you look at Ruby it is much more low-level than PHP and it needs a little kick in the right direction to become a web-ready language. It needs WeBrick/Thin/Shotgun web-servers running to get it accepting HTTP requests and is in general designed more for long-life processes while PHP has always been more about distributed .php files running once on fire-and-forget mode using CGI or mod_php. In general Ruby systems take a bit more work to get running on the web, Heroku helps speed that all up.

That is still true, so why do we need PHP PaaS now?

### Speedy Deployments

If you are still using FTP as your main method of deployment you really need to go and sit on the naughty step and have a think about your life. FTP is slow as balls, insecure and did I mention it was slow as balls? Version Control has come a long way in the last few years and [adoption of Git in the CodeIgniter community](/blog/2011/08/cicon2011-and-the-future-of-codeigniter) has meant that all my projects now use it.

Now what happens when we want to deploy all of our well managed, feature branched, Git tracked code? Open FTP and drag files around? Pfft. Hit FTP Sync and hope I don't randomly delete content from the live site? No thank you. 

There are some tools around such as [DeployHQ](http://deployhq.com/) which will take your Git repo and deploy changed files over FTP/SSH for you. Over the previous option this is at least a step in the right direction, but recently I've had a few nightmares. If you upgrade a site using DeployHQ and you for example upgrade a CMS which has renamed a integral folder, it will go and delete all those important files before it starts uploading the "new" files. Sure that might not that common, but definitely a potential concern.

Another option is to spend some time faffing about with the Ruby-based Capistrano? If you have been using Capistrano a while you'll probably have it down to a art form, but this is an extra thing to learn which is often beyond the means of some new users. Go back to the first time you tried to set it up. I've got to be honest, I've had less stressful experiences.

PaaS services such as PHP Fog and Pagoda Box take care of all of this for you. Create your application and they give you a Git remote to push to.

Deploying my sites has become as simple as running one command:

<pre class="code">
$ git push production master
</pre>

I migrated [pyrocms.com](http://pyrocms.com) away from a VPS to Pagoda Box in about 10 minutes thanks to that simplicity. Yummy.

### Security

Hosting code can be a dangerous game, with even companies like [Facebook screwing up](http://techcrunch.com/2007/08/11/facebook-source-code-leaked/) at times. Anyone can get a basic LAMP stack up but if you want it to be really secure what do you do? Teach yourself a whole bunch of sysadmin stuff and take on that role as well as being the developer? That's two jobs. If you're anything like me and already stuck with project management, book keeping and even [event management now](http://ciconf.com) the last thing you need is another hat to wear. 

If you are running a company you'll probably end up hiring a guy (or a team of guys) just to look after your servers. Shoving it in the cloud takes care of that for you, and if you have any security leaks... hell you have somebody to sue for it.

### Scaling

No more "Slashdot-effect" for you. You can easily control how much traffic your system is ready to handle, with some systems offering "auto-scaling with daily budgets", meaning you can pay for your average traffic then if you suddenly get a massive spike your instant instantly adapts to handle the new load.

On the whole with Pagoda Box I find that one instance can handle 1,000 users a day just fine. Once or twice I've dragged the slider to two instances just so I don't get that Pingdom email while I'm out with the girlfriend, just for safety of mind. Scaling of that ease is POWERFUL stuff.

### Future

A few months ago it seems pretty much every PaaS provider decided that they all had to do everything. While I'm still not sure if that is for the best, Heroku now handle Java, Python, Scala, Grails, Python/Django and I hear they have a PHP in private BETA - but don't quote me on that.

Engine Yard made a similar move and snapped up [Orchestra.io](http://orchestra.io/) which is another PHP platform that's been around for a while. I had a Skype preview of that one back in its early days and it's another great contender.

PHP Fog are going the other way and starting to offer other services, under their rebranded service [App Fog](http://appfog.com/).

If you're interesting in hearing more about how Cloud Hosting works, I've managed to get Pagoda Box to send their Chief Architect, Tyler Flint over to [CICONF 2012](http://ciconf.com/) in London this February.

The future is looking more and more like it's going to be cloud based and I am happy with that. The less time I have to spend working to achieve the same goals means more time and money can be spent doing something fun.
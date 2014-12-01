---
layout: post
title: 'Cloud Hosting for PHP: The Eternal Pipe Dream'
category: php
permalink: blog/2012/10/cloud-hosting-php-pipe-dream
excerpt: This time last year I was extremely excited about the future of Heroku-style
  PHP hosting services (or PaaS), which would allow developers to quickly and easily
  set up small hosting environments that grow and scale horizontally and vertically
  to allow ridiculous levels of traffic. I was so excited I posted an article saying
  2012 would be the year for PHP to move to the cloud. This is an account of why after
  a year it still sucks.
date: '2012-10-03 12:56:00'
comments: true
disqus_identifier: cloud-hosting-php-pipe-dream
---

I posted an article at the start of the year called [2012: The year of PHP cloud hosting][2012]. Well, not really. Sure there are two months left in the year, maybe the problems will get fixed? Before I go onto explain the problems, what is all this fuss about PaaS anyway?

## Server Provisioning

I would much rather be doing anything other than sysadmin. Sure it only takes a few minutes to fire up a VPS and run "sudo apt-get install lamp-server", and you don't need a neck-beard to configure some PHP extensions to use and enable mod_rewrite, but if you could do it all with one single file… why wouldn't you? On Pagoda Box you can do this:

    web1:
        shared_writable_dirs: [/system/cms/cache, /system/cms/logs, /uploads, /assets/cache]
        
        php_version: 5.3.10
        php_extensions: [mysqli, curl, gd, mbstring, eaccelerator, memcached]
        
        php_date_timezone: Europe/London
        php_max_execution_time: 30
        php_max_input_time: 60
        php_post_max_size: 50M
        php_file_uploads: On
        php_upload_max_filesize: 20M
        php_max_file_uploads: 20
        
    db1:
    	name: 'site'

That means I know exactly what version of PHP it will use, and I can configure other extensions to be installed. You can do this using tools like Chef or Puppet, but the overhead of setting all of that up is massive. You need to set up Chef Server or set up a Chef Solo on a cron or hook and do all sorts of arsing around - which is absolutely fine if you're building a big project that needs it, but not for some little blog.

If you don't use Chef, Puppet or a PaaS built-in provisioning tool like the Boxfile then you run the risk of forgetting about certain extensions when you move the application - which is a ballache and probably results in errors on your live site being reported by users. How many of you really remember to install mbstring or gd first time around?

## Deployment

Getting your code from your computer to the live site is another thing a good PaaS will take care of. I love that for simple sites I can make a tweak then hit "git push production master" and forget about it. I can replicate that functionality using other tools, but again it's all about having it in one place. 

For example: A large project I've been working on recently is using Chef Server for provisioning and EC2 to host the staging and production servers. We then deploy new builds with a custom script that will fire up a new server via the Chef's Knife tool and a EC2 plugin, deploy the code from GitHub to the server, permission everything, set up configuration, transfer the Elastic IP over to the new server once its done, then terminate the old server.

Sound complicated? Sure is, but it is exactly how Pagoda Box works in the background. You just do a "git push" and it will use your Boxfile to build you your server, create a new instance, deploy the code, switch the network to look at your new instance, then terminate the old instance. 

The whole point of these systems is giving you the advantages of these manually put together very complex systems, without asking you to spend all the time setting it up. If you only work on one or two websites, then you might not need deployment or provisioning, and if you do you might not mind setting it up. But if you work on a f**kload of sites and want to be able to do the same sort of things, you need a decent PaaS to help you out.

## Collaboration

What did you do before GitHub or the hosted Subversion repo systems like CodeBaseHQ and Unfuddle? Did you set up your own Subversion/Git repos on your own networks? Setting them all up sucked. Managing them when a bug came up was annoying. Adding new users was time intensive, and if you wanted to give somebody remote access you had to serve your repo up online.

GitHub did the same for code sharing that PaaS does for hosting. In a team of developers you can just enter "jerelunruh" and click "Add user" to the project and they can deploy changes to your server. Again, if you have a LOT of projects where you work with various different teams, developers and clients, this is an unbelievable blessing.

## Horizontal and Vertical Scaling

If you're running a little $12 VPS because your site has not been getting much traffic, then suddenly your site get listed somewhere popular and you get a flood of traffic what happens? You're going down. Downtown!

Some PaaS systems allow auto-scaling. That sounds pretty nice right? You get a lot of traffic, so you get more machines. Other PaaS systems don't have an automatic solution, but PagodaBox will give you a very simple analytic board and show off when your servers are taking a hit. You can easily slide a bar up and increase your memory dramatically, or even throw more servers into it to have your site automatically load balanced. EPIC!

## What else?

The fact that most PaaS handle minor details like one-click Redis server setup, easy use of Worker systems (no need to set up Gearman or RabbitMQ - which can be a bitch) is handy extra to this already awesome list of features. 

I know I've been suggesting PaaS is great for basic sites and basic sites might not need Redis or workers you say, but as those sites grow or the CMS they're using releases "Redis Support", it's nice to be able to take care of that in one click and not arse around setting it up. That makes clients happy, and I'm happy because I don't have to do any sysadmin shit.

## Pagoda Box sounds great then!

Pagoda Box is everything I want a PaaS product to be. It would be even better if it worked.

I have been using Pagoda Box since the early BETA's and it started off very shaky. That's ok though, thats what BETA is for - but a year or two later they're still horrendously unstable with no real signs of improvement. I feel horrible saying this because I the team are great people, but I can't sit around happily using a product that has caused two major issues in two days:

### happyninjas.com

Randomly my company site disappeared. I have two apps running on the domain, the main site and my billing area ([PancakeApp][pancake]) running in a submodule folder. The entire main site was deleted, but the billing submodule was still there - only not responding to Apache. It was just a file system and anyone could click around looking at the files. 

> Somebody even sent me the URL to my PayPal IPN log which shows how much my clients have been paying me recently.

WHAT THE FUCK?!

This would never normally happen with PancakeApp as Apache would read the .htaccess rules and never display that file, but because the .htaccess was ignored and this was being treated as a file system, anyone could read whatever they liked. Not cool.

### philsturgeon.co.uk

I did the usual Twitter-check-before-bed and saw somebody reporting an error that has come up a few times before about sessions not being writable to "/tmp/pagoda/djsfhihep4o". I responded with an all-to0-familiar "That's a common Pagoda Box bug, it should be working again in a few minutes.". I wake up after 6 hours and my site is still down. 

There have been other errors on other sites (I have about 20 hosted with Pagoda Box from client PyroCMS sites to the API backend for iPhone app Bus Live: London). Some of the times I've tweeted about "Pagoda Box Bugs" it's actually been my fault and the team have helped me out brilliantly, but a lot of the the problems have just been ridiculous; like when I took a backup of a large database and crashed the site... The other trouble here is that they are an American company with American support staff, so if I wake up and things are broken I have nobody to ask for help until my afternoon when the yanks are sipping their morning coffee.

I've been actively reporting bugs to Pagoda Box for the entire time I've used them and they've fixed most - but I've been paying through the nose to mine-sweep for them and I'm fed up with it.

## Alternatives

I planned on having a fairly interesting morning of hiking up a nice little mountain near my hostel in Norway before getting on with the meat of my development work today. Instead I have gone through 6 well known PaaS systems and I can't use any of them.

### PHPFog / AppFog

PHP Fog was the first on the scene that was usable well over a year ago. I used that since it was in early beta too and it was great for a while - until I tried to scale. The choices were "Gold, Silver or Bronze". I was on Bronze and my site just got nailed with traffic when some article hit #1 on HackerNews. Ironically I think it was "2012: The Year of Cloud Hosting", but it meant I needed to scale and quickly. When I selected Silver I saw a little message saying "Your cloud will be upgraded to Silver within 24 hours, please be patient". I was on Pagoda Box before waiting even one hour.

I can't blame PHPFog for this, as they were a start-up company building a minimal viable product. They then got given a whopping $9.8 million investment and pivoted to be generic PaaS, supporting Ruby, Node, Java, Python, etc as well as PHP. The features in AppFog are immense and it really looks like money has been spent on it, but it has its own problems.

Until two days ago App Fog didn't have root-domains. That means I could not have philsturgeon.co.uk but I could have www.philsturgeon.co.uk. They fixed that, so awesome. But they have no writable folders. 

Now I know people always say: "Yeah but you should be uploading your files to S3 so you don't need writable folders". Ok smart-ass, what about log files and caching? I can send my logs through RabbitMQ or store them in Mongo, and I can use Redis for my caching, but that's not exactly helpful for stock applications. PyroCMS can handle that thanks to some improvements made recently which will be available in a later version, but most systems will fall if it can't write anything anywhere at all. PHP Fog used to allow you to enter folder paths of folders that should be writable. Why doesn't AppFog?

Pagoda Box dealt with this by allowing "shared writable folders" which were not only writable by the server by they would be shared between all servers - so when you added more servers you'd keep all of your logs and they'd all use the same cache instead of hitting the DB once per server.

Beyond the problems with AppFog's feature-set the stability of its website and dashboard also worry me. Login attempts were taking about a minute and giving empty responses while the rest of their site loaded instantly. It took 6 attempts it log in to the site.

Creating new apps was giving a 500 error with their generic error page. After 7 attempts it let me create an application. 

I'll come back to AppFog in the future. I still happily wear my PHPFog t-shirt and drink coffee from my AppFog mug, but for now I can't use them for any of the sites I look after. Next!

### Orchestra

[Orchestra](http://www.engineyard.com/products/orchestra/) is a very simple little PaaS founded by [Eamon Leonard](http://eamo.net/) which was later acquired by [EngineYard](http://www.engineyard.com/) - who are very big in PaaS but mainly in the Ruby world.

I had a demo of Orchestra before it launched from Eamon himself and it looked really cool, but the feature-set is just not on the level with some of the competition. You can control where nginx will look for index.php and that is about it. No writable folders (especially not shared writable folders), no control over extensions, nothing. They suggested over twitter after my rants this morning that I use their Redis extension to send out all my logs and cache. That's fine if I am building an application specifically to use with Orchestra but deploying existing applications is pretty tough. One of their selling points is:

> Build your app with a range of popular PHP frameworks

I don't know many frameworks that have Redis logging built in. I'm sure Symfony does, but that's not "a range" of popular frameworks. If I have to build my application specifically to work with the provider then the point of this simple hosting has been missed.

The other gripe I have with the system is that your deployment is done with a hook - overwhich you have no real-time feedback. When you push to your repo a hook will fire, then "at some point" the code is live, meaning its hard to tell if a change was successful. Other systems provide real-time feedback in the command line, or via the interface so you actually know if its deployed or not.

### FortRabbit

[FortRabbit](http://fortrabbit.com) certainly looks interesting and has some very useful performance analytics on the dashboard. I'd suggest you guys take a look but it's still got a BETA tag on there and I'm not going through that again.

### AppliHQ

I was excited by the idea of [AppliHQ][applihq] as I am a big fan of aTech products and have used PointHQ and CodeBaseHQ a lot in the past. Sadly after scouring their site I couldn't find a signup button, and they eventually tweeted to let me know they were not accepting new sign-ups. Erf.

### Heroku

I looked into this and know a few people running PHP happily on [Heroku](https://www.heroku.com/), but it's a hack. If these companies cannot get things right after two years then I don't know how Heroku expect to get PHP right in the first year - especially if you have to hack in support by saying it's a "Facebook App". I've seen some articles that show how I can do this, but I don't need my hosting solution to be posted on [There I Fixed It](https://failblog.cheezburger.com/thereifixedit).

### AWS Elastic Beanstalk

[Elastic Beanstalk](https://aws.amazon.com/elasticbeanstalk/) is essentially Pagoda Box but with WAY more flexibility, but that flexibility of course comes with a loss of simplicity. It is also 5x the cost and really not meant for hosting a little blog. The process is essentially the same as the initial EC2 + Chef process I described above. It looses the advantages of "adding users" easily like this other GitHubescque systems do and of course it is in BETA itself.

## Next?

I've moved this blog to a little EC2 instance, left some low-traffic client sites on Pagoda Box, I'll be moving pyrocms.com to EC2/Chef deployments much like the first example and I'll be hoping that AppFog add shared writeable directories soon.

This comment section will doubtlessly be filled up with people linking up other PaaS solutions as there are a LOT (about 50) but most of them are developed by very small teams, not yet complete, still in beta or just too lame to even mention. The way I see it, if a company with $9.8 million in the bank hasn't quite got it right yet then I doubt a bootstrapped-in-the-garage product will.

Maybe Pagoda Box will fix itself; That would be ideal because they have absolutely nailed the features but their service just doesn't stay up. I've been assuming their problems will just stop for well over a year and it hasn't happened yet.

Finally to everyone suggesting I just use Linode/CheapVPS4U/whatever: I've spent the last 2 years driving a hover-car. I don't want to go back to driving a normal car, I just want another hover-car that doesn't keep crashing.

  [2012]: /blog/2012/01/2012-the-year-of-php-cloud-hosting
  [applihq]: http://www.applihq.com/
  [pancake]: http://pancakeapp.com/

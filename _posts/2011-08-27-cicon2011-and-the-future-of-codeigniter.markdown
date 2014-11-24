---
layout: post
title: CICON2011 and the future of CodeIgniter
category: codeigniter
permalink: blog/2011/08/cicon2011-and-the-future-of-codeigniter
excerpt: " \n\tCICON2011 happened and it was awesome. We had 100 CodeIgniter nerds
  in the same place - which is the biggest collection of nerds since CICON2010 in
  the UK, but this event was so much better. We had a whole load of announcements
  that have changed the way the framework is contributed to and improved the whole
  community for the better. This is not me blowing smoke up my backside, but feedback
  I have had from attendees. So, what did you miss? "
date: '2011-08-27 10:05:00'
comments: 'true'
disqus_identifier: cicon2011-and-the-future-of-codeigniter
---

![CICON Banner](https://s3.amazonaws.com/philsturgeon-blog/6067761331_afa0ab6d4e.jpg)CICON2011 happened and it was awesome. We had 100 CodeIgniter nerds in the same place - which is the biggest collection of CI nerds since 54 at CICON2010 in the UK, but this event was so much better. We had a whole load of announcements that have changed the way the framework is contributed to and improved the whole community for the better. This is not me blowing smoke up my backside, but feedback I have had from attendees. So, what did you miss?

### Moving to GitHub

Booyeah! There's a whole official blog about why they moved, but I am so happy about this. I was maintaining a mirror for CodeIgniter on my GitHub profile and it got up to 55  pull requests. BitBucket... not so much.

We’ve in the space of a few days got onto the GitHub “Most Watched” list for PHP and we’re ranking pretty high.

We also have 22 active pull requests, all for useful bugs!

### CodeIgniter Core and Reactor have merged

There was some confusion in the community about which branch people should use. Core was just what EllisLab to keep ExpressionEngine going, so if a valid bug-fix came in that would cause an issue with ExpressionEngine it would not be included. The Reactor team is populated by people who use CodeIgniter for multiple applications on a daily basis, so the 6 of us were fixing a lot more bugs.

While some have said they liked the fact that Core was slow moving, it was slow moving because there was barely anything happening. Look back at the speed in which things were being improved in the old 1.7.x days, then look at the [change-log](http://codeigniter.com/user_guide/changelog.html) and look out for all the changes with a green tick. They are all valid fixes made by the Reactor team - so clearly having this as the main and only branch is of benefit.

#### Example 1

SOME PDF’s (I noticed on the UK TV License receipt) would have the MIME type wrapped with ” marks, which would be escaped. Meaning it was essentially saying:

    if ("application/pdf" == '\\\"application/pdf\\\"')

That fix took me TWO DAYS to resolve, but I’m glad I did as nobody else is going to get stuck with it. That is in Reactor. I met Derek Allard (an ex EllisLab employee) on my travels and it turns out he knew about the fix two years ago, but it got lost in the sea of forum posts and he didn't remember to look for it or fix the bug. Now we have issues to track these things properly and pull requests where people can send in their own fixes, instead of dumping code into the forums. Brilliant!

#### Example 2

Yesterday I had a client complain that thumbnails were not uploading and the “GD not installed” error was being returned. This was not a fault with GD, but it was a suppressed notice cascading through the logic and returning a false error. Really the path could not be read to the image, but it was saying GD not installed. That is MESSED UP, but fixed via Reactor.

I wanted to be on the Reactor team purely so I could fix things when I notice them. I code with CodeIgniter every day and have done for over four years, so I want to fix bugs that annoy me. Now that we are on GitHub everyone can send in pull requests for bugs that annoy them, so we’re all able to help out. The best people to fix a bug are those that have found it and now you can!

Reactor is about enabling the community to make this framework more stable and awesome, NOT about a bunch iof cowboys adding in random shit for fame and fortune. I hope you can see this with the new approach: i.e Git-Flow and Unit Testing.

People in the core team didn't spot these, because they are using the framework to make one app. They are making one great app, but they aren't doing EVERYTHING with it in the same way we all are. We all do crazy different stuff and notice different things, so we can all find and fix more bugs than they can. Oracle's broken? It probably is, but I'll be f\*\*ked if I have Oracle on my computer.

### Sparks are being merged into 2.1

The [GetSparks.org](http://getsparks.org/) project is a wonderful repository for libraries. This beats the hell out of the wiki, Googling for random blogs, finding random zips, downloading, extracting, hoping it works with your version, etc. It simply has a Spark (which is essentially a Application Package) and it can be installed manually via a .zip, or it can be installed with a really simple command in the terminal.

The benefit we have here is that it will avoid us bloating CodeIgniter with weird and wonderful features. Case study: ORM.

You want ORM in the core? Well which? Should it be Doctrine2, DataMapper, Propel, ActiveRecord, or should we all randomly start making one for free and freeze all development on CodeIgniter itself because all of our time is going on an ORM and we can't afford to feed our families?

Well, none of those problems exist now because we can just type:

> php tools/spark install -v1.0.0 doctrine2

This is awesome! No longer do we have to pick, we can install doctrine2, php-activerecord, or DataMapper-ORM packages with one command, and we know it'll work with our version of CodeIgniter.

> "Well why on earth are we re-writing package management instead of using PEAR?"

I've been asked this 100 times and it seems like a fair question, but there are two fundamental differences between PEAR and our approach.

PEAR is package management software that will install PHP classes system-wide. This is very similar to Ruby GEMS which DO MY HEAD IN, in that when I upgrade a Gem in one location it upgrades all my applications, which can create cross dependency hell. Gem A requires a newer version of Gem B which does not work with Gem C. Shit, my application doesn't work until Developer C releases a patch... Um...

Sparks is a great way to install code into your application. It works just like you do, but saves the hassle of Google, Download, Unzip, move things around, test. Just one command and Application 1 has Package A, which might require Package B v2.1 but Application 2 can happily have Package B v1.0 without anything having problems.

### Moving forwards

We have plans for the future. 2.0.2 was a failure for a few reasons, mainly that the team were forced to use Mercurial - which we are all pretty weak with. Most of us were dumping code in now and than that might not have been perfectly tested - or even finished. For this reason when the Core team had a hotfix nobody was ready and none of the Reactor team were even contacted about it!

2.0.2 was broken and this came down to three main things:

1. No branch control
2. Poor communication
3. No version planning

How are we sorting this out?

1. We now use [Git-Flow](http://nvie.com/posts/a-successful-git-branching-model/)
2. All changes are discussed on the pull request / issue, then fired to Basecamp so EllisLab and other Engineers have first refusal.
3. [Milestones](https://github.com/EllisLab/CodeIgniter/issues/milestones)! Issues are attached to versions, and changes are merged into version branches. This gives the community a Roadmap which we have never had before.

So, all of the problems we've had in the past are gone. Combine that with the nearly-ready Unit Tests and the future is looking stable.

### Positivity in the Community

When people were trickling off on the Sunday I had the oppertunity to one-on-one with a lot of people who were all really enthusiastic. Nobody tried to sneak away and nobody had any negative comments: everyone I spoke to said something along the lines of "Man, I can't wait to get home and fix some bugs!". That. Is. Amazing.

By the end of the event we were up to 30 contributors on the Git repo, now it’s up to 35.

CodeIgniter just got a shot of adrenaline right in the face and I hope this positivitiy continues. So far only one person has complained (guess who - his name starts with a "w") and he has yet to send a single pull request. If you think we're doing it wrong, tell us. If you can do better, show us with code.

<u>Photos</u>

Kyle Farris: [CICON2011](http://www.flickr.com/photos/kylefarris/sets/72157627489315606/)

<u>Write-ups</u>

Adam Fairholm: [Thoughts on CICON2011](http://blog.adamfairholm.com/thoughts-on-cicon2011/)  
 Frank Michel: [CICON2011](http://www.frankmichel.com/blog/article/cicon2011)  
 Greg Aker: [CodeIgniter Conference 2011 Roundup](http://www.gregaker.net/2011/aug/22/codeigniter_conference_2011_roundup/)


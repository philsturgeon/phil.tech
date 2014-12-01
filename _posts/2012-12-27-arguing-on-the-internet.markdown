---
layout: post
title: Arguing on the Internet
category: codeigniter
permalink: blog/2012/12/arguing-on-the-internet
excerpt: " \n\tI have referenced Shawn McCool's blog a few times, \"Why CodeIgniter
  is Dead\" and people are wondering why I argued so hard against it back in May but
  then gave CodeIgniter such a hard time in my last article. For the record I'm not
  team CodeIgniter or team Laravel, I'm a PHP user who has some opinions, and some
  of those opinions change over time - which is fair enough. My opinions aside, his
  original article was wrong on a few points, so let's discuss those. "
date: '2012-12-27 16:53:00'
comments: true
disqus_identifier: arguing-on-the-internet
---

<a href="http://xkcd.com/386/" target="_blank"><img src="http://imgs.xkcd.com/comics/duty_calls.png" alt="Credit XKCD: Duty Calls" style="float:right; margin: 0 0 10px 10px" /></a>I have referenced Shawn McCool's blog a few times, "[Why CodeIgniter is Dead](http://heybigname.com/2012/05/06/why-codeigniter-is-dead/)" and people are wondering why I argued so hard against it back in May but then gave CodeIgniter such a hard time in my [last article](/blog/2012/12/5-things-codeigniter-cannot-do-without-a-rewrite). For the record I'm not team CodeIgniter or team Laravel, I'm a PHP user who has some opinions, and some of those opinions change over time - which is fair enough. 

My opinions aside, his original article was wrong on a few points, so let's discuss those.

> CI has aged poorly due to a combination of legacy support between major versions and a virtually complete lack of leadership.

This opinion is based on what? The leadership process was pretty simple. Community proposes changes or pull requests, then a Reactor engineer will review it, offer EllisLab the right of first refusal on Basecamp, then if no objections were raised it would be implemented. 

Maybe we could have set up an internal mailing list on Google Group instead of using Basecamp, but EllisLab made the decision and I was fine with that. 

> If your host doesn't support PHP 5.3 then jump ship as soon as possible.

Agreed to a point. There are enough PHP hosts on PHP 5.3 & PHP 5.4 (hell, Crucial Web Hosting are even offering PHP 5.5.0 alpha1) that if your host only has PHP 5.2 then you need to run the fuck away screaming to a hosting company that DOES support it.

But.

I've worked in large companies where the classic "sysadmins v developers" war continues to wage into it's 5th decade. The sysadmins don't want to change _anything_ because change causes work, bugs and effort, but on the other team developers want to change _everything_ to make it quicker, more modern, more [webscale](http://www.mongodb-is-web-scale.com/). Trying to get these guys to upgrade from PHP 5.1 to 5.2 when 5.3 was just coming out was insanely difficult, and trying to get from 5.2 to 5.3 is a much bigger ask for many companies. 

PHP 5.3 is certainly becoming more available, but there are plenty of times when it just isn't an option. Look at the bigger picture than just "I am a web developer using a FooHost.com". [Read](/blog/2012/08/understanding-circumstance). I personally [don't need PHP 5.2 for anything](/blog/2012/10/bye-bye-php-5-2), but back in May when Shawn wrote his article the whole PHP scene was very different, so he was even less correct to suggest PHP 5.2 was no longer a big deal.

> Since CI doesn't use any of the new features, best-practices suggest that its users should avoid them in order to provide standardised code. It should be easy to find and hire a PHP developer who is versed in CodeIgniter and mismatching a bunch of code-styles is a bad way to approach that goal.

I have no idea what mismatched code styles Shawn suggests are being recommended. While CodeIgniter is not PSR anything (and IMO probably never will be), it is consistent to its own [Style Guide][styleguide] - which has nothing to do with any PHP version number. This was a weird paragraph.

> When it comes to code modularity CodeIgniter is one of the worst performers in the industry. CodeIgniter is not built using any modular design pattern so all solutions are after-thoughts that were developed by members of the community. Out-of-the-box CI supports libraries (basic classes), helpers (global function declaration), and plugins (the same as helpers, these are not used). These are all different versions of the same concept separated by intent.

Plugins were removed in 2.0.0 which was released January 2011.

Also by "members of the community" you are referring to [John Crepezzi](http://www.johncrepezzi.com/) and and [Kenny Katzgrau](http://codefury.net/), two core developers?  

> There are some third-party modularity solutions available. The oldest and most powerful of these is Modular Extensions by wiredesignz. It allows the implementation of HMVC modules. 

Well here the matter of modules and HMVC are being confused. This is a common issue with users of the Modular Extensions HMVC system for CodeIgniter because it implements HMVC _and_ modules. They are not mutually exclusive. HMVC is all about making synchronous requests to another controller via the same routing system as hitting the URL in the address bar. Funnily enough Laravel cannot do this either and requires a [bundle][hmvcbundle] just the same. 

As for modules, CodeIgniter has Sparks and Laravel has Bundles.

> Sparks can only provide libraries, helpers and config files. This limits its function to a central repository for CodeIgniter libraries.

Almost correct, Packages (the technical feature in the CI core that power Sparks) also support Views too. 

The only real differences are the lack of namespacing and no routing to controllers in a package, both of which are features I would like to see, but obviously a 5.2 framework cannot support 5.3 features. This was covered in my [recent article][5things].

> CodeIgniter was conceived by Rick Ellis of EllisLab. It is now community supported to some extent, but still seems to wilt under its creator's needs. CodeIgniter is the platform on which EllisLab's flagship product (ExpressionEngine) is built. In part due to the preoccupation of EllisLab with ExpressionEngine change to the CodeIgniter framework has come infrequently and the magnitude of the changes have been insignificant.

Kinda. It's unfortunate, but the CodeIgniter team is obviously not allowed to recode things completely and break EllisLab's income, but at the same time they are only using 2.0.something so there is a disconnect between "adding features the community needs" and "breaking ExpressionEngine". It could almost be said they no longer care what is happening with it, as the community is driving things themselves. That is fine with me, the community has enough smart people.

> CodeIgniter Reactor was released so that the community could make changes and improve the framework. Unfortunately, due to the fact that there is no strong or dedicated leader, improvement to the framework has not occurred.

Disagree. There have been more than a few commits to the 3.0 branch. 

<img src="https://sphotos-a.xx.fbcdn.net/hphotos-ash4/292325_10152004911110607_2026055691_n.jpg" />

> One could easily argue that CodeIgniter 2.0 brought only minor usability improvements at the cost of dropping PHP4 support entirely.

In 2011 dropping PHP4 support seemed pretty valid, so posing that as a negative is a little odd. But, lets look at the features that 2.0 brought:

* Drivers
* Packages
* Cache driver
* download() for FTP (yay one of mine)
* CSRF protection
* $_GET support - remember, query strings were f**ked before this

These are just some of the bigger ones, but there are over 120 items in the changelog for 2.0.0. While it wasn't a world changer, people were pretty happy to have all these new features without having to totally rewrite their applications, something CodeIgniter has always strived to make a priority.

>  It's no longer the framework for legacy support and it begs the question, "what was the purpose of dropping that support?" as users have seemed to have gained little in exchange.

Legacy support is not limited to PHP 4. Now that [PHP 5.3 is winding to the end of its lifetime](http://php.net/archive/2012.php#id2012-12-20-1), 5.2 is easily considered legacy. Supporting a few versions behind the "current" is what CodeIgniter has always done, and this is why I used it for so long. 

Sure some projects can use the latest and greatest versions of PHP, but sometimes you're stuck with that ass-hat client that just demands that you work with 5.2 or 5.1 for whatever bizarre reason. Sometimes you can convince them to upgrade, sometimes you can't. When I can't I like having tools around that work on those versions. That said, the latest version of a CodeIgniter doesn't have to support PHP 4 until the end of time, so it's weird to see Shawn make an issue out of this.

> When it comes to community participation only the most daring need apply. CodeIgniter is not well unit tested.

Well that's just not true. You can see [here](https://travis-ci.org/EllisLab/CodeIgniter/jobs/3737693) the report of PHP 5.3 and MySQL being run on Travis-CI. The code-coverage is up to about 60% of lines covered, and of course when you run MySQL it doesn't run unit-tests on the PostgreSQL and SQLite drivers, so the number is really higher.

It was difficult, but those unit-tests have been around for a year. Once 3.0 is tagged I assume the dev's will implement a "no test no change" policy, which would be wonderful. They aren't 100% but his article suggested there were none, when really there are plenty. This is just a fact I would have liked him to recognise.

> [UPDATE] I made a few key mistakes while constructing this post. The first is that the title distracts from the actual information in the post. The second mistake was to advocate Laravel in this post as some have assumed political motives, which is simply not true. These mistakes have distracted and confused the issues.

This was the crux of my issue. It's impossible to say a framework is dead when it's the 3rd most watched PHP project on GitHub with 3-6 pull requests a day on average. Even insinuating it _might_ be dead is ridiculous.

No. I understand what Shawn was trying to do. I think we both agree (as do many others) that CodeIgniter cannot progress without a rewrite, and that rewrite is unlikely for a number of reasons. That summary is based on many facts and I won't disagree with anybody who says CodeIgniter cannot progress much further. 

### "No Progress != Dead"

Dead insinuates being closed right down. Repo removed, or just nothing is ever tagged again. 

Where CodeIgniter sits is closer to [Smarty](http://www.smarty.net/). Smarty is still active and has it's last stable release 2 months ago. It just hasn't changed much in years and probably never will. 

That is fine for all the companies using Smarty who don't need it to change and the developers who want something new and exciting are all pretty happy that Twig exists.

Smarty now doesn't need to recode itself to become Twig. It doesn't need to break all existing applications just so it can be more like something that has cool new features at the cost of destroying itself. It can just keep on being Smarty, and let Twig do it's thing.

That is what we're seeing happen with Laravel. Laravel 4 is excellent and I use it. It's PSR-2ish, well built, well unit-tested and has a great community, but that doesn't mean we can just make up lies about CodeIgniter being "dead". 

### Summary

This is going to make me look like an angry little man, arguing on the internet until EVERYONE agrees with me. It'll be hard to avoid that, but whenever I am asked the same question more than 10 times I answer it with a blog so the 11th time I can just send a link. People kept bringing this up, kept comparing my article to his and it was getting a little tedious. 

One difference in my personal standing between when Shawn's article was written and now is that I no longer require PHP 5.2 for anything. That doesn't mean I am suddenly wrong for advocating CodeIgiter then, or wrong for assuming other people still have to use PHP 5.2 now. One developers personal situation does not reflect the community at large and we all need to remember that.

I have often said: when I no longer require PHP 5.2 I will no longer require CodeIgniter. I said that a year ago and when I got my new job I dumped it and started using anything PHP 5.3+ and a whole lot of Composer. This is why I NOW love Laravel 4 (not 3), but this conversation has never been about A or B, it's been about somebody writing incorrectly about A.

Shawn is a good, smart developer, whose articles have helped a lot of people learn about both CodeIgniter and Laravel, but his article has been given far too much credit for a series of points that ranged from "half-right" to completely wrong. It was also missing a few important insights which he may not have known about, that I would have liked to see added in as updates to the original article.

So: Yay Laravel, it's ok CodeIgniter, I understand. 

Now we can all sing kumbaya at [LaraCon](http://conference.laravel.com/). After the arm-wrestle of course.

  [styleguide]: http://ellislab.com/codeigniter/user-guide/general/styleguide.html
  [hmvcbundle]: http://bundles.laravel.com/bundle/hmvc
  [5things]: /blog/2012/12/5-things-codeigniter-cannot-do-without-a-rewrite

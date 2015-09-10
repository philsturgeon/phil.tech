---
layout: post
title: Solving the PHP Internals Workflow
category: php
alias: blog/2013/09/solving-the-php-internals-workflow
excerpt: PHP internals has been a cold, harsh, unwelcome land for a long time, and
  it's coming to a head recently with mutliple vocal developers highlighting issues.
  While some are trying to resolve the actual medium through which conversations happens,
  I'm looking into ways we can try to fix the workflow so the actual conversation
  being had can be the most constructive it can possibly be. 
date: '2013-09-12 01:44:00'
comments: true
disqus_identifier: solving-the-php-internals-workflow
---

On Monday I posted a [tale of woe](/blog/2013/09/t-paamayim-nekudotayim-v-sanity), which like any good tale had a moral at the end.

The moral was that while PHP internals has its troubles, the troubles are really being perpetuated by a small few, and there is a clear path to solving the problems.

The article seemed to resonate with a lot of people:

<blockquote class="twitter-tweet"><p>A great tale of trolls and heroes on php-internals, from <a href="https://twitter.com/philsturgeon">@philsturgeon</a>. <a href="http://t.co/M0F99SXtmJ">http://t.co/M0F99SXtmJ</a></p>&mdash; Ben Ramsey (@ramsey) <a href="https://twitter.com/ramsey/statuses/377555139726671872">September 10, 2013</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet"><p>Agree with everything <a href="https://twitter.com/philsturgeon">@philsturgeon</a> has to say here <a href="http://t.co/tv9HkuuhI7">http://t.co/tv9HkuuhI7</a></p>&mdash; Jonathan H. Wage (@jwage) <a href="https://twitter.com/jwage/statuses/377552951847694336">September 10, 2013</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet"><p><a href="https://twitter.com/philsturgeon">@philsturgeon</a> Hilarious &amp; on-point as always. Thanks for writing it up for the rest of us who couldn&#39;t cringe through yet another bitchfest.</p>&mdash; Nate Abele (@nateabele) <a href="https://twitter.com/nateabele/statuses/377543022415974400">September 10, 2013</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet"><p>Yay I&#39;m famous! Phil tells the story of my first nightmarish foray in <a href="https://twitter.com/search?q=%23PHP&amp;src=hash">#PHP</a> <a href="https://twitter.com/search?q=%23internals&amp;src=hash">#internals</a> <a href="http://t.co/wJfxNXPgNN">http://t.co/wJfxNXPgNN</a></p>&mdash; Chad Minick (@cythrawll) <a href="https://twitter.com/cythrawll/statuses/377433173514133504">September 10, 2013</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

Time for another story.

I joined the [PHP-FIG](http://www.php-fig.org/) while the [PSR-1](http://www.php-fig.org/psr/1/) & [PSR-2](http://www.php-fig.org/psr/2/) votes were coming to a close, and as such I didn't have anything to do with their generation other than a bit of feedback on a few sentences. 

[PSR-3](http://www.php-fig.org/psr/3/) came around while I was an active member and I had the chance to put in some feedback, which was tricky throughout a sea of bitching about - amongst other things - whether interfaces should be called FooInterface or Fooable. Seriously, that was about 60 emails alone.

I saw that conversation happening, and I was part of conversations about a Caching PSR, one for HTTP Clients (which then morphed into HTTP Messages) and a few other PSRs being discussed. 

At the time things seemed great. The FIG was the wild-west and we were all doing our thing. The mailing list was modelled after internals, we were all throwing out our opinions, progress was made here and there and for a while things seemed ok. Every now and then a troll would pop up and derail the situation but we'd get him/her sorted out with some self-moderation and get on with the conversation eventually.

But then a year later only PSR-3 had made it out of the gate. HTTP was dead in the water, Caching was "nearly at a vote" for _months_, a new autoloader nearly got through but then was attacked with about 3 different alternative proposals at the 11th hour and all sorts of other madness. 

It soon became incredibly clear that this approach would never work. 

We needed a workflow, and so does PHP.

Right now the internals workflow is outlined on the [How To Create A RFC](https://wiki.php.net/rfc/howto). Newcomers are routed to an [Oracle blog](https://blogs.oracle.com/opal/entry/the_mysterious_php_rfc_process) website to learn about the process:

> If you're new to PHP core development, mail the "internals" mail list to judge interest before you start your RFC. If you get no reaction (this is likely) or positive reaction then create the RFC. Core PHP developers with karma will know when they can skip this step.

So, you're brand new to PHP and the process is you should post to internals then if no reaction is received then they should get going?

**Problem #1:** I got no reactions to my posts for a several weeks before I discovered there was just a [bug in the mailing list system](https://bugs.php.net/bug.php?id=65655). How would somebody know if their idea is getting no feedback, or is quietly approved? 

**Problem #2:** Despite the exact wording of the guide, it's commonly accepted that "An RFC without a patch is just noise". This has two further problems:

**Problem #3:** Don't know C? Go learn it, because we won't take you seriously otherwise.

**Problem #4:** Don't know the intricacies of the parser/serialiser/etc? Go learn it, because we won't take you seriously otherwise.  

Something like the [FIG workflow](https://github.com/php-fig/fig-standards/blob/master/bylaws/004-psr-workflow.md) at this point would come into play quite nicely. We have the idea of a "Pre-Draft" proposal. This is just some file on the internet somewhere and has no relevance to anything. Somebody can put together as much information as they can and - even if its incomplete - find sponsors from within the FIG, one of which will bring start an Entrance Vote. 

* Anyone can propose a PSR.
* If it passes the Entrance Vote we approve working on the idea.
* You have people who know how to implement it available and interested.

When this Draft PSR is considered ready, it is brought to the mailing list for "Review". People go through it at this point - when it has some form, and is more ready that initial ideas. People ask a lot of questions, the meta document gets updated, FAQs are built and it stays there for two weeks to let anyone have a chance to give feedback.

Then after that two weeks it goes in for another vote. If it passes that vote it is then "Accepted", and we have a new PSR.

### PHP Internals needs a workflow

While the exact same workflow would not directly work, something could definitely be put together that would benefit everyone.

Something we HAVE to do is get away from the "if you don't know C then fuck you" mindset. 

I _completely_ understand that ideas are cheap and implementations are hard. I've worked in startups long enough to know everyone has a million ideas everyday, many of which are shit, unrealistic, or wonderful but without an implementation are just words.

I'm not expecting anyone to say "oh good, you had a nice idea, let me go and spend 3 weeks coding that up for you.". What I am hoping is that we can get to a point where we can let self appointed working groups of 3+ come together to flesh out an idea, get some sort of "yes, we like this idea" stamp of approval from a majority, then focus on how it COULD be implemented before the time and effort goes into actually implementing it.

For example, the Named Parameter RFC contains reference to my syntax suggestions. Those syntax suggestions came from me (somebody who hasn't touched C since college) being interested in named parameters enough to put together a set of pros and cons of [potential syntax options](https://gist.github.com/philsturgeon/6405087#file-syntax-examples-md). 

Is it not better than this research into potential syntaxes can go ahead (and people on the mailing list can potentially vote on a syntax) before somebody puts the time and effort into making a syntax?

Getting a stamp of approval BEFORE an implementation resolves a LOT of problems.

* It will stop people wasting their time increasing the chances of repeat contributions. 
* It will stop the ego-attachment to their work, because "their baby" could be more in line with what the majority want before they get going. 
* It will ease the RFC process, as people have already obviously outlined an interest in the feature BEFORE we're getting to a chance to review the patch or vote.

## PHP Internals could be AWESOME

Today was an explosive day on internals, most likely driven by a resounding agreement by many that things are currently not ok. 

The request for the mailing list to be [moved to a forum system](http://marc.info/?t=137891062900003&r=1&w=2) was initially fought against hard, but has since evolved into a brilliant solution: improving the web interface for [news.php.net](http://news.php.net) to handle threaded conversations and all handle actual conversation there, while still sending out posts to the mailing list - keeping the community in one location but removing yet another barrier to entry for smart new contributors.

People are complaining and suggesting that wont solve all the problems, but it will solve a LOT. Much like when talking to a zealous anti-gun control believer who says "Implementing background checks wont solve ALL gun crime ever!" I feel like saying "Of course it wont solve everything, but an X% improvement is an improvement, and there are no silver bullets.". #pun

Solving the interface will let a lot of people get involved, increase transparency and hopefully get some fresh blood into the group. 

That is Step 1. 

Step 2? Improve the workflow so that there is a clear path to getting a feature approved. In the FIG having such a regimented workflow has _drastically_ improved the signal to noise ratio, and people have to read through far less content while knowing much more about what is happening in the group.

If anybody on the internals team would like to get in touch with me and flesh out a rock solid workflow much like I've done for the PHP-FIG please do so through my contact form, Twitter or whatever. We can easily make internals a useful productive place where everyone feels welcome, with a few little bylaws that everyone can enforce themselves.

We don't need leadership, we don't need a BDFL, we just need to stop arguing like we're in Mean Girls and get something useful done. A few rules can make that happen, and I'll be happy to get those rules written up.
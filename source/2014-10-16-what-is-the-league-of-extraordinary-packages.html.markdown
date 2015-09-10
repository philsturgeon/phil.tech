---
layout: post
title: What is The League of Extraordinary Packages?
category: php
alias: blog/2014/10/what-is-the-league-of-extraordinary-packages/
excerpt: This is the story of group of friends, who decided to write some code, but
  somehow confused and angered everyone with a keyboard.
date: '2014-10-16 14:00:00'
comments: true
disqus_identifier: what-is-the-league-of-extraordinary-packages
---

This is the story of group of friends, who decided to write some code, but somehow confused and angered everyone with a keyboard.

tl:dr; "Waaaaah why doesn't _everyone_ like usssss..." That said, the long-form might entertain anyone who is curious about [The League](http://thephpleague.com). It has a bizarrely controversial existence.

## The Origin

It was a cold winter morning, February 2013, heading over the Williamsburg Bridge by subway into Manhattan. I had spent the whole night working on some code that I was super excited about releasing.

It had been a few months since [I quit CodeIgniter](/blog/2012/09/moving-on) and FuelPHP, and I was a man without an open-source organisation for the first time in ages.

Where should I release this code? Should I release it with a vendor name of `Sturgeon\`? That seemed rather egotistical.

I could make something up, but what is the point of a single vendor with a single package?  I wondered if any of my buddies were having this problem.

I DMed @alexbilbie and @ben_corlett, what would they release their code under if they had any?

They didn't know, but liked the idea of doing something together.

Being as hungover as I was, I thought long and hard, for about 5 seconds until something amazing happened in my brain...

**The PHP Super Best Friends Club!**

The guys loved it, and we started making plans immediately.

## The Goals

We'd all worked on projects together before. PyroCMS, CodeIgniter libraries, freelance projects and various other components. We all knew each other well and trusted each other, and expanded our little group to a few other people via email within a week.

There was no concern about trust or leadership or setting up complex rules, because we were all just people and why the hell.

I grabbed a domain, somebody set up a GitHub organisation, and we were up and running.

We started laying out goals for this little group, which were super simple.

1. Do nothing half-arsed. There is a _lot_ of shitty PHP code floating around, and we don't need to add to that.
2. Make sure this never looks even a bit like a framework.
3. Keep it framework agnostic. Nothing for one single framework. Ever.
4. Follow standards and best practices, as a guide for how others can do the same. - This component world is new, and we need examples for the everyman.
5. Avoid bus-factor, by adding each other to Packagist and GitHub.
6. Avoid stale code, but swapping duties or finding help for the project.
7. Cover for others while they were on holiday.
8. Unit test the shit out of it all.

The most important - and least mentioned part - was the bus factor. At the time, I was Lead Engineer of Kapture. I had somebody working for me who chose to release bits of what we'd been building as open-source code under his own name without consent, which was a bit of a dick move, but not a surprising one if you know the chap.

He vanished off the face of the earth one day. Just up and left. No show at work. No contact. Nothing.

We had a lot of code that relied on that code, so we had to fork it, and a lot of the Laravel community was confused about it too, as it was rather popular!

Now, if one of us vanishes, for whatever reason, that code is not lost. It's in the same repo, we just switch out "Project Leads" and thats it.

## Name Change

The PHPSBFC was a bit of a mouth-full, and had a terrible PHP vendor namespace.

<blockquote class="twitter-tweet" lang="en"><p>The “PHP Super Best Friends Club” is about to launch, we just need a vendor namespace. Besties, Super, Sbfc, or something else?</p>&mdash; Phil Sturgeon (@philsturgeon) <a href="https://twitter.com/philsturgeon/status/322409684151701504">April 11, 2013</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

I was having a little think about names and ran a few past people over IRC, and somebody said: The League of Extraordinary Packages. I bounced that off a few people and the name seemed to go down well.

Nobody thought that was elitist at the time. It was just a play on that stupid Sean Connery movie [The League of Extraordinary Gentlemen] for crying out loud.

If anything, the advice we had was that "extraordinary packages" might sound like a dick joke, and we should be careful not to offend.

Strangely, its others in the community that have been a huge set of dicks.

[The League of Extraordinary Gentlemen]: http://www.imdb.com/title/tt0311429/

## League Draft

I slapped together some list of silly rules and requirements in the space of about 20 minutes using the GitHub Page Builder. Within about an hour somebody had shoved that up on Reddit, and a certain somebody was screaming off about elitism due to some jovial wording in a _very_ early rough draft.

A lot of people, who I know and respect, were being utterly obnoxious about it all on StackOverflow Chat.

Others were diving on us on Twitter.

A great start.

But, fuck em. Let's just write code the best we can.

And we did. For a long time.

We made [Fractal](https://github.com/thephpleague/fractal), [Flysystem](https://github.com/thephpleague/flysystem), [Plates](https://github.com/thephpleague/plates) and Alex brought [OAuth 2 Server](https://github.com/thephpleague/oauth2-server) over from its old home at the University of Lincoln.

There was some great code here. Really, really useful stuff, and it worked _everywhere_. Not just in Symfony, or Laravel, or WhoGivesADamn, but everywhere.

Laravel recently implemented Flysystem into the - currently unreleased - Laravel 5.0 branch, which was huge!

Working together with frameworks to reduce the amount of crap they have to do seems like a big win. There are a fair few domain problems that full-stack frameworks have to deal with. Writing a system that abstracts local and cloud-based filesystems does not seem like one.

Kayla Daniels took over maintenance of the incredibly popular [Omnipay](https://github.com/thephpleague/omnipay) and brought it to the League, which was huge again!

## Premier League

Things were flying at the League. Clearly, we were becoming a serious player in the PHP community.

1. Frank is working on a PSR for Events
2. I was handing my position as the PyroCMS voting representative over to the chap who bought PyroCMS LLC off me as soon as PSR-7 got approved

Logical next step? The League should get on the FIG.

Right then Kayla, why don't you go and apply for...

INTERNETSPLOSION!

[Five pages of this shit](https://groups.google.com/forum/#!topic/php-fig/Toukmt2jkNk%5B1-25-false%5D), but the tl:dr; is that half the FIG freaked out. I don't need to play-by-play this stuff, but if you want some chuckles then I'd suggest cracking out a bottle of the strong stuff; It will take you quite some time to wade through it. It's bizarre, amazing and... well I don't have any more words for it. I can't even with that thread.

Following their logic, as I bought the domain name for the League and was active in conversations around it, I must be the BDFL. The issue there is that - despite explaining I have [sold PyroCMS](https://www.pyrocms.com/blog/2014/08/hard-decisions) and am currently only a Technical Advisor - I must still be the BDFL of that too. This would theoretically give me "two votes" on FIG votes, as some folks seem to think that Kayla is just some mindless peon/puppet voter.

Ignoring the various offensive undertones of those assertions, there was clear confusion around the League.

## League != PHPClasses

PHPClasses is a package directory. It was built probably about 15 years ago, and has barely changed since then.

At some point last year, people got angry and sad with us that we would not let other packages in. People saw us as a closed group who were saying we were better than everyone else, and kept the common muck out - or something. We never had rules against third-parties bringing their components over to the League. We just never considered it, and didn't think anyone would want to!

We put some simple rules on the site, saying they could come over if they promised to try to make their code excellent. Part of that involved consistent branding, as we're a component vendor after-all. Imagine if [Symfony], [Zend], [Aura], [Orno] or [Hoa] had random components with other vendor names?

Allowing packages to occasionally join does not make us into a package directory like PHPClasses. Not even slightly!

PHPClasses focuses on getting as many packages and users as it can. This all helps it generate ad-revenue, derived from aggressive email campaigns, and forced sign-ins to download code. It then
uses those user numbers to brand and defend itself, despite having [no way to remove yourself from the site].

The League is a completely free and open GitHub repository, with no adverts, no newsletter and no logins. We just write code and put it on GitHub, then manage issues and pull requests with the help of our growing community of open-source contributors. You can move your code over to our organisation and we can all work together if you like.

The League also recommends the use of approved standards, and suggests the use of established best practices.

I'm not seeing a similarity between the two there at all.

[Symfony]: http://symfony.com/doc/current/components/
[Zend]: http://framework.zend.com/manual/2.3/en/index.html#zendframeworkreference
[Aura]: http://auraphp.com/packages/v2
[Orno]: https://github.com/orno
[Hoa]: https://github.com/hoaproject
[no way to remove yourself from the site]: https://www.youtube.com/watch?v=0ktiTRwd-pg


## League != PEAR

I think people look at the points we define as metrics of quality, as a checklist to apply to our project. We do not want a million packages. The League probably only ever have about 50, max.

PEAR required votes for packages to get in, but with the League the whole "Apply to join" thing was just an afterthought.

Keep packages out? Anger about elitism.
Let packages in but ask they follow our rules? We make people beg and jump through hoops, like forced PSR-2 usage.
Let any packages in regardless of quality? Angry about poor quality code.

Regardless what we do, somebodies cornflakes are going to taste like piss.

## League Leadership

Also diffused from that bat-shit FIG thread, is obvious confusion about the leadership of the League.

It's quite simple. We don't have a leader.

Paul Jones suggested the term "Open-Source Cabal", which sounds cool but has negative connotations.

I don't know what you'd call it, other than an organisation.

Why would we need leadership? We're all people, with brains, and email addresses. Some of us even have phones. If we're not sure about something, we ask. If we're in disagreement, we work something out.

Not every single open-source project needs a crown and a staff - although Kayla would definitely take them if offered.

## Return of the League

While I am still co-ordinating [PSR-7](https://github.com/php-fig/fig-standards/blob/master/proposed/http-message.md), I won't be rushed out of the FIG. When I'm done there, I can hand things over to Ryan Thompson. There will be no further issue with the League's imagined "conflict" with PyroCMS, and folks can apply again.

In the mean time, The League is still trucking along nicely. The two newest contenders are [CLImate](http://climate.thephpleague.com/) and [Period](http://period.thephpleague.com/). The last was only brought over today, but it's looking super smooth already.

My next article will be about when it makes sense to build new packages, versus contributing to existing code, which will cover a lot of points I would have liked to put into here. It seems The League stepped on some toes with a few packages, and it leads to a great discussion on "When you should start over."

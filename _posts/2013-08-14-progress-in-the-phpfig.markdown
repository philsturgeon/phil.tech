---
layout: post
title: Progress in the PHP-FIG
category: php
tags: php php-fig
permalink: blog/2013/08/progress-in-the-phpfig
excerpt: The PHP Framework Interoperability Group (PHP-FIG) has been around for 4
  years, and it's produced 4 PSR's, which to some is a sign of inevitable doom or
  something. To those "in the know" the future is looking bright, and I'd like to
  let you all know what is going on. Using a new workflow, we are starting down a
  clearly defined path, with obvious steps along the way which not only increase the
  signal to noise ratio, but help get us more awesome PSRs faster.
date: '2013-08-14 20:50:00'
comments: true
disqus_identifier: progress-in-the-phpfig
---

The [PHP Framework Interoperability Group (PHP-FIG)](http://www.php-fig.org/) has been around for 4 years, and it's produced 4 PSR's, which to some is a sign of inevitable doom or something. To those "in the know" the future is looking bright, and I'd like to let you all know what is going on.

For the last two years the ML has been chock full of different discussions about potential PSRs that could be worked on. Different folks have different interests of course, and just like Jordi was interested in working on a logger interface, we've had the Buzz/Guzzle/Requests crews cranking away on various different ideas for HTTP Client and Message PSRs. This to me is the central point of the PHP-FIG as by defining these standards it can stop the need to build 6 different damn adapter classes for your composer package if you want it to work with Buzz, Guzzle, Zend HTTP, Curl, Whatever). This happens [a lot](http://geocoder-php.org/) and it sucks.

Sadly HTTP faded away, as there were so many proposals for it happening at the same time by different people, that it just got lost and forgotten about.

This same thing happened with the Cache proposal, and the new Autoloader got smacked back down due to 11th hour alternative proposals and huge feedback.

## That's not good news!

Nope, but it's the back story for the next bit. 

It became apparent to me that the PHP-FIG wasn't going to get all that far as things stood. I actually saw quite a few problems with the workflow as it was:

* Following every single email is impossible.
* Knowing what to do with alternative proposals is hard.
* Knowing when something can be put in for vote is confusing.
* People feel like some things are rushed through.
* People feel like some things are being dragged out for no reason.
* Ego-trips can potentially block feedback.* Changes happening late in the game can ruin votes or progress.
* If a supporter vanishes then a PSR is dead in the water.
* You go away for 2 weeks and the barrage of emails to read up on can be aggressive.
* Random nicknames for PSRs gets confusing. PSR-X, PSR-T, PSR-PM, PSR-WUT?

We needed a system, so I drafted up a [Workflow Bylaw](https://github.com/php-fig/fig-standards/pull/146). 

After a lot of feedback, rewrites and IRC discussions, [Bernhard Schussek](https://github.com/bschussek), [Larry Garfield](https://twitter.com/crell) and myself got the document finished up. Last week the bylaw was [voted in](https://groups.google.com/forum/#!topic/php-fig/hba-ggOo70Y) with 74% of the voting members showing up at the polls, all of whom voted yes.

## What is all the fuss about?

I believe this workflow will solve all of these problems.

A PSR now has a status:

* Pre-Draft
* Draft
* Review
* Accepted

All 4 existing PSRs are instantly accepted of course, and everything else has no status until it passes the "Entrance Vote". This essentially means that while it's still possible for anyone to create a proposal, it doesn't get any stamp of approval until it has passed the Entrance Vote. For example, if somebody proposes we should be making a standard for inline JavaScript, it's probably not going to pass the vote.

After the Entrance Vote the status is Draft, and to get here it needs an Editor and two Sponsors (one of which is the Coordinator, who is in charge of calling and counting the votes). Once the Editor and Sponsors agree its ready for review the coordinator lets the group know.

This is very useful for the group. It means if I have no interest in a specific proposal (it addresses something I have no domain knowledge on, or I just don't care) I don't need to read every single email, but when it goes for review I can read the "Meta Document" (those are new too) and catch up completely. I can give small feedback, or suggest big changes which might knock it back to Draft if people like them. Realistically, if I have such awesome useful feedback for a proposal I probably should have spoken up sooner, but no process is 100% perfect.

If the Review stage goes well and nobody throws a barney about the actual content, the Coordinator can call an "Acceptance Vote". If this vote passes, it goes straight in.

## Sounds like a lot of work

Not really. Each PSR has a different Coordinator, so I call a vote, wait two weeks, then count. Everyone involved with these PSRs is interested in the topic, so it's not a hardship for them.

The number of emails in the group are reduced, and essentially the signal is boosted and the noise reduced. By creating these little working groups, a lot of the work can be done offline, on IRC, in private, at a bar, whatever, then the Draft and Review stages allow for group participation on a larger scale.

## What does it mean for _you_?

New PSRs are coming, and they're wicked.

* [**Autoloader**](https://groups.google.com/forum/#!topic/php-fig/_LYBgfcEoFE) - PSR-0 is sticking around for the foreseeable future, but this new autoloader updates things for a package-based world. Remember, PSR-0 was made to autoload PEAR/Zend/Horde style code (before Composer was a thing), so updating things is definitely needed. PyroCMS, Drupal and Joomla are all going to use the shit out of this.
* [**Cache**](https://groups.google.com/forum/#!topic/php-fig/mBP6PmG0TqU) - It's back! In a similar way to the logging interface, soon you'll be able to interact with generic cache packages and framework specific cache interfaces without even thinking about it.
* [**PHPDoc**](https://groups.google.com/forum/#!topic/php-fig/M3CcFynWkdo) - The phpDocumentor team are taking their de-facto standard and trying to ratify it, and improve it. Currently the phpDocumentor team have their own DocBlock syntax, and most other API doc systems either use it exactly, or use something similar. We're going to try and find the commonalities between them, and make ONE standard, so API doc builders can use this one. [Obligatory XKCD](http://xkcd.com/927/)

They're all so far passing their Entrance Votes with flying colors. Some will change before they get to Review and later have their Acceptance Vote, but the Autoloader will most likely fly straight on through.

If anyone is freaking out about the new Autoloader then my advice is: calm down. The Composer team are supporting it and it won't effect your packages unless you want to use it. Upgrading a package from PSR-0 to the new Autoloader will take about 5 minutes if you're still learning or about 30 seconds if you've done it before. Upgrading an application will require nothing, it will be completely seamless and use the existing Composer autoloader.

Read the [meta document](https://github.com/pmjones/fig-standards/blob/master/proposed/autoloader/autoload-meta.md).

PSR-0 will probably be deprecated some day, but no date has been set for that. If it happens, it will be a damn long time away, so there is literally no problem there.

If you've got an idea for a proposal now would be a great time to share it on the [ML](https://groups.google.com/forum/#!forum/php-fig) and ask for feedback.

Remember the PHP-FIG motto: If you talk about tabs v spaces, the [Mega Shark](http://www.youtube.com/watch?v=jBizgLZX7W0) will fuck you up.

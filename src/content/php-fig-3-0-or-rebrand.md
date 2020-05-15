---
layout: post
author: [Phil]
title: "PHP-FIG: 3.0 or Rebrand"
date: 2016-08-30 14:48:00+00:00
image: img/2016-08-30-php-fig-3-0-or-rebrand/misunderstanding-mallard.jpg
tags: [php, php-fig, psr7]
comments: true
disqus_identifier: php-fig-3-0-or-rebrand
alias_1: php/2016/08/30/php-fig-3-0-or-rebrand/
---

I'm tired of talking about the [PHP-FIG](http://www.php-fig.org/). I don't want to, and [I won't have anything to do with it](https://groups.google.com/forum/#!topic/php-fig/SZS6LjKTAtw). That said, as my timeline is full of old PHP friends shouting at each other, I'm wondering if I can mediate. I was involved in the PHP-FIG since 2012, and I have seen every conversation, been part of every decision, and know the reasoning for a lot of stuff, regardless of the result and my person preferences. Being so involved with this group for so long, I have a fair bit of context that other people are lacking.

The latest of about four large conversations in the FIG is: whether or not a new organization should take its place. Seeing it framed in this way is odd, because I'm not sure anyone is literally proposing that.

The FIG used to be a tiny group, with a few people being involved with making decisions. This group started off as PHP Standards Group, but soon realized they were too small and self elected to become that. In fact, [I wrote this](https://github.com/php-fig/php-fig.github.com/commit/61592f933661f96cb11c2a86166559276f297c84) into the [PHP-FIG FAQ](www.php-fig.org/faqs/):

> The FIG stands for Framework Interoperability Group. The name until recently was “PHP Standards Group” but this was somewhat inaccurate of the intentions of the group.

They went with the name "Framework Interoperability Group", because they were a lot of frameworks at the time, but it wasn't long until that group grew to involve far more than frameworks. Content Management Systems joined the ranks, as did popular packages and other tools. These were not frameworks, but the name stuck around because the group was gaining traction and it didn't seem very important. Pretend it was called "The PHP Big-Ass/Relevant Project Interoperability Group".

Regardless of the name, the goal of the FIG stayed the same for as long as I can remember:

> The idea behind the group is for project representatives to talk about the commonalities between our projects and find ways we can work together. Our main audience is each other, but we’re very aware that the rest of the PHP community is watching. If other folks want to adopt what we’re doing they are welcome to do so, but that is not the aim. Nobody in the group wants to tell you, as a programmer, how to build your application.

Also in the [FAQ](http://www.php-fig.org/faqs/), and the [README](https://github.com/php-fig/fig-standards#php-framework-interoperability-group).

Despite this very internal project-focused goal, PSRs are used everywhere, by a large majority of the PHP community. There are a lot of potential reasons for this, and some of the ones you hear the most are:

1. **Virality** - Some people like the concept of utilizing existing standards (or the closest thing we have) more than inventing their own snowflake, and so suggest their friends and favourite projects also use these PSRs.

2. **Second Degree** - Users of projects like Symfony are getting these standards forced on them anyway, so they just get used to using them.

3. **Lack of Options** - The PHP community doesn't dish out standards like [PEPs](https://www.python.org/dev/peps/), so the FIG is the only alternative.

Seeing as the PHP community never had a standards body, people have been repurposing others like PEAR and Zend standards since before 11 year old Phil was even writing PHP. There is a clear need for a group to define standards, and the community has over the last few years clearly been leaning towards the FIG.

Ignoring the multitude of other FIG dramas that (despite [one persons paranoid delusions](http://paul-m-jones.com/archives/6384)) have nothing to do with this conversation, two things are currently being proposed:

## FIG 3.0

FIG 3.0 is the nickname of a specific new version of the FIG, which aims to solve a huge array of problems with the way it currently operates. I was one of the main proponents of FIG 2.0, writing most of what became the new [workflow bylaw](http://www.php-fig.org/bylaws/psr-workflow/). This ended what we referred to as FIG 1.0 (or "The Wild West"). FIG 3.0 is much closer to being a formal standards body, the tl;dr of which can be [found here](https://medium.com/@michaelcullumuk/fig-3-0-91dbfd21c93b#.jvrkqh193).

> **Current problems**
> 1. Everyone has equal say on FIG PSRs, no matter their expertise or their project’s relevance in the PSR’s problem space
> 2. There are lots of clever awesome people involved in the FIG who are not project representatives
> 3. Member projects find it difficult to engage in everything going on in the FIG
> 4. There is an ongoing question if the FIG produces PSRs for member projects or for the wider community; especially when the wider community pays it so much attention due to its de-facto status as ‘the php standards body’.

Before this specific implementation was fleshed out, another one of the main proponents of the FIG 3.0 (who was was the 2nd largest contributor to FIG 2.0) was [talking about structure problems in 2015](https://groups.google.com/forum/#!topic/php-fig/oqO1ZH5tJKU%5B1-25%5D).

> Problem 2: Who is FIG's target audience?  Member projects? The PHP  community at large? PHP projects that want to interface with member projects?  There are inconsistent answers to this question.

Everyone inside and outside the FIG was giving different answers. My opinion most of the time was: "The FIG has always been about solving problems for theirselves, and if other people find that useful then good for them. It would be awesome if the FIG can be a full standards body, but the amount of time, effort and work would be wildly outside the ability of what the FIG can do. If it stepped up to the plate and took this on, standards would be higher quality, but take years. It would be an entirely different group and should rename, and if it does that we'd need another group to do what the FIG is currently doing, so lets not bother doing that."

I was pretty much stuck in the _no change_ camp, but the FIG 3.0 proposal being put forward currently is bloody excellent, and entirely changed my mind on that. I now agree with folks like Anthony Ferrera and Gary Hockin, who point out the FIG were just shoving their head in the sand, ignoring the rest of the community and wondering why they were being shouted at. The FIG can continue to shove its head in the sand, or listen to the demands for a more formal standards body. A group that focus on realistic implementations, and working groups that _really_ hash out projects in the real world before shoving a rubber stamp on them.

The new mission statement for FIG 3.0 is:

> The PHP Framework Interoperability Group (PHP-FIG) aims to advance the PHP ecosystem and promote good standards by bringing together projects and people in a shared forum for collaboration and discussion. It develops, encourages, and publicises technical and process standards informed by real-world experience as well as research and experimentation performed by itself and other projects in the PHP ecosystem. These standards form the basis of PHP Standard Recommendations (PSRs).

I like that a lot more. The major difference here (for those watching at home) is that FIG 2.0 currently considers "other people" using their PSRs to be a side benefit, instead of the main focus. The FIG 3.0 changes that, to make the entire community a focus. Now no, that still doesn't mean the FIG is going to come kicking down your doors and telling you to use the standards, because they never have, and never will. Instead, this difference shows a commitment to giving a shit about the community at large, instead of considering the usage of their work by outsiders to be a "happy accident".

## A New Organization

Another related flap is happening around the thread: [Alternative to FIG 3.0 - Is it time to call FIG complete?](https://groups.google.com/forum/#!topic/php-fig/KJJsghdSCYI), but also mostly on Twitter. Despite the wording in there, the suggestion is pretty much just a rebrand.

If the FIG 3.0 happens - in this exact form, or any other change big enough to solve the problems it is suffering - then it's going to be essentially a different organization with the same name. It's the view of Joe (and plenty of other people), that if the FIG as an organization changes its structure, mission, goals and more importantly its target audience, then wouldn't a rebrand just make sense?

Nobody is talking about forking. Nobody is talking about closing the entire thing down and starting from scratch. Just: if it's essentially a new organization, why not make it a new organization?

The name Framework Interoperability Group has been a rather uncomfortable tight fit for years, so maybe now is the time to get a better fit.

A new start, with green fields, and a chance to make a better organization cannot be seen as a bad thing. Lots of others have tried with no backing, and a new "PHP Standards Group" pops up on GitHub every other month. These things never go anywhere, because they lack the support of the huge projects that the FIG has. Whilst I'm not against somebody else trying, I do think the amount of work to make a totally unrelated thing would be hard.

I do hear rumblings of a smaller, leaner, better group setting up shop with some really big names involved, and their approach sounds like it could be awesome, but the FIG 3.0 proposed above with a new name could also do very well indeed.

Either way, the current PHP-FIG is an absolute garbage fire, and y'all need to stop shouting at each other on Twitter long enough to put it out.

There is still a positive future available for the PHP-FIG, and lots of great standards left for it to work on. The [HTTP Middleware stuff](https://phil.tech/php/2016/05/31/why-care-about-php-middleware/) might be working as its own [http-interop group](https://github.com/http-interop) for now, if the FIG can unfuck itself somewhat, then they can get back to working on some amazing new things.

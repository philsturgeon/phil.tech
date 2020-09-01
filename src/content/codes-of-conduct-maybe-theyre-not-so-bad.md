---
layout: post
author: [Phil]
title: "Codes of Conduct: Maybe They're Not So Bad?"
date: 2016-09-15
tags: [humans, equality, coc, php]
excerpt: >
  Code of Conducts are, for some reason, hated by a substantial portion of the tech community. For some people I think this comes down to the idea that they are silly and shouldn't be required. I entirely agree with the portion "they should not be required" and have made fun of them myself plenty when they started popping up at conferences a few years ago. Sadly, there is a reason we need warnings like "These peanuts may contain nuts" or "Hot coffee is hot". Some people are muppets, and don't know what being "not nice" is. Some people know, and don't care.
comments: true
disqus_identifier: codes-of-conduct-maybe-theyre-not-so-bad
alias_1: 2016/09/15/codes-of-conduct-maybe-theyre-not-so-bad/
---

I've written a few articles about Code of Conducts, which are a hotly debated version of the Anti-Harassment policy you almost certainly signed at any job you've held since delivering newspapers. Before I grappled the subject head-on, I wanted to clear a few related points out of the way:

- [Why is Everyone Outraged?](/2016/01/27/why-is-everyone-outraged/)
- [Talking About Diversity: Marginalization](/2016/07/23/talking-about-diversity-marginalization/)
- [Talking About Diversity: Conspiracy](/2016/08/02/talking-about-diversity-conspiracy/)

Now, onto CoCs themselves.

Code of Conducts are, for some reason, hated by a substantial portion of the tech community. For some people I think this comes down to the idea that they are silly and shouldn't be required. I entirely agree with the portion "they should not be required" and have made fun of them myself plenty when they started popping up at conferences a few years ago. Sadly, there is a reason we need warnings like "These peanuts may contain nuts" or "Hot coffee is hot". Some people are muppets, and don't know what being "not nice" is. Some people know, and don't care.

If people weren't having problems at conferences and participating in open-source projects, they would not be trying to solve those problems; unless you buy into the "SJW conspiracy theories" or "making it up for attention" dialogues I've explained away above.

Beyond the "they're daft and unnecessary" arguments, I often see an instant jump to "[Contributor Covenant](http://contributor-covenant.org/) is the devil!" and fears of "another Opalgate" (more on that later).

It's important to always remember that "CoCs" and "CC" are two different things. Much like your boss wanting to implement a coding standard and suggesting [PSR-2](http://www.php-fig.org/psr/psr-2/), picking a coding standard in general is important, even if you have qualms with a few items in the specific one chosen.

Contributor Covenant is a the most common standard for CoC, much like PSR-2 is the most common standard for PHP code style. They both share another similarity: they are both very popular with those who see value in implementing a standard solution, but wildly unpopular with a whole bunch of people who seem to hate being told what to do.

A main chunk of CCs unpopularity comes down to the author [Coraline Ada Ehmke](http://where.coraline.codes/), who - funnily enough - wishes projects would use it. Coraline has "caused problems" in the past, by suggesting that open-source projects should consider using a code of conduct. One example of this would be what many refer to as "Opalgate".

The rough timeline of this was:

1. Contributor to some open-source project said [something dumb about trans people](https://twitter.com/elia/status/611319469982527488)
2. Coraline [posts an issue](https://github.com/opal/opal/issues/941) on said open-source project saying that guy sucks
3. Coraline is basically told to go fuck herself
4. Everyone slings mud for a day or so
5. A [new issue](https://github.com/opal/opal/issues/942) is opened to discuss a CoC
6. A few more days of nonsensical shouting

I can see both sides here. On one hand, you have somebody walking into an open-source community, and saying somebody should be kicked out for their "political beliefs".

_Side-note: The term "political beliefs" is trotted out often by people describing all sorts of things, from racist/sexist/anti-semetic crap, to you name it. "Political beliefs" is "should we raise taxes to pay for university fees" and "did those MPs really try to expense a duck pond", not defending peoples rights to piss all over groups of people. Anyway..._

On the other hand, you have somebody pointing out that tech suffers from the exclusion of margionalized voices, and somebody who labels themselves as a core contributor talking shit about a whole group of people furthers that situation substantially.

Whether you agree with Coraline's actions there or not, it's important to remember the outcome. The project owner closed these issues and adopted version 1.0 of the Contributor Covenant, saying:

> Over the last few days, a number of people in this conversation have taken the issue in hand and shown that discrimination against other individuals in our industry is, quite frankly, alarming. The tech/development/computer industry has a long and troubled history of discrimination against various groups of individuals which, judging by some of the comments in this and other threads, shows no sign of improving anytime soon.
> To the people who contributed comments and messages looking to improve our community: thank you.
> This whole matter could have been sorted in a peaceful manner; instead the problems in our community are not just present inside Opal, they are still present within the whole developer community.

[Elsewhere](http://where.coraline.codes/blog/on-opalgate/), the same chap said:

> Your efforts are very much appreciated and needed, and I still think you did the right thing in speaking out where you saw discriminatory comments.

Now, that seems like a pretty solid resolution. The Opal project didn't suffer at all, it just happened to be the forum for a big argument. Still, ever since that point, a huge number of people have been using this situation as evidence for what they consider to be either a SJW conspiracy, or at the very least "part of a movement" of people "injecting politics into programming" or something, just because the author of a CoC thought that a project should be using a CoC.

In the same vein, a lot of people thought the PHP-FIG were running around trying to force everyone to use PSR-2, just because some of the people who helped create PSR-2 thought that their projects, and some of their friends projects, should probably use a coding standard instead of being a mess. When you work on solving a problem, then you see a problem, and when you have a solution to that problem, _you want to share the solution to that problem_.

I've heard a _lot_ of friends say things like "I don't have a problem with Contributor Covenant, but I disagree with _her_ politics." When you get talking to them, it seems like they think that somehow a project adopting Contributor Covenant gives Coraline power to get contributors fired. They think just because of "Opalgate", she could run up to any open-source project, and say "Two years ago he tweeted some joke that I didn't like, so you should kick him out."

Firstly, that's not what happened in "Opalgate". Although Coraline did appear to run up and disagree with somebody calling for them to be kicked off, that's not the full story. Coraline herself has posted about how she's entirely unhappy with how it turned out, but nobody seems interested in hearing it. Maybe go check out [her side of the story](http://where.coraline.codes/blog/on-opalgate/), as it was never the intention to cause a shitstorm.

Nobody is on a mission to kick people out of projects for being climate change deniers, or whatever other "political differences" that might arise. To my knowledge it's not something that's happened with Coraline before, or since. Nobody cares about her side of the story, because they're too busy demonizing "evil SJWs" and ignoring anyone who expands on the situation saying "lets jut get back to code" the second an explanation is offered.

Secondly, Contributor Covenant has had a bunch of changes to it since that incident. Now it has a whole chunk in there about "Scope", which _explicitly_ states people have freedom to post on their own social media and things not representing the project. People are ignoring this completely and continuing to say things like "They'll use this CoC to get you kicked off a project if you post anything political they disagree with on Twitter", but that's the exact opposite of what the CoC actually says. Theres a bit of wiggle room in there for you to define what is and isn't representing the project, but that wiggle room is intentional for humans to use their human judgement.

Thirdly, if you're one of the people who thinks the Contributor Covenant document itself sounds fine, but are concerned about "her politics" then what exactly is the concern? If you like the look of the rules of a coding standard like PSR-2 but it was written by a Scientologist, that doesn't immediately mean you've joined their cult, and it doesn't mean that Tom Cruise can just turn up at your office and fire whoever he likes. These things have nothing to do with each other.

Now, if we can look at Contributor Covenant itself for a minute, there are a lot of concerns my friends have, and I've got a few responses.

## Contributor Covenant is Too Harsh

The concern about Contributor Covenant being harsh comes from the line:

> Project maintainers who do not follow or enforce the Code of Conduct in good faith may face temporary or permanent repercussions as determined by other members of the project's leadership.

That means, for example, if [The PHP League](http://thephpleague.com/) were to implement this CoC, we're announcing to the users of our projects that if project leads are causing trouble, you can report them just like anyone else. This is letting people know it's not just other contributors, or randos on pull requests, but project leads too. Everyone in the community follows the same rules.

Conferences do the same these days, and outline that sponsors also follow the same rules, not just attendees.

Again, people seem to think from this statement that Coraline can run around firing anyone at will, which is not only a bit misguided, but literally not true. Imagine the same Opalgate thread happening in PHP with the mediation process outlined in [the RFC](https://archive.is/32HUM), which basically said reports should go via an email. If somebody (even Coraline) opened up a GitHub issue calling for somebody to be fired because of something said on Twitter, it would be locked and closed down immediately, with a reply saying "Please contact mediation@php.net", and that's the public dog-pile and "career damaging" avoided.

No drama. No problems. Just private mediation with the involved parties. Ideal.

Contributor Covenant would protect the people who seem most vehemently opposed to it.

## Contributor Covenant is Too Vague, Which Can Lead to Abuse

Vagueness is a big concern of people who are against the concept of a CoC, and specifically Contributor Covenant as the number one implementation. These people often want a big rulebook that says exactly what can and cannot be done, which is just a pandoras box of nonsense.

Firstly, Contributor Covenant is not overly vague. It outlines types of behavior that are generally considered unacceptable, without giving a red/green light to every single possible behavior that anyone could ever do. If you give people a clear line, they'll walk right up to that line and piss over the edge. By allowing context to be used, you'll reduce the "well actually" from people, and stop people being allowed to continue their harassment based on technicalities.

Secondly, there is no global definition of things that are good and bad. This does not exist, and we should all know that. Country, culture, friendship levels, context, language barriers, and all sorts of other things mean that something which is fine to one person is totally not ok to another person.

Thirdly, the concern that CoCs are going to be abused is... interesting to me. This suggests that some people think - for whatever reason - that the implementation of a CoC would lead to more false accusations than real reports. Where this concept comes from I really cannot know. Whenever I ask for examples of this happening, literally the only example of it is Opalgate - which was not a false CoC report, and Brandon Eich; which had literally nothing to do with a CoC, and was more about a CEO (a public figure) being hated by a shitload of the public.

I am open to listening to people on this one. Please, send me your stories. Nodevemember is one I've heard mentioned recently, and I'll admit I've been to busy to look into that. I've never once heard of a falsy accused person being given any level of crap by an imagined claim, using a Code of Conduct as the basis for that persons bad day. I have heard of a million and one stories of women and margionalized groups being given all sorts of shit on an almost daily basis, and have heard of plenty of people saying "I'm not getting involved in that community, it's full of assholes."

## Contributor Covenant Creates Judge+Juror+Executioner

The whole idea of a CoC is to say "Here are some things that are likely to make other people uncomfortable, and if anyone gets uncomfortable they can talk to us about it." If you do something you consider to be innocent and somebody else gets upset, I would suggest that it's far better they report it and you get a polite "Hey they didn't like this" from whoever they reported it to, than the other outcomes:

- A) They do nothing, feel like shit, and walk away from the community
- B) They talk shit about you all over the internet without you even knowing you upset them

I'd much rather a CoC report against me than an upset person. A CoC report is fine, because remember, a CoC report is not a violation immediately. An unreported problem is an unresolved problem, and a report in itself is simply a possibility for a misunderstanding to be resolved.

The only time a report becomes a violation is when you're told about a situation in which you're making others uncomfortable, and you chose to completely ignore that feedback. The feedback could be anything, from something as innocuous as: "I know you think that short joke is ok but they really hate it", to (real example) "Maybe don't wear those incredibly tight shorts to the conference hot tub next year!"

These by themselves are not CoC violations, only reports. I can take that report onboard and say: "Sure thing, I won't do that again." which is not "an admission of guilt": just an acknowledgement that I recognize I'm making somebody uncomfortable. Or, I can say "Shove off, I'm going to keep doing this thing" which is choosing to be a jerk.

It's important to remember that participation in an open-source project is not a right, and a CoC report is not a court of law. As a maintainer of an open-source project, if I tell a contributor to knock of whatever behaviour somebody else considers to be uncool, and that contributor continues to do the thing I told them not to do, that contributor is no longer welcome in my project.  There are plenty of other open-source projects in need of help.

## Summary

There are multiple Code of Conducts kicking around, and Contributor Covenant is just one: A popular one, and one that I don't see an issue with. There are a few other cool ones, like the [Go Community Code of Conduct](https://golang.org/conduct) and [Python Community Code of Conduct](https://www.python.org/psf/codeofconduct/). A decent Code of Conduct in general is fine, so long as you have an email address for reports, and the willingness to actually listen and do something about reports.

Go outlines the purpose of a code of conduct so incredibly well.

> The first goal of the Code of Conduct is to specify a baseline standard of behavior so that people with different social values and communication styles can talk about Go effectively, productively, and respectfully.
>  
> The second goal is to provide a mechanism for resolving conflicts in the community when they arise.
>  
> The third goal of the Code of Conduct is to make our community welcoming to people from different backgrounds. Diversity is critical to the project; for Go to be successful, it needs contributors and users from all backgrounds.
>  
> With that said, a healthy community must allow for disagreement and debate. The Code of Conduct is not a mechanism for people to silence others with whom they disagree.

Nobody can disagree with that can they? If we take away the assumptions of "spring loaded to outraged", "conspiracy" and "malice", and read those statements at face value, we all agree in those goals, don't we?

For anyone still unsure, please try to separate your concerns into the following categories:

1. Bad things you heard about CoCs from random people but have not researched yourself. Maybe throw these away
2. Concerns about Contributor Covenant. Maybe check out the [v1.4 of CC ](http://contributor-covenant.org/version/1/4/) and see if those concerns still stand
3. Concerns about Coraline Ada Ehmke, who is not only a real person, but a really nice person. Maybe consider if one action is enough to demonize somebody forever, especially when that action was essentially only asking "Do you want to be represented by this massive pillock?"

I'd be really interested in listening to your "I was reported under a Code of Conduct" stories. DM them to [@philsturgeon](https://twitter.com/philsturgeon), entirely confidentially. My DMs are open for now. If anyone out there has genuinely had some struggles through a CoC I really really want to know about it. Likewise if you still have concerns about Contributor Covenant, then I'll happily listen. Maybe we can suggest improvements which could be contributed to Contributor Covenant v1.5.

It just seems to me that a lot of people who pride themselves on logic, are being very illogical on this topic. When there are problems, we fix them, and when we do not understand something, we learn. Sadly when discussing CoCs, many programmers seem content shoving their fingers in their ears and arbitrary repeating rhetoric that literally does not line up with reality in the slightest.

We're programmers. We can do a lot better than that.

_**P.S:** I'm $700 short for a [Aids/HIV charity bike ride](http://fundraising.housingworks.org/participant/philsturgeon-2016) going 300 miles from Boston to New York in a few days. If you can throw some cash their way it'll help me help a lot of people. Cheers!_

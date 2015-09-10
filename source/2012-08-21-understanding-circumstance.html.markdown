---
layout: post
title: Understanding Circumstance
category: 
alias: blog/2012/08/understanding-circumstance
excerpt: '"I have been working for years in this industry and I have never needed
  to do what you do. Therefore your opinion is obviously wrong."'
date: '2012-08-21 23:58:00'
comments: true
disqus_identifier: understanding-circumstance
---

I have been working for years in this industry and I have never needed to do what you do. Therefore your opinion is obviously wrong.

> Unless...

What is it you do as a developer? As I see it in web dev there are a few different types:

* Hobbiest
* Client Web Dev
* Distributed Application Devs
* Web App Developer (SaaS)
* Corporate Dev

What do they all have in common? They're all using some sort of language to make some sort of system for somebody somewhere. That is about the last connecting factor that most of us developers actually share.

Now, if you're a web app developer who is working for yourself then you can literally use whatever you like. The crazy thing here is that most developers who are in a situation where they can use whatever system they like, often end up picking a specific tool and using it to death. This is ridiculous, as every developer should use the best tool for the job. If its a project that involves real-time chat then not using NodeJS with some SocketIO would be a huge oversight.

The web app developers are the kind of guys I expect to be the smartest, most well informed types out of the lot, but they often end up being the most elitist. "I've been using Ruby to build applications for the last 5 years, and it always works out well for me". Right, does that make it the right tool for the job EVERY time? I doubt it!

So we have the hobbyists. They just do whatever seems fun at the time, so lets discount them straight off the bat. They aren't being paid to make anything, so they can just kick around having fun with code. *envy*

We're only half way through the list. Who else is left? Client Web Devs. These guys (myself included for the last year or two) are some of the unluckiest buggers. Working for a client that EXPLICITLY requires PHP, or even a specific framework? You won't convince them to use Ruby, or Python, or Node, even if it does provide a better solution for the situation. You can try, but 9/10 they are already set, because their cousins nephew said that this one thing was better once. It probably means you're using WordPress for the job or something...

Even if you want to use PHP these bastard clients require you to use PHP 5.2, because they are on a shit old server that requires it. PHP 5.3 is awesome, supports Namespaces and all sorts of features that bring it into the correct century, but this client says "Nope, tough, you need to use PHP 5.2". In these situations I am OVER THE MOON that PHP frameworks still exist for PHP 5.2, like CodeIgniter and Kohana. If those guys had changed their requirements to be PHP 5.3 only I'd be screwed here. You wouldn't believe how many clients force PHP 5.2 on me, even if it's way out of date. Hell, I even know developers who have PHP 5.1 forced on them. It's horrendous, but it happens.

Despite these unfortunate paid developers, who need to make things work on old-school servers, you also have the distributed application developers. This is me too. Besides knowing that PHP 5.4 is obviously the best version of PHP to ever exist, I am stuck knowing that more than 70% of my users [for PyroCMS] are using PHP 5.3, and another 20% are on PHP 5.2. So, should I just tell 20% of my users to fuck off? No, I have to keep supporting them - for now at least. If I used PHP 5.3 I could use SO MANY COOL NEW THINGS, but I would also have to fire my part-time support developer. That doesn't sound worth it to me.

Then you have the corporate developers, who have to maintain whatever crazy system is already there. You would be scared by what percentage of the entire worlds financial systems run on Fortran and Cobalt. Are they going to replace it all with NodeJS just because its trendy? No, they are going to learn Fortran so they can maintain it, probably until the end of time. This stuff hasn't changed since the 70's so I doubt it will change next month.

The point I am trying to make in all of this, is that while you might have really strong opinions about what language, framework, version of the framework or version of the language you use, EVERYONE has a totally different situation to you. I have a different situation to many other CodeIgniter developers, and a very different situation to most PHP developers, so when I get to talking with my Ruby zealot buddies its amazing to me that they just don't understand why we use different tools. If you don't agree, consider their environment, their requirements and what they do for a job before you throw an opinion at their face. 

I am really tired of short sighted people throwing around inexperienced opinions as fact on Reddit, IRC, Twitter, Email and Forums. Generally if you think somebody is an idiot for using whatever they do then think for a minute. It may well turn out that their situation is TOTALLY different to yours, because you probably have very little in common apart from the fact you are both web developers who both want to get shit done.

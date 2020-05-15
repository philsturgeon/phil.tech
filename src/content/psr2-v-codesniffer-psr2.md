---
layout: post
author: [Phil]
title: 'PSR-2 v CodeSniffer PSR-2: A Success Story'
tags: [psr2, php, php-fig, codesniffer]
excerpt: I've had static analysis tools running in Sublime Text for a long time, but
  for most of that time I have had CodeSniffer and it's PSR-2 rules disabled. I couldn't
  for the life of me remember why I had done that, until I turned it back on again.
  All of a sudden it started complaining about code that I had always considered to
  be perfectly compliant.
date: '2013-10-15 11:39:00'
comments: true
disqus_identifier: psr2-v-codesniffer-psr2
alias: blog/2013/10/psr2-v-codesniffer-psr2/
alias_1: php/2013/10/15/psr2-v-codesniffer-psr2/
---

I've had static analysis tools running in Sublime Text for a long time, but for most of that time I have had CodeSniffer and it's PSR-2 rules disabled. I couldn't for the life of me remember why I had done that, until I turned it back on again. All of a sudden it started complaining about code that I had always considered to be perfectly compliant.

It reminded me of multiple conversations I've had with others in the FIG and the community in general, about how CodeSniffer often enforces rules in the PSR-2 spec that do not exist, or were not what was meant when it was written.

Two months ago I set off on a mission, to get CodeSniffer in line with what PSR-2 really is.

## The Story

As with anything I do, it started with an angry tweet:

<blockquote class="twitter-tweet"><p>Right, I’ve had enough. PHP CodeSniffer is drunk if it thinks this is how PSR-2 works: <a href="http://t.co/2KtSY9cywU">pic.twitter.com/2KtSY9cywU</a></p>&mdash; Phil Sturgeon (@philsturgeon) <a href="https://twitter.com/philsturgeon/statuses/370657376699166720">August 22, 2013</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

This was initially based around one issue, which I call "The Multi-line Argument Issue". In other words, this should be valid:

~~~php
somefunction($foo, $bar, [
  // ...
]);
~~~

After talking to Greg Sherwood it was clear that he would not make changes to the PHP CodeSniffer ruleset without PSR-2 itself being changed to clarify the intentions, and the FIG has been pretty clear about the fact nobody wants to change PSRs once they have been approved.

So instead of throwing my toys out of the pram I decided to set out the milestones required to get this resolved.

1. Poll the group and ask if Errata sounds like a good idea (as initially suggested by Larry Garfield).
1. Create a list of potential Errata for PSR-2.
1. Pull Request the first piece of Errata for PSR-2.
1. Get Greg to implement the change.
1. Repeat until no more issues.

The trouble is half of those things require two-week votes, so this was going to be a long process.

I created a [Poll](https://groups.google.com/forum/?fromgroups=#!topic/php-fig/89he2UxZopk) in the FIG mailing list to see if people would be ok with the idea of allowing Errata in the PSR Meta Documents. This is a good way to get a few yes/nos and potentially have a discussion, which [happened](https://groups.google.com/d/msg/php-fig/lWA0nL_Rs3A/VxWstqQbLEQJ) but was nothing major.

People seemed happy with the idea so I created a [vote for Errata](https://groups.google.com/d/msg/php-fig/qTROKw07848/oHrdnF_Y9fYJ).

The vote passed with 20 for and nobody against out of 27 people. Big success.

Three weeks passed at this point, and we're only just decided that we'll allow Errata to PSRs in general. So the next step was to actually implement the specific Errata for the number 1 discrepancy on my list: "The Multi-Line Argument". 

I created a [poll](https://groups.google.com/d/msg/php-fig/tcOfuWcKNdM/RWX3AzMgNK4J) to work out which examples people felt were valid.

Everyone seemed to believe that this was/should be valid:

~~~php
somefunction($foo, $bar, [
  // ...
]);
~~~

Some disagreed that the following was valid:

~~~php
somefunction($foo, $bar, [
  // ...
], $ban);
~~~

But the majority spoke and I used the poll as a basis for the pull request, which then went to a [vote](https://groups.google.com/d/msg/php-fig/-7iArK7WZA0/6MmXRIWGPIMJ).

The vote passed and two months later PHP CodeSniffer 1.4.7 was a thing, containing all of these changes! 

## Next Steps

CodeSniffer's PSR-2 support is far from perfect. While reporting discrepancies I discovered a few bugs, and from generally tweeting about this stuff I had reports of other issues where CodeSniffer would complain about things that it should have no reason to care about.

I constructed a [PSR-2 v CodeSniffer PSR-2 gist](https://gist.github.com/philsturgeon/6320152#file-3-comment-indentation-md), where people could discuss these issues and report new ones. We're up to 5 and most of them have been fixed in 1.4.7, but we have two left.

For example, [Comment Alignment](https://gist.github.com/philsturgeon/6320152#file-3-comment-indentation-md) is an ongoing discussion but a few people have simply said that CodeSniffer should just ignore comments and let people put them wherever they want. If PSR-2 doesn't say it, CodeSniffer shouldn't flag it.

## Why Bother?

I care because despite the occasionally tricky wording, PSR-2 is actually a nice standard. Hindsight says that chunks of PSR-2 could have been a lot better, but I was around just in time for the vote and my first few reads through never made me consider these things issues. It's often only during the implementation that these things come out, and CodeSniffer is an implementation. This is essentially why I [pulled the PSR-4 vote](http://www.reddit.com/r/PHP/comments/1nks5e/ps4_voting_has_been_pulled_voting_is_closed_and/) at the last minute, because the FIG needs to focus on getting wording as accurate as it possibly can.

This was a huge investment of time and effort, taking the votes, polls, moderating discussions, etc and it is not done yet, but it is all worth it.

My girlfriend has several times complained about me arguing on the internet (yes, that XKCD comic is my life) but I feel happy that these issues have been resolved;

* I can now follow PSR-2 without defining a custom ruleset.
* My employees can now follow PSR-2 without me having to show them how to define a custom ruleset.
* Several people who hate PSR-2 might now realise it's not that bad.
* If they stop hating on PSR-2 so hard, they'll pay attention to other/future PSRs.
* We now have a process for fixing future confusion over potentially badly worded sentences (but we should obviously try to word things better in the first place).

If you spot any more discrepancies get in touch on [Twitter](http://twitter.com/philsturgeon) or in the comments, but if you suggest we make an errata item to allow tabs instead of spaces I will swing the ban-hammer hard.

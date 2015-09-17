---
layout: post
title: 'FUD Cracker: PHP 5.5 never lost JSON support'
category: php
alias: blog/2013/08/fud-cracker-php-55-never-lost-json-support/
excerpt: I'm posting this because I have accidentally been perpetuating some FUD,
  that PHP 5.5 has had its JSON support removed. It hasn't. This article is an apology
  for my involvement in any confusion and an explanation of what actually happened.
date: '2013-08-21 11:50:00'
comments: true
disqus_identifier: fud-cracker-php-55-never-lost-json-support
---

I'm posting this because I have accidentally been perpetuating some FUD, that PHP 5.5 has had its JSON support removed. **It hasn't**. 

<blockquote class="twitter-tweet"><p>If anyone tells you that PHP 5.5 dropped JSON support, that&#39;s wrong. JSON support is there as always (just maybe with a different impl)</p>&mdash; Nikita Popov (@nikita_ppv) <a href="https://twitter.com/nikita_ppv/statuses/370144778781868033">August 21, 2013</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

Some Linux distros are simply choosing to switch from the default ext to using [this one](https://github.com/remicollet/pecl-json-c). MAYBE PHP itself will switch sometime, who knows.

Let me explain my previous confusion.

The other day I was upgrading some Ubuntu servers to PHP 5.5 via the [Ondřej Surý PPA](https://launchpad.net/~ondrej/+archive/php5). Chef ran and did it's thing and everything seemed great until I tried running my tests. Everything was red.

> PHP Fatal error:  Call to undefined function Illuminate\Support\json_encode() on line ....

What the shit? I've not seen that since accidentally running PHP 5.2.x code on a PHP 5.1.x server a bunch of years ago, but this is in a namespace too so it can't be that.

Googling around got me to PHP [bug report #63520](https://bugs.php.net/bug.php?id=63520). In there we see a bunch of smart folk discussing that things might need to be removed or changed due to licenses and politics, but no concrete action is listed at the bottom as to what happened, and it was a few days ago.

I ended up fucking around in the CLI for a while and eventually purged PHP and all of its packages after noticing my php5-dev was still 5.4.x-based. After reinstalling php5-dev my worries were gone, json_encode() worked again.

It was at this point I made a silly assumption. I figured Ondřej had just enabled the new extension by default (which it turns out he did) but other distros were still without, which was seemingly confirmed by a blog post called "[PHP JSON removed in PHP 5.5](http://iteration99.com/2013/php-json-removed-from-php-5-5/)". _It changed its name while writing this and seems to have made a few edits, but it definitely gives off the idea that PHP had actually removed JSON and was waiting for a replacement to go in._

Whatever, I made a silly tweet about it and got on with my day:

<blockquote class="twitter-tweet"><p>Upgrading PHP 5.4 to 5.5 takes almost no time; Well... except for this little nugget of lunacy: <a href="http://t.co/oiEZru7Rbf">http://t.co/oiEZru7Rbf</a> <a href="https://twitter.com/search?q=%23phpdrama&amp;src=hash">#phpdrama</a></p>&mdash; Phil Sturgeon (@philsturgeon) <a href="https://twitter.com/philsturgeon/statuses/369535062233997314">August 19, 2013</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

It was funny and all but it is of course completely wrong. Since then the link has been up on Reddit and it was so wrong one of the moderators took the article off the front-page, which VERY rarely happens. Then it was reposted, but this time [Nikita Popov](https://twitter.com/nikita_ppv) was around to [explain](http://www.reddit.com/r/PHP/comments/1ksnzw/php_json_removed_in_php_55/cbs7kfo).

## What Actually Happened

[ext/json](https://github.com/php/php-src/tree/master/ext/json) is still in master, so php source has not changed. 

Debian removed the original ext/json from their distribution (as detailed in this [Debian bug report](http://bugs.debian.org/cgi-bin/bugreport.cgi?bug=692613)), and have bundled a feature-complete [replacement extension](https://github.com/remicollet/pecl-json-c) into their distro. It seems like the package dependencies might have been a little different (maybe just in the PPA I was using) as somehow my upgrade got me PHP 5.5, but it didn't get me the new ext. As I said removing php5-dev and putting it back again seemed to do the trick, so fuck knows what was going on there.

Put simply, upgrading should be fine. Here are the options while upgrading:

* **Source users:** Compile from updated source and you'll have no problems.
* **Non-Debian/Fedora-based users:** Your package manager will update you with no issue at all.
* **Debian/Fedora-based users:** Your package manager will _probably_ update you with no issue at all. If you get into trouble, purge and install php fresh.

So it looks like I was only having problems because I was using an unstable PPA which had upgraded to PHP 5.5.2 and removed the core ext, putting the new ext in a different package. I had a problem, Googled it and had my fears backed up by a blog article which was not entirely accurate. 

Here is a [better blog post](https://liorkaplan.wordpress.com/2013/06/01/bye-bye-non-free-php-json-extension/) covering what happened, posted in _June_. Sadly it wasn't that one everyone started linking to (myself included). 

So, sorry for any tweets or Reddit comments you saw from me. The whole time I was saying it was silly politics and a non-issue for PHP developers as even if the ext WAS missing, if you're installing PHP 5.5 on your server you can obviously install a PECL. BUT, luckily, you don't have to.

PHP 5.5 works amazingly. Use it. I am.

P.S: This.

<blockquote class="twitter-tweet"><p><a href="https://twitter.com/mwop">@mwop</a> <a href="https://twitter.com/philsturgeon">@philsturgeon</a> <a href="https://twitter.com/rdohms">@rdohms</a> Can we finally use this as a rationale to push people away from distro supported releases? So ridiculous...</p>&mdash; Anthony Ferrara (@ircmaxell) <a href="https://twitter.com/ircmaxell/statuses/370160913854103552">August 21, 2013</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

---
layout: post
title: 'Benchmarking Codswallop: NodeJS v PHP'
category: php
tags: php nodejs benchmarks fud
redirect_from: /blog/2013/11/benchmarking-codswallop-nodejs-v-php/
excerpt: Sometimes people link me to articles and ask for my opinions. This one was
  a real doozy.
date: '2013-11-12 03:01:00'
comments: true
disqus_identifier: benchmarking-codswallop-nodejs-v-php
---

Sometimes people link me to articles and ask for my opinions. This one was a real doozy.

<blockquote class="twitter-tweet"><p><a href="https://twitter.com/reactphp">@reactphp</a> <a href="https://twitter.com/philsturgeon">@philsturgeon</a> NodeJS owns PHP on website scraping ? <a href="http://t.co/zpWQBx3zvY">http://t.co/zpWQBx3zvY</a></p>&mdash; GDmac (@GDmac) <a href="https://twitter.com/GDmac/statuses/399459655765618688">November 10, 2013</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

Oh goody, a framework versus language post. Let's try and chew through this probable linkbait.

> This is more of a benchmark test than example.

Ok so we're benchmarking NodeJS v PHP. Weird, but I'll go along with it.

> External library used for Nodejs was cheerio and PhpQuery for Php.

Well, now we're testing cheerio v PhpQuery which is a bit different, but fine, let's go along with it. These two libraries do essentially the same thing, let you parse HTML and traverse about the DOM model. I can see how one might think it's fair, even if the title is already misleading...

> Nodejs took 175.535 sec to complete where as Php took 711.790 sec to complete. Php was four times slower than Nodejs.

Sure it was, because phpQuery uses `file_get_contents()` which is blocking, meaning each and every single one of those web requests has to be done in turn. PHP is just sitting there waiting for the server to respond, when it could be doing something else. Also where were these tests being run from? The moon?!

We've come a long way from the original title of "NodeJS v PHP", to really asking "cheerio v phpQuery", which is realistically asking "Blocking v Non-Blocking", or "Synchronous v Asynchronous".

Benchmarking to see if "doing multiple things at once" is faster than "doing one thing at a time" almost certainly sounds like a waste of time, but it would at least match the actual code examples being run and therefore be a valid test. Let's just pretend it _was_ worded like that, and have a go at this benchmark ourselves.

## Setup

I made [a repo](https://github.com/philsturgeon/nonblockingbro) and shoved a Vagrantfile in there with just the basic Ubuntu 12.10 image. I could have done up a whole Puppet manifest, but this will be a useful learning exercise for people who want to learn how to setup ReactPHP anyway. Vagrant up that box, then ssh in. All the test scripts are in there.

I have no idea what version of PHP he is using because he doesn't actually say, but let's just go with PHP 5.5 ourselves because it is the current more recent stable version.

{% highlight php %}
$ sudo add-apt-repository ppa:ondrej/php5
$ sudo apt-get update
$ sudo apt-get install php5-cli
{% endhighlight %}

That gets PHP ready.

{% highlight php %}
$ sudo apt-get install -y php5-dev libevent-dev
$ wget http://pecl.php.net/get/libevent-0.0.5.tgz
$ tar -xzf libevent-0.0.5.tgz
$ cd libevent-0.0.5 && phpize && ./configure && make && sudo make install
$ echo "extension=libevent.so" | sudo tee -a /etc/php5/cli/php.ini
{% endhighlight %}

That should sort out libevent, so we can let PHP work with event loops.

{% highlight php %}
$ sudo apt-get install -y python-software-properties python g++ make
$ sudo add-apt-repository ppa:chris-lea/node.js
$ sudo apt-get update
$ sudo apt-get install -y nodejs
{% endhighlight %}

This will install a version of Node much newer than the 0.6.x Ubuntu's default repo will give you.

{% highlight php %}
$ npm install request
$ npm install cheerio
{% endhighlight %}

Now we have the NPM modules for Node to do its thing.

## Variables

**Bandwidth:** 15 Mbps
**Vagrant Memory:** 1024MB
**PHP version:** v5.5.5
**NodeJS version:** v0.10.21

I used phpQuery with the [one file](https://code.google.com/p/phpquery/downloads/detail?name=phpQuery-0.9.5.386-onefile.zip&can=2&q=) download, because they haven't bothered getting it on Composer yet. If they're going to flagrantly ignore PSR-0 and Composer I may as well go with performantly packaged option.

## Run the Tests

{% highlight php %}
$ cd /vagrant
$ chmod +x ./run.sh
$ ./run.sh
{% endhighlight %}

This will run the same two examples from the original article first, then run my non-blocking example put together with a little help from [Chris Boden](https://twitter.com/boden_c), one of the ReactPHP developers.

## Results

My async re-do of the original PHP example kicked the fuck out of everything else.

Here are the numbers:

### Node v0.10.21 + Cheerio

> real	0m45.142s
> user	0m8.081s
> sys	0m0.888s

### PHP 5.5.5 + phpQuery (Blocking)

> real	3m33.601s
> user	0m8.685s
> sys	0m1.212s

### PHP 5.5.5 + ReactPHP + phpQuery

> real	0m23.877s
> user	0m10.237s
> sys	0m1.568s


People like pretty graphs:

<img src="https://dl.dropboxusercontent.com/u/37978558/blog/php-v-node-results.png" alt="Num. Seconds Passed v Page Number" style="width: 750px;"/>

## Conclusions

The primary conclusion to draw from this is that doing 200 HTTP requests in sequence is slower than making multiple requests at the same time. Shocker that.

We can also be pretty confident that the original article was completely wrong about everything. PHP is not as pathetic at async code as the original "benchmark" alludes to. It is entirely down to how a package decides to implement libevent or libev, much like ReactPHP has done.

Both systems can probably go faster somehow, and both systems could probably have their API's cleaned up some to make this even easier. They both need some fault tolerance because when I cranked up the number to 1000 both systems had problems.

I'm not going to say either system is faster, just that the massive gap in the original article comes down purely to picking a blocking system. Run it yourself, and make your own conclusions. Let's just say that PHP is not sucking as bad as some people would expect.

_**Update:** A few people have mentioned that Node by default will use maxConnections of 5, but setting it higher would make NodeJS run much quicker. As I said, I was sure NodeJS could go faster but I would never make assumptions about something I don't know much about. I re-ran the test and the results reflect these suggestions. Removing the blocking PHP approach (because obviously it's slow as shit) and running just the other three scripts looks like this:_

<img src="https://dl.dropboxusercontent.com/u/37978558/blog/php-v-node-results2.png" alt="Num. Seconds Passed v Page Number" style="width: 750px;"/>

_Look, they're the same. At this point it is just a network test. The speed between the two systems for handling this specific task is essentially identical, with both systems taking it in turns to "win" as they swap by about 0.3 seconds. This does not really effect any of the rest of the article, because it was assumed node could be tweaked to be more in line with PHP, I was never trying to suggest PHP was faster than node (even though a bunch of you seemed to think I did). Where did that come from?_

## Observations

It is worth noting that the faster the network connection the less the difference is between the two. At 82 Mbps down [Jon Sherrard](http://twitter.com/jshez) was reporting "PHP 5.5.5 + ReactPHP + phpQuery" running at 15 seconds and "Node + Cheerio" running at 18 seconds.

I asked a few friends to try having a go at improving the speed of the original posters NodeJS code, and a [few alternatives](https://gist.github.com/boxedfish/7423034) sprung up from [Alex Akass](https://twitter.com/alexjakass). His results have them pegged as only slight speed improvements, while mine had ps4.js clocked at about 9 seconds, which is mental. It did use a lot of child processes and fail when the page count was bumped to 1000 though, which is a useful reminder that none of this is magic and everything has costs.

## Thoughts

It seems likely to me that people just assume PHP can't do this stuff, because by default most people arse around PHP with things like MAMP, or on their shitty web-host where is is hard to install things and as such get used to writing PHP without utilizing many extensions. It is probably exactly this which makes people think PHP just can't do something, when it easily can. It is also probably this that causes package developers to generally ignore depending on functionality that would be extension only, just like PyroCMS often has to do.

This is why the work being done by folks like the ReactPHP project is incredibly important. They're wrapping up things like libevent and libev to provide developers with a simple Composer package to base other code on. Simple dependencies abstracting complicated stuff is exactly what modern development is all about, and PHP is keeping up nicely.

The HTTP Client library I used in this example is a little weak and only works with HTTP 1.0, which is problematic. For this reason [Igor Wiedler](https://twitter.com/igorwesome) himself recommends that you don't use it, but there is no reason why a better version could not be built.

[Guzzle](http://guzzlephp.org/) might get some async love soon too wrapping up [curl multi](http://php.net/manual/en/function.curl-multi-init.php), as [Nils Adermann](https://twitter.com/naderman/status/399988127705468928) just finished up a [pull request](https://github.com/guzzle/guzzle/pull/466). Great timing!

## Summary

The trolls will no doubt say I am only defending PHP (again) because I am just not clever enough to learn other languages, but really I am tired of people making shit up. Once again people this is an example, not a specific piece of rage against just one person that wrote one shitty article. This happens a lot, and this should be an example to people who will try it again.

PHP has enough [legitimate concerns](http://phpsadness.com/) without people just pretending they're scientists and using bullshit numbers to prove that up is left and cheese is made of potatoes.

## Update: 08/11/2013

I am happy that the vast majority of people got the point of this article. It got some amazing attention reaching about 40,000 hits on Google Analytics, front page on Hacker News for a bit, etc but the best was several tweets and RTs from the official NodeJS account, who have read it and seem to agree:

<blockquote class="twitter-tweet" lang="en"><p>.<a href="https://twitter.com/philsturgeon">@philsturgeon</a> Nice article.&#10;&#10;Node users don&#39;t know about maxSockets.&#10;&#10;PHP users don&#39;t know about React.&#10;&#10;Much work to do, all around!</p>&mdash; node js (@nodejs) <a href="https://twitter.com/nodejs/statuses/400295942311534592">November 12, 2013</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

So you can be happy or sad about this article, but it is not wrong.

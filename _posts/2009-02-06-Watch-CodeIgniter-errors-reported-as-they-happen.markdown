---
layout: post
title: Watch CodeIgniter error's reported as they happen
category: codeigniter
permalink: blog/2009/02/Watch-CodeIgniter-errors-reported-as-they-happen
excerpt: How do you read your CodeIgniter error logs for your live site? Download
  them via FTP and open them up each time, scroll to the bottom and read? That sucks!
  Try tailing.
date: '2009-02-06 18:46:00'
comments: true
disqus_identifier: Watch-CodeIgniter-errors-reported-as-they-happen
---

If you have access to your web server via the command line, you can use a unix command called `tail`. You can use this to watch changes in any text file as they happen, in this case, our CodeIgniter log.

**Step #1:** Make sure you have error reporting enabled in your `application/config/config.php` folder. For full error reporting, set the config item to 4 as below.

{% highlight php %}
$config['log_threshold'] = 4;
{% endhighlight %}

**Step #2:** Then set your CodeIgniter log to be writeable by the server (you have probably already done this, but let's just make sure).

{% highlight console %}
$ chmod 777 ./codeigniter/logs
{% endhighlight %}

**Step #3:** Now for the important one. This will show changes to the log file as they happen. Hit enter to add some clear space, and Ctrl + C to break out of the stream.

{% highlight console %}
$ tail -f ./codeigniter/logs/log-YYYY-MM-DD.php
{% endhighlight %}

Now as you run each instance you will see a stream of debug and error messages. Setting to 4 might be a little too high in most cases, try turning it down a little.

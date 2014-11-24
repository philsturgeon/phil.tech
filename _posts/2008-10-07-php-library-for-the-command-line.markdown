---
layout: post
title: PHP Library for the Command Line
category: 
permalink: blog/2008/10/php-library-for-the-command-line
excerpt: Not looking forward to using a different language to get some command line
  work done? It could be worth it, but we don't all have the spare time to learn.
  Cut some time with this PHP class.
date: '2008-10-07 08:58:00'
comments: 'true'
disqus_identifier: php-library-for-the-command-line
---

[![PHP Command Line Library demo screenshot](/libraries/spaw2/uploads/default/images/php-cli-thumb.jpg)](/libraries/spaw2/uploads/default/images/php-cli.jpg "PHP Command Line Library demo thumbnail")Using my sexy new PHP CLI library you don't even to learn anything. It will be Ignited and posted properly when I get the chance, but for now take a look at the demo code and give it a try.

[Pastebin: PHP Command Line Class](http://styledna.pastebin.com/f69855cc9 "PHP Command Line Class")

To get this working simply save the file in your web root and open up your command line tool of choice. In Windows that would be Run > cmd [Enter] and on Mac you hit CMD + Space > Terminal [Enter].


Type in:

{% highlight console %}
$ php /path/to/file.php
{% endhighlight %}

The path to your file may well be something like:

- "C:\Program Files\Apache Software Foundation\Apache2.2\htdocs" (Windows Apache 2.2)  

- /home/username/public\_html/cli.php (Linux Apache)  

- /Users/username/Sites/cli.php (Mac Leopard Apache)

Let me know what you think in the comments... in a few days when they work. :p


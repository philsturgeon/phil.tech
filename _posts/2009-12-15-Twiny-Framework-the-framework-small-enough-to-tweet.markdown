---
layout: post
title: 'Twiny-Framework: the framework small enough to tweet'
category: php
permalink: blog/2009/12/Twiny-Framework-the-framework-small-enough-to-tweet
excerpt: " Many frameworks say they are lightweight, quick and easy on your server,
  but none are as lightweight as my new \"framework\" which is so lightweight it can
  fit in a Tweet. \n"
date: '2009-12-15 17:03:00'
comments: 'true'
disqus_identifier: Twiny-Framework-the-framework-small-enough-to-tweet
---

<p>Many frameworks say they are lightweight, quick and easy on your server, but none are as lightweight as my new &quot;framework&quot; which is so lightweight it can fit in a Tweet.</p>

{% highlight php %}
<? $g=$_GET;$c=@$g['c']?:'Home';
if(!@include"c/$c.php")die('fail');
$m=method_exists($c,$m=@$g['m'])?$m:'index';
$o=new$c;$o->$m($g);
{% endhighlight %}

<p>This idea was not my own, but was inspired by <a href="http://twitto.org/" target="_blank">Twitto</a>. During some extreme boredom at work I decided to &quot;one-up&quot; this teeny-tiny framework and improve on it. My framework does this by allowing you to run Controller files and methods in a similar way to CodeIgniter, while Twitto only has the ability to run functions from a single file.</p>

<h3>Usage</h3>

{% highlight php %}
class Blog
{
    function index()
    {
        echo "This is my blog!";
    }
    function view( $params )
    {
        echo "This is article #".$params['id'];
    }
}
{% endhighlight %}

<p>This simple class structure contains a method for each page, defaulting to index. If no controller is set, then it goes to Home.php.</p>

<ul>
	<li>index.php - Runs Home-&gt;index() in ./c/Home.php</li>
	<li>index.php?c=Blog - Runs Blog-&gt;index() in ./Blog.php</li>
	<li>index.php?c=Blog&amp;m=view&amp;id=1 - Runs Blog-&gt;view($params) and id can be accessed via $params[&#39;id&#39;]</li>
</ul>

<p>You can get to that with URL&#39;s like index.php?c=Blog&amp;m=view&amp;id=1, but with some mod_rewrite that could be reduced to /Blog/view/id/1 easily enough.</p>

### MVC?

Want full MVC? Set an autoload function to check ./m/ and use:

{% highlight php %}
    function view($params)
    {
        include'm/blog_m.php';
        blog\_m::get( $params['id'] );
    }
{% endhighlight %}

Views would just be another include with direct access to your variables set in the controller.

### Summary

As I said this mainly came out of boredom and is not meant for serious use (or serious ridicule), but it is cool to see how much can be done with less than 140 characters of PHP as base. I could do some awesome things with this by taking it up to 300-400 characters, but that would spoil the fun right?
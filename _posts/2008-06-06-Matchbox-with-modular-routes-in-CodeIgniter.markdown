---
layout: post
title: Matchbox with modular routes in CodeIgniter
category: codeigniter
redirect_from: /blog/2008/06/Matchbox-with-modular-routes-in-CodeIgniter/
excerpt: Want to make your Matchbox modules totally self-reliant? That is no easy
  thing right now, but follow this simple hack to get your custom routes modularised.
date: '2008-06-06 12:13:00'
comments: true
disqus_identifier: Matchbox-with-modular-routes-in-CodeIgniter
---

I have seen a few people posting around the [CodeIgniter forums](http://codeigniter.com/forums/) looking for a way to add config items and routes into Matchbox and after a two-minute ponder I realised it was ridiculously simple. To get it working on your CodeIgniter setup.

- Open up `./application/libraries/Router.php`. This is the Matchbox replacement router library and not your core CodeIgniter one.
- Around line 126 add in the following:  

{% highlight php %}
// Load module routes files.
$modules = array();
foreach ($this->_matchbox->directory_array() as $directory):
     
  foreach(glob(APPPATH.$directory.'/*', GLOB_ONLYDIR) as $module):
  @include_once($module.'/config/routes.php');
  endforeach;

endforeach;
{% endhighlight %}
 
- In each of your modules that you want to have routes, make a folder `/config/` and make a new file `routes.php`.
- Put your routes in!

The routes work in exactly the same way, you are not required to do this for every module and it means you can put any module in or out of your installation without worrying about the main routes file.

For those of you who don't like hacking libraries like this, have no fear, I have mentioned this to Matchbox creator Zacharias Knudsen and it will be included in the next release.

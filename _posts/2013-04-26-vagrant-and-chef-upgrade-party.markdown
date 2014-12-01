---
layout: post
title: 'Vagrant and Chef: Upgrade Party'
category: devops
permalink: blog/2013/04/vagrant-and-chef-upgrade-party
excerpt: The other day I thought to myself, I really should be using a RVM gemset
  for my "devops" repo, which contains all my Vagrant and Chef logic (along with submodules
  for everything else). This broke everything, but I got there in the end.
date: '2013-04-26 22:00:00'
comments: true
disqus_identifier: vagrant-and-chef-upgrade-party
---

The other day I thought to myself, I really should be using a RVM gemset for my "devops" repo, which contains all my Vagrant and Chef logic (along with submodules for everything else). 

This repo is meant to be a minimum-fuss "Go-bag" for any freelancers I bring in to help me at Kapture so using a Gemset for this reduces an extra step of "Oh yeah you need to make sure you have this version of Ruby and these gems installed".

In doing this, I accidentally forced myself to upgrade from Chef 10.12 to v11.4 and Vagrant v1.2.2. These both had breaking changes, so this ended up sucking pretty badly. 

This guide shows how I muddled through. There are other ways of doing it no doubt, and I may well be showing ignorance or stupidity in my approaches, but this is how I went from "everything working" to "its fucked" to "everything working again".

### Vagrant Upgrade

I deleted the gem locally and tried to install it in my gemset, but then noticed in the docs the newest version no longer has a gem.

I could have installed an old version, but they've been recommending against using the gem for a while so I jumped in the deep end with v1.2.2.

The upgrade was actually simple, I just made a metadata.json file next to Vagrantfile:

{% highlight javascript %}
{
    "provider": "virtualbox"
}
{% endhighlight %}

After that I found myself having to destroy the box, and bring it back up. That's fine because Chef has it provisioned and everything so, I did that, rebuilt it and carried on working all day.
    
### Chef Troubles

I had two problems with Chef this week. The first came from me not noticing the new Chef gem in my gemset was 11.4, and my Vagrant box was rocking it old school on v10.12. I've been using these systems without updating anything while I build out Kapture, but the guys building Chef have been hard at work too.

While provisioning Chef throws out this error:

> NoMethodError: undefined method `unpack' for chef

A little Googling took me to [StackOverflow](http://stackoverflow.com/questions/11325479/how-to-control-the-version-of-chef-that-vagrant-uses-to-provision-vms) (funny that) and the solution worked nicely:

{% highlight console %}
$ vagrant up --no-provision 
$ vagrant ssh
{% endhighlight %}

When inside the vagrant box:

{% highlight console %}
$ sudo dpkg --purge chef chef-full
$ wget -O - https://opscode.com/chef/install.sh | sudo bash
$ sudo apt-get update && sudo aptitude safe-upgrade
$ sudo rm /var/cache/apt/archives/*.deb
{% endhighlight %}

That took care of my Chef complaints perfectly, and I got to update my boxes. Again, I carried on working all day, but then I tried to bring the box back up the day after:

> Vagrant assumes that this means the command failed!  
> 
> mount -t vboxsf -o uid=`id -u vagrant`,gid=`id -g vagrant` /vagrant /vagrant  
> The following SSH command responded with a non-zero exit status.  
> Vagrant assumes that this means the command failed!
    
It turns out the command I ran to update Chef wiped out the Virtual Box Guest Additions. A quick chat on the IRC pointed me to the [Troubleshooting section](http://docs-v1.vagrantup.com/v1/docs/troubleshooting.html) (thanks [Chris Boden](https://twitter.com/boden_c)) and the first answer took care of this almost perfectly.

{% highlight console %}
$ sudo /etc/init.d/vboxadd setup
{% endhighlight %}

I ran that and got errors, indicating I was missing `linux-headers-3.5.0-27-generic`. So first I had to install that with apt-get then run the command again.

Now I can reload my box consistently. Yaaaay!

Luckily I am developing solo at Kapture at the moment, because going through all of this on multiple boxes, or getting multiple developers to destroy their boxes would have sucked. 

To avoid many of the problems I'm going to start building my own boxes with [VeeWee](https://github.com/jedi4ever/veewee). This lets me build my own .box files, so I wouldn't need to use an .box with old Chef then upgrade, I would just build a new box and it would magically install the latest version.

I really should have been doing this before, but until now I've been getting by fine with grabbing shit off [Vagrantbox.es](http://www.vagrantbox.es/) and going with it.

I'll blog this up when I'm done.

**Update:** [Done](/blog/2013/05/build-your-own-vagrant-boxes-with-veewee).
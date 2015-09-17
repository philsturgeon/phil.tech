---
layout: post
title: Build your own Vagrant Boxes with VeeWee
category: devops
alias: blog/2013/05/build-your-own-vagrant-boxes-with-veewee/
excerpt: "The other day I posted an article about upgrading Chef and Vagrant, and
  the pains you can end up having by relying on third-party vagrant boxes instead
  of building your own with VeeWee. \n \nGetting started was initially confusing to
  me, as I knew VeeWee was a gem, so I just tried installing it directly into my application
  gemset. The trouble here is that VeeWee depends on the Vagrant gem version v1.0.x
  and Vagrant is now not only on 1.2.2 but not actually a gem anymore."
date: '2013-05-05 18:57:00'
comments: true
disqus_identifier: build-your-own-vagrant-boxes-with-veewee
---

The other day I posted an article about [upgrading Chef and Vagrant](/blog/2013/04/vagrant-and-chef-upgrade-party), and the pains you can end up having by relying on third-party vagrant boxes instead of building your own with [VeeWee](https://github.com/jedi4ever/veewee).

Getting started was initially confusing to me, as I knew VeeWee was a gem, so I just tried installing it directly into my application gemset. The trouble here is that VeeWee depends on the Vagrant gem version v1.0.x and Vagrant is now not only on 1.2.2 but not actually a gem anymore.

## Step 1: Create a "VeeWee" area

So, to get going the best thing to do is clone the VeeWee repo, which creates a new RVM gemset for you. This is a whole separate are probably in ~/Development or something:

~~~console
git clone git@github.com:jedi4ever/veewee.git
~~~

## Step 2: Install Dependencies 

When this is done if you have RVM set up to check for .rvmrc files it will ask you if you wish to trust this new gemset. If you see this, hit "y" to approve. If this message is not displayed (because you are not looking for .rvmrc files) then go and [set that up](https://rvm.io/rvm/install/). It should be something like:

~~~console
echo "source $HOME/.rvm/scripts/rvm" >> ~/.bash_profile
~~~

With your gemset alive, you may well be told you need to install Ruby 1.9.2, which may or may not work:

~~~console
rvm install ruby-1.9.2-p320
~~~

On my work laptop it failed to find a build for this version of OSX. In this scenario RVM should try to build the correct version of Ruby from source, but it just threw its toys out of the pram and slapped me with a "Tough shit, go home." error of some description.

To get around this I just tweaked the .rvmrc file to use 1.9.3, which has seemed to work without issue so far.

_I've sent that version bump in as a [pull request](https://github.com/jedi4ever/veewee/pull/668), so it should be solved in the next version._

Pop back out of the folder and back in:

~~~console
cd ..
cd veewee
~~~

This is a janky way to get your command line using the gemset, as it will have failed earlier due to lack of Ruby. There's probably a quicker way, but I don't care enough to Google it.

Now install the gems VeeWee requires with bundler:

~~~console
bundle install
~~~

## Step 3: Building your Box

This section is pretty much just a regurgitation of the wonderful documentation found [here](https://github.com/jedi4ever/veewee/blob/master/doc/vagrant.md).

See what templates are available:

~~~console
bundle exec veewee vbox templates | grep -i ubuntu
~~~
	
Give up and use Ubuntu for everything:

~~~console
bundle exec veewee vbox define 'quantal64' 'ubuntu-12.10-server-amd64'
~~~
	
Kick off the build process. Once you've confirmed the download you might as well go for a walk, because it will be going for close to an hour:

~~~console
bundle exec veewee vbox build 'quantal64' 
~~~

That is the worst of it done. Export just builds up the box and shoves it in the working directory:

~~~console
bundle exec veewee vbox export 'quantal64'
~~~
	
Then add it to Vagrant:

~~~console
vagrant box add 'quantal64' 'quantal64'
~~~
	
I already had a box with this name, so I just killed it off then re-ran the box add:

~~~console
rm -rf ~/.vagrant.d/boxes/quantal64 
~~~
	
## Step 4: Put the .box somewhere useful

This step depends on how you're doing things. The VeeWee docs suggest you can just do:

~~~console
cd ~/Development/myapp
vagrant init 'quantal64'
vagrant up	
~~~

If you're creating a new Vagrant dev environment from scratch then this is no doubt fine, but for me I was replacing an [existing setup](https://github.com/pyrocms/devops-vagrant) for PyroCMS. This made it a little more tricky, but not much.

We used to reference a random .box from somebodies GitHub profile, found via VagrantBox.es. I figured I could just shove this on Dropbox, but first I wanted to see if I could put a local filepath into the box_url property. Luckily, you can!

In your _Vagrantfile_ add this:

~~~ruby
config.vm.box = "quantal64"
config.vm.box_url = "/Users/phil/Development/veewee/quantal64.box"
~~~

Now boot your box:

~~~console
vagrant up
~~~

It will copy from your hard-disk (much quicker than over the network) and hopefully boot just fine.

After you've tested your box locally you can shove it on some network share, or internal URL, or Dropbox, or whatever, so you, your friends/colleagues/minions can work with the exact same box as you.

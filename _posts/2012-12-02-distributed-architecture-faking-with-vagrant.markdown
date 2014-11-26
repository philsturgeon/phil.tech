---
layout: post
title: Distributed Architecture Faking with Vagrant
category: devops
permalink: blog/2012/12/distributed-architecture-faking-with-vagrant
excerpt: " Working for Kapture I've been charged with something I've never really
  had to do before: Managing a big-ass architecture of different servers that all
  handle different tasks. Theoretically I've always known how it works, and I've worked
  in projects that have had these systems, but I've never been put in charge of how
  that whole situation works out. So this little web developer had to do a lot of
  learning. \n\n   "
date: '2012-12-02 02:29:00'
comments: 'true'
disqus_identifier: distributed-architecture-faking-with-vagrant
---

Working at [Kapture](http://kaptu.re/) I've been charged with something I've never really had to do before: Managing a big-ass architecture of different servers that all handle different tasks. Theoretically I've always known how it works, and I've worked in projects that have had these systems, but I've never been put in charge of how that whole situation works out.

So this little web developer had to do a lot of learning.

I played with [Puppet and Chef](/blog/2012/10/puppet-or-chef) to help me with provisioning the servers themselves, but then I had to work out how I was going to run the servers locally and online. This for me was a massive block.

For years until a few months ago I used MAMP Pro for pretty much everything. People always said "Duh, why don't you use OSX's built in 'AMP stack, but I said I liked a little more control over versions. Sure I can arse around with homebrew to swap stuff out, but even then it gets complicated. MAMP at least gave me a little control and avoided screwing around with a stack that my OS relied upon for certain features. Still I had the issue of how to handle virtual hosts.

Screwing around with Apache config just to get a single domain running seemed trivial enough, but when you have about 20 domains to manage it just seems like effort, so you end up getting something like VirtualHostX which isn't free, or MAMP Pro which is even more expensive.

Then you realise that you need some extra extensions for a certain project, so you install them.

Then you realise that a different project requires a different versions of that same extension, or needs PostgreSQL instead of MySQL. Now you have both installed on your workstation.

I could go on, but this is all AAAGGGHHHHH WRONG. So stop that.

The solution for any project more complicated than some FooCMS install is to use Vagrant, which I have been [blogging about][vagrant] quite a lot recently. Vagrant wraps up each project in its own server so you can run NodeJS, Ruby, PHP, PostgreSQL, Mongo, whatever each of your projects need without them getting in each others way.

## Why u uze NodEJS and PHP?!!?1

People know me as a PHP developer, but I would prefer to think of myself as a web developer. Kapture currently uses Ruby, PHP, Python, Erlang and even some Java here and there.

Why? Because we have a bunch of different servers that do different things.

* API (PHP)
* MySQL
* Redis
* Admin Panel
* Queue (RabbitMQ)
* Workers (Some PHP and some Python: PIL)
* Graylog2

That's a whole bunch of stuff, and they are all welcome to require whatever the hell programming language they need to get the job done - I am not only going to pick PHP based products for the sake of it.

## Local Environment

This is where it gets interesting. Each of these different servers all run on the same vagrant installation.

Each of the servers listed above is considered by Chef to be its own "role". Roles can be applied to one node each, or they can be lumped together so the same "node" has multiple "roles". 

We have a "queue" role, an "admin" role, an "api" role, etc. In production and staging each "role" is applied to its own EC2 box (considered by Chef to be a "node"), but locally all roles are applied to the same vagrant box.

Some vagrant pro's at this point will say: "Woah, hang on a minute, why?". Sure, vagrant can handle multiple "hosts" per vagrant file, but this starts to get silly when you have multiple nodes for a few reasons.

### Six Virtualised Servers aint quick

If you only have two "nodes" then you're probably going to be ok. But if you have 6 or 7 like we do you're really going to have a bad time. 512MB assigned to each one, each web-facing server running Nginx, PHP-FPM and APC or whateverthecrap else, is all a massive waste of memory. The valuable thing about using Vagrant is that they are all running the same VERSIONS of the software you need, but who cares if they have 3 or 4 virtual host entries instead of 1? 

Sharing the same resources makes a whole lot more sense than trying to actually replicate the full architecture on your local machine. After all, you have staging to test this stuff, so why worry about the network architecture locally?

### Chef = $

If you're using Chef then they're counting your nodes and charging accordingly. We have "vagrant-phil", "vagrant-dan" and "vagrant-john", instead of having 7 nodes EACH.

Yes we could install our own Chef server, but we could manage our own Git repos instead of using GitHub and we could write our own OS instead of using an existing distribution. Whatever, we have things to do.

## Vagrantfile

So to set all this up is actually pretty simple. One thing I love to do is have the main codebase(s) installed locally as submodules, then share them via NFS so they can be permissioned, chmoded, etc to run properly. Then I use 198.* as an IP address because it allows NFS to function properly while not actually hitting the outside network. If you go with 10.* as a lot of people do then some commercial networks are going to fight back, and if you pick some random IP which is shared with your dev team then as soon as a colleague fires up the vagrant box you're going to fight each other for the IP address. 198 keeps it safe. 

<script src="https://gist.github.com/4186666.js?file=Vagrantfile"></script>

## Environmental Differences

So the main difference between local and staging/production is going to be that your code is installed in different locations. Locally it's going to be /vagrant/www/whatever and in production it's going to be /var/www/. If like me you use Chef to actually deploy your code then it's actually going to be /var/www/current/ too, as they use a Capistrano-like folder system to symlink to the "latest" revision in your Git repo as the current version.

This can be handled with Chef "environments":

<script src="https://gist.github.com/4186666.js?file=dev"></script>

So the default "attributes" for the "role" are set to whatever staging/production expect (/var/www/current) and develop overrides that logic in the environment to be /vagrant/www/api. 

## MOAR CODE

Sorry guys but this has been mostly theory. If you want to crack on and try this stuff our for yourself then I strongly recommend reading the [three part series by Jason Grimes][lampchef]. This has been my bible for the last month or two, and I cannot recommend it enough. Read it 65 times and keep it bookmarked. Then, you will know kung fu.

### Further Reading

* [Vagrant: What, Why, and How][vagrant]
* [Managing LAMP environments with Chef, Vagrant, and EC2][lampchef]

  [vagrant]: http://net.tutsplus.com/tutorials/php/vagrant-what-why-and-how/
  [lampchef]: http://www.jasongrimes.org/2012/06/managing-lamp-environments-with-chef-vagrant-and-ec2-1-of-3/

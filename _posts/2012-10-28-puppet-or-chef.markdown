---
layout: post
title: Puppet or Chef?
category: devops
permalink: blog/2012/10/puppet-or-chef
excerpt: Back in the UK at PHPNE this May I saw an awesome talk from Ian Chilton,
  who explained very simply why using Vagrant for your development environments was
  a good idea. He mentioned briefly server provisioning but didn't get fully into
  it, and suggested we go out and play with Puppet and Chef to see which fit our needs. 
date: '2012-10-28 20:13:00'
comments: true
disqus_identifier: puppet-or-chef
---

Back in the UK at [PHPNE][phpne] this May I saw an awesome talk from [Ian Chilton][ian], who explained very simply why using Vagrant for your development environments was a good idea. He mentioned briefly server provisioning but didn't get fully into it, and suggested we go out and play with Puppet and Chef to see which fit our needs.

I started off using Puppet to build up development boxes, with the use-case of testing how [PyroCMS][pyro] worked with different combinations of PHP 5.3 and PHP 5.4, Apache, Nginx, PHP-FPM, Postgres, etc without having to utterly bastardise the built in OSX LAMP stack or try to make MAMP do something useful. 

So, if you're hopping on the "devops" train and would like to learn a server provisioning tool, which should you learn?

### Syntax

Puppet uses a <s>proprietary</s> custom language, while Chef uses Ruby. This straight off the bat means a lot of Ruby developers prefer Chef as they can build out in a familiar language, but the Puppet language is so incredibly simple it should not be seen as a barrier to entry. 

<em><strong>Update:</strong> Turns out there is a [Ruby DSL][rubydsl] for Puppet too, released in November 2010. I missed that entirely.</em>

Often the same code written in Puppet or Chef will look cleaner in Puppet, but in Chef you can do some pretty crazy stuff. As it's using Ruby you can use programming structures like loops and if statements, which is not possible with Puppet.

### Manifest / Cookbook Flow

Manifests (Puppet) and Cookbooks (Chef) are essentially the same thing. You write in these documents what you want to ensure is installed, created, running, etc and through the glory of idempotence these can be run as many times as you like without barfing all over your server.

While the two ideas are similar, they have one major difference. Puppet will evaluate all of the manifest files then run it in whatever order it deems best to ensure requirements are met. Chef will simply do things in whatever order it's defined, running top to bottom through each of your cookbooks - which I'm pretty sure run alphabetically for each node. For many programmers Chef is more logical, while the Puppet approach takes a little mental acrobatics to understand at first but makes a lot of sense when you get the hang of it.

I myself am not sure which I prefer here. The "do X then Y" approach does make debugging a very simple process, but you need to be careful that you're actually creating idempotence recipes - which is the whole point of this.

### Modules

Both systems have a f**kload of modules available for software like PHP, MySQL, RabbitMQ, Postgres, whatever. Most of the modules are third-party and have been configured to work nicely with Debian, Ubuntu, Fedora, RedHat, etc using several layers of abstraction. 

The only real difference here is that Chef has a [community repository][chef-community] where people can submit these modules and show ratings and installation counts, whereas Puppet relies on a Google search and probably a relatively out of date GitHub repository. I've had to send multiple pull requests to various popular Puppet modules just to get them to actually install on an Ubuntu 12.04 box.

<em><strong>Update:</strong> Yet another error on my part. Puppet has a Forge, which is the same as the Chef community repository. That said, I don't remember ever landing on it when looking for modules. Searching "Puppet PHP" puts a result in 6th place, with GitHub being all of the results before it. Sorry about that.</em>

### Environments

Most projects have multiple environments; unless you're a cowboy coder who enjoys life on the edge and does all of his coding using vim through a SSH tunnel.

<s>Puppet doesn't really provide any sort of solution for this. I'm not hating on Puppet, I just don't think this was ever really one of its goals in life.</s> 

<em><strong>Update:</strong> Puppet does have environments, but you won't get that working with Vagrant. The Puppet / Vagrant integration only allows for the "manifests" and "modules" folders, but environments sit in their own folder at that level - meaning you can only work overrides for your other environments like Staging and Production. This might be ok for you, but it should be watched out for.</em>

Chef offers "environments", which are a little ruby file where you give each environment a name and maybe a description. I have dev.rb, stag.rb and prod.rb. Prod and staging don't really do anything, but my develop has a few overridden attributes:

    name "dev"
    description "The development environment"
    
    override_attributes ({
        "api" => {
            "db_host" => "localhost",
            "server_name" => "dev.api.example.re",
            "docroot" => "/vagrant/www/api/public",
            "config_dir" => "/vagrant/www/api/fuel/app/config"
        },
        "frontend" => {
            "db_host" => "localhost",
            "server_name" => "dev.example.com",
            "docroot" => "/vagrant/www/frontend/public",
            "config_dir" => "/vagrant/www/frontend/fuel/app/config"
        }
    })
    
    ENV['FUEL_ENV'] = 'development'
   
Awesome sauce.

### Multiple Tools

#### Puppet & Chef Solo

Both Puppet and Chef Solo run on a single machine and that is that. Chef Solo and Puppet are for the same use case, but the difference is really this; Puppet's language is simplistic and often quite elegant, where as Chef is an pile of really powerful functions, methods and arrays.

#### Puppet Master & Chef Server

This at first seems a little crazy, but with Chef Server you have your local "workstation" which has a command line tool called "knife". You use knife to move your cookbooks, recipes, roles, environments, etc up onto the "Chef Server". This chef server can be your own EC2 instance, VPS, whatever running Chef - or you can pay to use Opscode's servers. I have friends running their own chef server to avoid paying the monthly subscription, but no servers anywhere are free. For now I'm using the service and it's only gone down the once - but that was on Friday while half of the internet seemed to be broken so I can't really blame them. 

I haven't played with Puppet Master at all, I only found out it existed it got linked up in the comments on Reddit. Sure its on the homepage, but it's below the fold and that is a huge site with a lot of information. Also [this](http://d.pr/i/YeI1).

### Encrypted Data Bags

There are lof of funky little extras in Chef Server, one of which is called [Encrypted Data Bags][databags]. Instead of storing API credentials and passwords in git where anyone in the team can see them you can put them in a secure location. Why is that a big deal? Well maybe that guy you fired still has a copy of the code at home and wants to play a "hilarious prank" on you.

I expect Puppet can do this too, but it looks like you need to do some [manual work][puppet-bags] to get it going. I didn't need to use this feature for my Puppet project.

### Knife

Knife is amazing. I don't mean that in the over-used "everything good is amazing" sort I way, I mean I was genuinely amazed by this too. Knife works with Chef Server to manage your servers. Here are some cool commands:

	$ knife ec2 server create \
        -S projectname -i ~/.ssh/projectname.pem \
        -G www,default \
        -x ubuntu \
        -d ubuntu12.04-gems \
        -E prod \
        -I ami-82fa58eb \
        -f m1.small \
        -r "role[base],role[frontend]" 
    
That makes me a frontend production server with the exact specs that I need. I walk off and get a coffee, come back and that server is sat there ready to go. 

	$ knife ssh -E stag "roles:base" "sudo chef-client"
	
Update my entire staging environment, with the latest code pulled from GitHub and whatever software I need to run.

	$ knife ec2 server list
	
Gets a list of all servers on the account. This is amazeballs when you have a whole bunch of servers hiding behind load balancers and you want to know whats what.

### Summary

Server provisioning is brilliant. While some people think it might be overcomplicating setting up a server, it's amazingly useful and I would be having a hard time doing my new job properly without it. 

It means I can provision my local VM to be identical to my staging servers, use the exact same versions of software, keep my workstation clean, package and bundle all of the tech for the whole company into one repo with a few submodules, distribute that same code to multiple servers and set up freelancers no matter what OS they have in minutes instead of hours or days, all thanks to some crazy Ruby code.

As for "Puppet or Chef" there is no real answer, they are two different tools that do the same thing in slightly different ways, to make a better environment for yourself than just running (W|X|M)AMP and assuming your code will work when its deployed. Ideally you'd be provisioning your production site too (and I know its not always possible). Provisioning a large network of sites with Chef Server does seem to work very nicely, specially if you are using EC2 with the knife plugin. Give them both a whirl and see what tickles your fancy.

### Further Reading

* [Vagrant: What, Why, and How][vagrant]
* [Managing LAMP environments with Chef, Vagrant, and EC2][lampchef]

  [phpne]: http://phpne.org.uk/
  [rubydsl]: http://puppetlabs.com/blog/ruby-dsl/
  [pyro]: http://pyrocms.com/
  [ian]: http://www.ichilton.co.uk/blog/virtualization/my-phpne-talk-on-vagrant-496.html
  [vagrant]: http://net.tutsplus.com/tutorials/php/vagrant-what-why-and-how/
  [lampchef]: http://www.jasongrimes.org/2012/06/managing-lamp-environments-with-chef-vagrant-and-ec2-1-of-3/
  [chef-community]: http://community.opscode.com/cookbooks/php
  [puppetmaster]: https://docs.puppetlabs.com/learning/agent_master_basic.html
  [puppet-bags]: http://www.craigdunn.org/2011/10/secret-variables-in-puppet-with-hiera-and-gpg/
  [databags]: http://wiki.opscode.com/display/chef/Encrypted+Data+Bags

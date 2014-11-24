---
layout: post
title: CodeIgniter Packages != Modules
category: codeigniter
permalink: blog/2010/04/codeigniter-packages-modules
excerpt: 'So many people are asking about the new Packages feature in CodeIgniter
  2.0 that I need to put this to bed. Packages are not modules, they are entirely
  different concepts and should not be confused. Hopefully that is enough convincing
  for most of you but if you need to know more, read on. '
date: '2010-04-12 00:49:50'
comments: 'true'
disqus_identifier: codeigniter-packages-modules
---

So many people are asking about the new Packages feature in CodeIgniter 2.0 that I need to put this to bed:

> Packages are not Modules.

These are two entirely different concepts and should not be confused with each other.

### **Modules**

By modules I mean any HMVC implementation such as Modular Separation or Matchbox. These essentially allow you to split your application down into folders of self-contained logic, so your news module will contain all your news controllers, helpers and models, kept hidden away from your user system.

Modules essentially allow you to build your application exactly the same as you normally would, but you put you have a slightly cleaner file system.

The key differentiating feature is that modules are called by the URL.

> http://example.com/module/controller/method

All current modular systems extend the Router to pick up a module name from the URL and then use that to find the controller. They also extend the Loader to give the current module prefference when loading. So in your news controller if you write $this->load->model('news\_m'); it will first look in the current module, then the main application directory, then - if you are using them - Packages.

### Packages

A wonderful but mis-understood feature added in by the EllisLab team to CodeIgniter 2.0 development branch that will allow you to put your models, libraries, helpers and config into a shared "repository". This is VERY helpful, but is nothing more than creating a dynamic list of fallback directories for Loader to look in if something does not exist in /application.

Packages in no way map to the URL but instead have to be loaded via:

    $this->load->add_package_path('/usr/local/codeigniter/shared');

Doing this would allow several useful things:

- Store models/libaries containing complex business logic in one place between various applications.
- Maintain one set of third-party stuff to stop having to constantly upgrade cURL, REST, Cache, Asset libraries, etc.
- Allow users of an open-source system to drop in third-party libs without actually putting them in /application.

Things Packages do not do:

- Map to the URL
- Interact with the Router
- Allow cross-loading from one package to another, everything is a fallback
- ALLOW HMVC

### But surely...?

With all that said, Packages are fairly close to allowing modular applications but not out of the box. Theoretically you could create a MY\_Router that would tie to the URL and check if a module was being used. If so it would dynamically load the module as a package and Bob's your Uncle, you have a modular system.

There is plenty of code out there that could make this very easy and If I was a little less knackered or busy I might consider having a go just for the hell of it. When it comes to my applications I very much doubt I would use a system like that as I don't see the point. [Modular Separation](http://codeigniter.com/wiki/Modular_Separation) is [patched to work with CodeIgniter 2.0](http://github.com/philsturgeon/codeigniter-modular-separation) and offers many more features than this theoretical bodged Packages-HMVC such as 404 routing and some very smart routing tweaks for routing withing a module not at a global level like normal routes.php.

### But I want modules!

I don't know if anything has changed in the last few months, but at [EECI2009](http://eeci2009.com/) [Derek Allard](http://derekallard.com/ "Evil Robot Overlord") assured me that at some point, some form of HMVC would probably make it into the CodeIgniter codebase. Right now EE2 has a custom modular system and they have no need to mess with that. Until then we have Modular Sepration which is a very elegant and lightweight system compared to the older Modular Extensions or Matchbox.

### Summary

We have an awesome new way to store our code in more places than just /application or /system, nothing more. Let's not get over-excited and stick to using existing modular systems if we need them.

**Further reading:** For more information on what Packages can do, take a look at [Jamie Rumbelow's post](http://jamieonsoftware.com/blog/entry/wrap-me-up-and-put-me-in-a-box) on the subject. Notice even he gets a little confused between Modules and Packages, but submits to my reasoning in the end. ;-)


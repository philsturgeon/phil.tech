---
layout: post
author: [Phil]
title: Is PSR-0 Shortsighted, or are you?
tags: [psr0, php, php-fig]
excerpt: One of the fun things about trying to support the PHP-FIG and all the good
  its doing, is seeing blog posts written complaining about it by people that just
  don't know what they're talking about. By getting involved in conversations on Reddit,
  building FAQs and generally trying to build new useful information this can generally
  be helped. Sadly some blog posts are sent out by people with a whole bunch of odd
  opinions that you just can't do anything about, so instead I'm going to respond
  with a play-by-play approach. 
date: '2013-04-17 04:52:00'
comments: true
disqus_identifier: is-psr0-shortsighted-or-are-you
alias: blog/2013/04/is-psr0-shortsighted-or-are-you/
alias_1: php/2013/04/17/is-psr0-shortsighted-or-are-you/
---

One of the fun things about trying to support the PHP-FIG and all the good its doing, is seeing blog posts written complaining about it by people that just don't know what they're talking about.

I get involved in conversations on Reddit (dangerous I know) on a mission to understand the problems with its perception throughout the community, and try to make more knowledge readily available to avoid confusion. I put together the [PHP-FIG FAQ](http://www.php-fig.org/faq/) and the rest of the group voted it in, which I believe helped a lot.

Sadly [some blog posts](http://r.je/php-psr-0-pretty-shortsighted-really.html) are sent out by people with a whole bunch of odd opinions that you just can't do anything about, so instead I'm going to respond with a play-by-play approach. 

_**Note:** I wouldn't have given this the time of day if it weren't for the fact it was linked on some high level PHP sites. Letting odd articles like this circulate without a counterpart is like only letting Republicans on the television. Pretty soon everyone in the world would believe that women had some [magical anti-rape-sperm laser hidden away in their vaginas](http://www.huffingtonpost.com/2012/08/19/todd-akin-abortion-legitimate-rape_n_1807381.html)…_

> There's a self-declared PHP "standards" group called PHP-FIG attempting to push several "standards" throughout the PHP community. 

Nope.

> The problem occurs when PHP-FIG do attempt to push the standard onto everyone else such as trying to put it into the PHP Core…

Back in early 2010 one FIG member made an [RFC for this](https://wiki.php.net/rfc/splclassloader). That was 3 years ago, and this is most likely the only example of the FIG ever trying to push anything on the PHP community as a whole. I think the group realises their mistake, and this is exactly why votes exist on RFCs, to make sure changes are a reflection of what is genuinely good for PHP. It's time we (the internet) let that one go.

> …and a lot of campaigning to get people to adopt the "standard".

Where? The FIG is certainly not campaigning to do this. I'm not sure where we'd even do the campaigning. Did you read some blog articles about PHP developers who enjoy using PSR-0 for their packages and assume the FIG had hired them to write the articles? We are the puppet masters.

> Even then, I despise the idea of them, or anyone, pushing such a ridiculous "standard" in the first place.  My issues are purely practical, PSR-0 reduces flexibility and makes life more difficult for developers. It's self-defeating and as a standard is unfit for purpose. The premise of the standard is: "This is how you must structure your files", which is an absurd starting point.

This seems like the crux of the idea before the author goes on to repeat the same point multiple times. There are two approaches:

### A) Define File/Folder Naming Structures

PSR-0 lets you know that you need to use StudlyCaps for your classes and lets you know that _ is a directory separator, that's about it. This means any developer who is building a new package can simply lay out their classes in the specified way, and use any PSR-0 compliant autoloader (of which there are many) to autoload their code.

### B) Make an autoloader that can load anything

This is the wild new suggestion that the author is proposing. Well, that sounds quite a lot like Composer. You can take any code, no matter what format, let the author build it however they like, then let all of the code be autoloaded according to the rules the developer has set in the packages composer.json. Is it classmap, or is it PSR-0? Up to them. 

Anything else along these lines would be going back a step in logic. If its not classmap, and its not PSR-0, then its fucking magic, exactly what used to happen in the PHP community that we're trying to hard to get away from.

Oh good, Foo {} lives in monkey.class.php, thanks for making that obvious bro.

> We shouldn't be defining a standardised autoloader to tell library authors how to do things, instead we should be letting library authors optionally provide a way of telling a standardised autoloader how to load its files.

The FIG is not defining a standardised autoloader, they are standardising the naming conventions that allow for a PSR-0 compatible autoloader. This autoloader is not restricted to JUST PSR-0, they can do what they like. 

That autoloader can try loading all of your custom application classes. Drupal and Joomla use their own autoloaders to load some of their own code using whatever the hell rules they see fit, AND ALSO support PSR-0 to load generic code packages, which makes life easier on the package developers because they can just build to PSR-0 instead of building to work with Zend, or work with Drupal, or work with Symfony - exactly the problem we're trying to avoid.

> This approach has the added benefit of making it so that older existing libraries can be extended, not altered, to become compliant with the standard. As it stands, to make an existing non-PSR-0 compliant library PSR-0 compliant, the entire library must be restructured, and in a lot of cases, have every single file altered to add a namespace to it! To call this approach absurd would be an understatement.

Restructured how much? Adding in a namespace is not exactly tough, and is part of a reasonable migration to being PHP 5.3 compatible anyway.

Making the class name match the file name? Well that's just good common logic, and if your classes don't match the the file names then why not? 

If upgrading this code package is so complicated that it's not worth it, then why are you trying to do it? Includes and classmaps are perfectly valid options unless you're bored and want to take on a random challenge.

> Ok, so perhaps we should only use PSR-0 for new projects and new libraries? If you set out to be PSR-0 compliant then you won't have that problem. This is true and exactly why PHP-FIG are pushing/encouraging everyone else to use their standard, but again it's rather backwards. Choosing your autoloader then using that choice to define how your project is structured can very easily result in a project which isn't structured in the best way for that particular project.

Ignoring the fact that **the FIG is not pushing/encouraging shit on you**, I'm not sure what sort of project would not fit into PSR-0? Are you trying to make your entire application PSR-0, because it should only be generic code packages that you do this with, and I've yet to see a single generic PHP package that would not fit in with PSR-0. If your project is too complicated for PSR-0 (and I'd like to see examples of this so I know what you're actually talking about) then simply don't use PSR-0.

> In OOP terms, PSR-0 breaks encapsulation. Code which uses it has implied knowledge about things it shouldn't be concerned with: Directory structures, the implementation details of the autoloader. Storing application configuration along with application logic is a bad idea. It severely limits flexibility by meaning you cannot use different configurations with different logic.

I understand all of the words separately…

PSR-0 is extremely similar to the PEAR file/class naming structure, but a bit more namespacey. It's also almost _identical_ to the way Kohana, Laravel 3 and FuelPHP do things and almost i-fucking-dentical to Zend. 

I have plenty of PSR-0 code which could be autoloaded with a completely custom autoloader, because its just logical naming.

In no way is any "application configuration" stored, inferred or implied by naming your classes and filenames in a logical standard way. You can load this shit with direct includes, and it's all going to work just fine.

> As it stands, what actually happens in the real world is that autoloaders are PSR-0 compliant, but then allow a bunch of workarounds to support other non PSR-0 libraries. These workarounds are autoloader specific. Composer uses a classmap, Zend provides several different autoload implementations and Symfony supports PSR-0 as well as a method for loading classes which use the PEAR naming convention.  
…  
What this means is that the "standardised autoloader" that PSR-0 advocates, is far from standard unless you limit the flexibility of your projects' structure by using only other libraries which follow PSR-0. As soon as you set foot outside this very narrow scope, you have to configure the autoloader manually.

Right. Absolutely right.

Symfony and Zend both have elements of autoloading that work entirely their own way, and they also support PSR-0 too - which is amazing. Developers can aim at PSR-0 and know their code is going to work everywhere, instead of trying to make it work for each different framework. Yay PSR-0 for making its goal entirely possible!

> If the standard defined how autoloaders could be extended, rather than how autoloaders worked, then each library or vendor could provide its own extension to the autoloader.

The PSR-0 standard does not define how autoloaders work. It defines the rules of PSR-0 compatibility, allowing an autoloader to be PSR-0 compatible as well as do whatever else it would like to do, which you've already pointed out is what Zend and Symfony do.

## The Example

This is an example of an autoloader implementation. PSR-0 is not an autoloader, it is the standard which defines what rules make something PSR-0 compatible.

There are several things I don't like about this example.

### Where does this code live

There is an interface, some rule classes (which constitutes "configuring the autoloader", which the author complained about earlier) and a autoload.json in the "library directory".

Now, what the crap is a .json file doing in my PHP library package?

Go on. Say it. "Composer has a .json file". Right, the .json file and all of this metadata live in the **composer** package, which just so happens to sit near my PHP code but is **nothing** to do with PSR-0.

## Composer != PSR-0

Almost every time a "PSR-0 sucks" argument comes up its by people that A) do not know that Composer and PSR-0 are not the same thing, or B) do not know that PSR-0 was out for at least a year before Composer was but a twinkle in the eye of Jordi and Nils.

This poster is confusing the fact that PSR-0 is a standard of rules that allow an autoloader to know where stuff is, with Composer which is a dependency manager that can autoload pretty much anything.

That's not the same thing, and I hope you can all see why.

## So this is not a PSR-0 competitor

This example is either a replacement for the Composer autoloader, or a potential feature. But even then I have to wonder: is this even anything new?

Why not just auto-include an autoload.php file using the [file autoload](http://getcomposer.org/doc/04-schema.md#files) syntax, then write your custom autoloader in there?

> What PSR-0 tries to achieve is good but its execution is one of the most inflexible and restrictive trends to hit PHP for quite some time.

It's 4 years old.

> Don't configure your application's structure based on your autoloader, configure your autoloader based on your application's structure.

You really shouldn't be trying to PSR-0 your entire application, that would be suicide.

> What's laughable is that over at the PHP-FIG mailing list, there's a post which highlights some of the current implementation restrictions in PSR-0. Their proposed solution? Add another PSR rule as a workaround rather than solving the problem of inflexibility inherent in PSR-0!

There are only two "problems" in PSR-0, neither of which have been touched on in this article.

1. PSR-0 can autoload two different classes to the same path, then error. I've described it fully [here](https://github.com/philsturgeon/psr0-naming-oddity).
2. PyroCMS has a src/ folder in each module, so some modules PSR-0 folder structure is system/cms/modules/users/src/Pyro/Module/User/Model/Group.php.

So, 1 is fair enough because that was build intentionally, to allow developers to easily support the old underscore structure that people were commonly using, the new autoloader will only work with namespaces to avoid this collision. Nice.

The second point allows the autoloader to allow a little extra config to make it system/cms/modules/users/src/User/Model/Group.php, still mapping to Pyro\Module\User\Model\Group.php, which is trivial at best but will make a few of my module developers happier that they don't need to use those two extra folders. Many projects will definitely still want to use PSR-0, and some will use this new PSR-X, which is nice to have that flexibility.

Composer will then support PSR-X too, so all included packages will automatically be included no matter what PSR they decide to use.

## Summary

This article comes across as:

> This brand new thing [which is 4 years old] is not exactly what I'd expect to see based on expectations that are being made 4 years after its conception and with the knowledge of tools that didn't exist at the time, and any attempt to improve this situation is laughable because these guys are all tools.

PSR-0 has its problems, but they are the two that I have pointed out and they are rather trivial. These two issues are being removed in a new standard which is currently going through the proposal stages and so far it has excellent support. Once it's voted in and Composer integrates the standard into their autoloader some developers can spend 3 minutes porting their packages, or continue to use PSR-0.

If you'd like to add custom autoloaders to your Composer packages then go ahead. If you'd like to build your own custom autoloaders for all of your packages then you can do that too, but it ruins the entire purpose of what PSR-0 is meant to do. 

That's fine, because you don't need to use it, but I am happy as hell that PSR-0 exists and I wouldn't make drastic changes to it for anything. Every developer who chooses to use it (and that is a fucking lot so far) has helped to drastically improve the eco-system of PHP, and thats a trend I like the sound of.

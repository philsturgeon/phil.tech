---
layout: post
title: The Most Important Conversation Ever
category: php
permalink: blog/2013/01/most-important-conversation-ever
excerpt: " \n\tThe world today has a lot of hot topics that need to be discussed.
  Washington needs to get together to help sort out the debt-ceiling to stop the US
  economy going down the drain, but the Democrats and the Republicans just cannot
  even vaguely get the conversation going because they are happy to just oppose each
  other until the end of time. Gun control is another hot topic, and I'm pretty sure
  the third-world is still struggling with debt and famine. But no, that stuff doesn't
  come close to the important conversations happening in comment threads of blogs
  all over the PHP community. Let's discuss what really matters. "
date: '2013-01-20 15:16:00'
comments: 'true'
disqus_identifier: most-important-conversation-ever
---

The world today has a lot of hot topics that need to be discussed. Washington needs to get together to help sort out the debt-ceiling to stop the US economy going down the drain, but the Democrats and the Republicans just cannot even vaguely get the conversation going because they are happy to just oppose each other until the end of time.

Gun control is another hot topic, and I'm pretty sure the third-world is still struggling with debt and famine.

But no, that stuff doesn't come close to the important conversations happening in comment threads of blogs all over the PHP community. Let's discuss what "really" matters:

## snake_case or camelCase?

Developers have been arguing about this since 1834 (or something) and it's not showing any signs of stopping. Most developers start off learning at home, and due to there being no consistent standard in PHP most people learned however the hell they wanted to learn. Their style preference often came from whatever framework, CMS, bullien board, etc they were using, and like me the first system I worked with was Postnuke, which was a fucking mess. Learning following that "style" meant I had no style, and when I eventually discovered CodeIgniter my code was much nicer at the time:

	$this->db->order_by('foo')->get_where('bar', ['baz' => 1])->result();
	
While it might have looked better than the mess I was writing before, this code is just flagrantly ignoring the style of PHP's methods in the core, most likely because CodeIgniter was written before PHP had any classes in the core. There are now plenty:

	ArrayAccess::offsetExists();
	DateTime::createFromFormat();
	DirectoryIterator::getExtension();
	Exception::getMessage();
	RecursiveDirectoryITerator::getChildren();
	ReflectionClass::getInterfaceNames();
	SimpleXMLElement::addChild();
	XSLTProcessor::importStylesheet();
	
Often I've heard developers say "PHP doesn't use camelCase for all its classes, what about MySQLi?". They sit there with a smug little grin on their face, ignoring the fact that MySQLi is an extension which needs to be enabled, but yeah ok it uses underscores:

	mysqli::get_connection_stats();
	
But if we're talking about extensions there are plenty of others that do follow PHP's consistent naming conventions, three of which come to mind:

	PDO::setAttribute();
	Imagick::adaptiveBlurImage();
	ZipArchive::getArchiveComment();
	
The learning towards camelCase is obvious to see. This, along with the fact that many large frameworks like Zend and Symfony also use camelCase, meant it should not have come as a surprise to anyone when the PHP-FIG voted and decided that PSR-1 was going to be camelCase.

I was a big snake\_case fan for my methods and this was initially a turn-off to me, but do you know how long it took me to condition myself to like camelCase over snake_case? 

**A week.**

Do you know I managed to achieve this amazing feat? I just used it, and after a week I didn't care anymore - because the difference is so damn trivial nobody should have cared in the first place.

So to my old snake\_case brethren I have a message:

Using camelCase for your methods is consistent with PHP's core, with PHP's most modern and popular frameworks (including Laravel 4 which used to be snake\_case but is switching to PSR-1) and testing utilities like PHPUnit. Trying to ignore camelCase and live in the modern world of PHP is going to be difficult, so you can complain or just suck it up and solider on - because either way it's already happened.

$some\_var is fine, and some\_func() is fine, but it's absolutely going to be $foo->someMethod() or your code is going to stick out like a sore thumb in any application that tries to use it, which is exactly why PSR-1 suggests the camelCase rule for methods. 

If you're including code into an open-source application from 5 different sources then having 5 different coding styles for those methods would be painful. By everyone settling on camelCase we can use any code from anywhere and have consistency - which to a project like [PyroCMS](http://pyrocms.com/) is important.

### Tabs v Spaces

This is another big general argument, and seems to be the crux of peoples issues with PSR-2. They manage to completely ignore the positives of all the PSR's (even PSR-0 and PSR-1) and just complain about tabs being taken away from them.

There are a few points to be made here.

1. You don't have to implement _any_ PSR if you don't want to.  
1. You can simply implement PSR-1 if you don't like PSR-2.  
1. It doesn't matter.  

From the reactions I've seen around the internet to people posting on various pro or anti PSR blogs I can just imagine developers sitting at their computers crying hitting the space bar over and over again until their thumbs bleed.

Well, I too was a tab guy, but then I ran [PHP CS Fixer](https://github.com/fabpot/PHP-CS-Fixer) on a few projects and told Sublime Text 2 to use 4 spaces instead of a tab - and I haven't noticed the difference since. 

## So why does the PHP-FIG even care about style?

The most important thing to remember is that PSR's are really aimed at not only the projects that are part of the FIG, but for any code released by the FIG too. For example, [PSR-3](https://github.com/php-fig/fig-standards/blob/master/accepted/PSR-3-logger-interface.md) (the logging interface) follows PSR-0, PSR-1 and PSR-2. It would be crazy if it didn't, right?

The FIG is going to be releasing some code over time to allow generic interfaces for common tasks, which means folks writing components don't have to write 10 adapters for HTTP interaction like [PHP-Geocoder](http://geocoder-php.org) here. When the HTTP Client FIG is finished and Guzzle and Buzz have implemented it, the PHP Geocoder developer could simply check for "instanceof \PSR\HTTP\Client" instead of having to build out all those extra "adapter" classes. PSR-3 is the same idea but for logging.

This is what PSR-2 was made for. If you implement PSR-2 then wonderful, but if you don't then thats just fine too. 

## Summary

Anyway, me saying "suck it up" and accept camelCase as part of PSR-1 is all well and good, but why should you? Well, if you want your components to be received by any developer of any modern framework then using PSR-1 is a good idea and PSR-2 might not interest you - so don't use it if you don't want to.

If your company or open-source project has no style guide, then why not pick PSR-2 instead of picking PEAR or randomly inventing your own?

Fighting against an optional standard just because it clashes against your own personal preference is absolutely pointless. I say this for two reasons: the first is that the benefits of PSR-1 to its target audience massively outweigh any negatives that you can think up. Secondly, your (and my) personal preferences are not only pretty much irrelevant, but they are also malleable.

And please do remember, that camelCase for methods is in the core of the programming language, so trying to pretend they don't exist whilst continuing to develop PHP is like sticking your head in your sand. Commenting publicly about how much you hate camelCase is like sticking your head in the sand but standing next to a giant neon sign that says "LOOK, IM STICKING MY HEAD IN THE SAND!". 

Let's grow up, stop shouting about what trivial preference we have about how we write the same damn code and build out a bunch of good quality consistent components that we can use in any framework, instead of rewriting things from scratch for the sake of moving brackets and underscores around.
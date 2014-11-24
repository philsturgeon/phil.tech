---
layout: post
title: 'PHP 6: Pissing in the Wind'
category: php
permalink: blog/2013/01/php-6-pissing-in-the-wind
excerpt: This article is completely pointless, im just saying what everyone is thinking
  - just so we have a record of it. PHP is well known for having an inconsistent API
  when it comes to PHP functions. Anyone with an anti-PHP point of view will use this
  as one of their top 3 arguments for why PHP sucks, while most PHP developers will
  point out that they don't really care. This is mostly because we're either used
  to it, have a god-like photographic memory or our IDE handles auto-complete so it's
  a moot point. For me I'm not too fussed because I spend more time trying Googling
  words like recepie (see, I got that wrong) recipe than I ever spend looking up PHP
  functions. This is how we could fix the situation - but we never will.
date: '2013-01-26 15:59:00'
comments: 'true'
disqus_identifier: php-6-pissing-in-the-wind
---

PHP is well known for having an inconsistent API when it comes to PHP functions. Anyone with an anti-PHP point of view will use this as one of their top 3 arguments for why PHP sucks, while most PHP developers will point out that they don't really care. This is mostly because we're either used to it, have a god-like photographic memory or our IDE handles auto-complete so it's a moot point. For me I'm not too fussed because I spend more time trying Googling words like recepie (see, I got that wrong) recipe than I ever spend looking up PHP functions.

Another big thing that anti-PHP folks laugh about is the lack of scalar objects, so instead of $string->length() you have to do strlen($string).

ANOTHER thing that people often joke about is how PHP 6.0 just never happened, because the team were trying to bake in Unicode support but just came across so many issues that it never happened.

## The Obvious Answer

There is a single way to fix all of these issues in a single blow. I'm by no means the first person to think of it, but it blows my mind that it's not being worked on. 

PHP 5.x

{% highlight php %}
$foo = "string";
echo strlen($foo); // Outputs: 6
echo $foo->length(); // PHP Fatal error:  Call to a member function length() on a non-object
{% endhighlight %}

PHP 6.0

{% highlight php %}
$foo = "string";
echo strlen($foo); // Outputs: 6
echo $foo->length(); // Outputs: 6
{% endhighlight %}

PHP 6.1

{% highlight php %}
$foo = "string";
echo strlen($foo); // Outputs: 6 /w a PHP Deprecated: use String->length()
echo $foo->length(); // Outputs: 6
{% endhighlight %}

PHP 6.2

{% highlight php %}
$foo = "string";
echo strlen($foo); // PHP Fatal error:  Call to undefined function strlen()
echo $foo->length(); // Outputs: 6
{% endhighlight %}

## Unicode Support

PHP 5.x

{% highlight php %}
$foo = u"string"; // AHH WHAT IS THIS?
echo strlen($foo); // PHP Warning:  strlen() expects parameter 1 to be string, MADNESS given    
echo $foo->length(); // PHP Fatal error:  Call to a member function length() on a non-object
{% endhighlight %}

PHP 6.0

{% highlight php %}
$foo = u"string";
echo strlen($foo); // Warning: strlen() expects parameter 1 to be String, UnicodeString given
echo $foo->length(); // Outputs: 6
{% endhighlight %}

If you want to get super detailed, people concerned about UTF-8 or UTF-16 support could even do:

{% highlight php %}
$foo = u"string";
$foo = u16"string";
{% endhighlight %}

This shows that the language would default to UTF-8, because thats what most people default to when they give a shit about Unicode support, but gives extra super-powers to those who need UTF-16.

## So why isn't this happening?

As I see there are two major reasons. One is: who is going to do it? 

One core contributor [Nikita Popov](http://nikic.github.com/) who shares this view is currently working on a [proof of concept](https://github.com/nikic/scalar_objects). We've never spoke and I'm not claiming anything, he just seems to share a common opinion, that this is an obvious next step for PHP which avoids breaking any BC while standardising function names in one fell-swoop.

Well, if a core PHP contributor is working on it, that means its happening right? 

Nope, which is my second point. Let's put this into context.

### PHP Property Accessors Syntax

This was an absolutely wonderful [RFC proposed](https://wiki.php.net/rfc/propertygetsetsyntax-v1.2#voting) to PHP which by the reactions of many PHP developers looked like a shoe-in. 

It gave us the exact same logical getter setter controls that [C#](http://forums.asp.net/t/1191140.aspx) offers, and which Ruby has something [pretty similar](http://www.rubyist.net/~slagell/ruby/accessors.html). I was excited. Lots of people were excited. Then it got blammed by a 33 for and 21 against vote. 

Sadly its not a majority wins situation, it had to get a 2/3rds majority. So we got fucked. No getter setter syntax for us.

### Class Name Resolution via "class" Keyword

This is a handy little addition to the language that means you can take any variable and append $foo::class to get a fully resolved class name. This means when you're trying to use call\_user\_func on a method of a class you don't need to piss around with strings or get_class(), which is lovely.

As this is only a little feature only [a few votes](https://wiki.php.net/rfc/class_name_scalars#votes) were needed. I recognise these names as active bloggers, contributors, or people otherwise known as active in the community.

## The Little Point

When it's a little feature, whoever is interested in getting it voted in - as long as a reasonable number of active PHP guys agree - it's going to get in. That means a trivial/small feature always has a good shot as long as it makes sense.

But, if you even try to change any sort of syntax on a large scale you need to get a majority. Sadly it seems most of this majority are not the sort of people who vote unless they're asked to vote. It almost seems like they don't really care unless they are asked to care, and when they are asked the response is more often that not "nay". 

Really, look up the votes for recent RFC's and see who said "nay" on Getter/Setter, they nay vote a lot.

## The Bigger Point

I know in my heart that democracy is mostly a good idea, in the same way that communism started off as a really good idea, but when you have a large number of people making decisions that don't really give a fuck then the people really are not being represented as they should. How often has Rasmus said he prefers proceedural code over OOP? Of course plenty of people are voting against drastic improvements to the OOP functionality of PHP, because the core devs [can't even decide](http://news.php.net/php.internals/64770) if PHP is going to be OOP, functional, or whatever!

## Another Point

People not being able to get on the same page is one thing, but I heard a reason from a "nay" voter who I'm going to leave nameless (mainly because I have forgotten his name) said that merging the getter/setter syntax would require too much maintenance. Right, doing stuff means doing stuff and that is an unfortunate fact of life, but if you don't like doing stuff: quit.

I quit the CodeIgniter development team because I was no longer doing client work with CodeIgniter and had no interest in helping CodeIgniter recode itself to put it into a vaguely competitive position against modern frameworks.

Now, while we don't need PHP to "win", it would be nice if we could get some sort of progress on the problems that have obviously plagued the language for the last decade.

The suggestion I'm making (and that plenty of others have made) are not particularly complex. They require some recoding of core functions, but for developers it would not require a recode of their applications for the foreseeable future.

Basically put, these suggestions won't break shit. Legacy developers can stay on 5.x from now until the end of time, and they could even upgrade to 6.0 for forever too. If they upgrade to 6.1 they'll start getting deprecated errors (which they can turn off) and when they get to 6.2 maybe they'll have problems - but 6.2 will probably drop in about 2020 so who even gives a damn?

## Summary

I'd love to see this change happen. It's going to take effort, and I'd love to be able to help, but I suck with C (beyond making some robot fighting game in college) so I'm out of the picture. Seriously, while im a [Pull Request or STFU](https://spaz.spreadshirt.com/pull-request-or-stfu-black-A6928817) kinda guy the last person that should be doing this sort of change is me.

People who give a shit (like Nikita Popov) need to be working on this, and people who think its a good idea need to get on board. People with no opinion should have a little look at how the majority of PHP developers are using PHP these days. 

It's not just a language for noobs, juniors, idiots, designers who like if statements and other bottom dwellers to pedal shit. It's a serious language with known defects, used besides that fact to make some impressive systems (and WordPress). PHP runs almost 80% of the internet and as such it has become a haven for people who want to spread their code to as many users as possible, and is not just the shit-storm so many people pretend it is. PHP 4 was a piece of shit, PHP 5.1 was ok, PHP 5.2 was reasonable, by 5.3 it got awesome and 5.4 and 5.5 are adding to it so hard. 

Let's keep making it brilliant, not so PHP can win some imaginary competition, but so the people who make distributed applications can continue to not only achieve the objective of "Getting onto as many servers as possible" but also "not be forced to write retarded code because that is all the language is capable of doing". There is a middle-ground, and this one change would handle so many of the problems that PHP suffers from.

**Making changes to this language should not be blocked just because a quiet minority of the core team don't like the idea of being asked to do stuff.**
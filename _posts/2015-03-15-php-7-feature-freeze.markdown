---
layout: post
title: "PHP 7 Feature Freeze"
date: '2015-03-15 12:10:00 +0500'
category: php
tags: php internals php7
comments: true
---

Today was the feature freeze for PHP 7. That means no new votes can be started for a feature that is aimed at PHP 7.0, and would instead have to go into PHP 7.1.

Instead of heading out to St Patric's Day with a bunch of New Yorkers making dubious claims about their tenuous connection to Irish ancestry as an excuse to drink, I thought it would be a good time to review some of the more recent RFCs that made it in, and those that didn't.

This is not an an extensive list of new PHP 7 functionality. Some of these features did not make it in, and there are many others that did.

## Already Decided

### Remove PHP 4 Constructors

_Stop recognizing methods with the same name as the defining class as constructors._

This one was a little controversial as some see it as a pointless BC break with no gains, but the gains here are simplicity. We don't have to warn new PHP developers about how things used to work in PHP 4, or teach them that there are special rules for namespaced code.

They are being deprecated in PHP 7 and removed in PHP 8. I would have been ok with them just being removed in PHP 7 and not simply depreciated, or if a depreciation was required this is exactly what PHP 5.7 was meant to be for. Either way, they're heading off.

- **RFC:** <https://wiki.php.net/rfc/remove_php4_constructors>
- **Status:** Accepted
- **Opinion:** Happy


### Spaceship Operator

_This RFC adds a new operator for combined comparison. Similar to `strcmp()` or `version_compare()` in behavior, but it can be used on all generic PHP values with the same semantics as `<`, `<=`, `==`, `>=`, `>`._

This is not something I'd use regularly, but it is certainly not useless as some have said. The [three-way comparison operator](https://en.wikipedia.org/wiki/Three-way_comparison) is useful for sorting, and that is about it.

A lot of people would have liked this to be a function instead. I naively argued that an operator skips the overhead of a function call, but apparently there have been some gains in the PHP engine that bring that difference from trivial to now more like non-existent.

Either way, it's handy and whatever, Perl and Ruby have it. And Groovy, whatever the fuck that is.

- **RFC:** <https://wiki.php.net/rfc/combined-comparison-operator>
- **Status:** Accepted
- **Opinion:** Meh


### Replacing current json extension with jsond

_The current Json Parser in the json extension does not have a free license which is a problem for many Linux distros. This has been referenced at [Bug #63520](https://bugs.php.net/bug.php?id=63520). That results in not packaging json extension in the many Linux distributions._

This is down to some stupid line in the original code:

> The Software shall be used for Good, not Evil.

Some distributions were stripping the json extension out and shipping their own. That was a bit of a mess, and there was some FUD going around, [some of which was my fault](/blog/2013/08/fud-cracker-php-55-never-lost-json-support/).

Well now it has been replaced at the PHP level instead of at the whim of the distributors, and this new one is a smidge quicker too if I remember rightly.

- **RFC:** <https://wiki.php.net/rfc/jsond>
- **Status:** Accepted
- **Opinion:** Why not


### Return Type Declarations

_The basic idea of declaring a return type has been included in at least three RFCs and has been discussed in a few other places... This RFC proposes a different approach from previous RFC's to accomplish this goal in a simple way._

This is a great RFC. It dodged many political landmines and got a great feature into PHP. Sure, it's as "half-done" as type hinting for arguments is, but when scalar type hints are finally resolved return types will support `int`, `bool`, `string`, etc too.

While many of us are going to have to wait a little while before we use them for components, frameworks, etc, give it a year or two and your code can be full of these lovely little buggers.

- **RFC:** <https://wiki.php.net/rfc/return_types>
- **Status:** Accepted
- **Opinion:** Whooooo!


### Void Types

_Adds a void return type to require that a function does not return a value._

I would have been [very happy to have void return types](/php/2015/02/15/php-void-much-ado-about-nothing/), but this RFC was another casualty of [Andrea Faulds quitting](http://blog.ajf.me/2015-02-15-i-quit) as a contributor to PHP.

It could come back at a later date, but it would have to be PHP 7.1 at this point.

- **RFC:** <https://wiki.php.net/rfc/void_return_type>
- **Status:** Withdrawn
- **Opinion:** Sad Panda


### Skipping Optional Parameters for Functions

Every now and then PHP has a little chat about [named parameters](/blog/2013/09/named-parameters-in-php/), and last time a [great RFC popped for that](https://wiki.php.net/rfc/named_params). That RFC is on ice for now, but this "Skip Params" RFC popped up trying to give people some of the same functionality without actually making named params.

While I am glad Stas went to the trouble of making this, I am so much more glad that people downvoted it. It's a band aid solution to named parameters, and I really hope we see them for later versions of PHP 7.x.

- **RFC:** <https://wiki.php.net/rfc/skipparams>
- **Status:** Declined
- **Opinion:** Thank f**k


## Currently Voting

### In Operator

_This RFC adds a new `in` operator which simplifies contains checks for strings and arrays. The `in` operator makes these checks way more readable and lowers the cognitive load. Additionally, it also works for `Traversable`._

Ever since Nikita Popov wrote about [adding syntactic features to PHP](http://nikic.github.io/2012/07/27/How-to-add-new-syntactic-features-to-PHP.html), using in as an example, I wished we actually had it for PHP.

Sadly the chances are poor. Just as a whole bunch of people complained that the [spaceship operator](#spaceshit-operator) should be a function not an operator, several internals voters are saying that this is just useless syntactic sugar.

As a developer who works with languages like Ruby and Python, it does always strike me as a shame that PHP developers are so heavily against syntactic sugar.

Dan Ackroyd says this:

> The equation is not just "will PHP be better with this" instead it's
"will PHP so much better that it justifies the known cost of adding
syntax to the language, as well as the unknown cost of blocking future
use of the 'in' keyword".

His view point is not at all unreasonable. We don't want to start adding features just for giggles, but internals members have in the past used this line of reasoning to block a lot of nice things. It often seems like this:

> Why would you want a nice clean way to do this in the language, when you have these other shitty options?

This was the case with named parameters, when people said "Just use arrays" or "make some parameter bag classes!" No bloody thank you.

I'd love to see the `in` operator make it **in**, but it's currently a 4 v 6 vote, with the No's winning.

- **RFC:** <https://wiki.php.net/rfc/in_operator>
- **Status:** Voting
- **Opinion:** Love it
- **Chances:** Doubtful


### Constructor behaviour of internal classes

_Cleanup undesirable behaviour of constructors internal classes._

PHP is well known for having inconsistencies in its codebase and PHP 7 is trying to fix a huge number of these things. One such inconsistency is how some internal class constructors behave with failures:

{% highlight php %}
$mf = new MessageFormatter('en_US', '{this was made intentionally incorrect}');
if ($mf === null) {
    echo "Surprise!";
}
{% endhighlight %}

That's fairly messed up right there, as you'd expect either an object back, or an exception to be thrown.

There are a bunch of other oddities that this RFC looks to clean up, and by documenting the intended behavior it means if any other classes are found to be acting up they can be treated as bugs and fixed.

Attention to detail like this is helping PHP 7 become a really strong version, and takes a lot of wind out of the trolls sails.

Currently at 9 v 1, this looks set to pass. There is barely anything controversial about it so I am confident.

- **RFC:** <https://wiki.php.net/rfc/internal_constructor_behaviour>
- **Status:** Voting
- **Opinion:** Spiffing
- **Chances:** 90%


### Reclassify E_STRICT notices

_This RFC proposes to reclassify the few existing E_STRICT notices and remove this error category._

PHP has way too many [error types](http://php.net/manual/en/errorfunc.constants.php). The cognitive load required to new developers of PHP, and even to seasoned pros, is a nightmare. There are edge cases and confusion all around.

`E_STRICT` alone is a bit of a weird one.

> Enable to have PHP suggest changes to your code which will ensure the best interoperability and forward compatibility of your code.
> Since PHP 5 but not included in `E_ALL` until PHP 5.4.0

Ugh. This RFC suggests killing off usage of `E_STRICT` errors, and recategorising them as one of the following:

> * Remove the strict standards notice if it appears inconsistent or informational.
> * Promote to E_DEPRECATED if there is intent to remove this functionality in the future.
> * Promote to E_NOTICE or E_WARNING otherwise.

Good. Simple. Smart.

- **RFC:** <https://wiki.php.net/rfc/reclassify_e_strict>
- **Status:** Voting
- **Opinion:** Helpful
- **Chances:** Strong


### Strict Argument Count On Function Calls

_This RFC proposes to sensibly add a strict argument count check for function calls on PHP7_

This one is very controversial. Right now in PHP, if you have a method that expects 3 arguments and you shove a 4th in there, it'll accept the value and carry on with no warnings, errors or anything.

Some consider that a bug.

Some consider that [a feature](https://wiki.php.net/rfc/strict_argcount#flexible_interface_implementations).

I fully agree with the RFC author:

> Strict checks on argument counts are good to catch bugs (sometimes dangerous bugs) on user space code. According to measurements presented on this RFC, done by running many FOOS projects test suites, the current PHP silent behavior is not helpful and we should fix it.

Relying on the fact that PHP will let you sneak extra arguments in to satisfy some interface which should just be updated to me seems like a weird edge case, but some very smart developers rely on that too. It's hard to say one way or the other, but I always think the more PHP can have our backs and alert us of problems, the easier it becomes to maintain larger systems.

There have been a few discussions about changing things in this RFC, so it might end up pulled and tweaked. If the RFC is not pulled, I'd say its chances are about 50/50 of getting done.

- **RFC:** <https://wiki.php.net/rfc/strict_argcount>
- **Status:** Voting
- **Opinion:** Conflicted but learning +1
- **Chances:** 50%


### Anonymous Class Support

Anonymous classes can be used to make insanely simple implementations to satisfy interfaces without having to run off to the autoloader or jam a bunch of classes in the same file.

These anonymous classes are also pretty damn good at mocking, so PHP will have to do far fewer gross things to get mocked objects.

{% highlight php %}
// New Hotness
$pusher->setLogger(new class {
  public function log($msg) {
    print_r($msg . "\n");
  }
});
{% endhighlight %}

This RFC is another Joe Watkins and Phil Sturgeon production. Joe likes to write the code, but doesn't always have the time or energy to get things through the RFC proceedure. I help out by writing tests, handling the RFC wiki entry, gathering feedback, discussing changes, etc.

Clearly we don't make a bad team, as this one is steaming through the vote.

- **RFC:** <https://wiki.php.net/rfc/anonymous_classes>
- **Status:** Voting
- **Opinion:** Nom nom nom
- **Status:** Very likely


## Scalar Types etc

There were a few I missed out for two reasons. Some I don't know that much about and have missed the conversations, but the others... I just can't even right now.

"The Great Scalar Type War of 2015" is still waging so hard that it looks like the feature freeze might be completely ignored for this one feature. There are three competing RFCs, two of them in vote, one of them with fuck-all support and one should have passed already. The third is a backup plan for if the other doesn't pass, but questionably has not been around long enough for voting to start before the end of the feature freeze today.

* [Scalar Type Hints v0.5](https://wiki.php.net/rfc/scalar_type_hints_v5)
* [Coercive Scalar Type Hints](https://wiki.php.net/rfc/coercive_sth)
* [Basic Scalar Type Hints](https://wiki.php.net/rfc/basic_scalar_types)

Some really weird shit is happening on internals over the last few days around these RFCs, and it will need a lot more words to explain it than I have space for in this article.

On the up side it's going to make for an amazing story; one even more preposterous than [T_PAAMAYIM_NEKUDOTAYIM v Sanity](/blog/2013/09/t-paamayim-nekudotayim-v-sanity/).

I am excited about the future of PHP 7, but this scalar type hints thing is a really heated fight. Sadly most of the fighting is being caused by the actions of one well known contributor, and this is not the first time it has happened.

Hopefully it can be resolved and we can play with new functionality in the master branch soon, because so far PHP 7 looks really awesome.

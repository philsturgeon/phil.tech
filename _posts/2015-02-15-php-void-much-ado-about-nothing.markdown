---
layout: post
title: "PHP Void: Much Ado About Nothing"
date: '2015-02-15 13:10:00 +0500'
category: php
tags: php return-types rfc
comments: true
excerpt: "A run through of the Return Void Type, why it can be useful and why some of the points against are not so strong to me."
---

Recently [Return Types] were accepted for PHP 7, which makes me very happy. This RFC was a real work of art. [Levi Morrison] sidestepped various political land-mines, which had stopped previous attempts at this feature being approved since it was agreed return types should be added in 2005.

> * **We keep the current type options.** Past proposals have suggested new types such as void, int, string or scalar; this RFC does not include any new types. Note that it does allow self and parent to be used as return types.
> * **We keep the current search patterns.** You can still search for function foo to find foo's definition; all previous RFCs broke this common workflow.
> * **We allow return type declarations on all function types.** Will Fitch's proposal suggested that we allow it for methods only.
> * **We do not modify or add keywords.** Past RFCs have proposed new keywords such as nullable and more. We still require the function keyword.

Each of these made it clear that other features or items would not be coming in this RFC, but could well be coming later. This kept return types clear of scalar type hints which are obviously an insanely hot-button issue.

One mention was about `void` as a return type, which seems to have been met with a huge sea of text of people hating it from it being "a waste of time" to "a feature for the sake of a feature" and "meaningless."

[Return Types]: https://wiki.php.net/rfc/return_types
[Levi Morrison]: https://twitter.com/morrisonlevi

## Tell me about return void

In C where you need to define the return type for your function, if something is going to have no return value you do this:

{% highlight c %}
void nothin() {
  // blah some code
  return;
}

int life() {
  // blah some other code
  return 42;
}
{% endhighlight %}

PHP has just added a very similar feature, which is of course optional for the sake of backwards compatibility at this point.

{% highlight php %}
function someClass(): SomeClass {
  return new SomeClass;
}
{% endhighlight %}

If the Scalar Type Hints RFC passes (it's an insanely tight race on Sunday, 15th of February 2015) then of course we'd get proper scalar return type hints for PHP 7 too, so it would look like this:

{% highlight php %}
function life(): int {
  return 42;
}
{% endhighlight %}

But the PHP version of our `nothin()` class is still not possible. [Andrea Faulds] - author of the [Scalar Type Hint RFC] - is offering an addition to the return type feature called the [Void Return Type RFC].

{% highlight php %}
function nothin(): void {
  // Do something exciting
  return;
}

function nothinElse(): void {
  // Do something else exciting
}
{% endhighlight %}

Ok, so this is just a consistency thing, that means we can now say "I will return nothing" as well as saying "I will return a value of type X." Seems reasonable, right?

[Andrea Faulds]: https://twitter.com/AndreaFaulds
[Scalar Type Hint RFC]: https://wiki.php.net/rfc/scalar_type_hints
[Void Return Type RFC]: https://wiki.php.net/rfc/void_return_type

## Problems

People are not as content as I would hope. Reddit had [more comments on this topic] than any other recent RFC, and a bunch of the core contributors seem unimpressed.

[more comments on this topic]: http://www.reddit.com/r/PHP/comments/2vu7n7/rfc_void_return_type/

### Adding a reserved word

This is always a concern whenever a new reserved word is proposed because of the number of places it cannot be used in. Well, the RFC clearly states that void does not make this a reserved word:

> Like the scalar types proposed by the Scalar Type Hints RFC, the void return type does not become a reserved word, but is instead restricted from use in class and interface names. This avoids confusion while minimising backwards-compatibility breakage.

I've not so far come across a class or interface named `void` in the wild, so this is probably not a huge deal-breaker. 

### But functions return null by default

Yes, yes they do. 

{% highlight php %}
// PHP 5.x
function nothin() {}

$foo = nothin();

var_dump($foo); // null
{% endhighlight %}

Adding a `void` return type is not going to make me expect so see `void` output, nor would I expect an error. The RFC says specifically that it will not error, which is lovely.

A variable named `$foo` has been declared, and by default PHP shoved a `null` value in there. That's fine.

### Making a distinction between null and void

Nobody is actually proposing `void` become a new type. This is not like in JavaScript where you have `undefined` as well as `null`, this has specific semantic meaning. 

Void is a declaration being made by the developer writing the function signature, that this function will not return anything. 

How do we currently do that in PHP? With fucking comments.

{% highlight php %}
/** 
 * I promise this returns nothing
 * 
 * @return void
 */
function scoutsHonor() {
  // Do something
}
{% endhighlight %}

Well, that method might do a _lot_ of somethings. It might end up being a few hundred lines long - which is wrong we know, but lets not pretend every PHP developer is writing perfectly concise readable code.

Now at some point, somebody jumps in there and adds a return value and forgets to change the docblock. Again, not perfect I know, but this happens all the damn time_ and you know it.

Well, now our API documentation says that this method doesn't return anything, but really it is the only way to get at the data you want. That's pretty damn annoying.

_Yeah but your tests will catch that!_

Only if that same shit developer who forgot to change the docblock also forgot to update the tests.

_Well the peer review team will catch that!_

Only if... oh you get the point. Not every team is as wonderful as you, trust me.

The differentiation between `void` and `null` is an internal reminder to the function definer that they cannot start shoving values out without updating their signature, which will update API documentation generators. 

Somebody pointed out that somebody could still change the return type and not update `@returns`, but that is a non-issue as people start to move from `@returns` annotations to return types, in just the same way we moved from `@access` to using `public`, `private`, `protected` in the PHP 4 -> PHP 5 days.

So, over time, PHP will kick you in the face if you try to make a change to your method which will not automatically be reflected in the API generator. 

### Why not return null instead of void

Some folks seem to want to introduce the null return type instead:

{% highlight php %}
function nothin(): null {

}

function nothinElse(): null {
  return;
}

function stillNothin(): null {
  return null;
}
{% endhighlight %}

This would be very consistent with how PHP is, because lets be honest, PHP does return null even if this proposed `void` return type is accepted. 

Great, but if you allow `return null;` you have to allow `return somethingWhichMightBeNull();`. What happens if you build with the expectation of that being null, then it returns a value other than null? Do you only allow `return somethingWhichMightBeNull();` if `somethingWhichMightBeNull(): null` is set? It's a rabbit hole of bullshit which doesn't need to happen.

A method that may return `null` is useless. Specifically declaring `void` is incredibly useful at ensuring you do not get a value, instead of just saying "you probably wont."

## Strong Interface Compliance

The above two reasons might be considered hand-holding for the person writing the function, and how useful that is depends on what you are doing. But if you're implementing interfaces, those signatures were not written by you, and are in a different file. In that case, having a swift smack around the head if you start to violate what the interface wants - without having to rely on your IDE catching it - is a strong benefit. 

A lot of folks might not care about this, but as somebody who has seen this come up at the PHP-FIG, and who could take advantage of it for interface-heavy projects like Omnipay and Flysystem with their package-based functionality, any part of the method that can be enforced at a language level instead of relying on fucking docblocks is wildly beneficial.


## Summary

The entire conversation seems fairly moot at this point as Andrea quit half way through me writing this blog. I was going to put it in the bin, but Andrea asked me to post anyway. 

Regardless, this is a solid feature that makes a lot of sense for many. Again, it's not going to be for everyone and if Scalar Type Hints fails then it'll not make _quite_ as much sense, but it is certainly not a waste of time, a feature for the sake of being a feature, it is not meaningless and it is not semantic wankery. 

Besides, I can always fall back to _"BUT C HAS IT!!"_

Keep it classy PHP.



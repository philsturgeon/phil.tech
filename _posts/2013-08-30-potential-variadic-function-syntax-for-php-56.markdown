---
layout: post
title: Potential Variadic Function Syntax for PHP 5.6
category: php
permalink: blog/2013/08/potential-variadic-function-syntax-for-php-56
excerpt: 'An awesome RFC popped up the other day: Syntax for variadic functions, developed
  by Nikita Popov. I read through it and I loved it, but I did have to Google to see
  what the hell a variadic function was.'
date: '2013-08-30 18:07:00'
comments: 'true'
disqus_identifier: potential-variadic-function-syntax-for-php-56
---

An awesome RFC popped up the other day: [Syntax for variadic functions](https://wiki.php.net/rfc/variadics), developed by [Nikita Popov](https://twitter.com/nikita_ppv). I read through it and I loved it, but I did have to Google to see what the hell a [variadic function](https://en.wikipedia.org/wiki/Variadic_function) was. _This is what happens when you teach yourself how to code. You know how to do things, but don't know any of the words._

Variadic functions are already possible in PHP and have been throughout 4.x and 5.x in the form of [func\_get\_args()](http://us2.php.net/func_get_args), which is pretty gross. It's used for functions where you want to have an unlimited number of functions like:

{% highlight php %}
max(11, 2, 4, 6, 1);
sum(1, 5, 6);
{% endhighlight %}

Currently to implement a function like this you'd do:

{% highlight php %}
function sum()
{
    return array_sum(func_get_args());
}

echo sum(1, 4, 12, 20);
{% endhighlight %}

The proposed RFC lets you write this:

{% highlight php %}
function sum(...$nums)
{
    return array_sum($nums);
}

echo sum(1, 4, 12, 20);
{% endhighlight %}

This super-trivial example shows off the difference between the two approaches, but some folks are hesitant about how useful this is. Let's consider a few things here.

### Pro: Readability

Imagine a function that is 50 lines long, and on line 45 the developer is using a `func_get_args()`. You'd have to notice that to know that you are meant to pass in a bunch of arguments… The new variadic syntax would make it strikingly obvious what is happening in the function declaration, which is where arguments come from. 

I ran a find in folder on Pyro to see what came up first, and the answer is:

{% highlight php %}
public function orX($x = null)
{
    return new CompositeExpression(CompositeExpression::TYPE_OR, func_get_args());
}
{% endhighlight %}
    
Doctrine looks drunk here. It accepts one param called `$x`, which is optional, then uses `func_get_args()` anyway meaning fuck `$x`.
    
Or:

{% highlight php %}
  public function orX(...$x)
  {
      return new CompositeExpression(CompositeExpression::TYPE_OR, $x);
  }
{% endhighlight %}

I'll take that please. Clear, self documenting code.

### Pro: Documentation

I'm a big fan of DocBlocks. Having well documented code means you can run API generators, use IDE auto-completion, get warnings about return type clashes right in your editer, etc, which is why I volunteered to coordinate the new [PHPDoc PSR](https://github.com/php-fig/fig-standards/pull/169) with the phpDocumentor team. Put simply: that shit is awesome.
    
Sure we could add a `@param *variadic` doc syntax or something, but it would be odd and not mix in with other syntax very well. The new syntax would make it super easy:

{% highlight php %}
/**
 * @param mixed ...$x
 *
 * @return CompositeExpression
 */
public function orX(...$x)
{
    return new CompositeExpression(CompositeExpression::TYPE\_OR, $x);
}
{% endhighlight %}

Thanks!

### Pro: Type Hinting

Type Hinting right now is like a semi-done hair-cut. Some squabbling in the core team about how to handle strong/weak typing hinting for  `int`, `float`, `string`, etc lead to confusion and means the feature is restricted to type hinting for an `array`, `callable` or a class/interface name. Sure we can't type hint every type of value [yet] but the fact that type hinting exists means we should be able to use it. 

{% highlight php %}
/**
 * Favorite one or more statuses.
 *
 * @param string $screenName
 * @param Twitter\Status ...$statuses
 *
 * @return array[League\Twitter\User]
 */
public function favoriteStatus($screenName, Twitter\Status ...$statuses)
{
{% endhighlight %}
That is awesome, I can specify the type exactly, instead of having to allow an array then check instances in a loop or some shit. Quicker, more obvious, better for everyone.

### Pro: Less Faff

While not the most important aspect, even if you don't think defining this in the function signature is important, you can avoid this sort of horrendous faffing around:

{% highlight php %}
public function tryMethod()
{
    $args = func_get_args();
    $method = $args[0];
    unset($args[0]);
    $args = array_values($args);

    try {
        return call_user_func_array([$this, $method], $args);
    } catch (\Exception $e) {
        return false;
    }
}
{% endhighlight %}
   
This becomes:

{% highlight php %}
public function tryMethod($method, ...$args)
{
    try {
        return call_user_func_array([$this, $method], $args);
    } catch (\Exception $e) {
        return false;
    }
}
{% endhighlight %}
    
Why screw around when you don't have to?

### Pro: Keeping up With The Joneses

C#, Ruby and Python as well as many others. While copying features might not be best route to innovation, it shows there is precedence for the functionality.

PHP might not be using EXACTLY the same operator as others (which no doubt will cause folks to piss and moan for a while) but PHP is a [Pillagin' Pirate](http://blog.astrumfutura.com/2012/04/php-innocent-villagefolk-or-a-pillagin-pirate/), and pillagin' pirates gotta take what they can.

### Con: Trollolololol?

I threw this RFC on Reddit to see if anyone could give me some downsides and some epic trolling began by some [/r/lolphp](http://www.reddit.com/r/lolphp) bros who seemed to have wandered into the wrong sub-reddit.

One dude was complaining about performance, but there is no reason this would have any effect on performance. Adding an extra token to PHP is not going to make it explode, and randomly making allegations about stuff doesn't make you big or clever.

### Con: Argument Unpacking

One valid con came up on the PHP internals list and a few times in comments, that with this new syntax you cannot pass the variadic value on properly. 

Well, you can't right now either. To reuse the same example, you have to do shit like this:

{% highlight php %}
public function tryMethod($method, ...$args)
{
    try {
        return call_user_func_array([$this, $method], $args);
    } catch (\Exception $e) {
        return false;
    }
}
{% endhighlight %}

For this Nikita has another RFC for [argument unpacking](https://wiki.php.net/rfc/argument_unpacking) using what is sometimes known as a splat operator. 

_Learning that splat was an actual thing was the most fun I had learning Ruby a few years back, and I can't wait until I'm reading out some syntax at a conference somewhere and I get to say "bang brace splat"._

Taking this same example and applying the new splat operator makes it much nicer:

{% highlight php %}
public function tryMethod($method, ...$args)
{
    try {
        return $this->$method(...$args);
    } catch (\Exception $e) {
        return false;
    }
}
{% endhighlight %}
   
It's just taking the arguments, and shoving them into the method in the same way they came in.

The examples on the RFC are also very handy:

{% highlight php %}
call_user_func_array([$db, 'query'], array_merge(array($query), $params));

// or

$db->query($query, ...$params);
{% endhighlight %}

Which would you prefer to type?

Don't care about pretty syntax? Ok, well it's faster too. [About 3.5x - 4x faster](https://gist.github.com/nikic/6390366).

## Summary

Neither of these RFCs are about saying you have to use it, or that variadics are always good, or that using an array of values as parameters is wrong. It's simply about _drastically_ tidying up existing functionality in PHP.

Somebody on Reddit pointed out this is just like namespaces. PHP users implemented them in a hacky kinda way: ("Let's all agree that underscores mean a namespace… ok?") then the language ratified the use with syntax, so now we have an actual namespace separator and `use` functionality. This is the same. People are already using variadics, so instead of it being a nasty mess this syntax tidies it up.

Use the arguments to explain to folks why this functionality is great. If you know somebody on the core team who is struggling with this feature (and I've seen some _really_ bizarre comments going around) then maybe this can help you explain to them why we should have it.

PHP should be allowed to have nice things. How about named parameters next?
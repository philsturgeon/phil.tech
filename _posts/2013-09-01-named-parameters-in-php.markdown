---
layout: post
title: Named Parameters in PHP
category: php
permalink: blog/2013/09/named-parameters-in-php
excerpt: Converting a Python Twitter API package to PHP turned out to be more trouble
  than I initially expected due to the usage of Python's named parameters. This artice
  uses the Twitter library as an example for why named parameters are important and
  useful.
date: '2013-09-01 01:35:00'
comments: true
disqus_identifier: named-parameters-in-php
---

_**Update 06/09/2013:** I had initially offered to put together an RFC draft updating the original rather dire efforts at documenting PHP's lack of interest for named parameters. A more objective RFC has now been put together by [Nikita Popov](https://twitter.com/nikita_ppv) so I can ditch my notes. Wonderful._

Converting a Python Twitter API package to PHP turned out to be more trouble than I initially expected due to the usage of Python's named parameters. Here is the converted function signature:

{% highlight php %}
public function getFriends(
    $user_id = null, 
    $screen_name = null, 
    $cursor = -1, 
    $skip_status = false, 
    $include_user_entities = false
) {
{% endhighlight %}

In Python a call to that method could look like this:

{% highlight python %}
api.get_friends(screen_name="phpdrama", include_user_entities=true)
{% endhighlight %}

Because PHP has no ability for users to specify parameters and is instead done entirely based on the definition order, it's going to look like this:

{% highlight php %}
$api->getFriends(null, 'phpdrama', -1, false, true);
{% endhighlight %}

Everything is wrong with this.

1. I as a user should not have to know or care what the default values of arguments im not using are.
2. It is unobvious when/if default values change.
3. I don't know what im saying `false` to without looking back at the declaration.
4. It looks shitty.

### What about arrays?

Whenever I say I'd like to use named parameters, somebody says "why do you need them, just use arrays!"

<blockquote class="twitter-tweet"><p><a href="https://twitter.com/philsturgeon">@philsturgeon</a> That argument always comes up on internals when named parameters are raised. Shows a fundamental misunderstanding, I feel.</p>&mdash; weierophinney (@mwop) <a href="https://twitter.com/mwop/statuses/361982046433845248">July 29, 2013</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

Well, if it's my only option I guess I will, but how does it look:

{% highlight php %}
public function getFriends($args)
{
    $args += [
    	'user_id' => null,
    	'screen_name' => null,
    	'cursor' => -1,
    	'skip_status' => false,
    	'include_user_entities' => false,
    ];
    extract($args);
	// ....
}
{% endhighlight %}

_**Update 01/09/2013:** I had some nasty-ass isset statements in there but a few people pointed out this array situation would be nicer. They're right of course. I need to stop blogging from the bar._

This syntax will make the following syntax available:

{% highlight php %}
$api->getFriends(['screen_name' => 'phpdrama', 'include_user_entities' => true]);
{% endhighlight %}

Ok so yes, technically this will work, but I lose all ability to docblock anything, type hinting is a chore and I have to do it in EVERY method. There are a lot of methods, which means literally hundreds of lines of boilerplate that could be replaced easily with syntax.

What would it look like in PHP-land? Something like one of these I guess:

{% highlight php %}
$api->getFriends(screen_name => 'phpdrama', include_user_entities => true);
$api->getFriends(screen_name='phpdrama', include_user_entities=true);
$api->getFriends(:screen_name => 'phpdrama', :include_user_entities => true);
$api->getFriends(screen_name: 'phpdrama', include_user_entities: true);
{% endhighlight %}

Comment on which you prefer and why. Also feel free to suggest other syntax.

## Next Step

Named Parameters for PHP is not a new conversation. It's reared its head several times - so much so that the [named parameters RFC](https://wiki.php.net/rfc/namedparameters) says:

> Since the topic continually gets re-raised, and now PHP has an RFC process, the discussion should be recorded in an RFC (Note this is yet to be done) so the same arguments don't have to be revisited.

The reason I've not been confident about seeing named parameters make it into PHP is due to the conclusion on this RFC:

> **Discussion**
>
> We don't see the real need for named parameters, as they seem to violate PHP's KISS principle. It also makes for messier code.
>
> **Conclusions**
>
> We do not want to add it.

The attitude that comes across here is extremely negative and mostly sounds like the response of somebody that does not truly understand what named parameters are. The RFC also says that it needs to be updated to include conversations that have been had since the RFC was initially created. 

I can read, I can Google and I can write, so I feel like I am the perfect person for the job.

I've emailed the internals list asking for a green light, then I'll rewrite the RFC to be a fair and balanced outline of what named parameters are. If you guys can make syntax suggestions I can propose the most popular ones as options on the RFC.

I definitely don't think named parameters will get into 5.6, but I do think the RFC can be drastically improved to A) give people a better understanding of the pros and cons and B) perhaps change the minds of enough of the core team to eventually make named parameters a possibility.

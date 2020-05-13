---
layout: post
author: [Phil]
title: The State of Markdown
tags: [markdown, commonmark, php, league]
date: '2014-11-30 13:19:00'
# comments: true
# alias: php/2014/11/30/state-of-markdown/
---

The answer to "What is the State of Markdown?" is "Yes, it's a f**king state."

[Markdown] has been around for a long time, since John Gruber released it in 2004. 

Since then everyone and their dog has come up with extensions, some of which are built as implementations 
then referenced almost like standards by other implementations.

* [PHP Markdown Extra] - "Markdown Extra is an extension to PHP Markdown implementing some features currently not available with the plain Markdown syntax."
* [PHP Markdown Next](https://packagist.org/packages/nazar-pc/php-markdown-next) - "PHP Markdown Next parser, based on PHP Markdown Extra and PHP Markdown Extra Extended."
* [MultiMarkdown](http://fletcherpenney.net/multimarkdown/) - "MMD is a superset of the Markdown syntax, originally created by John Gruber. It adds multiple syntax features (tables, footnotes, and citations, to name a few), in addition to the various output formats listed above (Markdown only creates HTML)."
* [Maruku](https://github.com/bhollis/maruku) - "Maruku is a Markdown-superset interpreter. Maruku implements the original Markdown syntax, all the improvements in PHP Markdown Extra and a new meta-data syntax."
* [kramdown] - "... supports standard Markdown (with some minor modifications) and various extensions that have been made popular by the PHP Markdown Extra package and Maruku."

A Ruby implementation mentioning a PHP implementation and an obsolete Ruby implementation to try
and make it clear what functionality it has itself? What an utter mess.

These are not the only implementations, but are some of the most commonly referenced amongst others. There are in fact so many implementations with completely differing results that something called [Bablemark 2] has 
been set up to compare the outputs of the interpreters. 

Some of the differences in these syntaxes are insane.

* [Nested lists with an empty line](http://johnmacfarlane.net/babelmark2/?text=1.++one%0A++++-+a%0A%0A++++-+b%0A2.++two)
* [Unknown entities](http://johnmacfarlane.net/babelmark2/?normalize=1&text=under+a+lciense+from+AT%26T%3B+however%2C%0A)
* [Setext header with two spaces at the end](http://johnmacfarlane.net/babelmark2/?normalize=1&text=hello++%0A-----%0A%0A%0A)
* [More...](http://johnmacfarlane.net/babelmark2/faq.html#other)

Maybe those examples seem like edge-cases or contrived examples, but I have run into a few of those and more.

[Markdown]: http://daringfireball.net/projects/markdown/
[kramdown]: http://kramdown.gettalong.org
[PHP Markdown Extra]: https://michelf.ca/projects/php-markdown/extra/

## Every Day Issues

The most recent issues for me came from switching this website from [PyroCMS] to [Jekyll]. The content was mostly in Markdown already so this was fairly easy, but more specifically it was using [PHP Markdown Extra].

I ran into a few issues with [kramdown] and [Redcarpet] both building a version of my content that was
subtly broken in various ways. One specific issue was with [lists inside blockquotes].

~~~ html
> With PSR-0, multiple classes actually map to the same file. For example, all of the following map to the same file (Foo/Bar/Baz.php): 
>  - \Foo\Bar\Baz
>  - \Foo\Bar_Baz
>  - \Foo_Bar_Baz
~~~

The result of that Markdown when run through kramdown looked like this:

~~~ html
<blockquote>
  <p>With PSR-0, multiple classes actually map to the same file. For example, all of the following map to the same file (Foo/Bar/Baz.php): 
 - \Foo\Bar\Baz
 - \Foo\Bar_Baz
 - \Foo_Bar_Baz</p>
</blockquote>
~~~

Notice how the list items are not parsed at all and just shoved in as plain-text.

I'm not just picking on kramdown here, as this one particular block of text comes out [incredibly differently]
in most implementations when compared on Babelmark 2. 

Pandoc just chews half of the content out of the list items and leaves some dashes in place:

~~~ html
<blockquote>
<p>With PSR-0, multiple classes actually map to the same file. For example, all of the following map to the same file (Foo/Bar/Baz.php): - - _Baz - _Bar_Baz</p>
</blockquote>
~~~

Redcarpet and PHP Markdown have some boundary issues with underscores being converted to italics:

~~~ html
<blockquote>
<p>With PSR-0, multiple classes actually map to the same file. For example, all of the following map to the same file (Foo/Bar/Baz.php): 
 - \Foo\Bar\Baz
 - \Foo\Bar<em>Baz
 - \Foo</em>Bar_Baz</p>
</blockquote>
~~~

Maruku is a little heavy on the whitespace but gets it spot on as far as the HTML goes:

~~~ html
<blockquote>
<p>With PSR-0, multiple classes actually map to the same file. For example, all of the following map to the same file (Foo/Bar/Baz.php):</p>

<ul>
<li>\Foo\Bar\Baz</li>

<li>\Foo\Bar_Baz</li>

<li>\Foo_Bar_Baz</li>
</ul>
</blockquote>
~~~

Ask 100 different implementations to parse the same Markdown, and you'll get about 56 different answers. 

**Markdown and the ecosystem around it is broken.**

[lists inside blockquotes]: https://github.com/gettalong/kramdown/issues/185
[PyroCMS]: https://www.pyrocms.com/
[Bablemark 2]: http://johnmacfarlane.net/babelmark2/
[Jekyll]: http://jekyllrb.com/
[Redcarpet]: https://github.com/vmg/redcarpet
[incredibly differently]: http://johnmacfarlane.net/babelmark2/?text=%3E+With+PSR-0%2C+multiple+classes+actually+map+to+the+same+file.+For+example%2C+all+of+the+following+map+to+the+same+file+(Foo%2FBar%2FBaz.php)%3A+%0A%3E++-+%5CFoo%5CBar%5CBaz%0A%3E++-+%5CFoo%5CBar_Baz%0A%3E++-+%5CFoo_Bar_Baz

## CommonMark

An attempt has been made by various people involved with companies that use Markdown, to make a single 
specification that is [far less ambiguous](http://spec.commonmark.org/0.12/#why-is-a-spec-needed) when it comes down to what should be output from some of these tricky combinations of syntax. 

* John MacFarlane, jgm@berkeley.edu
* David Greenspan, david@meteor.com
* Vicent Marti, vicent@github.com
* Neil Williams, neil@reddit.com
* Benjamin Dumke-von der Ehe, ben@stackexchange.com
* Jeff Atwood, jatwood@codinghorror.com

This does not include John Gruber, the chap who originally made Markdown, and that has been the source of 
much controversy. 

That controversy is mostly in the past now the ["what to call it"](http://talk.commonmark.org/t/call-it-yamf-leaven-the-brand-sell-it-on-its-merits-not-its-name/410) conversation is resolved, and John Gruber has 
agreed with them that "CommonMark" is an acceptable name. 

CommonMark is now at v1.0 and is considered "complete." It is still being worked on, and currently misses 
functionality that some people expect it to have. 

The premise of CommonMark was to remove ambiguity in the original specification and so far it has mostly done
that. At this point though there is a big step for them to face, and that is the matter of all the extra 
syntax and functionality people have come to expect from working with Markdown.

[CommonMark]: http://commonmark.org/

## Tables, and other "Extra" functionality

CommonMark does not have any support for tables, other than through using HTML `<table>` tags. Gruber's 
Markdown does not have special syntax for tables either, but people are used to tables thanks to "PHP 
Markdown Extra", "GitHub-favored Markdown" and many other implementations supporting them.

In a [thread about tables on the CommonMark site], the reason cited is this:

> This is meant to be a specification of core markdown features.
Extensions, including tables, can come later, but let's get the
core settled first! **-- [John MacFarlane]()**

It looks CommonMark plans to completely cover "core Markdown" - which means Gruber's Markdown - before moving onto any "extra syntax" like tables. That sounds reasonable enough, but a few people are [a bit annoyed] about [fenced code blocks] being added and tables still not being done. It seems a bit inconsistent to 
add some new syntax but refuse others, but I understand that they are trying hard not to become divergent. Really they have [not changed all that much](http://talk.commonmark.org/t/what-changed-in-commonmark/15).

Plenty of Markdown-like languages have cropped up that started off similar to Markdown, but became so 
different that they are not commonly used. Remember [Creole]? Probably not. CommonMark might have added 
fenced code blocks, but that is not a huge leap from Gruber's Markdown having [indented code blocks], so
this could be considered an acceptable addition. 

Looking forwards, extensions or extras are going to be very important to avoid any further problems around
what goes in and what stays out. Luckily a few options are being discussed.

> I suggest someone should create a topic about how best to include simple extensibility points for extensions, ways to namespace them and handle order so they don't conflict, etcetera. That is the best thing to discuss right now. **-- [Jeff Atwood](http://talk.commonmark.org/t/the-inevitable-markdownextra-topic/42/18)**

How CommonMark extensions or extras end up being implemented will be interesting, and there are a few 
conversations discussing how it might work.

1. [Optional Syntax](http://talk.commonmark.org/t/optional-syntax/515)
2. [Multiple levels of CommonMark specification](http://talk.commonmark.org/t/multiple-levels-of-commonmark-specification/541)
3. [Generic directives/plugins syntax](http://talk.commonmark.org/t/generic-directives-plugins-syntax/444)

**Any and all of these approaches to adding extensions or extras would solve a lot of problems in the Markdown and CommonMark eco-systems.**

[a bit annoyed]: http://talk.commonmark.org/t/tables-vs-fenced-code-blocks-when-is-something-common/411
[fenced code blocks]: http://talk.commonmark.org/t/tables-in-pure-markdown/81/4
[thread about tables on the CommonMark site]: http://talk.commonmark.org/t/tables-in-pure-markdown/81
[Creole]: http://www.wikicreole.org
[indented code blocks]: http://daringfireball.net/projects/markdown/syntax#precode

## Multiple Levels of CommonMark

[PSR-1] and [PSR-2] might not be your favorite PHP standards, but splitting them in two worked out very well
for the PHP-FIG. By having PSR-1 we could get people using the same method naming style, leading to 
consistent public APIs for classes, without enforcing tabs v spaces rules on other developers.

Very similarly, having "CommonMark Core" and "CommonMark Extra" with extra things like tables would be great.

Those still sticking to Gruber as having the one-true source of Markdown can just use the CommonMark tests
as a way to make their implementations more logical and consistent whenever it does something weird. 

Those interested in extra Markdown functionality like that in kramdown, PHP Markdown Extra, etc can work 
together on defining tables and whatnot for us all to use with a documented syntax and result, which
transcends specific implementations regardless of programming language.

[PSR-1]: http://www.php-fig.org/psr/psr-1
[PSR-2]: http://www.php-fig.org/psr/psr-2

## Directives

LeanPub have decided to make yet another standard based on what they used to call [LeanPub Markdown], called
[Markua](http://markua.org/). That is different to Maruku, the Ruby parser mentioned earlier.

The idea is that while LeanPub are happy with Markdown, and their end-users - like myself - are happy to use
Markdown, they need to have a few extra bits of syntax for asides, warning boxes, tips, etc. 

I strongly disagree that they need to make their Markdown "flavor" into a whole new spec, but they could 
simplify Markua by making it into "CommonMark + custom LeanPub directives." LeanPub have already 
[expressed an interest] in keeping "close" to CommonMark, but being literally CommonMark with Markua being a
set of CommonMark directives would be much easier for everyone.

[LeanPub Markdown]: https://leanpub.com/help/manual
[expressed an interest]: https://leanpub.com/markua/read#leanpub-auto-relationship-of-the-markua-specification-to-gruber-markdown-and-commonmark

## Make Things Better

Here is the path I see out of this mess, and it can be improved by both the end-users, and the implementation
creators.

### Implementation Maintainers

PHP packages on Packagist can mark themselves as deprecated, and recently a few Markdown packages have
started to do that. I convinced a few people to remove old forks, and [dflydev/markdown] 
has been marked as deprecated. This should help to channel people towards the solutions that want to
improve, and steer them away from solutions that are not being actively developed.

If you want to keep working on your Markdown implementations, then implement the shit out of as much of the 
[CommonMark specification] as you can. Any deviation is going to cause trouble, so the closer the better.
Most of these deviations are going to be bugs or parser logic errors, so it's not hard to use the spec and 
test-suite to improve your own implementations.

Also, people need to stop making new flavors of Markdown. Remember I mentioned [PHP Markdown Next]?

> PHP Markdown Next parser, based on PHP Markdown Extra and PHP Markdown Extra Extended

Stop. Reading that hurt my brain. No more of these please.

[CommonMark specification]: http://spec.commonmark.org/

### End-Users

Use CommonMark. Pick an implementation for your blog, book or whatever that actively mentions supporting
CommonMark; either as the only supported specification or as a driver. Here are a list of [CommonMark 
compliant implementations](https://github.com/jgm/CommonMark/wiki/List-of-CommonMark-Implementations) in various languages.

If you are working with PHP, grab a copy of [colinodell/commonmark-php], which will soon be moving over to
[The League of Extraordinary Packages](http://thephpleague.com). It's specification compliant and will be 
following the progress of CommonMark as they work out however they're gonna do directives or extensions.

If you notice a weird result from some specific Markdown syntax in an existing project and changing to use a
CommonMark compliant library is not possible or successful, send a pull request or post an issue to that
implementation and make it work according to CommonMark.

If CommonMark is doing something weird, send them a pull request too. The specification is not finished yet,
but it's _considerably_ less ambiguous than the other implementations, most of which are just doing whatever
they feel like doing.

## XKCD

I talk about standards a lot, and every single time I mention anything to do with standards, some hilarious 
comedian links me to [XKCD: Standards #927](https://xkcd.com/927/).

![Fortunately, the charging one has been solved now that we've all standardized on mini-USB. Or is it micro-USB? Shit.](img/2014-11-30-state-of-markdown/standards.png)

If StackOverflow, GitHub and the others hashing out CommonMark all had their own flavors before,
then they are reducing the number of flavors out there purely by letting these folks get on with it.

If end-users ignore CommonMark then the only gain might be making a few websites work the same with user-
entered Markdown, but think again about implementations. The fact that every single implementation
right now is doing something entirely different, we actually have hundreds of "standards."

With implementations starting to lean towards CommonMark as a definitive guide of how to handle certain 
situations, we will slowly have fewer and fewer differing results and we won't be in the situation XKCD 
describes.

This XKCD comic is closer to how things should be going: 

![ISO 8601](img/2014-11-30-state-of-markdown/iso_8601.png)

## Summary

None of this is that far-fetched. No library maintainer wants their implementation to be the worst ranked on 
Babelfish, so implementing more and more of CommonMark over time is going to definitely make their tool
better.

Having a [shit-load of clones](/php/2014/10/20/php-wars-attack-of-the-clones/) for a single problem domain 
is bad enough, but these Markdown implementations aren't even clones. They're fundamentally different in
completely unexpected ways, and a specification like CommonMark is the only way we can fix that.

Comment here with any progress you see on Markdown implementations getting closer to CommonMark, or spot new 
problems with crooked results that diverge from the specification.  

[PHP Markdown Next]: https://packagist.org/packages/nazar-pc/php-markdown-next
[dflydev/markdown]: https://packagist.org/packages/dflydev/markdown
[colinodell/commonmark-php]: https://github.com/colinodell/commonmark-php

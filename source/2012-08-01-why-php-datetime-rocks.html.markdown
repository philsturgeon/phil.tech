---
layout: post
title: Why PHP DateTime Rocks
category: php
alias: blog/2012/08/why-php-datetime-rocks
excerpt: Working as a freelancer and contractor sometimes I come across some code
  that is so terrible I have to laugh, then immediately tweet a screenshot for others
  to laugh. I think this is fairly healthy, but one reaction I get fairly often is
  "Yuck, PHP!". Really that should be "Yuck, PHP 4!" I've been using PHP since 4.0.1
  and I remember it well. It was terrible. Whenever I see these chunks of code I like
  to see how clean I can make them with PHP 5.3 + code and DateTime has saved me a
  lot of lines.
date: '2012-08-01 15:12:00'
comments: true
disqus_identifier: why-php-datetime-rocks
---

Working as a freelancer and contractor sometimes I come across some code that is so terrible I have to laugh, then immediately tweet a screenshot for others to laugh. I think this is fairly healthy, but one reaction I get fairly often is "Yuck, PHP!". Really that should be "Yuck, PHP 4!" I've been using PHP since 4.0.1 and I remember it well. It was terrible. Whenever I see these chunks of code I like to see how clean I can make them with PHP 5.3 + code and DateTime has saved me a lot of lines.

DateTime is nothing new, but it's definitely under-used by many. It was made available in PHP 5.2.0 but got some of its best features until PHP 5.3.0. PHP 5.3.0 is pretty old now, but I learned about <a href="http://uk.php.net/manual/en/datetime.createfromformat.php">DateFormat::createFromFormat()</a> after reading a new addition to [PHP The Right Way: Date and Time](http://www.phptherightway.com/#date_and_time).

Right, down to business.

## First Offender

Format one crazy date into the standard MySQL date format.

<script src="https://gist.github.com/3228301.js?file=gistfile1.php"></script>

Yuck. Using DateFormat::createFromFormat() we can ditch all of that code and instead just use this:

<script src="https://gist.github.com/3228398.js?file=gistfile1.php"></script>

That's much better. But how about comparing dates? 

## Second Offender

Use mktime() to build them both into unix timestamps, then find out how many seconds right? 

<script src="https://gist.github.com/3228471.js?file=gistfile1.php"></script>

Did you just throw up in your mouth a little? 

This sort of stuff is way too common and is totally unnecessary. If we want to stop pretending it's the 90's we could instead write it like this:

<script src="https://gist.github.com/3228499.js?file=gistfile1.php"></script>

And there we have it! 

We have cleaner, more readable, more reliable code. A perfect example of why you need to be upgrading to PHP 5.3 and a perfect example of PHP making massive leaps forward over time.

**Update:** Some people here and on Reddit are assuming I've never heard of strtotime() before. My mistake here was not being able to for-see EVERY possible angle for the article, which a common problem for bloggers.

So, why not use strtotime()? Firstly, using date('Y-m-d H:i:s', strtotime($strDate)) is the same as doing $date = new DateTime($strDate)->format('Y-m-d H:i:s') but of course with the objects you get more potentially useful methods than just an integer - which can lead to less code. Secondly, read the [documentation](http://php.net/manual/en/function.strtotime.php)

> Dates in the m/d/y or d-m-y formats are disambiguated by looking at the separator between the various components: if the separator is a slash (/), then the American m/d/y is assumed; whereas if the separator is a dash (-) or a dot (.), then the European d-m-y format is assumed.

> To avoid potential ambiguity, it's best to use ISO 8601 (YYYY-MM-DD) dates or DateTime::createFromFormat() when possible.

strtotime() is only useful if it KNOWS the format but what is happening here: 7/7/2011? Is that UK or US, because that could be m/d or d/m. When you are dealing with code that comes in from a wide array of random sources (horrible ADF feeds in this case) then the date formats are MENTAL, and telling it WHAT the data is means it can be parsed correctly.

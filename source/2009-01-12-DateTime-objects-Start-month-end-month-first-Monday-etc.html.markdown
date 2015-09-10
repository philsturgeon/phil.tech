---
layout: post
title: DateTime objects - Start month, end month, first Monday, etc
category: php
alias: blog/2009/01/DateTime-objects-Start-month-end-month-first-Monday-etc
excerpt: Throw away `strtotime()` and `date()` and check out PHP's funky DateTime objects
  for much greater control over your dates.
date: '2009-01-12 08:24:00'
comments: true
disqus_identifier: DateTime-objects-Start-month-end-month-first-Monday-etc
---

I recently came across PHP's [DateTime](http://uk3.php.net/manual/en/class.datetime.php) object and I'm loving it.

~~~php
// Calculate month and year to look for
$month = !empty($_GET['month']) ? $_GET['month'] : date('m');
$year = !empty($_GET['year']) ? $_GET['year'] : date('Y');

// Start of the month
$start_date = new DateTime($year.'-'.$month.'-01');

// End of the month
$end_date = new DateTime( $start_date->format('Y-m-d') );
$end_date->modify('+1 month -1 day');

echo ' Start: '. $start_date->format('d m Y');
echo ' End: '. $end_date->format('d m Y');
~~~

Working out the first Monday of the month is also quite easy, but has one slight complication. If Monday is on the 1st, the modifier "first monday" will look for the next Monday AFTER that, meaning the 8th.

~~~php
$first_monday = new DateTime($start_date->format('Y-m-d'));
if($first_monday->format('l') != 'Monday') $first_monday->modify('first monday');
~~~

DateTime may have been around for a while now, but it's still not fully documented or even entirely complete on any of the PHP set-ups I have tried it on. Still waiting on `DateTime::diff()`.


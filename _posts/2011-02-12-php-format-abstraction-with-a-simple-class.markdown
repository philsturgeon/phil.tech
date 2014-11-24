---
layout: post
title: PHP Format abstraction with a simple class
category: php
permalink: blog/2011/02/php-format-abstraction-with-a-simple-class
excerpt: " \n Having a quiet night in before a long day of kayaking I thought I'd
  write some fun code instead of banging out the usual shit like I've been doing all
  day. Convert between Array, Object, JSON, XML, CSV and Serialized data and back
  again easily. I'll add a few more types like YAML when I can be arsed to work out
  PECL for MAMP. "
date: '2011-02-12 00:37:00'
comments: 'true'
disqus_identifier: php-format-abstraction-with-a-simple-class
---

Having a quiet night in before a long day of kayaking I thought I'd write some fun code instead of banging out the usual shit like I've been doing all day...

Convert between Array, Object, JSON, XML, CSV and Serialized data and back again easily. I'll add a few more types like YAML when I can be arsed to work out PECL for MAMP.

    $original_array = array('foo' => 'bar', 'baz' => 'stuff');
    
    
        $json = Format::factory($original_array)->to_json();
        $xml = Format::factory($json, 'json')->to_xml();
        $end_array = Format::factory($xml, 'xml')->to_array();
    
    
        var_dump($original_array === $end_array); // true

Get it on [GitHub](http://github.com/philsturgeon/php-format).

I've put it into FuelPHP and I'll commit to CodeIgntier 2.0 soon.


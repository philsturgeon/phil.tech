---
layout: post
title: Access CodeIgniter helpers from Smarty templates
category: codeigniter
alias: blog/2009/05/Access-CodeIgniter-helpers-from-Smarty-templates/
excerpt: Smarty by default has lots of useful functions - or modifiers - to help you
  modify your Smarty variables. Using this modifier, you can access any CodeIgniter
  helper in your view files.
date: '2009-05-17 19:26:00'
comments: true
disqus_identifier: Access-CodeIgniter-helpers-from-Smarty-templates
---

This article assumes you already have Smarty parsing your CodeIgniter views. If you have not done this, you can [find out how to integrate Smarty with CodeIgniter here](http://devcha.blogspot.com/2007/12/smarty-as-template-engine-in-code.html).

To access your CodeIgniter helpers from Smarty, all you need to do is make a new file in your "smarty/plugins/" directory called "modifier.helper.php" and paste in the following code:

`<?php/** Smarty plugin* -------------------------------------------------------------* File:     modifier.helper.php* Type:     modifier* Name:     helper* Purpose:  Call CodeIgniter helpers from within Smarty.* -------------------------------------------------------------*/function smarty_modifier_helper($string, $helper_file, $helper_func){    if (!function_exists("get_instance")) {        return "Can't get CI instance";    }    if (!function_exists($helper_func)) {        $CI =& get_instance();        $CI->load->helper($helper_file);    }    // Get all the params passed in as there might be a few    $params = func_get_args();    // String provided should be the first param and we don't want helper file or helper func being passed    $params[0] = $string;    unset($params[1]);    // Call the function with the params provided    return call_user_func_array($helper_func, array_values($params));}?>`

Save that and try it out in one of your Smarty controlled view files. For example:

`<p>Check out this amazing item <em>{$item.url|helper:'url':'anchor':$item.title:'class="more params"'}</em>.</p>   `

With Smarty modifiers, the item you are modifying is the first param. The modifier is called after a pipe character "|" and then more parameters are separated by ":". With this specific modifier, you list the helper, then the helper function, then as many params afterwards as you like.

**[More on Smarty modifiers](http://www.smarty.net/manual/en/plugins.modifiers.php)**

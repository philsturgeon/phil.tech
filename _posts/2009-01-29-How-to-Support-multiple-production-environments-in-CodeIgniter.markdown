---
layout: post
title: 'How to: Support multiple production environments in CodeIgniter'
category: codeigniter
permalink: blog/2009/01/How-to-Support-multiple-production-environments-in-CodeIgniter
excerpt: Maintaining different configurations for CodeIgniter across multiple environments
  can be a pain. Find out how to support multiple config settings and create a instance-wide
  flag to let you know which environment is being used.
date: '2009-01-29 11:09:00'
comments: 'true'
disqus_identifier: How-to-Support-multiple-production-environments-in-CodeIgniter
---

To get this working is very easy. Constants can be seen all the way through CodeIgniter and can be set almost anywhere. To keep things neat and logical we will put this code into _application/config/constants.php_.

For a simple 2 environment switch you can use the following:

`define('ENV', strpos($_SERVER['SERVER_NAME'], 'local') !== FALSE ? 'local' : 'live');`Or if you have more than the two environments:`if(strpos($_SERVER['SERVER_NAME'], 'local') !== FALSE) { 
  define('ENV', 'local');
}

elseif(strpos($_SERVER['SERVER_NAME'], 'dev.') === 0) { 
  define('ENV', 'dev');
}

elseif(strpos($_SERVER['SERVER_NAME'], 'qa.') === 0) {
  define('ENV', 'qa');
}
else { 
  define('ENV', 'live');
}`

That will match:  
  
  
http://localhost/ = **local**  
http://local.example.com/ = **local**  
http://dev.example.com/ = **dev**  
http://qa.example.com/ = **qa**  
http://example.com/ = **live**

Now you can base your config on if(ENV == 'live'). This is helpful for setting the $active\_group in database.php, runing caching for live only, displaying profiler and debug data for local/dev only and plenty more.


---
layout: post
title: REST implementation for CodeIgniter
category: codeigniter
permalink: blog/2009/06/REST-implementation-for-CodeIgniter
excerpt: There have been 1 or 2 RESTful implementations for CodeIgniter  so far, but
  none of them have been flexible or clean enough. This is the first publicly available
  RESTful implementation for CodeIgniter.
date: '2009-06-03 13:50:00'
comments: true
disqus_identifier: REST-implementation-for-CodeIgniter
---

I have seen 1 or 2 RESTful implementations for CodeIgniter but the syntax and methodology for each of them left me feeling like it could be done better.

**Firstly** , REST is not something that can be put into a library. It is not a "thing" and cannot be treated as such.

**Secondly** , REST calls should not be mixed in with your normal controllers. It should be kept separate from your normal controllers as they are not the same. The default behavior should be slightly different as REST calls are not simple GET -> output.

**Thirdly** , REST controllers need to remain flexible. For that reason the normal CodeIgniter URI segments are not enough. To keep the controllers flexible, associative URI segments should be enforced so any combination of parameters can be used.

**Finally** , REST controllers should be able to output the response in many number of formats. These formats should be specified by the requester and not set in stone within the code. This means a REST controller needs to detect the desired format in two different ways.

- via the **$\_SERVER['HTTP\_ACCEPT']** variable. This will allow cURL, telnet, etc to specify a method through standard HTTP headers. This is the recommended REST way.
- via the URL. This allows browsers and systems not using cURL, telnet, etc to make very basic requests to receive different formats.
- via the controller. Adding "public $rest\_format = 'json';" will make that one controller default to json if nothing is provided by given via URL or HTTP\_ACCEPT.

It took a great deal more thought and consideration than it did actual implementation. Here is the code I have used to get my CodeIgniter RESTful implementation working, tested and complete.

[application/libraries/REST\_Controller.php](http://github.com/philsturgeon/codeigniter-restserver/raw/master/application/libraries/REST_Controller.php "CodeIgniter REST controller") - This new controller type will contain all of the logic for our new REST controllers.

[application/config/rest.php](http://github.com/philsturgeon/codeigniter-restserver/raw/master/application/config/rest.php "CodeIgniter REST controller") - Control login restrictions and caching for your REST server.

[application/controllers/api/example.php](http://github.com/philsturgeon/codeigniter-restserver/raw/master/application/controllers/api/example.php "Example REST API controller for CodeIgniter") - This is an example of a REST controller with some basic user data. This can be called anything you like and be placed in Matchbox modules, sub-directories, whatever.

### Useage

Now it is all set up and ready go. Crack open your browser and try URL's in these formats to see what happens:

**Get one users profile**

> http://localhost/codeigniter/index.php/api/example/user/id/1

**Get a list of users in HTML format**

> http://localhost/codeigniter/index.php/api/example/users/format/html

**Try to access an object through an unsupported method**

> http://localhost/codeigniter/index.php/api/example/user\_put/id/1/name/Something

Personally, I would recommend using [Matchbox](http://code.google.com/p/matchbox/ "Matchbox - lets you organize your codeigniter resources in modules") [Modular Extensions](http://bitbucket.org/wiredesignz/codeigniter-modular-extensions-hmvc/wiki/Home) to get your controllers into modules and then put a api.php controller into each module you wish to send over the API.

> E.g http://localhost/codeigniter/index.php/news/api/article/id/465

As you can see there is plenty of flexibility here. You can use any of the following formats too simply by appending /format/json to the end of your URL or passing the correct MIME-type:

- xml
- json
- serialize
- php (raw output that can be used in eval)
- html
- csv

Within your REST controllers, remember you can access GET parameters through $this->get(), POST parameters through $this->post() and PUT parameters through $this->put().


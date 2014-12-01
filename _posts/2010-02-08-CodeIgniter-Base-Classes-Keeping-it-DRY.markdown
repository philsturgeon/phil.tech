---
layout: post
title: 'CodeIgniter Base Classes: Keeping it DRY'
category: codeigniter
permalink: blog/2010/02/CodeIgniter-Base-Classes-Keeping-it-DRY
excerpt: " \n\tMost applications in CodeIgniter will have various types of pages.
  Logic for these types of pages is normally copied between all of their different
  Controllers which means, for example,  if the way the admin area protection is handled
  is changed there will be lots of Controllers to change and test. This logic can
  instead be shared by some creative extending of the Controller class to create custom
  Base Controllers like Public_Controller, Admin_Controller, etc. "
date: '2010-02-08 10:48:00'
comments: true
disqus_identifier: CodeIgniter-Base-Classes-Keeping-it-DRY
---

Most applications in CodeIgniter will have various types of pages. The public frontend, a backend admin panel, perhaps some sort of moderator or staff panel, etc. Logic for these types of pages is normally copied between all of their different Controllers which means, for example,  if the way the admin area protection is handled is changed there will be lots of Controllers to change and test. This logic can instead be shared by some creative extending of the Controller class to create custom Base Controllers like Public\_Controller, Admin\_Controller, etc.

#### WTF are you talking about?

The idea is that most of your controllers share something in common with each other. For example: All admin controllers need to make sure a logged in user is present and that they are an administrator. A public controller may want to load a theme for your application and load default user data, navigation links or anything else frontend related.

#### Wicked! How?

The first step is to create these Base Controllers.

##### application/core/MY\_Controller.php

MY\_Controller is a basic core library extension. Whenever you create a class with the MY\_ prefix the CodeIgniter Loader class will load this after loading the core library, allowing your code to [replace/extend the core library](http://codeigniter.com/user_guide/general/creating_libraries.html). We won't be replacing anything, but we will be adding to it.

    class MY_Controller extends CI_Controller
    {
     function __construct()
     {
      parent::__construct();
    
    
      $user_id = $this->session->userdata('user_id');
             $this->data['user'] = $this->user_lib->get($user_id);
            }
    }

All we have done here is create a base class that all of our Controllers and "controller types" will inherit. Anything we put in here and assign to $this will be available to anything that extends this class.

##### application/core/Public\_Controller.php

    class Public_Controller extends MY_Controller
    {
        function __construct()
        {
            parent::__construct();
            
            if($this->config->item('site_open') === FALSE)
            {
                show_error('Sorry the site is shut for now.');
            }
    
    
            // If the user is using a mobile, use a mobile theme
            $this->load->library('user_agent');
            if( $this->agent->is_mobile() )
            {
                /*
                 * Use my template library to set a theme for your staff
                 *     http://philsturgeon.co.uk/code/codeigniter-template
                 */
                $this->template->set_theme('mobile');
            }
        }
    }

Public\_Controller is pretty much the same, but you can see we have some frontend-only related code here. The first statement will check to see if the site is currently open using a theoretical settings library that your application might habe and shows an error if the site is closed. The next statement uses the user agent library to offer a mobile version of the site to anyone on a mobile device.

##### application/core/Admin\_Controller.php

    class Admin_Controller extends MY_Controller
    {
        function __construct()
        {
            parent::__construct();
            
            if($this->data['user']['group'] !== 'admin')
            {
                show_error('Shove off, this is for admins.');
            }
        }
    }

Admin\_Controller is again fairly similar. It uses a generic sort of user level checking to see if the user is an admin and shows an error if not.

##### Connecting Base Controllers to Controllers

While there are a few ways to do this, the easiest is to use PHP 5's wonderful \_\_autoload() magic function. By placing this at the bottom of your config.php you can make it load early enough to run before the Controller and it will be somewhere that wont get overridden on upgrade.

    /*
    | -------------------------------------------------------------------
    | Native Auto-load
    | -------------------------------------------------------------------
    | 
    | Nothing to do with cnfig/autoload.php, this allows PHP autoload to work
    | for base controllers and some third-party libraries.
    |
    */
    function __autoload($class)
    {
     if(strpos($class, 'CI_') !== 0)
     {
      @include_once( APPPATH . 'core/'. $class . EXT );
     }
    }

Now the Base Controllers are being made and loaded, you need to inheriting them in your Controllers. So instead of the usual...

    class Blog extends CI_Controller
    {
        function __construct()
        {
            parent::__construct();
            // Whatever
            $data['stuff'] = $whatever;
        }
    }

use...

    class Blog extends Public_Controller
    {
        function __construct()
        {
            parent::__construct();
            // Whatever
            $this->data['stuff'] = $whatever;
        }
    }

And there you have it! In your Controller you'll have all your data set in MY\_Controller or other Base Controllers available in $this->data, so pass that to your views and it will be available. You can also use $this->load->vars('foo', $bar) in your Base Controllers to set values that are only available in your views.

#### Summary

Base Controllers are a nice simple way to give you global data, logic and shared code which can be specific to a certain part of your site. They can do all sorts of crazy stuff which I will leave for you to think about.

Please post your most inventive uses in the comments section.


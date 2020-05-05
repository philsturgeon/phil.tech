---
layout: post
title: Clearing CodeIgniter session data
category: codeigniter
alias: blog/2009/08/Clearing-CodeIgniter-session-data/
excerpt: This article shows a few ways of clearing session data in CodeIgniter, including
  a non-documented approach which lets you wipe all session data without destroying
  the session.
date: '2009-08-27 15:52:00'
comments: true
disqus_identifier: Clearing-CodeIgniter-session-data
---

A question came up in the CodeIgniter forums today asking how to clear session data. After writing a big reply to answer I felt others might be interested in the various options too.

The most practical, yet least thorough is to unset specific bits of user data. This following code will wipe single or multiple pieces of userdata.

`$this->session->unset_userdata('something'); // single item$this->session->unset_userdata(array('first_thing', 'second_thing', 'third_thing', 'etc')); // multiple items`

Alternatively, you can kill the whole session.

`$this->session->sess_destroy();`

This wipes out EVERYTHING but means you will need to create a new session to do anything useful.

Final option, and this is a hack. Normally in PHP 5 objects, people hide direct access to variables to stop unintentional manipulation by developers. Seeing as CodeIgniter supports PHP 4 the whole way through we can do what we damn well please with them. This means we can view the entire userdata variable, even though that is not a documented feature.

` foreach (array_keys($this->session->userdata) as $key) {   $this->session->unset_userdata($key); }`

That is a very bad way to do things, as it will break when/if CodeIgniter eventually move their libraries to PHP 5 syntax. That will not been soon (nor does it need to be) but it will happen eventually.

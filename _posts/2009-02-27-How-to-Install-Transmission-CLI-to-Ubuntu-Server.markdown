---
layout: post
title: 'How to: Install Transmission CLI to Ubuntu Server'
category: linux
permalink: blog/2009/02/How-to-Install-Transmission-CLI-to-Ubuntu-Server
excerpt: Learn how to set up the best BitTorrent client for your Ubuntu Server running
  on the command line. This guide will show you how to get a background daemon running
  on boot to download all your torrents without hogging your terminal like rTorrent,
  and enable the beautiful Clutch web interface.
date: '2009-02-27 19:14:00'
comments: 'true'
disqus_identifier: How-to-Install-Transmission-CLI-to-Ubuntu-Server
---

I made this guide as I had a little trouble finding all the correct information required to get this set up. Some of it was scattered around the Transmission Wiki, some on random blogs and some was just missing. This guide will help compile everything into one place to hopefully save some of you a little time.

The repositories we will be using are unofficial repositories maintained by "kas". The original post can be found [here](http://forum.transmissionbt.com/viewtopic.php?f=13&t=5604). This needs to be done so we can get the newest stable version of Transmission, as the newest version you can get from the Ubuntu Server 8.10 default list of repositories is 1.32 and sadly that version is no longer supported by the Transmission team.

### Main setup

Adding the Unofficial Transmission repository

{% highlight console %}
$ sudo vim /etc/apt/sources.list
{% endhighlight %}

Enter the two lines below that correspond to your Ubuntu Server version. Press A to start writing using vim.

#### Hardy Heron - 8.04
> deb http://ppa.launchpad.net/transmissionbt/ubuntu hardy main deb-src http://ppa.launchpad.net/transmissionbt/ubuntu hardy main

#### Intrepid Ibex - 8.10
> deb http://ppa.launchpad.net/transmissionbt/ubuntu intrepid main deb-src http://ppa.launchpad.net/transmissionbt/ubuntu intrepid main

#### Jaunty Jackalope - 9.04
> deb http://ppa.launchpad.net/transmissionbt/ubuntu jaunty main deb-src http://ppa.launchpad.net/transmissionbt/ubuntu jaunty main

When you are done hit ESC then :wq and Enter to write and quit the file.

Now you need to import the GPG signing key for the stable repository. Enter these two lines into the terminal:

{% highlight console %}
$ gpg --keyserver keyserver.ubuntu.com --recv 976b5901365c5ca1
$ gpg --export --armor 976b5901365c5ca1 | sudo apt-key add -
{% endhighlight %}

Now that you have added these repositories we must update apt

{% highlight console %}
$ sudo apt-get update
{% endhighlight %}

Run the following code to install the transmission-cli package along with the transmission-common package which provides shared code between the CLI and GUI versions.

{% highlight console %}
$ sudo apt-get install transmission-cli transmission-common
{% endhighlight %}

After the scrolling madness you should be able to spot the following:

> Setting up transmission-common (1.50-0ubuntu0~intrepid0) ... Setting up transmission-cli (1.50-0ubuntu0~intrepid0) ...

This means you have the newest version (at time of writing this guide) so things are going correctly so far.

Now, lets start setting it up. The Transmission developers recommend we run transmission with it's own user for various security reasons, this also means we can put transmission configuration into its own home directory.

{% highlight console %}
$ sudo adduser --disabled-password transmission
$ sudo su transmission
{% endhighlight %}

To create the settings file, we can start the daemon and tell it where to put the files. This command will run forever waiting for incoming connections, so as soon as it sits still press Ctrl + C to cancel out of it.

{% highlight console %}
$ transmission-daemon -g /home/transmission/.config/transmission-daemon -f
{% endhighlight %}

When you have canceled this process you will see it says - amongst other things - the following text:

> Saved "/home/transmission/.config/transmission-daemon/settings.json

Exit out of being the transmission user and return to your usual login.

{% highlight console %}
$ exit
{% endhighlight %}

Now you need to decide where you want to put your download files. Unlike rtorrent which I was previously using, transmission-cli is not able to use different directories for unfinished files and whatnot (without hackery). So instead create a single folder that will contain partial and complete downloads. This happens to be where I put mine:

{% highlight console %}
$ sudo mkdir /mediaserver/torrents/Downloads
$ sudo chmod 777 /mediaserver/torrents/Downloads
{% endhighlight %}

Now we can change these settings using vim again. Most of these can be left alone, but if you want the web interface to work you will need to modify a few.

Set the download-dir setting to the path you just created above:

> "download-dir": "\/mediaserver\/torrents\/Downloads",

Now, if you are going to be using the web interface you will need to configure how you want access to work.

Local network users only:

> "rpc-whitelist": "127.0.0.\*,192.168.\*.\*", "rpc-whitelist-enabled": 1,

Log in from anywhere (with a password):

> "rpc-authentication-required": 1, "rpc-enabled": 1, "rpc-password": "password01", "rpc-port": 9091, "rpc-username": "username", "rpc-whitelist": "\*", "rpc-whitelist-enabled": 0,

Now that the transmission daemon is all configured it can be started.

{% highlight console %}
$ transmission-daemon
{% endhighlight %}

Check running by filtering the running process list for any process with the word "transmission" in it.

{% highlight console %}
$ ps aux | grep transmission
{% endhighlight %}

### Stopping/Restarting the daemon

If you need to stop transmission-daemon for any reason such as to edit the config files, the only method I have found (without adding in a custom start-script) is to kill it which seams a little mean.

{% highlight console %}
$ ps aux | grep transmission
{% endhighlight %}

This command once again checks for any transmission processes by matching the name. Look for the first number in the line that will look similar to the one below and use that number in the second command to kill it.

> username **8785** 0.1 0.5 15928 3052 ? Ssl 16:43 0:00 transmission-daemon

{% highlight console %}
$ kill -9 8785
{% endhighlight %}

Then you can edit it and start it up again with:

{% highlight console %}
$ transmission-daemon
{% endhighlight %}

### Testing

To trial run the torrents are working it is a good idea to use a heavily seeded torrent such as an ubuntu release. This is a random one I picked for my testing, use any torrent you like.

{% highlight console %}
$ wget http://releases.ubuntu.com/8.10/ubuntu-8.10-desktop-amd64.iso.torrent
$ transmission-remote --add ubuntu-8.10-desktop-amd64.iso.torrent
$ sudo rm ubuntu-8.10-desktop-amd64.iso.torrent
{% endhighlight %}

Now finally, if you are using the weub GUI you can access it using the server's IP address and the URL below:

> http://server.ip.address:9091/transmission/web/

_To mask this URL and port (e.g `http://torrents.example.com/`) check out my guide on [creating Apache proxies](/blog/2008/11/Creating-proxies-with-Apache)._

### Setting it to run on boot

So far we have a working torrent client that will run whenever we ask it, but that is probably not 100% useful for most media server users. If you want this to start on boot, the Transmission developers have provided us Debian/Ubuntu users with an init.d script to run. You can find the [Transmission init.d boot script here](http://trac.transmissionbt.com/wiki/Scripts/initd), so copy the content of the script at the bottom, enter the command below, press "a" to start editing and paste it in.

`
 $ sudo vim /etc/init.d/transmission-daemon
 `> Press A to edit.  
> Paste (different in all terminals, start with a right click and take it form there).  
> Press Esc  
> Type ":wq" to write and quit

Now you need to give it permission to be executed as a script and add it to the boot up procedure.

`
 $ chmod +x /etc/init.d/transmission-daemon
 $ sudo update-rc.d transmission-daemon start 51 S .
 `

Done! Restart your machine and test it out. I will be writing a follow up article on how to add some great extra features to this program shortly, so keep an eye on the RSS feed.


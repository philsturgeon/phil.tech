---
title: Creating proxies with Apache
category: http
alias: blog/2008/11/Creating-proxies-with-Apache/
excerpt: Setting up HTTP proxies in Apache can be handy for many reasons. If you have
  a server at home, stream media using something like Orb, watch your torrents downloading
  with a remote URL or do any other similar activities, you may be slightly fed up
  with having to keep track of all the different port numbers they use.
date: '2008-11-28 11:12:00'
comments: true
disqus_identifier: Creating-proxies-with-Apache
---

Other than just being easy to forget, these ports are often not open in office environments or internet cafe's. To get any page on any port displaying using nothing but a few lines of Apache config and your own VPS, follow these instructions.

### Step #1 - Enable proxying in Apache

Enable the following modules by uncommenting the following lines:

> LoadModule proxy_module modules/mod_proxy.so  
> LoadModule proxy_connect_module modules/mod_proxy_connect.so  
> LoadModule proxy_http_module modules/mod_proxy_http.so

### Step #2 - Add the virtual host entry

Now you need to work out where you want to put the virtual host entry that will handle this proxy. You can just throw it in your main Apache conf/httpd.conf, but if like me you like to keep the main config file clean, uncomment the 2nd line below and put your virtual host entry in apache/conf/extra/httpd-vhosts.conf.

> # Virtual hosts  
> #Include conf/extra/httpd-vhosts.conf

In this example I am setting up a virtual subdomain for example.com. Any URI you access on http://test.example.com/foo/bar.php will really be requesting http://example.com:8080/foo/bar.php.

> <VirtualHost test.example.com:80>
>     
> ProxyRequests Off
>            
> <Proxy *>
> Order deny,allow
> Allow from all
> </Proxy>
>     
> ProxyPass / http://example.com:8080/
> ProxyPassReverse / http://example.com:8080/
>     
> </VirtualHost>
### Step #3 - Set up secure version (optional)

To get the same sub-domain working over https, you will need to make sure you have your server listening to port 443. To do this, uncomment the following line.

> # Secure (SSL/TLS) connections
> #Include conf/extra/httpd-ssl.conf

Then add this virtual host entry in the same place as the last.

> <VirtualHost test.example.com:443>
>     
> ProxyRequests Off
>            
> <Proxy *>
> Order deny,allow
> Allow from all
> </Proxy>
>     
> ProxyPass / https://example.com:8080/
> ProxyPassReverse / https://example.com:8080/
>     
> </VirtualHost>
### Step #4 - Restart Apache, Complete

Restart apache and try accessing your new subdomain.

If all has gone well, I can access whatever script I may have running on 8080, over a network that will only accept normal web ports (80/443).

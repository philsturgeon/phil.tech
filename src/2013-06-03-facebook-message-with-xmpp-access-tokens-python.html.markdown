---
layout: post
title: Send a Facebook Message with XMPP using Access Tokens in Python
category: python
alias: blog/2013/06/facebook-message-with-xmpp-access-tokens-python/
excerpt: Today I had a real tough time trying to work out how the hell I could send
  a Facebook message to a user with Python. I knew I needed the "xmpp_login" scope
  and I already had users access tokens being generated through a dev build of the
  Kapture iPhone app, but working out what to do after that was rough. In the end
  I got there with some help from the SleekXMPP developer Lance Stout, who was nice
  and patient with a still relatively shakey Python developer.
date: '2013-06-03 20:01:00'
comments: true
disqus_identifier: facebook-message-with-xmpp-access-tokens-python
---

Today I had a real tough time trying to work out how the hell I could send a Facebook message to a user with Python. I knew I needed the "xmpp_login" scope and I already had users access tokens being generated through a dev build of the [Kapture](http://kaptu.re/) iPhone app, but working out what to do after that was rough.

The [Facebook documentation](https://developers.facebook.com/docs/chat/#platauth) covering this was about as detailed as the average IKEA instruction booklet and while there was sample code it was in PHP, and not directly transferable to Python.

Googling for answers didn't help at all and every single example I found was just showing off how to use username and password via the Digest MD5 mechanism, but I want to use an access token as I _never_ have the Facebook passwords. 

Documentation for the various Python XMPP libraries was either lacking detail or just [completely missing](http://stackoverflow.com/questions/16902171/send-a-facebook-message-with-xmpp-using-access-tokens-in-python), so I ended up just bugging [Lance Stout](http://twitter.com/lancestout) (developer of SleekXMPP) until he helped me get it all done via a 30 minute session of Pastie-Pong.

~~~ python
import sleekxmpp
import logging

logging.basicConfig(level=logging.DEBUG)

class SendMsgBot(sleekxmpp.ClientXMPP):
    """
    A basic SleekXMPP bot that will log in, send a message,
    and then log out.
    """
    def __init__(self, jid, recipient, message):
        
        sleekxmpp.ClientXMPP.__init__(self, jid, 'ignore')

        # The message we wish to send, and the JID that
        # will receive it.
        self.recipient = recipient
        self.msg = message

        # The session_start event will be triggered when
        # the bot establishes its connection with the server
        # and the XML streams are ready for use. We want to
        # listen for this event so that we we can initialize
        # our roster.
        self.add_event_handler("session_start", self.start, threaded=True)

    def start(self, event):

        self.send_presence()

        self.get_roster()

        self.send_message(mto=self.recipient,
                        mbody=self.msg,
                        mtype='chat')

        # Using wait=True ensures that the send queue will be
        # emptied before ending the session.
        self.disconnect(wait=True)
~~~

I shoved that in a file called fbxmpp.py, then in another file (your worker, your command line app, your Flask controller, whatever) you'll need something like the following:

~~~ python
from fbxmpp import SendMsgBot

# The "From" Facebook ID
jid = '511501255@chat.facebook.com'

# The "Recipient" Facebook ID, with a hyphen for some reason
to = '-1000023894758@chat.facebook.com'

# Whatever you're sending
msg = 'Hey Other Phil, how is it going?'

xmpp = SendMsgBot(jid, to, unicode(msg))

xmpp.credentials['api_key'] = '123456'
xmpp.credentials['access_token'] = 'your-access-token'

if xmpp.connect(('chat.facebook.com', 5222)):
    xmpp.process(block=True)
    print("Done")
else:
    print("Unable to connect.")
~~~

You can wrap all of that up much more neatly based on how it is being implemented, but this should help get you going.

---
title: HTTP/REST API File Uploads
date: 2016-01-04 05:52 EDT
tags: http, api, uploads
---

File uploads are one thing that always feel rather complicated, and working out how to handle this in an API doesn't make life easier. For many programmers, this has been abstracted away behind the HTTP standard, HTML and convenient features in languages like PHP, that populate a `$_FILES` array for us to play with. This is not really how it works for an API.

I have come across a few main approaches to uploading files:

1. Uploading a file with metadata, like an image with comments, categories, location, etc.
2. Uploading just a file by itself, like an avatar for an existing user
3. Uploading a file from a URL

To many folks number 1 sounds like a perfect time to use multipart forms, but they really are a mess, and do not make as much sense for 2 and 3. 

## Why Multipart Mostly Sucks

Making a multipart request looks a little like this:

~~~ http
POST /avatars HTTP/1.1
Host: localhost:3000
Authentication: Bearer some-token
Content-Type: multipart/form-data; boundary=MultipartBoundry
Accept-Encoding: gzip, deflate

--MultipartBoundry
Content-Disposition: form-data; name="image"; filename="12348024_1150631324960893_344096225642532672_n.jpg"
Content-Type: image/jpeg

rawimagecontentwhichlooksfunnyandgoesonforever.d.sf.d.f.sd.fsdkfjkslhfdkshfkjsdfdkfh
--MultipartBoundry
Content-Disposition: form-data; name="category"

123
--MultipartBoundry
Content-Disposition: form-data; name="location"

123,-50
--MultipartBoundry--
~~~

The fields are split up, as are the files, by the boundary separator. These requests can get pretty big with a fair number of fields, and it's not JSON. 

We can do JSON, but it's a bit gross:

~~~ http
POST /avatars HTTP/1.1
Host: localhost:3000
Authentication: Bearer some-token
Content-Type: multipart/form-data; boundary=MultipartBoundry
Accept-Encoding: gzip, deflate

--MultipartBoundry
Content-Disposition: form-data; name="image"; filename="12348024_1150631324960893_344096225642532672_n.jpg"
Content-Type: image/jpeg

rawimagecontentwhichlooksfunnyandgoesonforever.d.sf.d.f.sd.fsdkfjkslhfdkshfkjsdfdkfh
--MultipartBoundry
Content-Disposition: form-data; name="myJsonData"
Content-Type: application/json

{"category":123,"location":123,-50}
--MultipartBoundry--
~~~

Now, I know "a bit gross" is not a strong technical reason to do anything, but think about documenting this. Think about explaining to developers that you want to send JSON, not actual JSON but... some JSON in a string. Then think about how developers actually do that. The Postman HTTP client that I love to use has no option for that, and I'm not sure how many of my favourite gem/composer package HTTP clients can do it either.

Then there's all the mucking around with setting a boundary, the complexity of building out expected responses for your integration tests, and all sorts of other things I'd rather not think about. 

So, how do we do it if not multipart form uploads?

## Method A: Direct File Upload

Sending along JSON data and the image in one request is not always something that needs to happen. You can either split it into two requests, or you can just have the one request if you only need to infer a little bit of data from the request. 

For example, direct image upload works for uploading avatars for a user:

~~~ http
POST /avatars HTTP/1.1
Host: localhost:3000
Authentication: Bearer some-token
Content-Type: image/jpeg
Content-Length: 284

raw image content
~~~

We have an `/avatars` collection which is only avatars for that user, and the user is detected by checking `oauth2-access-token`. Between knowing the user, and being provided the `Content-Type` to let us know if it's a JPEG, Gif or PNG means we actually have all the connected data we need for this use-case, and the image itself is just sat in the HTTP body as raw data. Httparty in Ruby will for example take an instance of `File` as the payload, or you can send the string in PHP doing `file_get_contents('/path/to/file')` and send that.

From there it is trivially easy to fetch that body have a string of the image:

* PHP: `file_get_contents('php://input');`
* Ruby (Rack): `request.body`

With this string you can easily upload it to S3 or put it anywhere else you like, especially if you're using something excellent like [Flysystem](http://flysystem.thephpleague.com/).

The only thing worth mentioning on that request is the addition of `Content-Length`, which is basically the size of the image being uploaded. A quick check of `headers['Content-Length'].to_i > 3.megabytes` will let us quickly reply saying "This image is too large", which is better than waiting forever to say that. Sure, malicious folks could lie here, so your backend code will need to check the image size too. **Never trust input.**

`Content-Length` also lets you know if you've got all of the image or not. If there is a trouble and only some of the image is uploaded, then the size of the image you receive will not be the same as the content length. Check them, see how it goes.

The response here will have a simple body:

~~~ json
{
    "avatars":{
        "id": "1",
        "image_url": "http://localhost:3000/attachments/store/foo/avatar.jpg",
        "links": {
            "user": "1"
        }
    }
}
~~~

That `user` was inferred from the token, and the `image_url` is the resulting URL to the avatar that has been uploaded. Normally this would be a CDN URL of course, because you don't want your API responsible for handling asset downloads too. Probably. 

## Method B: Upload from URL

Uploading images directly in the HTTP body was something that worked well for the mobile teams at [Ride](https://ride.com/), but the web team didn't have as much fun with it. It's probably down to the business requirements we have. Basically, the mobile teams were uploading user avatar images directly from the photo libraries on the device, and the web teams were pulling avatars from Facebook or Twitter.

Even if we were doing things a little differently, there is no way for the web team to access the raw content of a full image using just browser-based JavaScript. They could probably do some madness to get it, but it seemed easier to just provide another option. The same endpoint, with the same logic behind it all, but add in support for a JSON payload: 

~~~
POST /avatars HTTP/1.1
Host: localhost:3000
Authentication: Bearer some-token
Content-Type: application/json

{
  "image_url" : "https://facebook.com/images/dfidsyfsudf.png"
}
~~~

That was literally all we needed to support externally to have it all work. Then internally I checked the content type, and either called a `read_from_string` method or a `read_from_url` method, which both do exactly what it says on the tin.

Then of course the response will be identical to Method 1: 

~~~ json
{
    "avatars":{
        "id": "2",
        "image_url": "http://localhost:3000/attachments/store/bar/avatar.png",
        "links": {
            "user": "1"
        }
    }
}
~~~

Supporting both might not be something you need to do, and you might start out only needing one. Definitely do not write API functionality that you do not need and will not use, but keep in mind that at some point somebody may want the other approach added in. HTTP makes that incredibly easy to do thanks to being able to switch `Content-Type`.

## What about Meta Data?

To go back to the list of different types of upload, you might have noticed we've not actually covered all three. 

1. Uploading a file with metadata, like an image with comments, categories, location, etc.
2. Uploading just a file by itself, like an avatar for an existing user
3. Uploading a file from a URL

"Direct file upload" and "upload from URL" cover 2 and 3, but the first point is still not covered. By now you might be thinking "Dude, multipart!" but there is another way. 

YouTube video uploads are incredibly quirky and poorly documented. They hide their HTTP interactions behind poorly built SDKs (especially the PHP one, it hurts to look at), but their API does something I really like.

Basically, the [Resumable Upload Option](https://developers.google.com/youtube/v3/guides/using_resumable_upload_protocol)

~~~ http
POST /upload/youtube/v3/videos?uploadType=resumable&part=snippet,status,contentDetails HTTP/1.1
Host: www.googleapis.com
Authorization: Bearer AUTH_TOKEN
Content-Length: 278
Content-Type: application/json; charset=UTF-8
X-Upload-Content-Length: 3000000
X-Upload-Content-Type: video/*

{
  "snippet": {
    "title": "My video title",
    "description": "This is a description of my video",
    "tags": ["cool", "video", "more keywords"],
    "categoryId": 22
  },
  "status": {
    "privacyStatus": "public",
    "embeddable": True,
    "license": "youtube"
  }
}
~~~

Here they upload all of the meta data for their video before sending it. This is another huge benefit over multipart, as this small and simple HTTP request has a much better chance of being successful first time than a request with a 1gb video in it. This small web request is likely to sneak through, and reduce the change of that title and description being lost, which is so so so annoying. 

Then, the HTTP response of the video contains a `Location` header with a URL to the video upload endpoint:

~~~ http
HTTP/1.1 200 OK
Location: https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&upload_id=xa298sd_f&part=snippet,status,contentDetails
Content-Length: 0
~~~

Then with this URL you're back to method 1: direct file uploads. With all of your meta data saved, all you have to do is fire the video at this URL:

~~~ http
PUT UPLOAD_URL HTTP/1.1
Authorization: Bearer AUTH_TOKEN
Content-Length: CONTENT_LENGTH
Content-Type: CONTENT_TYPE

BINARY_FILE_DATA
~~~

What's cool about this approach, is that URL _could_ be part of your main API, or it _could_ be a totally different service. It could be a direct-to-S3 URL, or some Go service, or anything. 

Larger companies will be more prone to building a service to handle such files coming in, whilst smaller teams might want to keep things simple and let their API do the heavy lifting. The larger the file, the more likely you'll want to split that off, as having your API handle these huge files - even if the uploads are chunked - will keep the HTTP workers busy. Maintaining those connections might slow down a Rails-based API for a long time, for example, so having another service would help there.

## Summary

I know thats a bit vague and fluffy, and doesn't give a single recommendation, but the point here is that you have some options.

Take a think about what sort of file uploads you need, how big the files are, where they're going and what sort of clients will be using your API. The YouTube approach is a bit complex, but a combination of 1 and 2 usually take care of the job, and stop you needing to work with multi-part uploads, which to me hardly solve the problem and make life unnecessarily complex for some developers.

---
layout: post
title: How to recover files in Eclipse
category: 
permalink: blog/2009/01/How-to-recover-files-in-Eclipse
excerpt: Accidentally deleted your working copy/local files and Ctrl + Z just won't
  get them back? Find out how to recover almost any file using Eclipse's built in
  history/version tracking feature.
date: '2009-01-13 09:23:00'
comments: 'true'
disqus_identifier: How-to-recover-files-in-Eclipse
---

I have just this minute recovered from a very foolish mistake. A corrupted working copy lead me to wipe my local files, resulting in the loss of several hours of very complicated work.   
  
  
Using a bit of common sense I managed to recover all of my files - all be it some 20 minute old versions - and get them back into my working copy.  
  
  
Step 1: Straight after deleting the files, you will notice that Eclipse still thinks they are there. The easiest way (but not always helpful) is to right click on the parent folder of the files and hit "Restore from Local History". This did not find the files I was looking for, but is worth checking.  
  
  
Step 2: Navigate to the file(s) you are looking for in the Navigator, right click and select Team > Show Local History.  
  
  
Step 3: Eclipse will show a list of revisions with date and time. Double-click the most recent revision before the delete, and you will be shown the file!  
  
  
Step 4: Save this file somewhere very safe, and repeat process for all the other files you need.  
  
  
When you are done just grab yourself a new working copy and copy your backed up files back to their original locations!  
  
  
This can be slightly laborious if you have been modifying several files, but in many cases it will be MUCH quicker than re-writing all of your code. 


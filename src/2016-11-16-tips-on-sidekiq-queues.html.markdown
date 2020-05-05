---
title: "Tips on Sidekiq Queues"
date: 2016-11-16 22:49 UTC
tags: sidekiq, ruby, rails, async
alias: 2016/11/16/sidekiqing-your-queue-in-the-nuts/
comments: true
---

Sidekiq is great. It's a really handy way to take slow stuff that your application is doing like uploading images or sending emails, and
get them out of the web request. Users don't want to sit around waiting for that stuff to happen most of the time, and if they do want to be alerted as to the success or failure of a job, there are other ways to achieve that than simply blocking the web request; returning a web socket to watch, polling, emails, etc.

As the Sidekiq usage grows, people start to split their work out from default. After all, deleting some file you marked as archived might not be as important as processing a credit card. So, folks make multiple queues.

There's a bit of a kicker to Sidekiq though, and it's a documented feature that a lot of folks completely overlook.

**Defining multiple queues in your Sidekiq config does not distribute work evenly between them.**

Take a look at this:

~~~ yaml
:queues:
  - archive
  - card_processing
  - email
~~~

This is not the same as:

~~~ yaml
:queues:
  - ["archive", 1]
  - ["card_processing", 1]
  - ["email", 1]
~~~

The first will complete all of the work in archive before it even starts looking at `card_processing`, and `email` will get sent only when the other work is complete. The second will distribute work evenly.

This is not news to many, and if you understand this then cool. Link it out for those that don't, and go enjoy a beverage.

For those that don't know, read on.

## WHOOOO SCIENCE!

Let's take a look at how the jobs from various queue configurations work. I made a simple fake worker called `PriorityTest`, and used the Sidekiq Delayed Execution test to allow passing queue on the caller side.

~~~ ruby
class PriorityTest
  def self.log(level, sleep_for = 3)
    msg = "priority-test: #{level} thing happened"
    Rails.logger.info(msg)
    puts msg
    sleep sleep_for
  end
end
~~~

Then, I used the following simple bit o' ruby to initiate proceedings from the rails console.

~~~ ruby
queues = [:foo, :bar, :baz, :nevergonnagiveyouup]
50.times do |i|
  queues.each do |level|
    PriorityTest.sidekiq_delay(queue: level).log("#{i}: #{level}")
  end
end
~~~

The jobs were queued up in a few seconds, and network latency was not a thing as redis and rails are all running locally.

I also used a concurrency of 5, as testing things with concurrency set to 1 (only ever likely to happen in development) will give useless results. There's no point betting on which horse runs faster if you've cut all their legs off.

### Accidental Importance

Here are multiple queues. This represents an unwitting engineer accidentally implying importance in their queues with the order. They probably just split the queues out for convenience, logging, monitoring, etc.

~~~ yaml
# config/sidekiq-accidental-importance.yml
:concurrency: 5
:queues:
  - foo
  - bar
  - baz
  - nevergonnagiveyouup
~~~

~~~ shell
bundle exec sidekiq -C ./config/sidekiq-accidental-importance.yml -l log/sidekiq.log
~~~

~~~ ruby
queues = [:foo, :bar, :baz, :nevergonnagiveyouup]
~~~

**Output:**

~~~
0: bar
0: foo
0: baz
0: nevergonnagiveyouup
1: foo
3: foo
5: foo
6: foo
2: foo
4: foo
8: foo
9: foo
7: foo
10: foo
11: foo
13: foo
12: foo
14: foo
15: foo
16: foo
17: foo
19: foo
21: foo
20: foo
18: foo
22: foo
24: foo
26: foo
23: foo
25: foo
27: foo
28: foo
29: foo
30: foo
31: foo
32: foo
35: foo
36: foo
33: foo
34: foo
37: foo
39: foo
41: foo
38: foo
40: foo
42: foo
45: foo
43: foo
44: foo
46: foo
47: foo
2: bar
48: foo
49: foo
1: bar
3: bar
6: bar
4: bar
5: bar
7: bar
8: bar
9: bar
10: bar
11: bar
12: bar
13: bar
14: bar
16: bar
15: bar
17: bar
18: bar
19: bar
20: bar
21: bar
22: bar
23: bar
25: bar
26: bar
24: bar
27: bar
28: bar
29: bar
30: bar
31: bar
32: bar
33: bar
34: bar
35: bar
36: bar
37: bar
38: bar
41: bar
42: bar
40: bar
39: bar
43: bar
44: bar
46: bar
45: bar
47: bar
48: bar
1: baz
2: baz
49: bar
3: baz
4: baz
7: baz
5: baz
8: baz
6: baz
9: baz
10: baz
12: baz
11: baz
13: baz
14: baz
15: baz
16: baz
18: baz
17: baz
19: baz
20: baz
22: baz
23: baz
21: baz
24: baz
25: baz
26: baz
28: baz
27: baz
29: baz
30: baz
31: baz
33: baz
32: baz
34: baz
35: baz
37: baz
38: baz
36: baz
39: baz
40: baz
43: baz
42: baz
41: baz
44: baz
45: baz
46: baz
47: baz
48: baz
49: baz
1: nevergonnagiveyouup
2: nevergonnagiveyouup
3: nevergonnagiveyouup
4: nevergonnagiveyouup
5: nevergonnagiveyouup
6: nevergonnagiveyouup
7: nevergonnagiveyouup
9: nevergonnagiveyouup
8: nevergonnagiveyouup
10: nevergonnagiveyouup
11: nevergonnagiveyouup
12: nevergonnagiveyouup
13: nevergonnagiveyouup
14: nevergonnagiveyouup
15: nevergonnagiveyouup
16: nevergonnagiveyouup
18: nevergonnagiveyouup
17: nevergonnagiveyouup
19: nevergonnagiveyouup
20: nevergonnagiveyouup
21: nevergonnagiveyouup
23: nevergonnagiveyouup
24: nevergonnagiveyouup
22: nevergonnagiveyouup
25: nevergonnagiveyouup
26: nevergonnagiveyouup
27: nevergonnagiveyouup
28: nevergonnagiveyouup
29: nevergonnagiveyouup
30: nevergonnagiveyouup
31: nevergonnagiveyouup
33: nevergonnagiveyouup
34: nevergonnagiveyouup
32: nevergonnagiveyouup
35: nevergonnagiveyouup
36: nevergonnagiveyouup
37: nevergonnagiveyouup
38: nevergonnagiveyouup
39: nevergonnagiveyouup
40: nevergonnagiveyouup
41: nevergonnagiveyouup
43: nevergonnagiveyouup
44: nevergonnagiveyouup
42: nevergonnagiveyouup
45: nevergonnagiveyouup
46: nevergonnagiveyouup
48: nevergonnagiveyouup
47: nevergonnagiveyouup
49: nevergonnagiveyouup
~~~

Well shit. Only one Rick Roll was sent until the system was completely done doing anything else. That might not be a bad thing, but if that last queue was sending emails or credit card processing, you might be in a lot of trouble. That first nevergonnagiveyouup was only done because the first round had jobs being picked up as soon as they were put down, but once the queues had more than one thing each it was foo all the way.

What's worse, is that this test does not represent a real-life scenario accurately. In a real system, especially one with 24-hour usage, there may well be a constant stream of work. That means if jobs are coming in regularly and taking a little while, those lower jobs are just never going to happen.

### Elistism!

This one is intentional importance, in order from fancy pants 1% critical jobs, to lowly working class jobs at the bottom.

~~~ yaml
# config/sidekiq-elitism.yml
:queues:
  - critical
  - high
  - default
  - low
~~~

This seems like a good idea, until you look at the output.

~~~ shell
bundle exec sidekiq -C ./config/sidekiq-elitism.yml -l log/sidekiq.log
~~~

~~~ ruby
queues = [:low, :critical, :default, :high]
~~~

**Output:**

~~~
0: critical
0: low
0: default
0: high
1: low
3: critical
4: critical
5: critical
2: critical
1: critical
6: critical
7: critical
8: critical
9: critical
10: critical
11: critical
13: critical
12: critical
14: critical
15: critical
16: critical
18: critical
19: critical
17: critical
20: critical
21: critical
23: critical
22: critical
25: critical
24: critical
26: critical
29: critical
28: critical
27: critical
30: critical
31: critical
32: critical
33: critical
34: critical
35: critical
36: critical
38: critical
39: critical
37: critical
40: critical
41: critical
44: critical
43: critical
45: critical
42: critical
46: critical
47: critical
48: critical
49: critical
1: high
2: high
3: high
5: high
4: high
6: high
7: high
8: high
9: high
10: high
11: high
12: high
14: high
15: high
13: high
16: high
17: high
18: high
19: high
20: high
21: high
22: high
23: high
25: high
26: high
24: high
27: high
28: high
29: high
30: high
31: high
32: high
33: high
35: high
36: high
34: high
37: high
38: high
39: high
40: high
41: high
42: high
43: high
45: high
46: high
44: high
47: high
48: high
2: default
49: high
1: default
3: default
4: default
6: default
5: default
7: default
8: default
9: default
11: default
12: default
10: default
13: default
14: default
16: default
17: default
15: default
18: default
19: default
22: default
21: default
20: default
23: default
24: default
26: default
27: default
25: default
28: default
29: default
30: default
31: default
32: default
33: default
34: default
35: default
36: default
37: default
38: default
39: default
40: default
42: default
41: default
43: default
44: default
45: default
47: default
46: default
48: default
49: default
2: low
4: low
3: low
5: low
6: low
7: low
8: low
9: low
10: low
11: low
12: low
14: low
13: low
15: low
16: low
17: low
19: low
18: low
20: low
21: low
22: low
24: low
23: low
25: low
26: low
27: low
29: low
28: low
31: low
32: low
30: low
34: low
33: low
35: low
36: low
37: low
38: low
39: low
40: low
41: low
42: low
44: low
43: low
46: low
47: low
48: low
45: low
49: low
~~~

Again, other than the first 5 items being fairly spread (there are 5 Sidekiq threads), the rest of the jobs are clearly processed in order. Even though the input of the jobs were relatively even, the low jobs are all being entirely ignored until all other critical jobs are complete!

In a system where there are more critical, high or default jobs in the queue at any given time than there are worker threads running, those low jobs will never get run. You might think this sounds ok, but low priority probably should not mean "Under relatively light usage, this thing will never happen."

### Reasonable Approach

Let's try and be a bit more fair with out spread here.

~~~ yaml
# config/sidekiq-reasonable.yml
:concurrency: 5
:queues:
  - ["critical", 6]
  - ["high", 4]
  - ["default", 2]
  - ["low", 1]
~~~

~~~ ruby
queues = [:low, :critical, :default, :high]
~~~

~~~ shell
bundle exec sidekiq -C ./config/sidekiq-reasonable.yml -l log/sidekiq.log
~~~

**Output:**

~~~
0: low
0: critical
0: default
0: high
1: low
1: default
2: default
3: default
1: high
1: critical
2: high
3: high
5: high
4: high
2: low
2: critical
3: critical
4: default
4: critical
5: critical
6: critical
5: default
7: critical
6: default
8: critical
6: high
9: critical
10: critical
11: critical
7: default
12: critical
7: high
3: low
9: default
8: default
13: critical
10: default
14: critical
11: default
8: high
12: default
9: high
15: critical
13: default
4: low
10: high
5: low
16: critical
17: critical
18: critical
19: critical
20: critical
21: critical
22: critical
11: high
14: default
24: critical
23: critical
26: critical
25: critical
12: high
15: default
6: low
13: high
27: critical
28: critical
30: critical
14: high
29: critical
7: low
15: high
8: low
16: default
16: high
31: critical
17: default
18: default
17: high
32: critical
33: critical
9: low
19: default
34: critical
35: critical
10: low
36: critical
38: critical
37: critical
20: default
39: critical
40: critical
19: high
21: default
18: high
22: default
41: critical
20: high
44: critical
42: critical
43: critical
45: critical
46: critical
23: default
22: high
21: high
47: critical
49: critical
48: critical
24: default
11: low
23: high
24: high
25: default
25: high
12: low
26: high
13: low
14: low
27: high
26: default
15: low
28: high
29: high
30: high
27: default
31: high
33: high
34: high
32: high
28: default
29: default
35: high
36: high
30: default
31: default
16: low
32: default
33: default
37: high
38: high
39: high
40: high
41: high
34: default
17: low
42: high
35: default
43: high
44: high
18: low
36: default
45: high
37: default
46: high
47: high
48: high
19: low
38: default
39: default
49: high
20: low
41: default
40: default
42: default
21: low
22: low
43: default
44: default
23: low
24: low
45: default
25: low
47: default
46: default
48: default
49: default
26: low
27: low
28: low
28: low
28: low
28: low
28: low
28: low
29: low
30: low
31: low
32: low
33: low
34: low
35: low
36: low
37: low
38: low
39: low
40: low
41: low
42: low
43: low
44: low
45: low
46: low
47: low
48: low
49: low
~~~

Tadaaaaa! Critical jobs were clearly getting the most attention, with high getting much more than default and low. Basically, Critical is 6 times more likely to get checked, high is 4 times more likely, and default is twice as likely to run as low. If you wanna start counting things, you should generally not get too far above 6 before seeing a low, and critical is clearly dominating the workload even though its not the only work getting done.

## Summary

The last option is probably what you want.

I had a play getting "rush lanes" to work:

~~~ yaml
# config/sidekiq-reasonable.yml
:concurrency: 5
:queues:
  - critical
  - ["high", 4]
  - ["default", 2]
  - ["low", 1]
~~~

Output on that was whack. Fuck knows what that's doing, but it definitely doesn't do what I hoped.

You should measure your queues to see that the latency is what you want. Throw items into critical, high, default and low, and make sure each one is monitored.

A cron job that runs every few minutes, or a simple endpoint exposing a yes/no, on the following is probably all you need:

~~~ ruby
# Check the latency is under thirty seconds
Sidekiq::Queue.new.latency < 30
~~~

Maybe check that critical queues are under 30, high is under 5 minutes, default is less than 10, and low is less than who cares. If the values are not where you want them, fire out a PagerDuty, and hope your on call devops person is sober.

These numbers are all relatively arbitrary and should absolutely be tested and tweaked, but make sure you're thinking about them instead of just assuming sidekiq knows what you want it to do straight out of the box.

#!/usr/bin/env ruby

require 'fileutils'
require 'json'
require 'date'
require 'yaml'
require 'sanitize'
require 'reverse_markdown'

FileUtils.mkdir_p("_posts")
FileUtils.mkdir_p("_drafts")

posts = JSON.parse File.read(ARGV.pop), symbolize_names: true

categories = {
  "1" => "personal",
  "2" => "php",
  "3" => "codeigniter",
  "11" => "pyrocms",
  "12" => "linux",
  "13" => "git",
  "19" => "rails",
  "20" => "fuelphp",
  "21" => "devops",
  "22" => "ruby",
  "23" => "python",
  "31" => "rest",
}

posts.each do |post|
  date = DateTime.parse(post[:created]) if post[:created]
  slug = post[:slug]

  front_matter_hash = {
    'layout' => "post",
    'title'  => post[:title],
    'category' => categories[post[:category_id]],
    'permalink' => "blog/#{date.strftime('%Y/%m')}/#{slug}",
    'excerpt' => Sanitize.clean(post[:intro]),
    'date' => date.strftime('%Y-%m-%d %H:%M:%S'),
    'comments' => true,
    'disqus_identifier' => post[:slug],
  }

  blog_body = post[:type] == 'markdown' ? post[:body] : ReverseMarkdown.convert(post[:body])

  blog_body.gsub!('http://philsturgeon.uk/', '/')
  blog_body.gsub!('https://philsturgeon.uk/', '/')
  blog_body.gsub!('/uploads/default/files/', 'https://s3.amazonaws.com/philsturgeon-blog/')
  blog_body.gsub!('{{ prism:syntax lang="php" }}', '{% highlight php %}')
  blog_body.gsub!('{{ prism:syntax lang="php }}', '{% highlight php %}')
  blog_body.gsub!('{{ prism:syntax lang="ruby" }}', '{% highlight ruby %}')
  blog_body.gsub!('{{ prism:syntax lang="bash" }}', '{% highlight console %}')
  blog_body.gsub!('{{ prism:syntax lang="json" }}', '{% highlight javascript %}')
  blog_body.gsub!('{{ prism:syntax lang="python" }}', '{% highlight python %}')
  blog_body.gsub!('{{ prism:syntax lang="none" }}', '{% highlight javascript %}')
  blog_body.gsub!('{{ /prism:syntax }}', '{% endhighlight %}')

  body = front_matter_hash.to_yaml + "---\n\n" + blog_body
  draft = post[:status] == 'draft'
  basename = if draft
               "#{ slug }.markdown"
             else
               "#{ date.strftime('%Y-%m-%d') }-#{ slug }.markdown"
             end
  folder = draft ? '_drafts' : '_posts'
  filename = File.join folder, basename
  puts "Importing filename..."
  File.write filename, body
end
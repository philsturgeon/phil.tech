import React from 'react';
import { Helmet } from 'react-helmet';

import config from '../website-config';

export interface SeoProps {
  post: any;
  width: any;
  height: any;
  pathContext: any;
}

export const Seo: React.FC<SeoProps> = ({post, width, height, pathContext}) => {
  console.log("PROPS: ", post, width, height, pathContext, post.frontmatter.author);
  
  return(
    <Helmet>
      <html lang={config.lang} />
      <title>{post.frontmatter.title}</title>

      <meta name="description" content={post.excerpt || post.frontmatter.description} />
      <meta property="og:site_name" content={config.title} />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={post.frontmatter.title} />
      <meta property="og:description" content={post.excerpt || post.frontmatter.description} />
      <meta property="og:url" content={config.siteUrl + pathContext.slug} />
      {/* TODO: should this have a / in front? */}
      {post.frontmatter.image && post.frontmatter.image.childImageSharp && (
        <meta
          property="og:image"
          content={`${config.siteUrl}${post.frontmatter.image.childImageSharp.fluid.src}`}
        />
      )}
      <meta property="article:published_time" content={post.frontmatter.date} />
      {post.frontmatter.tags && (
        <meta property="article:tag" content={post.frontmatter.tags[0]} />
      )}

      {config.facebook && <meta property="article:publisher" content={config.facebook} />}
      {config.facebook && <meta property="article:author" content={config.facebook} />}
      <meta name="twitter:card" content={post.frontmatter.image? "summary_large_image":"summary"} />
      <meta name="twitter:title" content={post.frontmatter.title} />
      <meta name="twitter:description" content={post.excerpt} />
      <meta name="twitter:url" content={config.siteUrl + pathContext.slug} />
      {post.frontmatter.image && post.frontmatter.image.childImageSharp && (
        <meta
          name="twitter:image"
          content={`${config.siteUrl}${post.frontmatter.image.childImageSharp.fluid.src}`}
        />
      )}
      {post.frontmatter.author && <meta name="twitter:label1" content="Written by" />}
      {post.frontmatter.author && <meta name="twitter:data1" content={post.frontmatter.author[0].id} />}
      {post.frontmatter.tags && <meta name="twitter:label2" content="Filed under" />}
      {post.frontmatter.tags && <meta name="twitter:data2" content={post.frontmatter.tags[0]} />}
      {config.twitter && (
        <meta
          name="twitter:site"
          content={`@${config.twitter.split('https://twitter.com/')[1]}`}
        />
      )}
      {config.twitter && (
        <meta
          name="twitter:creator"
          content={`@${config.twitter.split('https://twitter.com/')[1]}`}
        />
      )}
      {width && <meta property="og:image:width" content={width} />}
      {height && <meta property="og:image:height" content={height} />}
    </Helmet>
  )
};

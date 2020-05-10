import React from 'react';
import { Helmet } from 'react-helmet';

import config from '../website-config';
import { PageContext } from '../templates/post';

export interface SeoProps {
  post: PageContext;
  width: string;
  height: string;
  pathContext: {
    slug: string;
  };
  title: string;
  description: string;
  path: string;
}

export const Seo: React.FC<SeoProps> = ({post, width, height, pathContext, title, description, path}) => {
  const urlPath = pathContext? pathContext.slug : path;
  
  return(
    <Helmet>
      <html lang={config.lang} />
      <title>{title || post.frontmatter.title}</title>

      <meta name="description" content={description || post.excerpt || post.frontmatter.description} />
      <meta property="og:site_name" content={config.title} />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={title || post.frontmatter.title} />
      <meta property="og:description" content={description || post.excerpt || post.frontmatter.description} />
      <meta property="og:url" content={config.siteUrl + urlPath} />
      {post && post.frontmatter.image && post.frontmatter.image.childImageSharp && (
        <meta
          property="og:image"
          content={`${config.siteUrl}${post.frontmatter.image.childImageSharp.fluid.src}`}
        />
      )}
      {post && <meta property="article:published_time" content={post.frontmatter.date} />}
      {post && post.frontmatter.tags && (
        <meta property="article:tag" content={post.frontmatter.tags[0]} />
      )}

      {config.facebook && <meta property="article:publisher" content={config.facebook} />}
      {config.facebook && <meta property="article:author" content={config.facebook} />}
      <meta name="twitter:card" content={post && post.frontmatter.image? "summary_large_image":"summary"} />
      <meta name="twitter:title" content={title || post.frontmatter.title} />
      <meta name="twitter:description" content={description || post.excerpt || post.frontmatter.description} />
      <meta name="twitter:url" content={config.siteUrl + urlPath} />
      {post && post.frontmatter.image && post.frontmatter.image.childImageSharp && (
        <meta
          name="twitter:image"
          content={`${config.siteUrl}${post.frontmatter.image.childImageSharp.fluid.src}`}
        />
      )}
      {post && post.frontmatter.author && <meta name="twitter:label1" content="Written by" />}
      {post && post.frontmatter.author && <meta name="twitter:data1" content={post.frontmatter.author[0].id} />}
      {post && post.frontmatter.tags && <meta name="twitter:label2" content="Filed under" />}
      {post && post.frontmatter.tags && <meta name="twitter:data2" content={post.frontmatter.tags[0]} />}
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

import { graphql } from 'gatsby';
import React from 'react';

import { css } from '@emotion/react';
import { getImage } from "gatsby-plugin-image"
import { convertToBgImage } from "gbimage-bridge"
import BackgroundImage from 'gatsby-background-image'

import { Seo } from '../components/Seo';
import { Footer } from '../components/Footer';
import SiteNav from '../components/header/SiteNav';
import Pagination from '../components/Pagination';
import { PostCard } from '../components/PostCard';
import { Wrapper } from '../components/Wrapper';
import IndexLayout from '../layouts';
import {
  inner,
  outer,
  PostFeed,
  Posts,
  SiteDescription,
  SiteHeader,
  SiteHeaderContent,
  SiteMain,
  SiteTitle,
  SiteHeaderStyles,
} from '../styles/shared';
import config from '../website-config';
import { PageContext } from './post';

export interface IndexProps {
  pageContext: {
    currentPage: number;
    numPages: number;
  };
  data: {
    logo: {
      childImageSharp: any;
    };
    header: {
      childImageSharp: any;
    };
    allMarkdownRemark: {
      edges: Array<{
        node: PageContext;
      }>;
    };
  };
}

const IndexPage: React.FC<IndexProps> = props => {
  const featuredPosts = props.data.allMarkdownRemark.edges.filter(edge => edge.node.frontmatter.featured);
  const allPosts = props.data.allMarkdownRemark.edges.filter(edge => !edge.node.frontmatter.featured);

  const headerImage = getImage(props.data.header.childImageSharp.gatsbyImageData);
  const bgImage = convertToBgImage(headerImage);

  return (
    <IndexLayout>
      <Seo
        description={config.description}
        title={config.title}
        path={props.path}
        image={props.data.header.childImageSharp.gatsbyImageData}
      />
      <Wrapper>
        <BackgroundImage
          css={[outer, SiteHeader, SiteHeaderStyles]}
          className="site-header-background"
          Tag="section"
          {...bgImage}
          preserveStackingContext
        >
          <div css={inner}>
            <SiteNav isHome />
            <SiteHeaderContent className="site-header-content">
              <SiteTitle className="site-title">
                {config.title}
              </SiteTitle>
            </SiteHeaderContent>
          </div>
        </BackgroundImage>

        <SiteDescription css={outer}>
          <div css={inner}>
            <h2>{config.description}</h2>
          </div>
        </SiteDescription>
        <main id="site-main" css={[SiteMain, outer]}>
          <div css={[inner, Posts]}>
            {featuredPosts.length > 0 && <h3 css={HomeSubtitles}>Featured Posts</h3>}
            <div css={[PostFeed]}>
              {featuredPosts.map((post, index) => {
                // filter out drafts in production
                return (
                  (post.node.frontmatter.draft !== true ||
                    process.env.NODE_ENV !== 'production') && (
                    <PostCard key={post.node.fields.slug} post={post.node} large={true} />
                  )
                );
              })}
            </div>
            <h3 css={HomeSubtitles}>All Posts</h3>
            <div css={[PostFeed]}>
              {allPosts.map((post, index) => {
                // filter out drafts in production
                return (
                  (post.node.frontmatter.draft !== true ||
                    process.env.NODE_ENV !== 'production') && (
                    <PostCard key={post.node.fields.slug} post={post.node} />
                  )
                );
              })}
            </div>
          </div>
        </main>
        {props.children}
        {props.pageContext.numPages > 1 && (
          <Pagination
            currentPage={props.pageContext.currentPage}
            numPages={props.pageContext.numPages}
          />
        )}
        <Footer />
      </Wrapper>
    </IndexLayout>
  );
};

export const pageQuery = graphql`
  query blogPageQuery($skip: Int!, $limit: Int!) {
    header: file(relativePath: { eq: "img/cover.jpg" }) {
      childImageSharp {
        fluid(quality: 100, maxWidth: 1720) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { draft: { ne: true }, layout: {eq: "post"} } }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          timeToRead
          frontmatter {
            title
            date
            tags
            draft
            excerpt
            featured
            image {
              childImageSharp {
                gatsbyImageData(
                  width: 3720
                  placeholder: BLURRED
                  formats: [AUTO, WEBP, AVIF]
                )
              }
            }
            author {
              id
              bio
              avatar {
                children {
                  ... on ImageSharp {
                    gatsbyImageData(layout: CONSTRAINED, breakpoints: [40, 80, 120])
                  }
                }
              }
            }
          }
          excerpt
          fields {
            layout
            slug
          }
        }
      }
    }
  }
`;

const HomeSubtitles = css`
  font-weight: 600;
`;

export default IndexPage;

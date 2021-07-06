import { graphql } from 'gatsby';
import { FixedObject, FluidObject } from 'gatsby-plugin-image';
import React from 'react';

import { css } from '@emotion/react';
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
      childImageSharp: {
        fixed: FixedObject;
      };
    };
    header: {
      childImageSharp: {
        fluid: FluidObject;
      };
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

  return (
    <IndexLayout>
      <Seo
        description={config.description}
        title={config.title}
        path={props.path}
        image={`${props.data.header.childImageSharp.fluid.src}`}
      />
      <Wrapper>
        <BackgroundImage
          css={[outer, SiteHeader, SiteHeaderStyles]}
          className="site-header-background"
          fluid={props.data.header.childImageSharp.fluid}
        >
          <div css={inner}>
            <SiteNav isHome />
            <SiteHeaderContent className="site-header-content">
              <SiteTitle className="site-title">
                {props.data.logo ? (
                  <img
                    style={{ maxHeight: '55px' }}
                    src={props.data.logo.childImageSharp.fixed.src}
                    alt={config.title}
                  />
                ) : (
                  config.title
                )}
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
    logo: file(relativePath: { eq: "img/ghost-logo.png" }) {
      childImageSharp {
        # Specify the image processing specifications right in the query.
        # Makes it trivial to update as your page's design changes.
        fixed {
          ...GatsbyImageSharpFixed
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
                fluid(maxWidth: 3720) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            author {
              id
              bio
              avatar {
                children {
                  ... on ImageSharp {
                    fluid(quality: 100, srcSetBreakpoints: [40, 80, 120]) {
                      ...GatsbyImageSharpFluid
                    }
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

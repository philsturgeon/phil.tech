import { graphql } from 'gatsby';
import * as _ from 'lodash';
import { setLightness } from 'polished';
import React from 'react';

import { css } from '@emotion/core';
import styled from '@emotion/styled';

import { Footer } from '../components/Footer';
import { Seo } from '../components/Seo';
import SiteNav, { SiteNavMain } from '../components/header/SiteNav';
import PostContent from '../components/PostContent';
import { Wrapper } from '../components/Wrapper';
import IndexLayout from '../layouts';
import { colors } from '../styles/colors';
import { inner, outer, SiteMain } from '../styles/shared';


interface PageTemplateProps {
  pathContext: {
    slug: string;
  };
  data: {
    markdownRemark: {
      html: string;
      htmlAst: any;
      frontmatter: {
        date: string;
        description: string;
        title: string;
      };
    };
  };
}

const PageTemplate: React.FC<PageTemplateProps> = props => {
  const page = props.data.markdownRemark;

  return (
    <IndexLayout className="page-template">
      <Seo
        post={page}
        pathContext={props.pathContext}
      />
      <Wrapper css={PageTemplateStyles}>
        <header className="site-header">
          <div css={[outer, SiteNavMain]}>
            <div css={inner}>
              <SiteNav isPost post={page.frontmatter} />
            </div>
          </div>
        </header>
        <main id="site-main" className="site-main" css={[SiteMain, outer]}>
          <div css={inner}>
            <article css={[PageFull]}>
              <PageFullHeader className="post-full-header">
                <PageFullTitle className="post-full-title">{page.frontmatter.title}</PageFullTitle>
              </PageFullHeader>

              <PostContent htmlAst={page.htmlAst} />
            </article>
          </div>
        </main>
        <Footer />
      </Wrapper>
    </IndexLayout>
  );
};

const PageTemplateStyles = css`
  .site-main {
    margin-top: 64px;
    padding-bottom: 4vw;
  }

  @media (prefers-color-scheme: dark) {
    .site-main {
      background: ${colors.darkmode};
    }
  }
`;

export const PageFull = css`
  position: relative;
  z-index: 50;
`;

export const NoImage = css`
  .post-full-content {
    padding-top: 0;
  }

  .post-full-content:before,
  .post-full-content:after {
    display: none;
  }
`;

export const PageFullHeader = styled.header`
  position: relative;
  margin: 0 auto;
  padding: 70px 150px 40px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;

  @media (max-width: 1170px) {
    padding: 60px 11vw 50px;
  }

  @media (max-width: 800px) {
    padding-right: 5vw;
    padding-left: 5vw;
  }

  @media (max-width: 500px) {
    padding: 20px 0 35px;
  }
`;

export const PageFullTitle = styled.h1`
  margin: 0 0 0.2em;
  color: ${setLightness('0.05', colors.darkgrey)};
  @media (max-width: 500px) {
    margin-top: 0.2em;
    font-size: 3.3rem;
  }

  @media (prefers-color-scheme: dark) {
    color: rgba(255, 255, 255, 0.9);
  }
`;

export const query = graphql`
  query($slug: String) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      htmlAst
      frontmatter {
        author {
          id
        }
        date
        description
        title
      }
    }
  }
`;

export default PageTemplate;
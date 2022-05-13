import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { outer, inner } from '../styles/shared';
import config from '../website-config';

export const Footer: React.FC = () => {
  return (
    <footer css={[outer, SiteFooter]}>
      <div css={[inner, SiteFooterContent]}>
        <SiteFooterNav>
          <a href="https://protect.earth/" target="_blank" rel="noopener noreferrer">🌍 Protect Earth</a>
          <a href="https://apisyouwonthate.com/" target="_blank" rel="noopener noreferrer">🛠️ APIs You Won't Hate</a>
          <a href="https://phil.bike/" target="_blank" rel="noopener noreferrer">🚵‍♂️ Bike Nomading</a>
          <a href={config.ecologi} target="_blank" rel="noopener noreferrer">🌲 Buy me a tree</a>
        </SiteFooterNav>
        <SiteFooterNav>
          {config.twitter && (
            <a href={config.twitter} target="_blank" rel="noopener noreferrer">
              Twitter
            </a>
          )}
          {config.github && (
            <a href={config.github} target="_blank" rel="noopener noreferrer">
              Github
            </a>
          )}
          <a href="/rss.xml">RSS</a>
        </SiteFooterNav>
        {/* <section className="copyright">
          <Link to="/">{config.title}</Link> &copy; {new Date().getFullYear()}{' '}
        </section> */}
      </div>
    </footer>
  );
};

const SiteFooter = css`
  position: relative;
  padding-top: 25px;
  padding-bottom: 25px;
  background: #536878;
`;

const SiteFooterContent = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.4rem;
  a {
    color: rgba(255, 255, 255, 0.7);
  }
  a:hover {
    color: rgba(255, 255, 255, 1);
    text-decoration: none;
  }
`;

const SiteFooterNav = styled.nav`
  display: flex;

  a, span {
    position: relative;
    margin-left: 20px;
  }

  a:before, span:before {
    content: '';
    position: absolute;
    top: 11px;
    left: -11px;
    display: block;
    width: 2px;
    height: 2px;
    background: #fff;
    border-radius: 100%;
  }

  a:first-of-type {
    margin-left: 0px;

    &:before {
      display: none;
    }
  }

  @media (max-width: 650px) {
    a:first-of-type {
      margin-left: 0;
    }

    display: block;

    a, span {
      display: block;
      margin-left: 0;
    }

    a:before, span:before {
      content: none;
    }
  }
`;

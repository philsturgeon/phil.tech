import { lighten } from 'polished';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { colors } from './colors';

export const outer = css`
  position: relative;
  padding: 0 5vw;
`;

// Centered content container blocks
export const inner = css`
  margin: 0 auto;
  max-width: 1040px;
  width: 100%;
`;

export const SiteNavMain = css`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1000;
  background: ${lighten('-0.05', colors.darkgrey)};
`;

export const SiteMain = css`
  z-index: 100;
  flex-grow: 1;

  @media (prefers-color-scheme: dark) {
    background: ${colors.darkmode};
  }
`;

export const SiteTitle = styled.h1`
  z-index: 10;
  margin: 0 0px 0 -2px;
  padding: 0;
  font-size: 5rem;
  line-height: 1em;
  font-weight: 600;
  text-transform: capitalize;

  @media (max-width: 500px) {
    font-size: 4.2rem;
  }
`;

export const SiteDescription = styled.div`

  h2 {
    width: 76%;
    font-weight: 500;
    line-height: 1.4em;
  }

  @media (max-width: 500px) {
    font-size: 1.8rem;

    h2 {
      width: 100%;
    }
  }
`;

export const Posts = css`
  overflow-x: hidden;
`;

export const PostFeed = css`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  margin: 0 -20px;
  background: #fff;

  /* Special Template Styles */
  padding: 0px 0 3vw;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;

  @media (prefers-color-scheme: dark) {
    background: ${colors.darkmode};
  }
`;

export const SocialLink = css`
  display: inline-block;
  margin: 0;
  padding: 10px;
  opacity: 0.8;

  :hover {
    opacity: 1;
    text-decoration: none;
  }

  &.emoji {
    color: transparent;
    text-shadow: 0 0 0 #fff;
  }

  svg {
    height: 1.8rem;
    fill: #fff;
  }
`;

export const SocialLinkFb = css`
  svg {
    height: 1.6rem;
  }
`;

export const SiteHeader = css``;

export const SiteHeaderContent = styled.div`
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  max-height: 340px;
`;

export const SiteHeaderStyles = css`
  position: relative;
  color: #fff;
  background: ${lighten('-0.05', colors.darkgrey)} no-repeat center center;
  background-size: cover;

  :before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 10;
    display: block;
    background: rgba(0, 0, 0, 0.18);
  }
  :after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: auto;
    left: 0;
    z-index: 10;
    display: block;
    height: 140px;
    background: linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0));
  }

  @media (prefers-color-scheme: dark) {
    :before {
      background: rgba(0, 0, 0, 0.6);
    }
  }
`;

export const AuthorProfileImage = css`
  flex: 0 0 60px;
  margin: 0;
  width: 60px;
  height: 60px;
  border: none;

  @media (prefers-color-scheme: dark) {
    box-shadow: 0 0 0 6px hsla(0, 0%, 100%, 0.04);
    background: ${colors.darkmode};
  }
`;

// tag and author post lists
export const SiteArchiveHeader = css`
  .site-header-content {
    position: relative;
    align-items: stretch;
    padding: 12vw 0 20px;
    min-height: 200px;
    max-height: 600px;
  }
`;

export const NoImage = css`
  .no-image {
    color: ${colors.darkgrey};
    background: #fff;
    opacity: 1;
  }

  .no-image .site-description {
    color: ${colors.midgrey};
    opacity: 1;
  }

  .no-image .site-header-content {
    padding: 5vw 0 10px;
    /* border-bottom: 1px solid color(var(--lightgrey) l(+12%)); */
    border-bottom: 1px solid ${lighten('0.12', colors.lightgrey)};
  }

  .no-image .author-bio {
    /* color: var(--midgrey); */
    color: ${colors.midgrey};
    opacity: 1;
  }

  .no-image .author-meta {
    /* color: var(--midgrey); */
    color: ${colors.midgrey};
    opacity: 1;
  }

  .no-image .author-social-link a {
    /* color: var(--darkgrey); */
    color: ${colors.darkgrey};
  }

  .no-image .author-social-link a:before {
    /* color: var(--midgrey); */
    color: ${colors.midgrey};
  }

  .no-image .author-location + .author-stats:before,
  .no-image .author-stats + .author-social-link:before,
  .no-image .author-social-link + .author-social-link:before {
    /* color: var(--midgrey); */
    color: ${colors.midgrey};
  }

  .site-header-background {
    position: relative;
    margin-top: 64px;
    padding-bottom: 12px;
    /* background: color(var(--darkgrey) l(-5%)) no-repeat center center; */
    background-size: cover;
  }

  .site-header-background:before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 10;
    display: block;
    background: rgba(0, 0, 0, 0.18);
  }

  .site-header-background:after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: auto;
    left: 0;
    z-index: 10;
    display: block;
    height: 140px;
    background: linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0));
  }

  .site-header-background.no-image:before,
  .site-header-background.no-image:after {
    display: none;
  }

  @media (max-width: 500px) {
    .site-header-content {
      flex-direction: column;
      align-items: center;
      min-height: unset;
    }

    .site-title {
      font-size: 4.2rem;
      text-align: center;
    }

    .no-image .site-header-content {
      padding: 12vw 0 20px;
    }
  }
  @media (prefers-color-scheme: dark) {
    .no-image {
      color: rgba(255, 255, 255, 0.9);
      /* background: var(--darkmode); */
      background: ${colors.darkmode};
    }

    .no-image .site-header-content {
      /* border-bottom-color: color(var(--darkmode) l(+15%)); */
      border-bottom-color: ${lighten('0.15', colors.darkmode)};
    }

    .no-image .author-social-link a {
      color: rgba(255, 255, 255, 0.75);
    }
  }
`;

export const ButtonGroupStyles = css`
  display: inline-block;
  border: 1px solid silver;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;

  a.talk-button {
    text-transform: capitalize;
  }

  a.book-button, a.talk-button {
    border-right: 1px solid silver;
    padding: 3px 8px;
    box-shadow: none;
    font-size: 14px;

    &:last-of-type {
      border-right: none;
    }
  }
`;

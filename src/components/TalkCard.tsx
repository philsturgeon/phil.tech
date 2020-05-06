import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import { css } from '@emotion/core';
import { colors } from '../styles/colors';

export interface TalkCardProps {
  talk: any,
  slug: any,
}

// {
//   title: string;
//   url: string;
//   cover: string;
//   description: string;
//   slogan: string;
//   year: number;
//   links: Array<{
//     label: string;
//     class: string;
//     url: string;
//   }>
// }

export const TalkCard: React.FC<TalkCardProps> = (talk, slug) => {
  console.log("BOOK: ", talk, slug);
  const { allTalksYaml } = useStaticQuery(
    graphql`
      query {
        allTalksYaml {
          nodes {
            short
            slug
            title
          }
        }
      }
    `
  )
  console.log("TEST: ", allTalksYaml);

  // filter for the right one
  const talkData = allTalksYaml.nodes.filter(info => info.slug === talk.slug)[0]
  console.log("INFO: ", talkData);
  

  return (
    <article className='talk-card' css={TalkCardStyles}>
      {/* <header css={TalkCardHeader}>
        <h2>
          <a href={talk.event.url}>{talk.event.name}</a>
        </h2>
        <p>{talk.slogan}</p>
      </header>
      <div className='talk-content' css={TalkCardContent}>
        <p>{talk.description}</p>
        <div>
          {talk.links.map(button => {
            return (
              <a href={button.url} className={`talk ${button.class}`}>
                {button.label}
              </a>
            )
          })}
        </div>
      </div> */}
    </article>
  );
};

const TalkCardStyles = css`
  display: grid;
  grid-template-columns: 1fr 3fr;
  column-gap: 1em;
  grid-template-areas: 
      "book-header book-header"
      "book-image book-content";
`;

const TalkCardHeader = css`
  grid-area: talk-header;
`;

const TalkCardContent = css`
  grid-area: talk-content;

  a.book {
    border: 1px solid silver;
    border-radius: 3px;
    padding: 4px 6px;
    box-shadow: none;
  }
`;

// export const query = graphql`
//   query($slug: String) {
//     contentYaml(talks: {elemMatch: {talk: {slug: {eq: $slug}}}}) {
//       id
//     }
//   }
// `;
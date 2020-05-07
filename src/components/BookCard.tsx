import React from 'react';

import { css } from '@emotion/core';
import { colors } from '../styles/colors';

import { ButtonGroupStyles } from '../styles/shared';

export interface BookCardProps {
  book: {
    title: string;
    url: string;
    cover: string;
    description: string;
    slogan: string;
    year: number;
    links: Array<{
      label: string;
      class: string;
      url: string;
    }>
  }
}

export const BookCard: React.FC<BookCardProps> = ({book}) => {

  return (
    <article className='book-card' css={BookCardStyles}>
      <header css={BookCardHeader}>
        <h2>
          <a href={book.links[0].url}>{book.title}</a>
        </h2>
        <p>{book.slogan}</p>
      </header>
      <div className='book-image' css={BookCardImage}>
        <img src={book.cover} />
      </div>
      <div className='book-content' css={BookCardContent}>
        <p>{book.description}</p>
        <div className="button-group" css={ButtonGroupStyles}>
          {book.links.map(button => {
            return (
              <a href={button.url} className={`book-button ${button.class}`}>
                {button.label}
              </a>
            )
          })}
        </div>
      </div>
    </article>
  );
};

const BookCardStyles = css`
  display: grid;
  grid-template-columns: 1fr 3fr;
  column-gap: 1em;
  grid-template-areas: 
      "book-header book-header"
      "book-image book-content";
`;

const BookCardHeader = css`
  grid-area: book-header;
`;

const BookCardImage = css`
  grid-area: book-image;

  > img {
    margin: 0;
    width: 100%;
  }
`;

const BookCardContent = css`
  grid-area: book-content;
`;
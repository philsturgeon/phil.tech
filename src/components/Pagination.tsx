import { Link } from 'gatsby';
import React from 'react';
import { darken } from 'polished';
import { css } from '@emotion/react';

import { colors } from '../styles/colors';

export interface PaginationProps {
  currentPage: number;
  numPages: number;
}

const Pagination: React.FunctionComponent<PaginationProps> = ({ currentPage, numPages }) => {
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prevPage = currentPage - 1 === 1 ? '/' : (currentPage - 1).toString();
  const nextPage = (currentPage + 1).toString();

  const pageList = Array.from(Array(numPages),(x,i)=>i)

  let pageListDisplay;
  if(currentPage < 3){
    pageListDisplay = pageList.slice(0, 3)
  } else if (currentPage > pageList.length - 3){
    pageListDisplay = pageList.slice(pageList.length - 3, pageList.length)
  } else {
    pageListDisplay = pageList.slice(currentPage - 2, currentPage + 1)
  }

  return (
    <nav css={navCss}>
      <div>
        {!isFirst && (
          <Link to={prevPage} rel="prev">
            {/* << symbol */}
            {String.fromCharCode(171)}
          </Link>
        )}

        {pageListDisplay.map(num => {
          return(
            <Link key={`pagination-number${num + 1}`} className={num + 1 === currentPage ? 'active' : ''} to={`/${num === 0 ? '' : num + 1}`}>
              {num + 1}
            </Link>
          )
        })}

        {!isLast && (
          <Link to={nextPage} rel="next">
            {/* >> symbol */}
            {String.fromCharCode(187)}
          </Link>
        )}
      </div>
    </nav>
  );
};

const navCss = css`
  text-align: center;
  div {
    display: inline-block;
  }

  a {
    color: ${colors.darkgrey};
    float: left;
    padding: 3px 6px;
    text-decoration: none;
    transition: background-color .3s;
    border: 1px solid #ddd;
    margin: 0 4px;
    box-shadow: rgba(39, 44, 49, 0.06) 8px 14px 38px, rgba(39, 44, 49, 0.03) 1px 3px 8px;
    border-radius: 6px;
    margin-bottom: 5px;
    min-width: 44px;

    &.active {
      -webkit-box-shadow:inset 3px 0px 0px 0px ${darken(0.05, colors.darkgrey)};
      -moz-box-shadow:inset 3px 0px 0px 0px ${darken(0.05, colors.darkgrey)};
      box-shadow:inset 3px 0px 0px 0px ${darken(0.05, colors.darkgrey)};
    }

    &:hover:not(.active) {
      background-color: #ddd;
    }

    &:hover {
      text-decoration: none;
    }
  }
`;

export default Pagination;

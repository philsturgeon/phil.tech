import React from 'react';

import { ButtonGroupStyles } from '../styles/shared';

export interface TalkButtonsProps {
  buttons: {
    feedback: string;
    slides: string;
    slug: string;
    video: string;
  }
}

export const TalkButtons: React.FC<TalkButtonsProps> = ({ buttons }) => {  

  return (
    <div className="button-group" css={ButtonGroupStyles}>
      {Object.keys(buttons).map(key => {
          if(buttons[key] && key !== 'slug'){
            return(
              <a className="talk-button" href={buttons[key]}>{key}</a>
            )
          }
      })}
    </div>
  );
};
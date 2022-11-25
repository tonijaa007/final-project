import { css } from '@emotion/react';
import React from 'react';

export default function Footer() {
  return (
    <div>
      <hr
        css={css`
          border: solid 1px gray;
        `}
      />
      This is my Footer
    </div>
  );
}

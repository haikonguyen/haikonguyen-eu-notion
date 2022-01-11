import React from 'react';
import tw, { css } from 'twin.macro';

const hoverStyles = css`
  &:hover {
    border-color: black;
    ${tw`text-black`}
  }
`;

const TestComp = ({ hasHover }: any) => (
  <input css={[tw`border`, hasHover && hoverStyles]} />
);

export default TestComp;

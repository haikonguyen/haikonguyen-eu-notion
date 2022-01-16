import React from 'react';
import Container from '@mui/material/Container';
import { PageContentWrapperProps } from '@components/page-content-wrapper/types';
import tw, { styled } from 'twin.macro';

const StyledContainer = styled(Container)`
  section {
    ${tw`py-5`}
  }
`;

const PageContentWrapper = ({ children }: PageContentWrapperProps) => {
  return (
    <StyledContainer className="my-10" fixed>
      {children}
    </StyledContainer>
  );
};

export default PageContentWrapper;

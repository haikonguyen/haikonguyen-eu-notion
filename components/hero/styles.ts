import { styled } from 'twin.macro';

const HeroWrapper = styled.section<{ isHomePage: boolean }>`
  height: ${({ isHomePage }) => (isHomePage ? '70vh' : '40vh')};

  section {
    text-align: center;
    padding: 1rem 0;
  }
`;

export default HeroWrapper;

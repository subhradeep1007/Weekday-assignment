import styled from "styled-components";

export const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;

  @media screen and (min-width: 768px) and (max-width: 1000px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media screen and (min-width: 480px) and (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (max-width: 480px) {
    grid-template-columns: 1fr;
  }
  column-gap: 3rem;
  row-gap: 2rem;
`;

export const Wrapper = styled.div`
  padding: 2rem;
  @media screen and (max-width: 480px) {
    padding: 1rem;
  }
`;

export const Loader = styled.div`
  margin: 1rem;
  text-align: center;
`;

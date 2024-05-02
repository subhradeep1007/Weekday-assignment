import styled from "styled-components";

export const Wrapper = styled.div`
  //max-height: 30rem;
  overflow: hidden;
  width: 95%;
  background-color: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  //justify-content: space-between;
  //align-items: center;
  gap: 0.8rem;
  border-radius: 20px;
  padding: 16px 16px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 1px 4px 0px !important;
`;

export const TimePosted = styled.div`
  width: fit-content;
  padding: 4px 6px;
  box-shadow: rgba(6, 6, 6, 0.05) 0px 2px 6px 0px;
  border-radius: 10px;
  border: 1px solid rgb(230, 230, 230);
  font-weight: 400;
  line-height: 1.5;
  font-size: 9px;
`;

export const CompanyDetailsWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

export const CompanyImg = styled.img`
  height: 1.2rem;
  width: 1.2rem;
  border-radius: 50%;
  background: gray;
`;

export const CompanyDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

export const Name = styled.div`
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 1px;
  margin-bottom: 3px;
  color: #8b8b8b;
`;

export const Role = styled.div`
  font-size: 14px;
  line-height: 1.5;
  font-weight: 400;
`;

export const Venue = styled.div`
  font-size: 11px;
  font-weight: 500;
  margin-top: 5px;
`;

export const EstimatedSalary = styled.div`
  font-size: 14px !important;
  font-weight: 400;
  color: rgb(77, 89, 106);
  line-height: 1.43;
`;

export const AboutTitle = styled.div`
  font-size: 1rem;
  line-height: 1.5;
  font-weight: 500;
`;

export const AboutContent = styled.div`
  max-height: 19rem;
  white-space: pre-wrap;
  font-size: 14px;
  font-weight: 300;
  overflow: hidden;
  mask-image: linear-gradient(
    rgb(255, 255, 255),
    rgb(255, 255, 255),
    rgba(255, 255, 255, 0)
  );
  //position: relative;
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 1rem;
`;

export const MinExpWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const MinExpTitle = styled.div`
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 1px;
  margin-bottom: 3px;
  color: #8b8b8b;
`;

export const Experience = styled.div`
  font-size: 14px;
  line-height: 1.5;
`;

export const ShowMore = styled.div`
  color: #4943da;
  position: absolute;
  top: -2rem;
  text-align: center;
  width: 100%;
  font-weight: 300;
  cursor: pointer;
`;

export const SubmitButton = styled.button`
  all: unset;
  background-color: rgb(85, 239, 196);
  color: rgb(0, 0, 0);
  font-weight: 500;
  padding: 8px 18px;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
`;

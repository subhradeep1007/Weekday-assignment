import React from "react";
import {
  Wrapper,
  TimePosted,
  CompanyDetailsWrapper,
  CompanyImg,
  CompanyDetails,
  Name,
  Role,
  Venue,
  EstimatedSalary,
  AboutTitle,
  AboutContent,
  Footer,
  MinExpWrapper,
  MinExpTitle,
  Experience,
  SubmitButton,
  ShowMore,
} from "./styles";
import { capitalizeFirstLetter } from "../../utils/stringHelper";

const JobCard = (props) => {
  const { data } = props;
  const {
    jobDetailsFromCompany,
    jobRole,
    location,
    maxExp,
    minExp,
    maxJdSalary,
    companyName,
    logoUrl,
  } = data;
  return (
    <Wrapper>
      <TimePosted>⏳ Posted 11 hours ago</TimePosted>
      <CompanyDetailsWrapper>
        <CompanyImg src={logoUrl} alt="Company Logo" />
        <CompanyDetails>
          <Name>{companyName || "Company"}</Name>
          <Role>{capitalizeFirstLetter(jobRole)}</Role>
          <Venue>{capitalizeFirstLetter(location)}</Venue>
        </CompanyDetails>
      </CompanyDetailsWrapper>
      <EstimatedSalary>
        Estimated Salary: ₹{maxJdSalary - 5} - {maxJdSalary} LPA
        <span
          aria-label="Estimated by Weekday. Not provided by employer"
          class=""
        >
          ⚠️
        </span>
      </EstimatedSalary>
      <AboutTitle>About Company</AboutTitle>
      <AboutContent>{jobDetailsFromCompany}</AboutContent>
      <Footer>
        <ShowMore>Show More</ShowMore>
        <MinExpWrapper>
          <MinExpTitle>Minimum Expirience</MinExpTitle>
          <Experience>{minExp ?? 2} Years</Experience>
        </MinExpWrapper>
        <SubmitButton>⚡ Easy Apply</SubmitButton>
      </Footer>
    </Wrapper>
  );
};

export default JobCard;

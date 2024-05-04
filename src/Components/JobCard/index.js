import React from "react";
import * as El from "./styles";
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
    minJdSalary,
    companyName,
    logoUrl,
  } = data;
  return (
    <El.Wrapper>
      <El.TimePosted>⏳ Posted 11 hours ago</El.TimePosted>
      <El.CompanyDetailsWrapper>
        <El.CompanyImg src={logoUrl} alt="Company Logo" />
        <El.CompanyDetails>
          <El.Name>{companyName || "Company"}</El.Name>
          <El.Role>{capitalizeFirstLetter(jobRole)}</El.Role>
          <El.Venue>{capitalizeFirstLetter(location)}</El.Venue>
        </El.CompanyDetails>
      </El.CompanyDetailsWrapper>
      <El.EstimatedSalary>
        Estimated Salary: ₹{minJdSalary ?? maxJdSalary - 5} - {maxJdSalary} LPA
        <span
          aria-label="Estimated by Weekday. Not provided by employer"
          class=""
        >
          ⚠️
        </span>
      </El.EstimatedSalary>
      <El.AboutTitle>About Company</El.AboutTitle>
      <El.AboutContent>{jobDetailsFromCompany}</El.AboutContent>
      <El.Footer>
        <El.ShowMore>Show More</El.ShowMore>
        <El.MinExpWrapper>
          <El.MinExpTitle>Minimum Expirience</El.MinExpTitle>
          <El.Experience>{minExp ?? 2} Years</El.Experience>
        </El.MinExpWrapper>
        <El.SubmitButton>⚡ Easy Apply</El.SubmitButton>
      </El.Footer>
    </El.Wrapper>
  );
};

export default JobCard;

import React, { useEffect, useState } from "react";
import { fetchJobs } from "../../ApiActions";
import JobCard from "../../Components/JobCard";
import { Wrapper } from "./styles";

const FilterJobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const getJobs = async () => {
      try {
        const response = await fetchJobs();
        setJobs(response?.jdList);
      } catch (error) {
        console.error(error);
      }
    };
    getJobs();
  }, []);

  return (
    <Wrapper>
      {jobs.map((job) => (
        <JobCard data={job} key={job.jdUid} />
      ))}
    </Wrapper>
  );
};

export default FilterJobs;

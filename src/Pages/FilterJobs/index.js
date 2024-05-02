import React, { useEffect } from "react";
import { fetchJobs } from "../../ApiActions";

const FilterJobs = () => {
  useEffect(() => {
    const getJobs = async () => {
      try {
        const response = await fetchJobs();
        console.log("jobs fetched", response);
      } catch (error) {
        console.error(error);
      }
    };
    getJobs();
  }, []);

  return <div>FilterJobs</div>;
};

export default FilterJobs;

import React, { useEffect, useState, useMemo } from "react";
import { fetchJobs } from "../../ApiActions";
import InfiniteScroll from "../../Components/InfiniteScroll";
import JobCard from "../../Components/JobCard";
import CustomFilters from "../../Components/CustomFilters";
import { Wrapper } from "./styles";

const FilterJobs = () => {
  const limit = 10;
  const [filterConfig, setFilterConfig] = useState([]);
  const [offSet, setOffSet] = useState(0);
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalJobCount, setTotalJobCount] = useState(0);

  const hasMoreJobs = useMemo(
    () => totalJobCount === 0 || offSet * limit < totalJobCount,
    [totalJobCount, offSet]
  );

  const getJobs = async (offset) => {
    setIsLoading(true);
    try {
      const response = await fetchJobs({ limit, offset: offset + 1 });
      setJobs(jobs.concat(response?.jdList || []));
      setOffSet(offSet + 1);
      totalJobCount === 0 && setTotalJobCount(response?.totalCount);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    getJobs(offSet);
  }, []);

  const getFilteredJobs = (_filterConfig) => {
    return jobs.filter((job) =>
      _filterConfig.every((filterValue) =>
        Object.keys(filterValue).every((key) => {
          switch (key) {
            case "minExp":
            case "minJdSalary":
              return job[key] >= filterValue[key];
            case "location":
              if (filterValue[key] === "remote") return job[key] === "remote";
              else return job[key] !== "remote";
            case "jobRole":
              return job[key] == filterValue[key];
          }
        })
      )
    );
  };

  const changeFilterConfig = (property, value) => {
    let _temp = JSON.parse(JSON.stringify(filterConfig));
    let flag = false;
    _temp.map((filter) => {
      if (filter[property]) {
        filter[property] = value;
        flag = true;
      }
    });
    if (!flag) {
      _temp.push({ [property]: value });
    }
    setFilterConfig(_temp);
    setJobs(getFilteredJobs(_temp));
  };

  const handleSearch = (searchTerm) => {
    setFilterConfig([]);
    const results = jobs.filter((job) => {
      const x = job?.companyName
        ?.toLowerCase()
        ?.includes(searchTerm?.toLowerCase());
      return x;
    });
    console.log("results", results, jobs);
    setJobs(results);
  };

  return (
    <>
      <CustomFilters
        handleFilterChange={changeFilterConfig}
        handleSearch={handleSearch}
      />
      <InfiniteScroll
        next={() => getJobs(offSet)}
        className="infinte"
        isLoading={isLoading}
        scrollToTop={false}
        dataLength={jobs.length}
        hasMore={hasMoreJobs}
      >
        <Wrapper>
          {jobs.map((job, index) => (
            <JobCard data={job} key={index} />
          ))}
        </Wrapper>
      </InfiniteScroll>
    </>
  );
};

export default FilterJobs;

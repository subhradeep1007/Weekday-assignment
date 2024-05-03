import React, { useEffect, useState, useMemo } from "react";
import { fetchJobs } from "../../ApiActions";
import InfiniteScroll from "../../Components/InfiniteScroll";
import JobCard from "../../Components/JobCard";
import CustomFilters from "../../Components/CustomFilters";
import { Wrapper } from "./styles";
import { getFilterConfig, getFilteredJobs } from "../../utils/filterHelper";

const limit = 10;
const FilterJobs = () => {
  const [filterConfig, setFilterConfig] = useState([]);
  const [offSet, setOffSet] = useState(0);
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setfilteredJobs] = useState([]);
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
      const _jobs = jobs.concat(response?.jdList || []);
      setJobs(_jobs);
      filteredJobs.length > 0 &&
        setfilteredJobs(getFilteredJobs(filterConfig, _jobs));
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

  const changeFilterConfig = (property, value) => {
    const _filterConfig = getFilterConfig(property, value, filterConfig);
    setFilterConfig(_filterConfig);
    setfilteredJobs(getFilteredJobs(_filterConfig, jobs));
  };

  const handleSearch = (searchTerm) => {
    setFilterConfig([]);
    const results = jobs.filter((job) => {
      return job?.companyName
        ?.toLowerCase()
        ?.includes(searchTerm?.toLowerCase());
    });
    setfilteredJobs(results);
  };

  const renderContent = () => {
    const _jobs = filteredJobs.length > 0 ? filteredJobs : jobs;
    return _jobs.map((job, index) => <JobCard data={job} key={index} />);
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
        <Wrapper>{renderContent()}</Wrapper>
      </InfiniteScroll>
    </>
  );
};

export default FilterJobs;

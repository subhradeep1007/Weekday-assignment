import React, { useEffect, useState, useMemo } from "react";
import { fetchJobs } from "../../ApiActions";
import InfiniteScroll from "../../Components/InfiniteScroll";
import JobCard from "../../Components/JobCard";
import CustomFilters from "../../Components/CustomFilters";
import { ContentWrapper, Loader, Wrapper } from "./styles";
import ZerothState from "../../Components/zerothState";
import { getFilterConfig, getFilteredJobs } from "../../utils/filterHelper";

const limit = 10;
const FilterJobs = () => {
  const [searchTerm, setSearchTerm] = useState("");
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

  const renderedJobs = useMemo(
    () =>
      filterConfig.length > 0 || searchTerm.length > 0 ? filteredJobs : jobs,
    [filterConfig, searchTerm, filteredJobs, jobs]
  );

  const getJobs = async (offset) => {
    setIsLoading(true);
    try {
      const response = await fetchJobs({ limit, offset: offset + 1 });
      const _jobs = jobs.concat(response?.jdList || []);
      setJobs(_jobs);
      filteredJobs.length > 0 &&
        setfilteredJobs(getFilteredJobs(filterConfig, _jobs, searchTerm));
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
    setSearchTerm(searchTerm);
    const results = jobs.filter((job) => {
      return job?.companyName
        ?.toLowerCase()
        ?.includes(searchTerm?.toLowerCase());
    });
    console.log("results", results);
    setfilteredJobs(results);
  };

  return (
    <Wrapper>
      <CustomFilters
        handleFilterChange={changeFilterConfig}
        handleSearch={handleSearch}
      />
      {isLoading && renderedJobs.length == 0 ? (
        <Loader>Fetching Jobs</Loader>
      ) : renderedJobs.length === 0 && !isLoading ? (
        <ZerothState />
      ) : (
        <InfiniteScroll
          next={() => getJobs(offSet)}
          className="infinte"
          isLoading={isLoading}
          scrollToTop={false}
          dataLength={jobs.length}
          hasMore={hasMoreJobs}
          loader={<Loader>Fetching Jobs</Loader>}
        >
          <ContentWrapper>
            {renderedJobs.map((job, index) => (
              <JobCard data={job} key={index} />
            ))}
          </ContentWrapper>
        </InfiniteScroll>
      )}
    </Wrapper>
  );
};

export default FilterJobs;

//helper for setting values in filter config
export function getFilterConfig(property, value, filterConfig) {
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
  return _temp;
}

//helper for creating custom filters
export function getFilteredJobs(_filterConfig, jobs, searchTerm) {
  const _filtered = jobs?.filter((job) =>
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
            return job[key] === filterValue[key];
        }
      })
    )
  );
  const results =
    searchTerm?.length > 0
      ? _filtered.filter((job) => {
          return job?.companyName
            ?.toLowerCase()
            ?.includes(searchTerm?.toLowerCase());
        })
      : _filtered;

  return results;
}

export function debounce(fn, duration = 400) {
  let timeoutId = null,
    isCompleted = true;
  return function (...args) {
    if (!isCompleted) {
      clearTimeout(timeoutId);
    }
    isCompleted = false;
    timeoutId = setTimeout(() => {
      fn(...args);
      isCompleted = true;
    }, duration);
  };
}

export const getFilterValue = (property, filterConfig) => {
  filterConfig?.map((filter) => {
    if (filter.hasOwnProperty(property)) {
      return filter[property];
    }
  });
  return null;
};

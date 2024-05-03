const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const defaultOffsetConfig = {
  limit: 8,
  offset: 0,
};

const requestOptions = {
  method: "POST",
  headers: myHeaders,
};

export async function fetchJobs(offsetConfig) {
  const url = "https://api.weekday.technology/adhoc/getSampleJdJSON";
  try {
    const response = await fetch(url, {
      ...requestOptions,
      ...JSON.stringify(offsetConfig),
    });
    return Promise.resolve(response.json());
  } catch (error) {
    return Promise.reject(error);
  }
}

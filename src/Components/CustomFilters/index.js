import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { filterData } from "../../Constants";
import { Wrapper } from "./styles";

const CustomFilters = ({ handleFilterChange, handleSearch }) => {
  return (
    <Wrapper>
      {filterData.map((filter) => (
        <Autocomplete
          id="combo-box-demo"
          options={filter.options}
          sx={{ width: filter.width }}
          onChange={(e, value) => {
            handleFilterChange(filter.property, value.value);
          }}
          renderInput={(params) => (
            <TextField {...params} label={filter.placeholder} />
          )}
        />
      ))}
      <TextField
        id="outlined-basic"
        label="Search Company Name"
        variant="outlined"
        size="medium"
        onChange={(e, value) => {
          console.log("e", e, value);
          handleSearch(e.target.value);
        }}
      />
    </Wrapper>
  );
};

export default CustomFilters;

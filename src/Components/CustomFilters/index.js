import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { filterData } from "../../Constants";
import { Wrapper } from "./styles";
import { debounce } from "../../utils/filterHelper";

const CustomFilters = ({ handleFilterChange, handleSearch }) => {
  return (
    <Wrapper>
      {filterData.map((filter) => (
        <Autocomplete
          disableClearable
          id="combo-box-demo"
          options={filter.options}
          sx={{
            width: filter.width,
            fieldset: {
              border: "1px solid rgb(204, 204, 204)",
              borderRadius: "4px",
            },
          }}
          onChange={(e, value) => {
            handleFilterChange(filter.property, value.value);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={filter.placeholder}
              InputLabelProps={{
                style: { fontFamily: "Lexend, sans-serif !important" },
              }}
            />
          )}
        />
      ))}
      <TextField
        id="outlined-basic"
        label="Search Company Name"
        variant="outlined"
        sx={{
          width: 300,
        }}
        onChange={(e, value) => {
          debounce(handleSearch(e.target.value), 200);
        }}
      />
    </Wrapper>
  );
};

export default CustomFilters;

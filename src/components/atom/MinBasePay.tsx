// import React from "react";
import { Autocomplete, TextField, FormControl, MenuItem } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { useDispatch, useSelector } from 'react-redux';
import { setBaseSalaryFilter, filterJobs } from '../../redux/jobsSlice';

const MinBasePay = () => {
  const dispatch = useDispatch();
  const selectedNames = useSelector((state: { jobs: JobsState }) => state.jobs.filters.baseSalary);
  const allOptions = ["0-5","6-10","11-20","21-50","51-69","70+"];
  const availableOptions = allOptions.filter(option => !selectedNames.includes(option));

  const handleOnChange = (event, newValue) => {
    // console.log("Selected base salary:", newValue);
    dispatch(setBaseSalaryFilter(newValue));
    dispatch(filterJobs());
  };


  return (
    <FormControl sx={{ m: 1, width: 250 }}>
      <Autocomplete
        multiple
        id="tags-standard"
        options={availableOptions}
        getOptionLabel={(option) => option}
        value={selectedNames}
        onChange={handleOnChange}
        renderOption={(props, option, { selected }) => (
          <MenuItem
            key={option}
            value={option}
            sx={{ justifyContent: "space-between" }}
            {...props}
          >
            {option}
            {selected ? <CheckIcon color="info" /> : null}
          </MenuItem>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Base Salary"
            placeholder="Favorites"
          />
        )}
      />
    </FormControl>
  );
};

export default MinBasePay;

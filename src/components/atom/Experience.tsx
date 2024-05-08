
// import React from "react";
import { Autocomplete, TextField, FormControl, MenuItem } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { useDispatch, useSelector } from 'react-redux';
import { setExperienceFilter, filterJobs } from '../../redux/jobsSlice';

// Experience Component
const Experience = () => {
  const dispatch = useDispatch();
  const selectedNames = useSelector((state: { jobs:any }) => state.jobs.filters.experience);
  const allOptions = ["0-1", "1-3", "3-10"];
  const availableOptions = allOptions.filter(option => !selectedNames.includes(option));

  const handleOnChange = ( newValue:any) => {
    // console.log("Selected experience:", newValue);
    dispatch(setExperienceFilter(newValue));
    dispatch(filterJobs());
  };


  return (
    <FormControl sx={{ m: 1, width: 250 }}>
      <Autocomplete
        multiple
        id="experience-filter"
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
            label="Experience Range"
            placeholder="Select Experience Ranges"
          />
        )}
      />
    </FormControl>
  );
};

export default Experience;
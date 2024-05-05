
import React from "react";
import { Autocomplete, TextField, FormControl, MenuItem } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { useDispatch, useSelector } from 'react-redux';
import { setExperienceFilter, filterJobs } from '../../redux/jobsSlice';

const Experience = () => {
  const dispatch = useDispatch();
  const selectedNames = useSelector((state: { jobs: JobsState }) => state.jobs.filters.experience);

  const handleOnChange = (event, newValue) => {
    console.log("Selected experience:", newValue);
    dispatch(setExperienceFilter(newValue));
    dispatch(filterJobs());
  };


  return (
    <FormControl sx={{ m: 1, width: 250 }}>
      <Autocomplete
        multiple
        id="experience-filter"
        options={["1-10", "10-50", "50-100", "150-300", "500+"]}
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
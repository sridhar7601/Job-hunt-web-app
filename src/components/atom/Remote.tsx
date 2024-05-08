// import React from "react";
import { Autocomplete, TextField, FormControl, MenuItem } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { useDispatch, useSelector } from 'react-redux';
import { setLocationFilter, filterJobs } from '../../redux/jobsSlice';

const Remote = () => {
  const dispatch = useDispatch();
  const selectedNames = useSelector((state: { jobs: JobsState }) => state.jobs.filters.location);
  const allOptions = ["Delhi Ncr", "Mumbai", "Remote", "Chennai", "Bangalore"].map(option => option.toLowerCase());
  const availableOptions = allOptions.filter(option => !selectedNames.includes(option));

  const handleOnChange = ( newValue:any) => {
    // console.log("Selected location:", newValue);
    dispatch(setLocationFilter(newValue.map(role => role.toLowerCase())));
    dispatch(filterJobs());
  }

  return (
    <FormControl sx={{ m: 1, width: 250 }}>
      <Autocomplete
        multiple
        id="location-filter"
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
            label="Location"
            placeholder="Select Locations"
          />
        )}
      />
    </FormControl>
  );
};

export default Remote;
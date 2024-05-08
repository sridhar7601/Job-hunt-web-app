// import React from "react";
import { Autocomplete, TextField, FormControl, MenuItem } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { useDispatch, useSelector } from 'react-redux';
import { setRoleFilter, filterJobs } from '../../redux/jobsSlice';

const Roles = () => {
  const dispatch = useDispatch();
  const selectedNames = useSelector((state: { jobs: any }) => state.jobs.filters.role);

  const handleOnChange = (event, newValue) => {
    // console.log("Selected role:", newValue);
    // Convert the selected roles to lowercase before dispatching
    dispatch(setRoleFilter(newValue.map(role => role.toLowerCase())));
    dispatch(filterJobs());
  };

  // Define all options
  const allOptions = ["Frontend", "Ios", "Android", "Tech lead", "Backend"].map(option => option.toLowerCase());

  // Filter out the selected options
  const availableOptions = allOptions.filter(option => !selectedNames.includes(option));

  return (
    <FormControl sx={{ m: 1, width: 250 }}>
      <Autocomplete
        multiple
        id="employee-filter"
        options={availableOptions}
        getOptionLabel={(option) => option}
        value={selectedNames}
        onChange={handleOnChange}
        renderOption={(props, option, { selected }) => (
          <MenuItem
            key={option}
            selected={selected}
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
            label="Job Role"
            placeholder="Select Job Roles"
          />
        )}
      />
    </FormControl>
  );
};

export default Roles;

import React from "react";
import { Autocomplete, TextField, FormControl, MenuItem } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { useDispatch, useSelector } from 'react-redux';
import { setRoleFilter, filterJobs } from '../../redux/jobsSlice';

const Roles = () => {
  const dispatch = useDispatch();
  const selectedNames = useSelector((state: { jobs: JobsState }) => state.jobs.filters.role);

  const handleOnChange = (event, newValue) => {
    console.log("Selected role:", newValue);
    dispatch(setRoleFilter(newValue));
    dispatch(filterJobs());
  };

  return (
    <FormControl sx={{ m: 1, width: 250 }}>
      <Autocomplete
        multiple
        id="employee-filter"
        options={["frontend", "ios", "android", "tech lead", "backend"]}
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

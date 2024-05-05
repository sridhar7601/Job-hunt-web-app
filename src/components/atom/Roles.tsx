import React, { useState } from "react";
import { Autocomplete, TextField, FormControl, MenuItem } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

const Roles = ({ onChange }) => {
  const [selectedNames, setSelectedNames] = useState([]);

  const handleOnChange = (event, newValue) => {
    setSelectedNames(newValue);
    onChange(newValue);
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

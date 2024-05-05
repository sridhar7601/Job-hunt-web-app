import React, { useState } from "react";
import { Autocomplete, TextField, FormControl, MenuItem } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

const Remote = ({ onChange }) => {
  const [selectedNames, setSelectedNames] = useState([]);

  const handleOnChange = (event, newValue) => {
    setSelectedNames(newValue);
    onChange(newValue);
  };

  return (
    <FormControl sx={{ m: 1, width: 250 }}>
      <Autocomplete
        multiple
        id="location-filter"
        options={["delhi ncr", "mumbai", "remote", "chennai", "bangalore"]}
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
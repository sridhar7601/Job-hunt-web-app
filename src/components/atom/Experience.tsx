
import React, { useState } from "react";
import { Autocomplete, TextField, FormControl, MenuItem } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

const Experience = ({ onChange }) => {
  const [selectedNames, setSelectedNames] = useState([]);

  const handleOnChange = (event, newValue) => {
    setSelectedNames(newValue);
    onChange(newValue);
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
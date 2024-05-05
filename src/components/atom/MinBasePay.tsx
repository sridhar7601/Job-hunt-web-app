import React, { useState } from "react";
import { Autocomplete, TextField, FormControl, MenuItem } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

const names = [
  "0-5","6-10","11-20","21-50","51-69","70+"
];

const MinBasePay = () => {
  const [selectedNames, setSelectedNames] = useState([]);

  const handleOnChange = (event, newValue) => {
    setSelectedNames(newValue);
    console.log("Selected base salary:", newValue);
  };

  return (
    <FormControl sx={{ m: 1, width: 250 }}>
      <Autocomplete
        multiple
        id="tags-standard"
        options={names}
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

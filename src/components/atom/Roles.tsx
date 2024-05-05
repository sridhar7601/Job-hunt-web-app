import React, { useState } from "react";
import { Autocomplete, TextField, FormControl, MenuItem } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
// import CancelIcon from "@mui/icons-material/Cancel";

const names = [
  "Humaira Sims",
  "Santiago Solis",
  "Dawid Floyd",
  "Mateo Barlow",
  "Samia Navarro",
  "Kaden Fields",
  "Genevieve Watkins",
  "Mariah Hickman",
  "Rocco Richardson",
  "Harris Glenn"
];

const Roles = () => {
  const [selectedNames, setSelectedNames] = useState([]);

  const handleOnChange = (event, newValue) => {
    setSelectedNames(newValue);
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
            label="Multiple Autocomplete"
            placeholder="Favorites"
          />
        )}
      />
      {/* <Stack gap={1} direction="row" flexWrap="wrap">
        {selectedNames.map((name) => (
          <Chip
            key={name}
            label={name}
            onDelete={() => {
              setSelectedNames((prevNames) =>
                prevNames.filter((prevName) => prevName !== name)
              );
            }}
            deleteIcon={
              <CancelIcon
                onMouseDown={(event) => event.stopPropagation()}
              />
            }
          />
        ))}
      </Stack> */}
    </FormControl>
  );
};

export default Roles;

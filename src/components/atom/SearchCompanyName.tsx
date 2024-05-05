import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

const SearchCompanyName = () => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);
    console.log("Search company name:", value);
  };

  return (
    <div style={{ margin: '8px' }}> 
      <TextField 
        id="outlined-basic" 
        label="SearchCompanyName" 
        variant="outlined" 
        value={searchValue}
        onChange={handleSearchChange}
      />
    </div>
  );
}

export default SearchCompanyName;

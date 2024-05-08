import React from 'react';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { setCompanyNameFilter, filterJobs } from '../../redux/jobsSlice';

const SearchCompanyName = () => {
  const dispatch = useDispatch();
  const searchValue = useSelector((state: { jobs: JobsState }) => state.jobs.filters.companyName);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    // console.log("Search company name:", value);
    dispatch(setCompanyNameFilter(value));
    dispatch(filterJobs());
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

import React, { useState, useEffect, useRef } from 'react';
import { Grid, AppBar } from '@mui/material';
import Card from '../atom/Card';
import { fetchJobListings } from '../../utils/api';
import Experience from '../atom/Experience';
import MinBasePay from '../atom/MinBasePay';
import Remote from '../atom/Remote';
import Role from '../atom/Roles';
import SearchCompanyName from '../atom/SearchCompanyName';

const JobListingPage: React.FC = () => {
  const [jobListings, setJobListings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [experienceFilter, setExperienceFilter] = useState([]);
  const [minBasePayFilter, setMinBasePayFilter] = useState([]);
  const [remoteFilter, setRemoteFilter] = useState([]);
  const [roleFilter, setRoleFilter] = useState([]);
  const [searchCompanyNameFilter, setSearchCompanyNameFilter] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  // Function to fetch more job listings
  const fetchMoreData = async () => {
    try {
      setIsLoading(true);
      const { jdList } = await fetchJobListings(10, (page - 1) * 10);
      const formattedJobs = jdList.map((job) => ({
        id: job.jdUid,
        title: job.jobRole,
        company: job.companyName,
        location: job.location,
        description: job.jobDetailsFromCompany,
        minExp: job.minExp,
        maxExp: job.maxExp,
        minJdSalary: job.minJdSalary,
        maxJdSalary: job.maxJdSalary,
        logoUrl: job.logoUrl,
      }));
      setJobListings((prevListings) => [...prevListings, ...formattedJobs]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error('Error fetching job listings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Effect to fetch more data when scrolling
  useEffect(() => {
    fetchMoreData(); 
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const { scrollTop, scrollHeight, clientHeight } = container;
      const threshold = 0.8;

      if (scrollTop + clientHeight >= scrollHeight * threshold && !isLoading) {
        fetchMoreData();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isLoading]);

  // Effect to scroll to bottom when new job listings are loaded
  const scrollToBottom = () => {
    const container = containerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [jobListings]);

  // Function to filter job listings based on filters
  const filterJobListings = () => {
    // Implement your filtering logic here based on the state variables
    console.log("Experience Filter:", experienceFilter);
    console.log("Min Base Pay Filter:", minBasePayFilter);
    console.log("Remote Filter:", remoteFilter);
    console.log("Role Filter:", roleFilter);
    console.log("Search Company Name Filter:", searchCompanyNameFilter);
  };

  // Effect to log filtered data whenever filters change
  useEffect(() => {
    filterJobListings();
  }, [experienceFilter, minBasePayFilter, remoteFilter, roleFilter, searchCompanyNameFilter]);

  return (
    <div>
      <AppBar position="fixed" style={{ top: 0, backgroundColor: 'transparent', boxShadow: 'none', position: 'relative' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            padding: '10px 16px',
            margin: '10px',
          }}
        >
          <Role onChange={setRoleFilter} />
          <Experience onChange={setExperienceFilter} />
          <Remote onChange={setRemoteFilter} />
          <MinBasePay onChange={setMinBasePayFilter} />
          <SearchCompanyName onChange={setSearchCompanyNameFilter} />
        </div>
      </AppBar>
      <div
        ref={containerRef}
        style={{ paddingTop: '64px', padding: '1rem', maxWidth: '1200px', margin: 'auto', zIndex: 1, overflow: 'auto' }}
      >
        <Grid container spacing={3}>
          {jobListings.map((job) => (
            <Grid key={job.id} item xs={12} sm={6} md={4}>
              <Card job={job} />
            </Grid>
          ))}
        </Grid>
        {isLoading && <p>Loading...</p>}
      </div>
    </div>
  );
};

export default JobListingPage;

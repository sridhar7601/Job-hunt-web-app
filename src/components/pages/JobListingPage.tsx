import React, { useState, useEffect, useRef } from 'react';
import { Grid, AppBar } from '@mui/material';
import Card from '../atom/Card';
import { fetchJobListings } from '../../utils/api';
import Experience from '../atom/Experience';
import MinBasePay from '../atom/MinBasePay';
import Remote from '../atom/Remote';
import Role from '../atom/Roles';
import Employee from '../atom/Employee';
import SearchCompanyName from '../atom/SearchCompanyName';


const JobListingPage: React.FC = () => {
  const [jobListings, setJobListings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

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
        experience: `${job.minExp ?? 0}-${job.maxExp ?? 0} years`,
        logoUrl: job.logoUrl,
      }));
      setJobListings((prevListings) => [...prevListings, ...formattedJobs]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error('Error fetching job listings:', error);
  //handle the error (set an error state)
    } finally {
      setIsLoading(false);
    }
  };

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

  const scrollToBottom = () => {
    const container = containerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [jobListings]);

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
          <Role />
         <Employee />
          <Experience />
          <Remote />
          <MinBasePay />
          <SearchCompanyName />
       
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

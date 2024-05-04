import React from 'react';
import { Card as MuiCard, CardContent, Typography, Grid } from '@mui/material';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  experience: string;
  logoUrl: string;
}

interface CardProps {
  job: Job;
}

const Card: React.FC<CardProps> = ({ job }) => {
  return (
    <MuiCard>
      <CardContent>
        <Grid container spacing={2}>
          {/* Column for company logo */}
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={3}>
                <img src={job.logoUrl} alt={`${job.company} logo`} style={{ width: '100%', maxWidth: '80px' }} />
              </Grid>
              {/* Column for job details (name, role, location) */}
              <Grid item xs={12} sm={9}>
                <div>
                  <Typography variant="h6">{job.title}</Typography>
                  <Typography color="textSecondary">{job.company}</Typography>
                  <Typography>{job.location}</Typography>
                </div>
              </Grid>
            </Grid>
          </Grid>
          {/* Column for description and experience */}
          <Grid item xs={12}>
            <div>
              <Typography>{job.description}</Typography>
              <Typography>Experience: {job.experience}</Typography>
            </div>
          </Grid>
        </Grid>
      </CardContent>
    </MuiCard>
  );
};

export default Card;

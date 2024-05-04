import React from 'react';
import { Card as MuiCard, CardContent, Typography } from '@mui/material';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  experience: string;
}

interface CardProps {
  job: Job;
}

const Card: React.FC<CardProps> = ({ job }) => {
  return (
    <MuiCard>
      <CardContent>
        <Typography variant="h6">{job.title}</Typography>
        <Typography color="textSecondary">{job.company}</Typography>
        <Typography>{job.location}</Typography>
        <Typography>{job.description}</Typography>
        <Typography>Experience: {job.experience}</Typography>
      </CardContent>
    </MuiCard>
  );
};

export default Card;

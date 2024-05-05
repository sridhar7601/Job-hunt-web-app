// components/atom/Card.tsx
import React, { useState } from "react";
import {
  Card as MuiCard,
  CardContent,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Skeleton } from "@mui/material";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  minExp: number | null;
  maxExp: number | null;
  minJdSalary: number | null;
  maxJdSalary: number | null;
  logoUrl: string;
}

interface CardProps {
  job: Job;
}

const FadingText = styled("div")({
  position: "relative",
  overflow: "hidden",
  "& p": {
    margin: 0,
  },
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "3rem",
    backgroundImage:
      "linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1))",
  },
});

const Card: React.FC<CardProps> = ({ job }) => {
  // console.log(job, "job");
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <MuiCard sx={{ maxWidth: 345, margin: "1rem" }}>
      <CardContent>
        <Grid container spacing={2}>
          {/* Column for experience */}

          {/* Column for company logo */}
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={3}>
                {job.logoUrl ? (
                  <img
                    src={job.logoUrl}
                    alt={`${job.company} logo`}
                    style={{ width: "100%", maxWidth: "80px" }}
                  />
                ) : (
                  <Skeleton variant="rectangular" width={80} height={80} />
                )}
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
          {/* Column for description and "Show More/Less" button */}
          <Grid item xs={12}>
            {/* <Typography>
              {job.minExp !== null ? `Min Experience: ${job.minExp} years` : 'Min Experience: Not specified'}
            </Typography> */}
            <Typography>
              {job.minJdSalary !== null && job.maxJdSalary !== null ? (
                `Salary: ${job.minJdSalary} - ${job.maxJdSalary} per year`
              ) : (
                <Typography>{`Yet to update`}</Typography>
              )}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {showFullDescription ? (
              <>
                <Typography>{`About`}</Typography>
                <Typography>{job.description}</Typography>
              </>
            ) : (
              <FadingText>
                <Typography>{`About`}</Typography>
                <Typography>{`${job.description.slice(0, 100)}...`}</Typography>
              </FadingText>
            )}
            <Button
              onClick={toggleDescription}
              color="primary"
              size="small"
              sx={{
                "&:hover": { backgroundColor: "transparent" },
                outline: "none",
              }}
            >
              {showFullDescription ? "Show Less" : "Show More"}
            </Button>
          </Grid>
          {/* Column for salary */}
          <Grid item xs={12}>
            <Typography style={{ opacity: showFullDescription ? 1 : 0.7 }}>
              {job.minExp !== null && job.maxExp !== null ? (
                `Experience: ${job.minExp} - ${job.maxExp}`
              ) : (
                <Typography>{`Yet to update`}</Typography>
              )}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </MuiCard>
  );
};

export default Card;

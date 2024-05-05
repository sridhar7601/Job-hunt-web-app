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
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <MuiCard sx={{ maxWidth: 345, margin: "1rem", borderRadius: "16px" }}>
      <CardContent>
        <Grid container spacing={2}>
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
              <Grid item xs={12} sm={9}>
                <div>
                  <Typography variant="h6">{job.title}</Typography>
                  <Typography color="textSecondary">{job.company}</Typography>
                  <Typography>{job.location}</Typography>
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              {job.minJdSalary !== null && job.maxJdSalary !== null ? (
                `Salary: ${job.minJdSalary} - ${job.maxJdSalary} ✅ per year`
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
                width: "100%", // Adjust button width here
                "&:hover": { backgroundColor: "transparent" },
                outline: "none",
              }}
            >
              {showFullDescription ? "Show Less" : "Show More"}
            </Button>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sx={{ marginLeft: "10px" }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography
                    style={{ opacity: showFullDescription ? 1 : 0.7 }}
                  >
                    {job.minExp !== null && job.maxExp !== null ? (
                      `Experience: ${job.minExp} - ${job.maxExp}`
                    ) : (
                      <Typography>{`Yet to update`}</Typography>
                    )}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#54f0c4", // Change button background color
                      width: "100%", // Set button width to 100% of its container
                      color: "black", // Change button text color to black
                      fontSize: "14px", // Change font size
                      fontWeight: 500, // Change font weight
                      "&:hover": {
                        backgroundColor: "#54f0c4", // Change hover background color
                      },
                    }}
                  >
                    ⚡ Easy Apply
                  </Button>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#4c44db", // Change button background color
                      width: "100%", // Set button width to 100% of its container
                      color: "black", // Change button text color to black
                      fontSize: "14px", // Change font size
                      fontWeight: 500, // Change font weight
                      "&:hover": {
                        backgroundColor: "#4c44db", // Change hover background color
                      },
                    }}
                  >
                    ⚡ Easy Apply
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </MuiCard>
  );
};

export default Card;

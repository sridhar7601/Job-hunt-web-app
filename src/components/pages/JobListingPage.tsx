// pages/JobListingPage.tsx
import React from "react";
import Experience from "../atom/Experience";
import MinBasePay from "../atom/MinBasePay";
import Remote from "../atom/Remote";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Card from "../atom/Card";

// Sample data for testing
const jobs = [
  {
    id: "1",
    title: "Software Engineer",
    company: "dropbox",
    location: "San Francisco, CA",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    experience: "3+ years",
    logoUrl: "https://logo.clearbit.com/dropbox.com", // Update with the logo link
  },
  {
    id: "2",
    title: "Data Analyst",
    company: "DataTech",
    location: "New York, NY",
    description:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    experience: "2+ years",
    logoUrl: "https://logo.clearbit.com/dropbox.com", // Update with the logo link
  },
  {
    id: "3",
    title: "Product Manager",
    company: "Productify",
    location: "Seattle, WA",
    description:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    experience: "5+ years",
    logoUrl: "https://logo.clearbit.com/dropbox.com", // Update with the logo link
  },
  {
    id: "4",
    title: "UX/UI Designer",
    company: "DesignCo",
    location: "Los Angeles, CA",
    description:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    experience: "4+ years",
    logoUrl: "https://logo.clearbit.com/dropbox.com", // Update with the logo link
  },
  {
    id: "5",
    title: "Marketing Manager",
    company: "Marketize",
    location: "Chicago, IL",
    description:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    experience: "3+ years",
    logoUrl: "https://logo.clearbit.com/dropbox.com", // Update with the logo link
  },
  // Add more sample job data as needed
];

const JobListingPage: React.FC = () => {
  return (
    <div>
      <AppBar
        position="fixed"
        style={{ top: 8, backgroundColor: "transparent", boxShadow: "none" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "0 16px",
          }}
        >
          <Experience sx={{ marginRight: "8px" }} />
          <MinBasePay sx={{ margin: "0 8px" }} />
          <Remote sx={{ marginLeft: "8px" }} />
        </div>
      </AppBar>
      <div style={{ paddingTop: "64px", padding: "1rem" }}>
        <Grid container spacing={3}>
          {/* Render Job Cards */}
          {jobs.map((job) => (
            <Grid item key={job.id} xs={12} sm={6} md={4}>
              <Card job={job} />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default JobListingPage;

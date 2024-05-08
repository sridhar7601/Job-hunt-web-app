import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Typography } from "@mui/material";
import Card from "../atom/Card";
import Experience from "../atom/Experience";
import MinBasePay from "../atom/MinBasePay";
import Remote from "../atom/Remote";
import Role from "../atom/Roles";
import SearchCompanyName from "../atom/SearchCompanyName";
import { fetchJobListings } from "../../redux/jobsSlice";
import { Box } from "@mui/system";

const JobListingPage: React.FC = () => {
  const dispatch = useDispatch();
  const jobs = useSelector((state: { jobs: JobsState }) => state.jobs.jobs);
  const jobStatus = useSelector(
    (state: { jobs: JobsState }) => state.jobs.status
  );
  const page = useSelector((state: { jobs: JobsState }) => state.jobs.page);

  useEffect(() => {
    if (jobStatus === "idle") {
      dispatch(fetchJobListings(page));
    }
  }, [jobStatus, dispatch, page]);

  // Handle infinite scrolling
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const threshold = 0.8;

      if (
        scrollTop + clientHeight >= scrollHeight * threshold &&
        jobStatus === "succeeded"
      ) {
        dispatch(fetchJobListings(page));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [jobStatus, page, dispatch]);

  return (
    <div>
      <div
        style={{ top: 0, backgroundColor: "transparent", boxShadow: "none" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            padding: "10px 16px",
            margin: "10px",
          }}
        >
          <Role />
          <Experience />
          <Remote />
          <MinBasePay />
          <SearchCompanyName />
        </div>
      </div>
      <Box>
  <Grid container spacing={3} justifyContent="center">
    {jobs.length > 0 ? (
      jobs.map((job, index) => (
        <Grid
          key={job.id + "-" + index}
          item
          xs={12}
          sm={6}
          md={4}
          style={{ minWidth: "300px" }}
          >
          <Card job={job} />
        </Grid>
      ))
    ) : (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "0vh" }}
      >
        <Box>
          <Typography variant="h6" color="textSecondary">
            Sorry, no jobs found.
          </Typography>
        </Box>
      </Grid>
    )}
  </Grid>
</Box>

    </div>
  );
};

export default JobListingPage;

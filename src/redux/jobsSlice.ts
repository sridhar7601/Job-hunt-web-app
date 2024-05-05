import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  minExp: number;
  maxExp: number;
  minJdSalary: number;
  maxJdSalary: number;
  logoUrl: string;
}

interface JobsState {
  allJobs: Job[];
  jobs: Job[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  filters: {
    experience: string[];
    baseSalary: string[];
    location: string[];
    role: string[];
    companyName: string;
  };
}

const initialState: JobsState = { 
  allJobs: [],
  jobs: [], 
  status: 'idle', 
  error: null,
  filters: {
    experience: [],
    baseSalary: [],
    location: [],
    role: [],
    companyName: '',
  },
};

export const fetchJobListings = createAsyncThunk<Job[], number, { rejectValue: string, state: { jobs: JobsState } }>(
  'jobs/fetchJobListings',
  async (page, { rejectWithValue, getState }) => {
    const { filters } = getState().jobs;
    try {
      const response = await axios.post(
        'https://api.weekday.technology/adhoc/getSampleJdJSON', 
        { limit: 10, offset: (page - 1) * 10, filters }, 
        { headers: { 'Content-Type': 'application/json' } }
      );
      const jdList = response.data.jdList;
      return jdList.map((job) => ({
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
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setExperienceFilter: (state, action: PayloadAction<string[]>) => {
      state.filters.experience = action.payload;
    },
    setBaseSalaryFilter: (state, action: PayloadAction<string[]>) => {
      state.filters.baseSalary = action.payload;
    },
    setLocationFilter: (state, action: PayloadAction<string[]>) => {
      state.filters.location = action.payload;
    },
    setRoleFilter: (state, action: PayloadAction<string[]>) => {
      state.filters.role = action.payload;
    },
    setCompanyNameFilter: (state, action: PayloadAction<string>) => {
      state.filters.companyName = action.payload;
    },
    filterJobs: (state) => {
      const { experience, baseSalary, location, role, companyName } = state.filters;
      state.jobs = state.allJobs.filter(job => {
        // Check if job matches experience filter
        const experienceMatch = experience.length === 0 || experience.some(range => {
          const [min, max] = range.split('-').map(Number);
          return job.minExp >= min && job.maxExp <= max;
        });
        // Check if job matches baseSalary filter
        const baseSalaryMatch = baseSalary.length === 0 || baseSalary.some(range => {
          const [min, max] = range.split('-').map(Number);
          return job.minJdSalary >= min && job.maxJdSalary <= max;
        });
        // Check if job matches other filters
        const locationMatch = location.length === 0 || location.includes(job.location);
        const roleMatch = role.length === 0 || role.includes(job.title);
        const companyNameMatch = companyName === '' || job.company.toLowerCase().includes(companyName.toLowerCase());
        // Return true if job matches all filters
        return experienceMatch && baseSalaryMatch && locationMatch && roleMatch && companyNameMatch;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobListings.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchJobListings.fulfilled, (state, action: PayloadAction<Job[]>) => {
        state.status = 'succeeded';
        // Add the new jobs to allJobs and jobs
        state.allJobs = state.allJobs.concat(action.payload);
        // Apply filters to the new jobs
        const newJobs = action.payload.filter(job =>
          (state.filters.experience.length === 0 || state.filters.experience.includes(job.minExp.toString())) &&
          (state.filters.baseSalary.length === 0 || state.filters.baseSalary.includes(job.minJdSalary.toString())) &&
          (state.filters.location.length === 0 || state.filters.location.includes(job.location)) &&
          (state.filters.role.length === 0 || state.filters.role.includes(job.title)) &&
          (state.filters.companyName === '' || job.company.toLowerCase().includes(state.filters.companyName.toLowerCase()))
        );
        // Add the new filtered jobs to the state
        state.jobs = state.jobs.concat(newJobs);
      })
      .addCase(fetchJobListings.rejected, (state, action: PayloadAction<string | undefined, string, number, { rejectValue: string }>) => {
        state.status = 'failed';
        state.error = action.payload ?? 'Failed to fetch jobs';
      });
  },
});

export const { setExperienceFilter, setBaseSalaryFilter, setLocationFilter, setRoleFilter, setCompanyNameFilter, filterJobs } = jobsSlice.actions;

export default jobsSlice.reducer;

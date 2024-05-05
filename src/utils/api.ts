// utils/api.ts
import axios from 'axios';

interface JobData {
  jdList: Job[];
  totalCount: number;
}

interface Job {
  jdUid: string;
  jdLink: string;
  jobDetailsFromCompany: string;
  maxJdSalary: number | null;
  minJdSalary: number | null;
  salaryCurrencyCode: string;
  location: string;
  minExp: number | null;
  maxExp: number | null;
  jobRole: string;
  companyName: string;
  logoUrl: string;
}

const baseURL = 'https://api.weekday.technology/adhoc/getSampleJdJSON';

export const fetchJobListings = async (limit: number, offset: number): Promise<JobData> => {
  const response = await axios.post<JobData>(baseURL, { limit, offset }, { headers: { 'Content-Type': 'application/json' } });
  return response.data;
};
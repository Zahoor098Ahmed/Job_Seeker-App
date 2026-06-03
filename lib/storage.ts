import AsyncStorage from '@react-native-async-storage/async-storage';

export const APPLIED_JOBS_KEY = 'applied_jobs_v1';

export interface JobApplication {
  id: string;
  jobId: string;
  title: string;
  company?: string;
  location?: string;
  employment_type?: string;
  status: 'applied' | 'interview' | 'accepted' | 'rejected';
  appliedAt: number;
  note?: string;
  expectedSalary?: number;
  applicantName?: string;
  applicantEmail?: string;
}

export async function loadAppliedJobs(): Promise<JobApplication[]> {
  const raw = await AsyncStorage.getItem(APPLIED_JOBS_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function saveAppliedJobs(list: JobApplication[]): Promise<void> {
  await AsyncStorage.setItem(APPLIED_JOBS_KEY, JSON.stringify(list));
}

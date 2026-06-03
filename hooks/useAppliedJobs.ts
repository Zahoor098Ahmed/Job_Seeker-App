import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { JobApplication, loadAppliedJobs, saveAppliedJobs } from '../lib/storage';

export function useAppliedJobs() {
  return useQuery<JobApplication[]>({
    queryKey: ['appliedJobs'],
    queryFn: loadAppliedJobs,
    // Ensure we fetch from storage on mount; don't provide initialData
    staleTime: 0,
    gcTime: Infinity,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });
}

type ApplyPayload = {
  job: any;
  note?: string;
  expectedSalary?: number;
  applicantName?: string;
  applicantEmail?: string;
};

export function useApplyToJob() {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: ['applyJob'],
    mutationFn: async ({ job, note, expectedSalary, applicantName, applicantEmail }: ApplyPayload) => {
      const current = (await loadAppliedJobs()) ?? [];
      const app: JobApplication = {
        id: `${job.id}`,
        jobId: `${job.id}`,
        title: job.title,
        company: job.company,
        location: job.location,
        employment_type: job.employment_type,
        status: 'applied',
        appliedAt: Date.now(),
        note,
        expectedSalary,
        applicantName,
        applicantEmail,
      };
      const next = [app, ...current.filter(j => j.id !== app.id)];
      await saveAppliedJobs(next);
      return app;
    },
    onSuccess: async (app) => {
      qc.setQueryData<JobApplication[]>(['appliedJobs'], (prev) => {
        const list = prev ?? [];
        const next = [app, ...list.filter(j => j.id !== app.id)];
        return next;
      });
    },
  });
}

export function useUpdateApplicationStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: ['updateApplicationStatus'],
    mutationFn: async ({ id, status }: { id: string; status: JobApplication['status'] }) => {
      const current = (await loadAppliedJobs()) ?? [];
      const next = current.map(j => j.id === id ? { ...j, status } : j);
      await saveAppliedJobs(next);
      return { id, status };
    },
    onSuccess: async ({ id, status }) => {
      qc.setQueryData<JobApplication[]>(['appliedJobs'], (prev) => {
        const list = prev ?? [];
        return list.map(j => j.id === id ? { ...j, status } : j);
      });
    },
  });
}

export function useDeleteApplication() {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: ['deleteApplication'],
    mutationFn: async (id: string) => {
      const current = (await loadAppliedJobs()) ?? [];
      const next = current.filter(j => j.id !== id);
      await saveAppliedJobs(next);
      return id;
    },
    onSuccess: async (id) => {
      qc.setQueryData<JobApplication[]>(['appliedJobs'], (prev) => {
        const list = prev ?? [];
        return list.filter(j => j.id !== id);
      });
    },
  });
}

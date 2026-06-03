import { useAppSelector } from '../state/store';

export type AppColors = {
  background: string;
  text: string;
  mutedText: string;
  heading: string;
  card: string;
  border: string;
  primary: string;
};

const light: AppColors = {
  background: '#F7F7F8',
  text: '#0F172A',
  mutedText: '#6B7280',
  heading: '#0F172A',
  card: '#FFFFFF',
  border: '#E5E7EB',
  primary: '#2563EB',
};

const dark: AppColors = {
  background: '#0B1220',
  text: '#F1F5F9',
  mutedText: '#9CA3AF',
  heading: '#FFFFFF',
  card: '#111827',
  border: '#1F2937',
  primary: '#60A5FA',
};

export function getThemeColors(mode: 'light' | 'dark'): AppColors {
  return mode === 'dark' ? dark : light;
}

export function useThemeColors(): AppColors {
  const mode = useAppSelector((s) => s.theme.mode);
  return getThemeColors(mode);
}

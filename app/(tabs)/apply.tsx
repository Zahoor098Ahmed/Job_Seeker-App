import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppliedJobs, useApplyToJob } from '../../hooks/useAppliedJobs';
import { getThemeColors } from '../../lib/theme';
import { useAppSelector } from '../../state/store';

export const options = {
  href: null,
};

export default function ApplyScreen() {
  const { job } = useLocalSearchParams();
  const parsedJob = job ? JSON.parse(String(job)) : null;
  const user = useAppSelector((s) => s.user);
  const themeMode = useAppSelector((s) => s.theme.mode);
  const palette = getThemeColors(themeMode);
  const { data: appliedJobs = [] } = useAppliedJobs();

  const [name, setName] = useState(user.name || '');
  const [email, setEmail] = useState(user.email || '');
  const [note, setNote] = useState('');
  const [expectedSalary, setExpectedSalary] = useState('');
  const [error, setError] = useState<string | null>(null);
  const applyMutation = useApplyToJob();
  const placeholderColor = themeMode === 'dark' ? '#CED3DA' : palette.mutedText;
  const isApplied = parsedJob ? appliedJobs.some(app => app.jobId === `${parsedJob.id}`) : false;

  if (!parsedJob) {
    return (
      <SafeAreaView style={[styles.screen, { backgroundColor: palette.background }]} edges={["top"]}>
        <View style={styles.center}> 
          <Text style={[styles.error, { color: '#dc2626' }]}>No job data found.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: palette.background }]} edges={["top"]}>
      <Text style={[styles.heading, { color: palette.heading }]}>Apply to {parsedJob.title}</Text>

      <View style={[styles.formCard, { backgroundColor: palette.card, borderColor: palette.border }]}>
        <Text style={[styles.label, { color: palette.text }]}>Full Name</Text>
        <TextInput
          placeholder="Your full name"
          value={name}
          onChangeText={setName}
          style={[styles.input, { borderColor: palette.border, color: palette.text, backgroundColor: palette.card }]}
          placeholderTextColor={placeholderColor}
        />

        <Text style={[styles.label, { color: palette.text }]}>Email</Text>
        <TextInput
          placeholder="you@example.com"
          value={email}
          onChangeText={setEmail}
          style={[styles.input, { borderColor: palette.border, color: palette.text, backgroundColor: palette.card }]}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor={placeholderColor}
        />

        <Text style={[styles.label, { color: palette.text }]}>Cover Letter</Text>
        <TextInput
          placeholder="Write a brief cover letter"
          value={note}
          onChangeText={setNote}
          style={[styles.textarea, { borderColor: palette.border, color: palette.text, backgroundColor: palette.card }]}
          multiline
          placeholderTextColor={placeholderColor}
        />

        <Text style={[styles.label, { color: palette.text }]}>Expected Salary</Text>
        <TextInput
          placeholder="Optional"
          value={expectedSalary}
          onChangeText={setExpectedSalary}
          style={[styles.input, { borderColor: palette.border, color: palette.text, backgroundColor: palette.card }]}
          keyboardType="numeric"
          placeholderTextColor={placeholderColor}
        />

        {isApplied ? (
          <Text style={[styles.error, { color: '#10b981' }]}>You already applied to this job.</Text>
        ) : null}
        {error ? <Text style={styles.error}>{error}</Text> : null}

        <View style={styles.actions}>
          <TouchableOpacity style={[styles.cancelBtn, { borderColor: palette.border }]} onPress={() => router.back()}>
            <Text style={[styles.cancelText, { color: palette.text }]}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.submitBtn, { backgroundColor: isApplied ? palette.border : palette.primary }]}
            disabled={isApplied || applyMutation.isPending}
            onPress={async () => {
              if (isApplied) return;
              if (!name.trim() || !email.trim()) {
                setError('Name and email are required');
                return;
              }
              setError(null);
              await applyMutation.mutateAsync({
                job: parsedJob,
                note: note.trim() || undefined,
                expectedSalary: expectedSalary ? Number(expectedSalary) : undefined,
                applicantName: name.trim(),
                applicantEmail: email.trim(),
              });
              router.push('/(tabs)/applied');
            }}
            activeOpacity={0.9}
          >
            <Text style={[styles.submitText, { color: isApplied ? palette.mutedText : '#ffffff' }]}>
              {isApplied ? 'Already Applied' : 'Submit Application'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 16,
    paddingTop: 24,
  },
  heading: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 16,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formCard: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
  },
  textarea: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 16,
  },
  cancelBtn: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: 'transparent',
  },
  cancelText: {
    fontWeight: '600',
  },
  submitBtn: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
  },
  submitText: {
    color: '#ffffff',
    fontWeight: '700',
  },
  error: {
    marginTop: 10,
    color: '#dc2626',
    fontWeight: '600',
  },
});

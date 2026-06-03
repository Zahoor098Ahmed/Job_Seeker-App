import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppliedJobs } from '../../hooks/useAppliedJobs';
import { getThemeColors } from '../../lib/theme';
import { useAppSelector } from '../../state/store';

export const options = {
  href: null,
};

export default function JobDetail() {
  const { job } = useLocalSearchParams();
  const parsedJob = job ? JSON.parse(String(job)) : null;
  const { data: appliedJobs = [] } = useAppliedJobs();
  const mode = useAppSelector((s) => s.theme.mode);
  const palette = getThemeColors(mode);
  const isApplied = parsedJob ? appliedJobs.some(app => app.jobId === `${parsedJob.id}`) : false;

  if (!parsedJob) {
    return (
      <View style={[styles.center, { backgroundColor: palette.background }]}>
        <Ionicons name="alert-circle-outline" size={48} color={palette.mutedText} />
        <Text style={[styles.error, { color: palette.mutedText }]}>No job data found.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: palette.background }]} edges={["top"]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={[styles.backBtn, { borderColor: palette.border }]}>
          <Ionicons name="arrow-back" size={24} color={palette.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: palette.text }]}>Job Details</Text>
        <TouchableOpacity style={[styles.shareBtn, { borderColor: palette.border }]}>
          <Ionicons name="share-outline" size={24} color={palette.text} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={[styles.topCard, { backgroundColor: palette.card, borderColor: palette.border }]}>
          <View style={[styles.logoBox, { backgroundColor: palette.primary + '10' }]}>
            <Ionicons name="briefcase" size={32} color={palette.primary} />
          </View>
          <Text style={[styles.title, { color: palette.text }]}>{parsedJob.title}</Text>
          <Text style={[styles.company, { color: palette.mutedText }]}>{parsedJob.company}</Text>
          
          <View style={styles.badgeRow}>
            <View style={[styles.chip, { backgroundColor: palette.primary + '10' }]}>
              <Text style={[styles.chipText, { color: palette.primary }]}>{parsedJob.employment_type}</Text>
            </View>
            <View style={[styles.chip, { backgroundColor: '#10b98110' }]}>
              <Text style={[styles.chipText, { color: '#10b981' }]}>{parsedJob.location}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: palette.text }]}>Salary Range</Text>
          <View style={[styles.infoCard, { backgroundColor: palette.card, borderColor: palette.border }]}>
            <Ionicons name="cash-outline" size={24} color={palette.primary} />
            <Text style={[styles.salaryValue, { color: palette.text }]}>
              ${parsedJob.salary_from?.toLocaleString()} - ${parsedJob.salary_to?.toLocaleString()}
            </Text>
            <Text style={[styles.salaryLabel, { color: palette.mutedText }]}>/ Monthly</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: palette.text }]}>Job Description</Text>
          <View style={[styles.descCard, { backgroundColor: palette.card, borderColor: palette.border }]}>
            <Text style={[styles.descText, { color: palette.text }]}>
              {parsedJob.description || 'Join our team as a ' + parsedJob.title + '. We are looking for a dedicated professional to help us grow and innovate.'}
            </Text>
          </View>
        </View>

        {isApplied && (
          <View style={[styles.appliedBanner, { backgroundColor: '#10b98110', borderColor: '#10b98130' }]}>
            <Ionicons name="checkmark-circle" size={20} color="#10b981" />
            <Text style={[styles.appliedBannerText, { color: '#10b981' }]}>You have already applied for this position</Text>
          </View>
        )}
      </ScrollView>

      <View style={[styles.footer, { backgroundColor: palette.card, borderTopColor: palette.border }]}>
        <TouchableOpacity 
          style={[styles.bookmarkBtn, { borderColor: palette.border }]}
        >
          <Ionicons name="bookmark-outline" size={24} color={palette.mutedText} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.applyButton, { backgroundColor: isApplied ? palette.border : palette.primary }]}
          disabled={isApplied}
          onPress={() => {
            if (isApplied) return;
            router.push({ pathname: '/(tabs)/apply', params: { job: JSON.stringify(parsedJob) } });
          }}
        >
          <Text style={[styles.applyText, { color: isApplied ? palette.mutedText : '#FFFFFF' }]}>
            {isApplied ? 'Application Sent' : 'Apply Now'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 20,
    paddingBottom: 100,
  },
  topCard: {
    alignItems: 'center',
    padding: 24,
    borderRadius: 24,
    borderWidth: 1,
    marginBottom: 24,
  },
  logoBox: {
    width: 72,
    height: 72,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  company: {
    fontSize: 16,
    marginTop: 4,
    marginBottom: 16,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 10,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    gap: 12,
  },
  salaryValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  salaryLabel: {
    fontSize: 14,
  },
  descCard: {
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
  },
  descText: {
    fontSize: 15,
    lineHeight: 24,
  },
  appliedBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    gap: 10,
    marginBottom: 24,
  },
  appliedBannerText: {
    fontSize: 14,
    fontWeight: '600',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    padding: 20,
    paddingBottom: 34,
    borderTopWidth: 1,
    gap: 12,
  },
  bookmarkBtn: {
    width: 56,
    height: 56,
    borderRadius: 16,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  applyButton: {
    flex: 1,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  applyText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  error: {
    fontSize: 16,
    fontWeight: '500',
  },
});

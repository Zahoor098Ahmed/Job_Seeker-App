import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { getThemeColors } from '../lib/theme';
import { useAppSelector } from '../state/store';

export default function About() {
  const mode = useAppSelector((s) => s.theme.mode);
  const palette = getThemeColors(mode);
  return (
    <ScrollView style={[styles.container, { backgroundColor: palette.background }]}>
      <View style={styles.header}>
        <Ionicons name="information-circle" size={60} color={palette.primary} />
        <Text style={[styles.title, { color: palette.heading }]}>About Job Seeker</Text>
      </View>

      <View style={styles.content}>
        <Text style={[styles.description, { color: palette.mutedText }]}>
          Job Seeker is a mobile application designed to help you discover, explore, and track job opportunities effortlessly.
        </Text>

        <View style={[styles.section, { backgroundColor: palette.card, borderColor: palette.border }]}>
          <Text style={[styles.sectionTitle, { color: palette.text }]}>✨ Key Features</Text>
          <Text style={[styles.featureItem, { color: palette.mutedText }]}>• Browse jobs from various industries</Text>
          <Text style={[styles.featureItem, { color: palette.mutedText }]}>• View detailed job descriptions</Text>
          <Text style={[styles.featureItem, { color: palette.mutedText }]}>• Track applied jobs easily</Text>
          <Text style={[styles.featureItem, { color: palette.mutedText }]}>• Manage your job search progress</Text>
          <Text style={[styles.featureItem, { color: palette.mutedText }]}>• Professional profile management</Text>
        </View>

        <View style={[styles.section, { backgroundColor: palette.card, borderColor: palette.border }]}>
          <Text style={[styles.sectionTitle, { color: palette.text }]}>🎯 Our Mission</Text>
          <Text style={[styles.bodyText, { color: palette.mutedText }]}>
            We aim to simplify your job search journey by providing an intuitive platform where you can discover opportunities that match your skills and aspirations.
          </Text>
        </View>

        <View style={[styles.section, { backgroundColor: palette.card, borderColor: palette.border }]}>
          <Text style={[styles.sectionTitle, { color: palette.text }]}>💡 How It Works</Text>
          <Text style={[styles.bodyText, { color: palette.mutedText }]}>
            1. Browse through available job listings in the Home tab
          </Text>
          <Text style={[styles.bodyText, { color: palette.mutedText }]}>
            2. Click on any job to view detailed information
          </Text>
          <Text style={[styles.bodyText, { color: palette.mutedText }]}>
            3. Apply to jobs and track them in the Applied tab
          </Text>
          <Text style={[styles.bodyText, { color: palette.mutedText }]}>
            4. Manage your profile and preferences in the Profile tab
          </Text>
        </View>

        <View style={[styles.section, { backgroundColor: palette.card, borderColor: palette.border }]}>
          <Text style={[styles.sectionTitle, { color: palette.text }]}>📝 Version</Text>
          <Text style={[styles.bodyText, { color: palette.mutedText }]}>Job Seeker v1.0.0</Text>
        </View>

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: palette.mutedText }]}>
            Made with ❤️ for job seekers everywhere
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    backgroundColor: 'transparent',
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 15,
  },
  content: {
    padding: 20,
  },
  description: {
    fontSize: 16,
    color: '#4b5563',
    lineHeight: 24,
    marginBottom: 25,
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#ffffff',
    padding: 18,
    marginBottom: 15,
    borderRadius: 12,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 12,
  },
  featureItem: {
    fontSize: 14,
    color: '#4b5563',
    marginBottom: 8,
    lineHeight: 20,
  },
  bodyText: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 22,
    marginBottom: 10,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    fontSize: 14,
    color: '#9ca3af',
    fontStyle: 'italic',
  },
});

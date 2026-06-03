import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useMemo } from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppliedJobs } from '../../hooks/useAppliedJobs';
import { useAppDispatch, useAppSelector } from '../../state/store';
import { toggleTheme } from '../../state/themeSlice';

export default function Profile() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.user);
  const themeMode = useAppSelector((s) => s.theme.mode);
  const { data: appliedJobs = [] } = useAppliedJobs();

  const stats = useMemo(() => {
    return {
      applied: appliedJobs.length,
      interviews: appliedJobs.filter(j => j.status === 'interview').length,
      offers: appliedJobs.filter(j => j.status === 'accepted').length,
    };
  }, [appliedJobs]);

  const colors = themeMode === 'dark'
  
    ? { background: '#0B1220', text: '#F1F5F9', primary: '#60A5FA', card: '#111827', border: '#1F2937', muted: '#9CA3AF', secondary: '#1E293B' }
    : { background: '#F7F7F8', text: '#0F172A', primary: '#2563EB', card: '#FFFFFF', border: '#E5E7EB', muted: '#6B7280', secondary: '#F1F5F9' };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: colors.background }]} edges={["top"]}>
      <View style={styles.header}>
        <Text style={[styles.heading, { color: colors.text }]}>Profile</Text>
        <TouchableOpacity 
          style={[styles.themeToggle, { backgroundColor: colors.card, borderColor: colors.border }]}
          onPress={() => dispatch(toggleTheme())}
        >
          <Ionicons name={themeMode === 'light' ? 'moon' : 'sunny'} size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.content}>
        <View style={[styles.profileCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={[styles.avatarContainer, { backgroundColor: colors.primary + '15', borderColor: colors.primary + '30' }]}>
            <Text style={[styles.avatarText, { color: colors.primary }]}>{getInitials(user.name)}</Text>
            <TouchableOpacity style={styles.editAvatarBtn}>
              <Ionicons name="camera" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          
          <Text style={[styles.userName, { color: colors.text }]}>{user.name}</Text>
          <Text style={[styles.userRole, { color: colors.muted }]}>{user.role || 'Professional'}</Text>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: colors.text }]}>{stats.applied}</Text>
              <Text style={[styles.statLabel, { color: colors.muted }]}>Applied</Text>
            </View>
            <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: colors.text }]}>{stats.interviews}</Text>
              <Text style={[styles.statLabel, { color: colors.muted }]}>Interviews</Text>
            </View>
            <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: colors.text }]}>{stats.offers}</Text>
              <Text style={[styles.statLabel, { color: colors.muted }]}>Offers</Text>
            </View>
          </View>
        </View>

        <View style={styles.infoSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Personal Information</Text>
          <View style={[styles.infoCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.infoRow}>
              <View style={[styles.iconBox, { backgroundColor: colors.primary + '10' }]}>
                <Ionicons name="mail" size={18} color={colors.primary} />
              </View>
              <View style={styles.infoTextContainer}>
                <Text style={[styles.infoLabel, { color: colors.muted }]}>Email</Text>
                <Text style={[styles.infoValue, { color: colors.text }]}>{user.email}</Text>
              </View>
            </View>
            
            <View style={[styles.rowDivider, { backgroundColor: colors.border }]} />
            
            <View style={styles.infoRow}>
              <View style={[styles.iconBox, { backgroundColor: colors.primary + '10' }]}>
                <Ionicons name="location" size={18} color={colors.primary} />
              </View>
              <View style={styles.infoTextContainer}>
                <Text style={[styles.infoLabel, { color: colors.muted }]}>Location</Text>
                <Text style={[styles.infoValue, { color: colors.text }]}>{user.location || 'Not specified'}</Text>
              </View>
            </View>
          </View>
        </View>

        <TouchableOpacity 
          style={[styles.editProfileBtn, { backgroundColor: colors.primary }]}
          onPress={() => router.push('/edit-profile')}
        >
          <Text style={styles.editProfileBtnText}>Edit Profile</Text>
          <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 24,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  themeToggle: {
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
  },
  content: {
    flex: 1,
  },
  profileCard: {
    padding: 24,
    borderRadius: 24,
    borderWidth: 1,
    alignItems: 'center',
    marginBottom: 24,
    elevation: 2,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    position: 'relative',
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  editAvatarBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#2563EB',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  userRole: {
    fontSize: 15,
    marginTop: 4,
    fontWeight: '500',
  },
  statsRow: {
    flexDirection: 'row',
    marginTop: 24,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 30,
    marginHorizontal: 10,
  },
  infoSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  infoCard: {
    borderRadius: 20,
    borderWidth: 1,
    overflow: 'hidden',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 16,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoTextContainer: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 15,
    fontWeight: '600',
    marginTop: 2,
  },
  rowDivider: {
    height: 1,
    marginHorizontal: 16,
  },
  editProfileBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    gap: 8,
    marginTop: 'auto',
    marginBottom: 20,
    elevation: 4,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  editProfileBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
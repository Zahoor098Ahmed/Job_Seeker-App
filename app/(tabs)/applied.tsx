import { Ionicons } from '@expo/vector-icons';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppliedJobs, useDeleteApplication, useUpdateApplicationStatus } from '../../hooks/useAppliedJobs';
import { getThemeColors } from '../../lib/theme';
import { useAppSelector } from '../../state/store';

export default function Applied() {
  const mode = useAppSelector((s) => s.theme.mode);
  const palette = getThemeColors(mode);
  const { data } = useAppliedJobs();
  const updateStatus = useUpdateApplicationStatus();
  const deleteApp = useDeleteApplication();
  const statuses: Array<{ key: 'applied'|'interview'|'accepted'|'rejected'; label: string; color: string; icon: string }> = [
    { key: 'applied', label: 'Applied', color: '#3b82f6', icon: 'send' },
    { key: 'interview', label: 'Interview', color: '#f59e0b', icon: 'people' },
    { key: 'accepted', label: 'Accepted', color: '#10b981', icon: 'checkmark-circle' },
    { key: 'rejected', label: 'Rejected', color: '#ef4444', icon: 'close-circle' },
  ];

  const getStatusInfo = (status: string) => {
    return statuses.find(s => s.key === status) || statuses[0];
  };

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: palette.background }]} edges={["top"]}>
      <View style={styles.header}>
        <Text style={[styles.heading, { color: palette.heading }]}>My Applications</Text>
        <View style={[styles.badge, { backgroundColor: palette.primary + '15' }]}>
          <Text style={[styles.badgeText, { color: palette.primary }]}>{data?.length || 0}</Text>
        </View>
      </View>

      {!data || data.length === 0 ? (
        <View style={styles.emptyState}>
          <View style={[styles.emptyIconContainer, { backgroundColor: palette.card }]}>
            <Ionicons name="document-text-outline" size={48} color={palette.border} />
          </View>
          <Text style={[styles.emptyTitle, { color: palette.text }]}>No Applications Yet</Text>
          <Text style={[styles.emptySubtitle, { color: palette.mutedText }]}>
            When you apply for jobs, they will appear here for you to track.
          </Text>
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 24 }}
          renderItem={({ item }) => {
            const currentStatus = getStatusInfo(item.status);
            return (
              <View style={[styles.card, { backgroundColor: palette.card, borderColor: palette.border }]}>
                <View style={styles.cardHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.title, { color: palette.text }]} numberOfLines={1}>{item.title}</Text>
                    <Text style={[styles.company, { color: palette.mutedText }]}>{item.company || 'Unknown Company'}</Text>
                  </View>
                  <TouchableOpacity
                    style={[styles.deleteBtn, { backgroundColor: '#fee2e2' }]}
                    onPress={() => deleteApp.mutate(item.id)}
                  >
                    <Ionicons name="trash-outline" size={18} color="#ef4444" />
                  </TouchableOpacity>
                </View>

                <View style={styles.statusSection}>
                  <Text style={[styles.sectionLabel, { color: palette.mutedText }]}>Track Progress</Text>
                  <View style={styles.statusRow}>
                    {statuses.map(s => (
                      <TouchableOpacity
                        key={s.key}
                        onPress={() => updateStatus.mutate({ id: item.id, status: s.key })}
                        style={[
                          styles.statusChip, 
                          { 
                            backgroundColor: item.status === s.key ? s.color : 'transparent',
                            borderColor: item.status === s.key ? s.color : palette.border
                          }
                        ]}
                      >
                        <Text style={[
                          styles.statusText, 
                          { color: item.status === s.key ? '#ffffff' : palette.mutedText }
                        ]}>{s.label}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                <View style={styles.cardFooter}>
                  <View style={styles.metaInfo}>
                    <Ionicons name="location-outline" size={14} color={palette.mutedText} />
                    <Text style={[styles.metaText, { color: palette.mutedText }]}>{item.location || 'Remote'}</Text>
                  </View>
                  <View style={[styles.currentStatusBadge, { backgroundColor: currentStatus.color + '15' }]}>
                    <Ionicons name={currentStatus.icon as any} size={12} color={currentStatus.color} />
                    <Text style={[styles.currentStatusText, { color: currentStatus.color }]}>{currentStatus.label}</Text>
                  </View>
                </View>
              </View>
            );
          }}
        />
      )}
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
    alignItems: 'center',
    gap: 12,
    marginTop: 20,
    marginBottom: 24,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  card: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  company: {
    fontSize: 14,
    marginTop: 2,
  },
  deleteBtn: {
    padding: 8,
    borderRadius: 10,
  },
  statusSection: {
    marginBottom: 16,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statusRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  statusChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  metaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
  },
  currentStatusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  currentStatusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  noteBox: {
    marginTop: 12,
    backgroundColor: '#f3f4f6',
    borderColor: '#e5e7eb',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  noteText: {
    fontSize: 13,
  },
});

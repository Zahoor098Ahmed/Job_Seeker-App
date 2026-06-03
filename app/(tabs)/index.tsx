import { Ionicons } from "@expo/vector-icons"
import { useQuery } from "@tanstack/react-query"
import { router } from "expo-router"
import { useState, useMemo } from "react"
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useAppliedJobs } from "../../hooks/useAppliedJobs"
import { getThemeColors } from "../../lib/theme"
import { useAppSelector } from "../../state/store"

export default function Home() {
    const mode = useAppSelector((s) => s.theme.mode)
    const palette = getThemeColors(mode)
    const [searchQuery, setSearchQuery] = useState("")
    
    const {data, isLoading, error} = useQuery({
        queryKey: ["job"],
        queryFn: () => fetch("https://jsonfakery.com/jobs").then(res => res.json()),
    })
    const { data: appliedJobs = [] } = useAppliedJobs()

    const filteredJobs = useMemo(() => {
        if(!data) return []
        let jobs = [...data].sort(() => Math.random() - 0.5).slice(0, 10)
        
        // Filter by search query using regex for flexible matching
        if(searchQuery.trim()) {
            const query = searchQuery.trim()
            // Create regex pattern that matches any occurrence, case-insensitive
            const regex = new RegExp(query.split('').join('.*'), 'i')
            jobs = jobs.filter((job: any) => 
                job.title && regex.test(job.title)
            )
        }
        
        return jobs
    }, [data, searchQuery])

    if(isLoading) return (
        <View style={[styles.centerContainer, { backgroundColor: palette.background }]}>
            <Text style={[styles.loadingText, { color: palette.mutedText }]}>Loading jobs...</Text>
        </View>
    )
    if(error) return (
        <View style={[styles.centerContainer, { backgroundColor: palette.background }]}>
            <Text style={styles.errorText}>Error: {(error as Error).message}</Text>
        </View>
    )

    const isJobApplied = (jobId: string) => {
        return appliedJobs.some(app => app.jobId === jobId)
    }

    return (
        <SafeAreaView style={[styles.screen, { backgroundColor: palette.background }]} edges={["top"]}>
            <View style={styles.header}>
                <View>
                    <Text style={[styles.welcomeText, { color: palette.mutedText }]}>Hello,</Text>
                    <Text style={[styles.heading, { color: palette.heading }]}>Find Your Dream Job</Text>
                </View>
                <TouchableOpacity 
                    onPress={() => router.push('/(tabs)/profile')}
                    style={[styles.profileButton, { borderColor: palette.border }]}
                >
                    <Ionicons name="person-circle-outline" size={32} color={palette.primary} />
                </TouchableOpacity>
            </View>
            
            {/* Search Input */}
            <View style={[styles.searchContainer, { backgroundColor: palette.card, borderColor: palette.border, shadowColor: palette.text }]}>
                <Ionicons name="search" size={20} color={palette.primary} />
                <TextInput
                    style={[styles.searchInput, { color: palette.text }]}
                    placeholder="Search jobs, companies..."
                    placeholderTextColor={palette.mutedText}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                {searchQuery.length > 0 && (
                    <TouchableOpacity onPress={() => setSearchQuery("")}>
                        <Ionicons name="close-circle" size={20} color={palette.mutedText} />
                    </TouchableOpacity>
                )}
            </View>
            
            <FlatList 
                data={filteredJobs}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => 
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => router.push({
                        pathname: '/(tabs)/job-detail',
                        params: { job: JSON.stringify(item) }
                    })}
                    style={[styles.jobCard, { backgroundColor: palette.card, borderColor: palette.border }]}
                >
                    <View style={styles.cardTop}>
                        <View style={[styles.logoPlaceholder, { backgroundColor: palette.primary + '10' }]}>
                            <Ionicons name="briefcase" size={24} color={palette.primary} />
                        </View>
                        <View style={{ flex: 1, marginLeft: 12 }}>
                            <Text style={[styles.jobTitle, { color: palette.text }]} numberOfLines={1}>{item.title}</Text>
                            <Text style={[styles.company, { color: palette.mutedText }]}>{item.company}</Text>
                        </View>
                        <TouchableOpacity>
                            <Ionicons name="bookmark-outline" size={20} color={palette.mutedText} />
                        </TouchableOpacity>
                    </View>
                    
                    <View style={styles.cardMiddle}>
                        <View style={styles.tag}>
                            <Ionicons name="location-outline" size={14} color={palette.mutedText} />
                            <Text style={[styles.tagText, { color: palette.mutedText }]}>{item.location}</Text>
                        </View>
                        <View style={[styles.tag, { backgroundColor: palette.primary + '15' }]}>
                            <Text style={[styles.tagText, { color: palette.primary, fontWeight: '600' }]}>{item.employment_type}</Text>
                        </View>
                    </View>

                    <View style={styles.cardBottom}>
                        <Text style={[styles.salary, { color: palette.text }]}>
                            <Text style={{ fontSize: 14, fontWeight: '400', color: palette.mutedText }}>Salary: </Text>
                            ${item.salary_from?.toLocaleString()}
                        </Text>
                        {isJobApplied(item.id) ? (
                            <View style={[styles.appliedBadge, { backgroundColor: '#10b98120' }]}>
                                <Text style={styles.appliedText}>Applied</Text>
                            </View>
                        ) : (
                            <Text style={[styles.timeText, { color: palette.mutedText }]}>2h ago</Text>
                        )}
                    </View>
                </TouchableOpacity>
                }
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Ionicons name="search-outline" size={64} color={palette.border} />
                        <Text style={[styles.emptyText, { color: palette.mutedText }]}>No jobs found</Text>
                    </View>
                }
            />
        </SafeAreaView>
    )
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
    welcomeText: {
        fontSize: 16,
        fontWeight: '500',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 4,
    },
    profileButton: {
        padding: 4,
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        fontSize: 16,
    },
    errorText: {
        fontSize: 16,
        color: '#ef4444',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 16,
        borderWidth: 1,
        marginBottom: 24,
        gap: 12,
        elevation: 2,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 15,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
    },
    listContent: {
        paddingBottom: 20,
    },
    jobCard: {
        borderRadius: 20,
        padding: 16,
        borderWidth: 1,
        marginBottom: 16,
        elevation: 1,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.04,
        shadowRadius: 10,
    },
    cardTop: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    logoPlaceholder: {
        width: 48,
        height: 48,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    jobTitle: {
        fontSize: 18,
        fontWeight: '700',
    },
    company: {
        fontSize: 14,
        marginTop: 2,
    },
    cardMiddle: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 16,
    },
    tag: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 8,
        gap: 4,
    },
    tagText: {
        fontSize: 13,
    },
    cardBottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#f1f5f9',
    },
    salary: {
        fontSize: 18,
        fontWeight: '700',
    },
    timeText: {
        fontSize: 12,
    },
    appliedBadge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    appliedText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#10b981',
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100,
    },
    emptyText: {
        fontSize: 16,
        marginTop: 16,
        fontWeight: '500',
    },
});
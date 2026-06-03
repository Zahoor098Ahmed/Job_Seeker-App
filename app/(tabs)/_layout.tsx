import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getThemeColors } from '../../lib/theme';
import { useAppSelector } from '../../state/store';

export default function TabsLayout() {
  const mode = useAppSelector((s) => s.theme.mode);
  const palette = getThemeColors(mode);
  const inactive = palette.mutedText;
  const insets = useSafeAreaInsets();
  const bottomInset = Math.max(insets.bottom, 0);
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: palette.primary,
        tabBarInactiveTintColor: inactive,
        tabBarStyle: {
          backgroundColor: palette.card,
          borderTopWidth: 1,
          borderTopColor: palette.border,
          // Lift the tab bar above system nav/home indicator when present
          paddingBottom: Math.max(bottomInset, 8),
          paddingTop: 8,
          height: 60 + bottomInset,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="applied"
        options={{
          title: 'Applied Jobs',
          tabBarLabel: 'Applied',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="briefcase" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
      {/* Hide detail route from tab bar */}
      <Tabs.Screen
        name="job-detail"
        options={{
          href: null,
          title: 'Job Details',
        }}
      />
      {/* Hide apply route from tab bar */}
      <Tabs.Screen
        name="apply"
        options={{
          href: null,
          title: 'Apply',
        }}
      />
    </Tabs>
  );
}

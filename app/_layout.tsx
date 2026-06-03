import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { View, Text, StyleSheet } from "react-native";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";

import { getThemeColors } from "../lib/theme";
import { store, useAppSelector } from "../state/store";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

/* ---------------- Custom Drawer UI ---------------- */
function CustomDrawerContent(props: any) {
  const mode = useAppSelector((s) => s.theme.mode);
  const palette = getThemeColors(mode);

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: palette.card }]}>
        <Text style={[styles.title, { color: palette.heading }]}>
          Job Seeker
        </Text>
        <Text style={[styles.subtitle, { color: palette.text }]}>
          Find your next opportunity 🚀
        </Text>
      </View>

      {/* Drawer Items */}
      <View style={styles.items}>
        <DrawerItemList {...props} />
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: palette.text }]}>
          Version 1.0.0
        </Text>
        <Text style={[styles.footerText, { color: palette.text }]}>
          © 2026 Job Seeker App
        </Text>
      </View>
    </DrawerContentScrollView>
  );
}

/* ---------------- Drawer Wrapper ---------------- */
function DrawerWrapper() {
  const mode = useAppSelector((s) => s.theme.mode);
  const palette = getThemeColors(mode);
  const insets = useSafeAreaInsets();

  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: palette.card,
        },
        headerTintColor: palette.heading,
        headerTitleStyle: {
          fontWeight: "bold",
        },
        drawerStyle: {
          marginTop: insets.top,
          backgroundColor: palette.card,
        },
        drawerActiveTintColor: palette.text,
        drawerInactiveTintColor: palette.text,
        drawerActiveBackgroundColor:
          mode === "dark" ? "#1f2937" : "#e5e7eb",
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          drawerItemStyle: { display: "none" },
        }}
      />
      <Drawer.Screen
        name="(tabs)"
        options={{
          drawerLabel: "Home",
          title: "Job Seeker",
        }}
      />
      <Drawer.Screen
        name="about"
        options={{
          drawerLabel: "About",
          title: "About",
        }}
      />
      <Drawer.Screen
        name="edit-profile"
        options={{
          drawerLabel: "Edit Profile",
          title: "Edit Profile",
        }}
      />
    </Drawer>
  );
}

/* ---------------- Root Layout ---------------- */
export default function RootLayout() {
  const queryClient = new QueryClient();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <DrawerWrapper />
          </QueryClientProvider>
        </Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

/* ---------------- Styles ---------------- */
const styles = StyleSheet.create({
  header: {
    paddingVertical: 32,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 14,
    marginTop: 4,
    opacity: 0.8,
  },
  items: {
    flex: 1,
    paddingTop: 8,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },
  footerText: {
    fontSize: 12,
    opacity: 0.6,
  },
});

import { Redirect } from 'expo-router';

export const options = {
  // Hide this route from the drawer/nav lists
  drawerItemStyle: { display: 'none' },
};

export default function IndexRedirect() {
  return <Redirect href="/(tabs)" />;
}
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { theme } from '../../../utils/theme'; // Import theme

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.primary[600], // Use theme color
          borderBottomLeftRadius: 16,
          borderBottomRightRadius: 16,
          height: 95,
        },
        headerTitle: 'ligtascab.',
        headerTitleStyle: {
          fontFamily: theme.typography.fontFamily.primary.bold, // Use theme font
          color: theme.colors.white, // Use theme color
          fontSize: 24,
        },
        tabBarActiveTintColor: theme.colors.primary[600], // Use theme color
        tabBarInactiveTintColor: theme.colors.gray[500], // Add inactive color
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Feather name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: 'Scan',
          tabBarIcon: ({ color }) => <MaterialIcons name="qr-code" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}

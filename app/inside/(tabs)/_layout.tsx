import { Feather, FontAwesome5, MaterialIcons,  } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { theme } from '../../../utils/theme';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.primary[600],
          borderBottomLeftRadius: 16,
          borderBottomRightRadius: 16,
          height: 95,
        },
        headerTitle: 'ligtascab.',
        headerTitleStyle: {
          fontFamily: theme.typography.fontFamily.secondary.bold,
          color: theme.colors.white,
          fontSize: 24,
        },
        tabBarActiveTintColor: theme.colors.primary[600],
        tabBarInactiveTintColor: theme.colors.gray[500],
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <MaterialIcons name="home-filled" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: 'Scan',
          tabBarIcon: ({ color }) => <MaterialIcons name="qr-code" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ color }) => <MaterialIcons name="history" size={24} color={color} />,
        }}
      /> </Tabs>

  );
}

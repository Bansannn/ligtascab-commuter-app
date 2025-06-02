import { Feather, MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1daa88',
          borderBottomLeftRadius: 16,
          borderBottomRightRadius: 16,
          height: 95,
        },
        headerTitle: 'ligtascab.',
        headerTitleStyle: { color: '#ffffff', fontWeight: '700', fontSize: 24 },
        tabBarActiveTintColor: '#1daa88',
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

import { Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { theme } from '../../utils/theme'; // Import theme

const queryClient = new QueryClient();

export default function InsideLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="in-ride"
          options={{
            headerTransparent: true,
            headerBackVisible: false,
            headerStyle: {
              backgroundColor: theme.colors.white, // Use theme color
            },
            headerTitle: 'ligtascab.',
            headerTitleStyle: {
              fontFamily: theme.typography.fontFamily.primary.bold, // Use theme font
              color: theme.colors.primary[600], // Use theme color
              fontSize: 24,
            },
          }}
        />
      </Stack>
    </QueryClientProvider>
  );
}

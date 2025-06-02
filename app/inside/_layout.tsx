import { Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { theme } from '../../utils/theme';

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
              backgroundColor: theme.colors.white,
            },
            headerTitle: 'ligtascab.',
            headerTitleStyle: {
              fontFamily: theme.typography.fontFamily.secondary.bold,
              color: theme.colors.primary[600],
              fontSize: 24,
            },
          }}
        />
      </Stack>
    </QueryClientProvider>
  );
}

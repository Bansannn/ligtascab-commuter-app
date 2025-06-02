import { Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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
              backgroundColor: '#ffffff',
            },
            headerTitle: 'ligtascab.',
            headerTitleStyle: { color: '#1daa88', fontWeight: '700', fontSize: 24 },
          }}
        />
      </Stack>
    </QueryClientProvider>
  );
}

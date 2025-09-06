import { Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { theme } from '~/src/theme/theme';
import AuthenticatedViewOnly from '~/src/components/authWrapper/AuthenticatedViewOnly';
import { RideProvider } from '~/src/contexts/RideContext';

const queryClient = new QueryClient();

export default function PrivateLayout() {
  return (
    <AuthenticatedViewOnly>
      <RideProvider>
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
      </RideProvider>
    </AuthenticatedViewOnly>
  );
}

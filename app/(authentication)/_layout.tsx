import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AppState, Platform } from 'react-native';
import GuestViewOnly from '~/src/components/authWrapper/GuestViewOnly';
import { supabase } from '~/src/services/supabase';
import { theme } from '~/src/theme/theme';
export { ErrorBoundary } from 'expo-router';

AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function AuthLayout() {
  const router = useRouter();
  return (
    <GuestViewOnly>
      <StatusBar />
      <Stack
        screenOptions={{
          headerTintColor: theme.colors.primary[500],
          headerStyle: { backgroundColor: theme.colors.white },
          headerShadowVisible: false,
          headerTitle: '',
        }}>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
            animation: Platform.OS === 'ios' ? 'ios_from_left' : 'slide_from_left',
          }}
        />
        {/* <Stack.Screen
          name="login"
          options={{
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.push('/')}>
                <ArrowLeft style={{ paddingHorizontal: 16 }} />
              </TouchableOpacity>
            ),
            animation: Platform.OS === 'ios' ? 'ios_from_right' : 'slide_from_right',
          }}
        /> */}
      </Stack>
    </GuestViewOnly>
  );
}

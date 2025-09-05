import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { useAuth } from '~/src/hooks/useAuth';
import Spinner from '../ui/spinner';

export default function AuthenticatedViewOnly({ children }: { children: React.ReactNode }) {
  const { session, authChecked } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (authChecked && session === null) {
      router.replace('/(authentication)');
    }
  }, [authChecked, router, session]);

  if (!authChecked || !session) {
    return <Spinner />;
  }

  return children;
}

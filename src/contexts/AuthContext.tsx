import { Session, User } from '@supabase/supabase-js';
import { useRouter } from 'expo-router';
import { createContext, useEffect, useState } from 'react';
import { supabase } from '../services/supabase';

type AuthContextType = {
  signInWithPhoneNumber: (phone_number: string, password: string) => void;
  signOutUser: () => void;
  session: Session | null;
  user: User | null;
  authChecked: boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const router = useRouter();

  async function getInitialUserValue() {
    try {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
      });

      const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
      });

      return () => {
        listener.subscription.unsubscribe();
      };
    } catch (error) {
      console.log(error);
      setSession(null);
    } finally {
      setAuthChecked(true);
    }
  }

  useEffect(() => {
    getInitialUserValue();
  }, []);

  async function signInWithPhoneNumber(phone_number: string, password: string) {
    const { error } = await supabase.auth.signInWithPassword({
      phone: phone_number,
      password: password,
    });

    if (error) return error.message;
    router.push('/(private)/(tabs)/home');
  }

  async function signOutUser() {
    const { error } = await supabase.auth.signOut();
    if (error) return error.message;
    setSession(null);
  }

  return (
    <AuthContext.Provider
      value={{
        session,
        user: session?.user ?? null,
        signInWithPhoneNumber,
        signOutUser,
        authChecked,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

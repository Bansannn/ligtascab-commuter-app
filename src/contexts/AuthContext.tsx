import { Session } from '@supabase/supabase-js';
import { useRouter } from 'expo-router';
import { createContext, useEffect, useState } from 'react';
import { supabase } from '../services/supabase';
import { Commuter } from '../types';
import { fetchCommuterDetails } from '../services/db';

type AuthContextType = {
  signInWithPhoneNumber: (phone_number: string, password: string) => Promise<string | void>;
  signOutUser: () => Promise<string | void>;
  session: Session | null;
  user: Commuter | null;
  authChecked: boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<Commuter | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);

      const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
      });

      return () => {
        listener.subscription.unsubscribe();
      };
    };

    init().finally(() => {
      setAuthChecked(true);
    });
  }, []);

  useEffect(() => {
    const loadCommuter = async () => {
      if (session?.user?.id) {
        const { data: commuter, error } = await fetchCommuterDetails(session.user.id);
        if (!error) {
          setUser(commuter);
        } else {
          console.error('Failed to fetch commuter:', error.message);
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    loadCommuter();
  }, [session]);

  async function signInWithPhoneNumber(phone_number: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      phone: phone_number,
      password: password,
    });

    if (error) return error.message;

    if (data?.user) {
      const { data: commuter } = await fetchCommuterDetails(data.user.id);
      setUser(commuter);
    }

    router.push('/(private)/(tabs)/home');
  }

  async function signOutUser() {
    const { error } = await supabase.auth.signOut();
    if (error) return error.message;
    setSession(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        signInWithPhoneNumber,
        signOutUser,
        authChecked,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

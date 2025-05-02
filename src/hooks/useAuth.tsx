
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session } from '@supabase/supabase-js';
import { toast } from 'sonner';

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        setSession(currentSession);
        setLoading(false);
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        toast.error('Login failed: ' + error.message);
        return false;
      }
      
      toast.success('Login successful');
      return true;
    } catch (error: any) {
      toast.error('Login failed: ' + error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    setLoading(true);
    try {
      await supabase.auth.signOut();
      toast.success('Logged out successfully');
    } catch (error: any) {
      toast.error('Logout failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    session,
    user: session?.user,
    loading,
    login,
    logout,
    isLoggedIn: !!session
  };
}

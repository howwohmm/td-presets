
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface BackgroundMusic {
  id: string;
  title: string;
  file_url: string;
  is_active: boolean;
  created_at: string;
}

export function useBackgroundMusic() {
  const [backgroundMusic, setBackgroundMusic] = useState<BackgroundMusic | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchActiveBackgroundMusic() {
      try {
        setLoading(true);
        
        // Query the background_music table for the active music
        const { data, error } = await supabase
          .from('background_music')
          .select('*')
          .eq('is_active', true)
          .order('created_at', { ascending: false })
          .limit(1)
          .single();
          
        if (error) throw error;
        
        setBackgroundMusic(data as BackgroundMusic);
      } catch (err: any) {
        console.error('Error fetching background music:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchActiveBackgroundMusic();
    
    // Set up a subscription for real-time updates
    const subscription = supabase
      .channel('background_music_changes')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'background_music',
          filter: 'is_active=eq.true'
        }, 
        (payload) => {
          // Refresh the background music when it changes
          fetchActiveBackgroundMusic();
        }
      )
      .subscribe();
      
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { backgroundMusic, loading, error };
}

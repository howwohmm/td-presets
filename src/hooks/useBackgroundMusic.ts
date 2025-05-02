
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface BackgroundMusic {
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
    // For now, we'll use localStorage to simulate background music functionality
    // since the database table doesn't exist yet
    const fetchMusic = () => {
      try {
        setLoading(true);
        const savedMusic = localStorage.getItem('backgroundMusic');
        if (savedMusic) {
          setBackgroundMusic(JSON.parse(savedMusic) as BackgroundMusic);
        }
      } catch (err: any) {
        console.error('Error fetching background music:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMusic();
  }, []);

  return { backgroundMusic, loading, error };
}

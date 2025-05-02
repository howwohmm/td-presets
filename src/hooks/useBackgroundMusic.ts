
import { useState, useEffect } from 'react';

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
    const fetchMusic = () => {
      try {
        setLoading(true);
        const savedMusic = localStorage.getItem('backgroundMusic');
        
        if (savedMusic) {
          const parsedMusic = JSON.parse(savedMusic) as BackgroundMusic;
          console.log("Loaded background music from localStorage:", parsedMusic);
          setBackgroundMusic(parsedMusic);
        } else {
          console.log("No background music found in localStorage");
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

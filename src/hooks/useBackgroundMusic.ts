
import { useState, useEffect } from 'react';

export interface BackgroundMusic {
  id: string;
  title: string;
  file_url: string;
  audio_data?: string; // Add this for base64 data
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

  const setActiveMusic = async (music: BackgroundMusic, file?: File) => {
    try {
      // If file is provided, read it as base64 data
      if (file) {
        return new Promise<boolean>((resolve) => {
          const reader = new FileReader();
          
          reader.onload = (e) => {
            const base64Data = e.target?.result as string;
            
            // Store the file data in the music object
            const musicWithData: BackgroundMusic = {
              ...music,
              audio_data: base64Data
            };
            
            // Store in localStorage
            localStorage.setItem('backgroundMusic', JSON.stringify(musicWithData));
            setBackgroundMusic(musicWithData);
            resolve(true);
          };
          
          reader.onerror = () => {
            console.error('Error reading file as base64');
            setError(new Error('Failed to process audio file'));
            resolve(false);
          };
          
          reader.readAsDataURL(file);
        });
      } else {
        // Store in localStorage without file data
        localStorage.setItem('backgroundMusic', JSON.stringify(music));
        setBackgroundMusic(music);
        return true;
      }
    } catch (err: any) {
      console.error('Error setting active music:', err);
      setError(err);
      return false;
    }
  };

  return { backgroundMusic, loading, error, setActiveMusic };
}

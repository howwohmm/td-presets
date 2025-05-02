
import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2 } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { toast } from 'sonner';

interface MusicPlayerProps {
  audioSrc: string;
  defaultVolume?: number;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ audioSrc, defaultVolume = 0.5 }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(defaultVolume);
  const [audioLoaded, setAudioLoaded] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    // Create audio element
    const audio = new Audio();
    audio.loop = true;
    audio.volume = volume;
    audio.src = audioSrc;
    
    // Handle loading events
    audio.oncanplaythrough = () => {
      setAudioLoaded(true);
    };
    
    audio.onerror = (error) => {
      console.error("Audio failed to load:", error);
      toast.error("Failed to load audio file");
    };
    
    audioRef.current = audio;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [audioSrc, volume]);

  useEffect(() => {
    if (!audioRef.current || !audioLoaded) return;
    
    if (isPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error("Audio playback failed:", error);
          setIsPlaying(false);
          toast.error("Audio playback failed. Try clicking play again.");
        });
      }
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, audioLoaded]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (newValue: number[]) => {
    const newVolume = newValue[0];
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <div className="fixed right-6 top-6 z-20 bg-white/10 backdrop-blur-lg rounded-lg border border-white/20 p-3 flex items-center gap-4">
      <button 
        onClick={togglePlayPause} 
        className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-all"
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        {isPlaying ? <Pause size={18} /> : <Play size={18} />}
      </button>
      
      <div className="flex items-center gap-3">
        <Volume2 size={16} className="text-white/70" />
        <div className="w-24">
          <Slider
            value={[volume]}
            min={0}
            max={1}
            step={0.01}
            onValueChange={handleVolumeChange}
            className="bg-opacity-30"
          />
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;

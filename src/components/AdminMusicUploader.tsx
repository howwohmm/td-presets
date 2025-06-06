import React, { useState } from 'react';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Upload, Music } from 'lucide-react';
import { useBackgroundMusic } from '@/hooks/useBackgroundMusic';

interface BackgroundMusic {
  id: string;
  title: string;
  file_url: string;
  is_active: boolean;
  created_at: string;
}

const AdminMusicUploader: React.FC = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [musicFile, setMusicFile] = useState<File | null>(null);
  const [musicTitle, setMusicTitle] = useState('');
  const { setActiveMusic } = useBackgroundMusic();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      
      // Validate file type
      if (!file.type.includes('audio')) {
        toast.error('Please select an audio file');
        return;
      }
      
      setMusicFile(file);
      // Set default title from filename
      if (!musicTitle) {
        setMusicTitle(file.name.split('.')[0]);
      }
    }
  };

  const uploadMusic = async () => {
    if (!musicFile) {
      toast.error('Please select an audio file');
      return;
    }

    if (!musicTitle.trim()) {
      toast.error('Please enter a title for the music');
      return;
    }

    try {
      setIsUploading(true);
      
      // Create a temporary URL for reference (this won't be used for playback)
      const tempUrl = URL.createObjectURL(musicFile);
      
      // Create the background music object
      const backgroundMusic: BackgroundMusic = {
        id: Date.now().toString(),
        title: musicTitle,
        file_url: tempUrl, // This is just for reference
        is_active: true,
        created_at: new Date().toISOString()
      };
      
      // Pass both the music object and the file to setActiveMusic
      const success = await setActiveMusic(backgroundMusic, musicFile);
      
      if (success) {
        toast.success('Music uploaded successfully!');
        setMusicFile(null);
        setMusicTitle('');
      } else {
        toast.error('Failed to set music as active');
      }
      
    } catch (error: any) {
      toast.error(`Upload failed: ${error.message}`);
      console.error('Music upload error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 bg-white/10 rounded-full flex items-center justify-center">
          <Music className="text-white/70" />
        </div>
        <h3 className="text-xl font-medium text-white">Background Music</h3>
      </div>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="music-title" className="block text-sm text-white/70 mb-1">
            Music Title
          </label>
          <Input
            id="music-title"
            value={musicTitle}
            onChange={(e) => setMusicTitle(e.target.value)}
            placeholder="Enter music title"
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
          />
        </div>
        
        <div className="relative">
          <input
            type="file"
            id="music-file"
            accept="audio/*"
            onChange={handleFileChange}
            className="sr-only"
          />
          <label
            htmlFor="music-file"
            className="block w-full py-3 px-4 bg-white/10 hover:bg-white/15 border border-dashed border-white/20 rounded-lg text-center cursor-pointer transition-colors"
          >
            <div className="flex flex-col items-center gap-2">
              <Upload size={18} className="text-white/70" />
              <span className="text-white/80">
                {musicFile ? musicFile.name : "Click to upload audio file"}
              </span>
              <span className="text-xs text-white/50">
                MP3, WAV, OGG files supported
              </span>
            </div>
          </label>
        </div>
        
        <button
          onClick={uploadMusic}
          disabled={isUploading || !musicFile}
          className="w-full py-2.5 bg-blue-500/80 hover:bg-blue-500 disabled:bg-blue-500/40 text-white rounded-lg font-medium transition-colors flex items-center justify-center"
        >
          {isUploading ? "Uploading..." : "Upload Music"}
        </button>
      </div>
    </div>
  );
};

export default AdminMusicUploader;

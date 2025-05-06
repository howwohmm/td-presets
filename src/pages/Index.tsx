
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PresetCard from '../components/PresetCard';
import { usePresets } from '../hooks/usePresets';
import { LayoutGrid, Search } from 'lucide-react';
import MusicPlayer from '../components/MusicPlayer';
import { useBackgroundMusic } from '../hooks/useBackgroundMusic';
import { useAuth } from '@/hooks/useAuth';
import AdminMusicUploader from '@/components/AdminMusicUploader';
import { toast } from 'sonner';

const Index: React.FC = () => {
  const { data: presets, isLoading, error } = usePresets();
  const [searchTerm, setSearchTerm] = useState('');
  const { backgroundMusic, loading: musicLoading } = useBackgroundMusic();
  const { isLoggedIn } = useAuth();
  
  // Notify when music is available but not auto-playing
  useEffect(() => {
    if (backgroundMusic && !musicLoading) {
      toast.info('Music is ready to play! Click the play button to listen.');
    }
  }, [backgroundMusic, musicLoading]);
  
  const filteredPresets = presets?.filter(preset => 
    preset.preset_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    preset.short_description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed inset-0 -z-10 bg-static-gradient"></div>
      
      {backgroundMusic && <MusicPlayer audioSrc={backgroundMusic.file_url} defaultVolume={0.5} />}
      
      <div className="max-w-7xl w-full mx-auto px-4 relative z-10">
        <Header />
        
        <main className="flex-1 py-8 md:py-12">
          {isLoggedIn && (
            <div className="mb-12 max-w-md mx-auto">
              <AdminMusicUploader />
            </div>
          )}
        
          <div className="text-center max-w-3xl mx-auto mb-14 opacity-0 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl text-white leading-tight mb-6">
              <div className="text-reveal" style={{ animationDelay: '0.5s' }}>my fave presets for my fave janta :)</div>
            </h3>
            
            <div className="max-w-md mx-auto mt-8 relative animate-fade-in" style={{ animationDelay: '0.7s' }}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70" size={18} />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search presets..."
                  className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur border border-white/20 rounded-full text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
                />
              </div>
            </div>
          </div>
          
          <div className="mb-20">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-pulse flex space-x-2">
                  <div className="h-2 w-2 bg-white rounded-full"></div>
                  <div className="h-2 w-2 bg-white rounded-full"></div>
                  <div className="h-2 w-2 bg-white rounded-full"></div>
                </div>
              </div>
            ) : error ? (
              <div className="text-center text-red-400 py-12 bg-white/10 backdrop-blur-sm rounded-lg">
                <p>Failed to load presets</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="mt-2 text-sm text-white/80 hover:text-white underline"
                >
                  Try again
                </button>
              </div>
            ) : searchTerm && filteredPresets?.length === 0 ? (
              <div className="text-center py-16 bg-white/10 backdrop-blur-sm rounded-lg">
                <Search className="mx-auto mb-4 text-white/50" size={48} />
                <p className="text-white/80">No presets matching "{searchTerm}"</p>
                <button 
                  onClick={() => setSearchTerm('')}
                  className="mt-4 pill-button"
                >
                  Clear search
                </button>
              </div>
            ) : presets?.length === 0 ? (
              <div className="text-center py-16 bg-white/10 backdrop-blur-sm rounded-lg">
                <LayoutGrid className="mx-auto mb-4 text-white/50" size={48} />
                <p className="text-white/80">No presets available yet</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
                {(filteredPresets || presets)?.map((preset, index) => (
                  <div key={preset.id} className="opacity-0 animate-fade-in" style={{ animationDelay: `${0.1 * (index % 8)}s` }}>
                    <PresetCard
                      id={preset.id}
                      title={preset.preset_title}
                      description={preset.short_description}
                      downloadUrl={preset.preset_file}
                      images={preset.example_images}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default Index;

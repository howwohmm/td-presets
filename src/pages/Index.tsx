
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PresetCard from '../components/PresetCard';
import { usePresets } from '../hooks/usePresets';
import { LayoutGrid } from 'lucide-react';

const Index: React.FC = () => {
  const { data: presets, isLoading, error } = usePresets();

  return (
    <div className="min-h-screen flex flex-col">
      <div className="max-w-7xl w-full mx-auto px-4">
        <Header />
        
        <main className="flex-1 py-8 md:py-12">
          <div className="text-center max-w-3xl mx-auto mb-10 opacity-0 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl text-white leading-tight mb-6">
              <div className="text-reveal" style={{ animationDelay: '0.5s' }}>my fave presets for my fave janta :)</div>
            </h3>
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
            ) : presets?.length === 0 ? (
              <div className="text-center py-16 bg-white/10 backdrop-blur-sm rounded-lg">
                <LayoutGrid className="mx-auto mb-4 text-white/50" size={48} />
                <p className="text-white/80">No presets available yet</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {presets?.map((preset) => (
                  <PresetCard
                    key={preset.id}
                    id={preset.id}
                    title={preset.preset_title}
                    description={preset.short_description}
                    downloadUrl={preset.preset_file}
                    images={preset.example_images}
                  />
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

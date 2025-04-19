import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PresetCard from '../components/PresetCard';
import { usePresets } from '../hooks/usePresets';

const Index: React.FC = () => {
  const { data: presets, isLoading, error } = usePresets();

  return (
    <div className="min-h-screen flex flex-col">
      <div className="max-w-6xl w-full mx-auto px-4">
        <Header />
        
        <main className="flex-1 py-8 md:py-12">
          <div className="text-center max-w-3xl mx-auto mb-16 opacity-0 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl text-white leading-tight mb-6 whitespace-nowrap overflow-hidden text-ellipsis">
              <div className="text-reveal" style={{ animationDelay: '0.5s' }}>my fave presets for my fave janta :)</div>
            </h3>
          </div>
          
          <div className="mb-20 space-y-12 md:space-y-16">
            {isLoading ? (
              <p className="text-center text-white/80 py-12">Loading presets...</p>
            ) : error ? (
              <p className="text-center text-red-400 py-12">Failed to load presets</p>
            ) : presets?.length === 0 ? (
              <p className="text-center text-white/80 py-12">No presets available yet</p>
            ) : (
              presets?.map((preset) => (
                <PresetCard
                  key={preset.id}
                  id={preset.id}
                  title={preset.preset_title}
                  description={preset.short_description}
                  downloadUrl={preset.preset_file}
                  images={preset.example_images}
                />
              ))
            )}
          </div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default Index;

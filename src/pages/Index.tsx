
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
        
        <main className="flex-1">
          <h1 className="font-cursive text-4xl md:text-5xl lg:text-6xl text-center my-16 opacity-0 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Some of my favourites
          </h1>
          
          <div className="mb-20">
            {isLoading ? (
              <p className="text-center text-teendad-text/80">Loading presets...</p>
            ) : error ? (
              <p className="text-center text-red-500">Failed to load presets</p>
            ) : presets?.length === 0 ? (
              <p className="text-center text-teendad-text/80">No presets available yet</p>
            ) : (
              presets?.map((preset) => (
                <PresetCard
                  key={preset.id}
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

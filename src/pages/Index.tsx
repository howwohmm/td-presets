
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PresetCard from '../components/PresetCard';

// Sample data - This would come from your Supabase backend later
const presetData = [
  {
    id: 1,
    title: "Pres.",
    description: "Short description text",
    downloadUrl: "#",
    images: [
      { src: "/lovable-uploads/35643dc2-e24e-4b8b-b9e9-f5953ea8cc42.png", alt: "Preset example 1" },
      { src: "/lovable-uploads/08371439-4fdf-4438-9afd-9761efab6254.png", alt: "Preset example 2" },
      { src: "/placeholder.svg", alt: "Preset example 3" },
    ]
  },
  {
    id: 2,
    title: "Pres.",
    description: "Short description text",
    downloadUrl: "#",
    images: [
      { src: "/lovable-uploads/35643dc2-e24e-4b8b-b9e9-f5953ea8cc42.png", alt: "Preset example 4" },
      { src: "/lovable-uploads/08371439-4fdf-4438-9afd-9761efab6254.png", alt: "Preset example 5" },
      { src: "/placeholder.svg", alt: "Preset example 6" },
    ]
  },
  {
    id: 3,
    title: "Pres.",
    description: "Short description text",
    downloadUrl: "#",
    images: [
      { src: "/lovable-uploads/35643dc2-e24e-4b8b-b9e9-f5953ea8cc42.png", alt: "Preset example 7" },
      { src: "/lovable-uploads/08371439-4fdf-4438-9afd-9761efab6254.png", alt: "Preset example 8" },
      { src: "/placeholder.svg", alt: "Preset example 9" },
    ]
  }
];

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="max-w-6xl w-full mx-auto px-4">
        <Header />
        
        <main className="flex-1">
          <h1 className="font-cursive text-4xl md:text-5xl lg:text-6xl text-center my-16 opacity-0 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Some of my favourites
          </h1>
          
          <div className="mb-20">
            {presetData.map((preset) => (
              <PresetCard
                key={preset.id}
                title={preset.title}
                description={preset.description}
                downloadUrl={preset.downloadUrl}
                images={preset.images}
              />
            ))}
          </div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default Index;

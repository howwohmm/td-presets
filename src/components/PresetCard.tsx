
import React from 'react';

interface ImageInfo {
  src: string;
  alt: string;
}

interface PresetCardProps {
  title: string;
  description: string;
  downloadUrl: string;
  images: ImageInfo[];
}

const PresetCard: React.FC<PresetCardProps> = ({ title, description, downloadUrl, images }) => {
  return (
    <div className="ambient-card my-10 max-w-3xl mx-auto overflow-hidden fade-up" style={{ animationDelay: '0.2s' }}>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/2">
          <h2 className="text-2xl md:text-3xl mb-3 font-medium text-white">{title}</h2>
          <p className="text-white/80 mb-6 font-light">{description}</p>
          
          <a 
            href={downloadUrl} 
            className="pill-button inline-block"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download
          </a>
        </div>
        
        <div className="md:w-1/2 grid grid-cols-1 gap-4">
          {images && images.length > 0 ? (
            images.slice(0, 2).map((image, index) => (
              <div 
                key={index} 
                className="image-preview"
              >
                <img 
                  src={image.src || ''} 
                  alt={image.alt || 'Preset example image'}
                  loading="lazy"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            ))
          ) : (
            <p className="text-white/70">No example images available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PresetCard;

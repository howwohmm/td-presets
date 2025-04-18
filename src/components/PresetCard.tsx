
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
    <div className="preset-section w-full flex flex-col lg:flex-row gap-8 md:gap-12 py-8 md:py-12 border-t border-teendad-border">
      <div className="lg:w-1/4 flex flex-col justify-start">
        <h2 className="font-cursive text-3xl md:text-4xl mb-2">{title}</h2>
        <p className="text-teendad-text/80 mb-6">{description}</p>
        <a 
          href={downloadUrl} 
          className="download-button w-fit"
          target="_blank"
          rel="noopener noreferrer"
        >
          Download
        </a>
      </div>
      
      <div className="lg:w-3/4 grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div 
            key={index} 
            className={`image-grid-item ${index === 1 ? 'row-span-2 md:col-span-1' : ''}`}
          >
            <img 
              src={image.src} 
              alt={image.alt}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PresetCard;

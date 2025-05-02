
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Download, Trash2, Image } from 'lucide-react';

interface ImageInfo {
  src: string;
  alt: string;
}

interface PresetCardProps {
  id: string;
  title: string;
  description: string;
  downloadUrl: string;
  images: ImageInfo[];
}

// Function to delete a preset from Supabase
const deletePreset = async (presetId: string) => {
  const { error } = await supabase
    .from('presets')
    .delete()
    .match({ id: presetId });

  if (error) {
    throw new Error(error.message);
  }
};

const PresetCard: React.FC<PresetCardProps> = ({ id, title, description, downloadUrl, images }) => {
  const { isLoggedIn } = useAuth();
  const queryClient = useQueryClient();
  const [isHovered, setIsHovered] = useState(false);

  // Set up mutation for deleting
  const deleteMutation = useMutation({
    mutationFn: deletePreset,
    onSuccess: () => {
      toast.success('Preset deleted successfully!');
      // Invalidate the presets query to refresh data
      queryClient.invalidateQueries({ queryKey: ['presets'] });
    },
    onError: (error) => {
      toast.error(`Failed to delete preset: ${error.message}`);
    },
  });

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete the preset "${title}"?`)) {
      deleteMutation.mutate(id);
    }
  };

  // Get the first image for thumbnail
  const thumbnailImage = images && images.length > 0 ? images[0] : null;
  
  return (
    <div 
      className="ambient-card h-full flex flex-col fade-up transform transition-all duration-500 hover:translate-y-[-6px] hover:shadow-xl"
      style={{ animationDelay: '0.2s' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-52 mb-4 rounded-lg overflow-hidden group">
        {thumbnailImage ? (
          <>
            <img 
              src={thumbnailImage.src} 
              alt={thumbnailImage.alt || `${title} thumbnail`} 
              className={`w-full h-full object-cover transition-all duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}
            />
            {images.length > 1 && (
              <div className="absolute bottom-2 right-2 bg-black/50 backdrop-blur-sm text-white text-xs py-1 px-2 rounded-full flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Image size={12} />
                <span>{images.length}</span>
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full bg-white/20 flex items-center justify-center text-white/50">
            No image
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <div className="flex-grow">
        <h2 className="text-xl font-medium text-white mb-2 line-clamp-1">{title}</h2>
        <p className="text-white/80 text-sm mb-4 line-clamp-2">{description}</p>
      </div>
      
      <div className="flex items-center gap-2 mt-auto pt-3 border-t border-white/10">
        <a 
          href={downloadUrl} 
          className="pill-button inline-flex items-center justify-center gap-1.5 w-full text-sm py-2.5 hover:bg-blue-50"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Download ${title} preset`}
        >
          <Download size={16} />
          Download
        </a>
        
        {isLoggedIn && (
          <button
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
            className="p-2.5 rounded-full bg-white/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors disabled:opacity-50"
            aria-label="Delete preset"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

export default PresetCard;

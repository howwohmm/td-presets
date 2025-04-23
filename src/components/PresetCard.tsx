
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Download, Trash2 } from 'lucide-react';

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
    <div className="ambient-card h-full flex flex-col fade-up" style={{ animationDelay: '0.2s' }}>
      <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
        {thumbnailImage ? (
          <img 
            src={thumbnailImage.src} 
            alt={thumbnailImage.alt || `${title} thumbnail`} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-white/20 flex items-center justify-center text-white/50">
            No image
          </div>
        )}
      </div>
      
      <div className="flex-grow">
        <h2 className="text-lg font-medium text-white mb-2 line-clamp-1">{title}</h2>
        <p className="text-white/80 text-sm mb-4 line-clamp-2">{description}</p>
      </div>
      
      <div className="flex items-center gap-2 mt-auto pt-3 border-t border-white/10">
        <a 
          href={downloadUrl} 
          className="pill-button inline-flex items-center justify-center gap-1.5 w-full text-sm py-2.5"
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

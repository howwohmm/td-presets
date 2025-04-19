import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

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

  return (
    <div className="ambient-card my-10 max-w-3xl mx-auto overflow-hidden fade-up" style={{ animationDelay: '0.2s' }}>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/2">
          <h2 className="text-2xl md:text-3xl mb-3 font-medium text-white">{title}</h2>
          <p className="text-white/80 mb-6 font-light">{description}</p>
          
          <div className="flex items-center gap-4">
            <a 
              href={downloadUrl} 
              className="pill-button inline-block"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download
            </a>
            
            {/* Delete button only visible to admin */}
            {isLoggedIn && (
              <button
                onClick={handleDelete}
                disabled={deleteMutation.isPending}
                className="text-sm text-red-400 hover:text-red-300 border-b border-red-400 hover:border-red-300 pb-0.5 transition-colors disabled:opacity-50"
              >
                {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
              </button>
            )}
          </div>
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

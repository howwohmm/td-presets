
import type { Json } from '@/integrations/supabase/types';

export interface Preset {
  id: string;
  preset_title: string;
  short_description: string;
  preset_file: string;
  example_images: { src: string; alt: string }[];
  created_at: string;
}

// Helper function to convert Json to example_images type
export function convertJsonToExampleImages(json: Json): { src: string; alt: string }[] {
  if (!json || !Array.isArray(json)) {
    return [];
  }
  
  return json.map(item => {
    if (typeof item === 'object' && item !== null && 'src' in item && 'alt' in item) {
      return {
        src: String(item.src),
        alt: String(item.alt)
      };
    }
    // If the item is just a string URL
    if (typeof item === 'string') {
      return {
        src: item,
        alt: 'Preset example image'
      };
    }
    return {
      src: '',
      alt: 'Invalid image data'
    };
  });
}

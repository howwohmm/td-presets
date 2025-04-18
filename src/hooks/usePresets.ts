
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Preset } from '@/types/preset';
import { convertJsonToExampleImages } from '@/types/preset';

export function usePresets() {
  return useQuery({
    queryKey: ['presets'],
    queryFn: async (): Promise<Preset[]> => {
      const { data, error } = await supabase
        .from('presets')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Transform the data to match our Preset interface
      return (data || []).map(item => ({
        ...item,
        example_images: convertJsonToExampleImages(item.example_images)
      }));
    }
  });
}

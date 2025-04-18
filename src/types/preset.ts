
export interface Preset {
  id: string;
  preset_title: string;
  short_description: string;
  preset_file: string;
  example_images: { src: string; alt: string }[];
  created_at: string;
}


import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Upload } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';

interface AdminPresetDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FileInfo {
  name: string;
  file: File;
}

const AdminPresetDialog: React.FC<AdminPresetDialogProps> = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [presetFile, setPresetFile] = useState<FileInfo | null>(null);
  const [exampleImages, setExampleImages] = useState<FileInfo[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const presetFileInputRef = useRef<HTMLInputElement>(null);
  const exampleImagesInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const handlePresetFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setPresetFile({ name: file.name, file });
    }
  };

  const handleExampleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files).map(file => ({
        name: file.name,
        file
      }));
      setExampleImages(files);
    }
  };

  const handlePublish = async () => {
    if (!title.trim()) {
      toast.error('Please enter a preset title');
      return;
    }
    if (!description.trim()) {
      toast.error('Please enter a short description');
      return;
    }
    if (!presetFile) {
      toast.error('Please upload a preset file');
      return;
    }
    if (exampleImages.length === 0) {
      toast.error('Please upload at least one example image');
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Upload preset file
      const presetFilePath = `${Date.now()}_${presetFile.name}`;
      const { data: presetFileData, error: presetFileError } = await supabase.storage
        .from('preset_files')
        .upload(presetFilePath, presetFile.file);

      if (presetFileError) throw new Error(`Error uploading preset file: ${presetFileError.message}`);

      // 2. Get public URL for the preset file
      const { data: presetFilePublicUrl } = supabase.storage
        .from('preset_files')
        .getPublicUrl(presetFilePath);

      // 3. Upload example images
      const exampleImagesUrls = await Promise.all(
        exampleImages.map(async (imageInfo, index) => {
          const imagePath = `${Date.now()}_${index}_${imageInfo.name}`;
          const { data: imageData, error: imageError } = await supabase.storage
            .from('preset_examples')
            .upload(imagePath, imageInfo.file);

          if (imageError) throw new Error(`Error uploading image ${imageInfo.name}: ${imageError.message}`);

          // Get public URL for the image
          const { data: imageUrl } = supabase.storage
            .from('preset_examples')
            .getPublicUrl(imagePath);

          return {
            src: imageUrl.publicUrl,
            alt: `Example image for ${title}`
          };
        })
      );

      // 4. Insert new preset into the database
      const { error: insertError } = await supabase
        .from('presets')
        .insert({
          preset_title: title,
          short_description: description,
          preset_file: presetFilePublicUrl.publicUrl,
          example_images: exampleImagesUrls
        });

      if (insertError) throw new Error(`Error inserting preset: ${insertError.message}`);

      // Success! Reset form and close dialog
      toast.success('Preset published successfully');
      setTitle('');
      setDescription('');
      setPresetFile(null);
      setExampleImages([]);
      
      // Invalidate the presets query to refetch data
      queryClient.invalidateQueries({ queryKey: ['presets'] });
      
      onClose();

    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setTitle('');
      setDescription('');
      setPresetFile(null);
      setExampleImages([]);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="bg-teendad-background border-teendad-border p-8 max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-4xl font-cursive text-center mb-8">Add Preset</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-8">
          <div className="space-y-2">
            <label htmlFor="preset-title" className="font-cursive text-2xl">Preset Title</label>
            <Input
              id="preset-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter preset name..."
              className="h-14 bg-transparent border-teendad-border text-lg text-teendad-text placeholder:text-teendad-text/60"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="short-description" className="font-cursive text-2xl">Short Description</label>
            <Textarea
              id="short-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter a brief description..."
              className="min-h-[100px] bg-transparent border-teendad-border text-lg text-teendad-text placeholder:text-teendad-text/60"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                type="file"
                ref={presetFileInputRef}
                onChange={handlePresetFileChange}
                className="hidden"
                accept=".xmp,.lrtemplate,.dng"
              />
              <button
                type="button"
                onClick={() => presetFileInputRef.current?.click()}
                className="w-full h-14 border border-teendad-border rounded-md flex items-center justify-center gap-2 hover:bg-teendad-border/20 transition-colors"
              >
                <Upload size={18} />
                <span>{presetFile ? presetFile.name : "Upload Preset File"}</span>
              </button>
            </div>
            
            <div>
              <input
                type="file"
                ref={exampleImagesInputRef}
                onChange={handleExampleImagesChange}
                className="hidden"
                accept="image/*"
                multiple
              />
              <button
                type="button"
                onClick={() => exampleImagesInputRef.current?.click()}
                className="w-full h-14 border border-teendad-border rounded-md flex items-center justify-center gap-2 hover:bg-teendad-border/20 transition-colors"
              >
                <Upload size={18} />
                <span>{exampleImages.length > 0 ? `${exampleImages.length} Images Selected` : "Upload Example Images"}</span>
              </button>
            </div>
          </div>
          
          <div className="flex justify-center pt-4">
            <button
              type="button"
              disabled={isSubmitting}
              onClick={handlePublish}
              className="px-12 py-3 bg-[#B88B63] hover:bg-[#A87B53] text-white font-cursive text-xl rounded-full transition-colors disabled:opacity-70"
            >
              {isSubmitting ? 'Publishing...' : 'Publish'}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdminPresetDialog;

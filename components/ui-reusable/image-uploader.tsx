import React, { useState } from 'react';
import { PlusCircleIcon, UploadIcon, XCircleIcon } from 'lucide-react';
import Image from 'next/image';
import { Button } from '../ui/button';

interface ImageUploaderProps {
  images: File[];
  handleImageUpload: (image: File | File[]) => void;
  multi?: boolean;
}

const ImageUploader = ({ images, handleImageUpload, multi = false }: ImageUploaderProps) => {
  const [selectedImages, setSelectedImages] = useState<File[]>(images);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);

    if (multi) {
        const newImages = files.map((file) => URL.createObjectURL(file));
        setSelectedImages((prev) => [...prev, ...newImages] as any);
        handleImageUpload(files); 
      } else {
        const newImage = URL.createObjectURL(files[0]); 
        setSelectedImages([newImage] as any);
        handleImageUpload(files[0]); 
      }
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = selectedImages.filter((_, i) => i !== index);
    setSelectedImages(updatedImages);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        {selectedImages?.length > 0 ? (
          <div className="flex flex-wrap gap-4">
            {selectedImages?.map((image, index) => (
              <div key={index} className="relative">
                <Image
                  src={image as any}
                  width={250}
                  height={250}
                  alt={`uploaded-${index}`}
                  className="object-fit w-[250px] h-[250px] rounded-md"
                />
                <Button
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-2 right-2 bg-white rounded-full p-1"
                >
                  <XCircleIcon className="w-5 h-5 text-red-500" />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          // Display Upload Box when no images are present
          <label className="w-full h-[200px] border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer rounded-md">
            <input
              type="file"
              onChange={handleFileChange}
              className="hidden"
              accept="image/*"
              multiple={multi}
            />
            <div className="flex flex-col items-center text-gray-500">
              <UploadIcon className="w-10 h-10 mb-2" />
              <span className="text-sm">Upload Image{multi ? 's' : ''}</span>
            </div>
          </label>
        )}
      </div>

      {/* Add more images button for multi-mode */}
      {multi && selectedImages?.length > 0 && (
        <div className="flex justify-start">
          <label className="cursor-pointer">
            <input
              type="file"
              onChange={handleFileChange}
              className="hidden"
              accept="image/*"
              multiple={multi}
            />
            <div className="flex flex-col items-center justify-center w-[250px] h-[250px] border-2 border-dashed border-gray-300 rounded-md">
              <PlusCircleIcon className="w-10 h-10 text-gray-500" />
              <span className="text-sm text-gray-500">Add Image</span>
            </div>
          </label>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;

'use client';

import { getPublicIdFromUrl } from '@/utils';
import { X } from 'lucide-react';
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';

type MultipleImageInputProps = {
  label: string;
  images: string[];
  setImages: (images: string[] | ((prevImages: string[]) => string[])) => void;
  className?: string;
};

export default function MultipleImageInput({
  label,
  images = [],
  setImages,
  className = 'col-span-full',
}: MultipleImageInputProps) {
  const handleUpload = (result: any) => {
    const secureUrl = result?.info?.secure_url;
    if (secureUrl) {
      setImages((prevImages) => [...prevImages, secureUrl]);
    }
    document.body.style.overflow = 'auto';
  };

  const removeImage = async (urlToRemove: string) => {
    const publicId = getPublicIdFromUrl(urlToRemove);

    if (!publicId) {
      console.error(
        'Invalid URL or publicId could not be extracted:',
        urlToRemove
      );
      return;
    }

    setImages((prevImages) => prevImages.filter((img) => img !== urlToRemove));

    try {
      const response = await fetch('/api/cloudinary/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ publicId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Failed to delete image:', errorData.error);
        setImages((prevImages) => [...prevImages, urlToRemove].sort());
        return;
      }

      console.log(`Image ${publicId} deleted from Cloudinary`);
    } catch (error) {
      console.error('Error during image deletion:', error);
      // Revert state on network or unexpected error
      setImages((prevImages) => [...prevImages, urlToRemove].sort());
    }
  };

  return (
    <div className={className}>
      <div className="flex justify-between items-center mb-4">
        <label className="block text-sm font-medium leading-6 text-slate-800 dark:text-slate-100 mb-2">
          {label}
        </label>
      </div>
      <CldUploadWidget
        uploadPreset="mindfuel_storage"
        onSuccess={handleUpload}
        options={{
          multiple: true,
          maxFiles: 10,
          sources: ['local', 'url'],
        }}
      >
        {({ open }) => (
          <button
            onClick={() => open()}
            type="button"
            className="w-full py-10 text-center bg-gray-200 dark:bg-gray-700 border border-dashed border-gray-400 dark:border-gray-500 rounded-lg"
          >
            Click to Upload Images
          </button>
        )}
      </CldUploadWidget>

      <div className="grid grid-cols-2 gap-4 mt-4">
        {images.map((image, index) => (
          <div key={index} className="relative">
            <Image
              src={image || ''}
              alt={`Uploaded image ${index + 1}`}
              width={500}
              height={300}
              className="w-full h-40 object-contain rounded-lg"
            />
            <button
              type="button"
              onClick={() => removeImage(image)}
              className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-0.5"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

'use client';

import { getPublicIdFromUrl } from '@/utils';
import { Pencil } from 'lucide-react';
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { useState } from 'react';

type ImageInputProps = {
  label: string;
  imageUrl?: string | null;
  setImageUrl: (url: string) => void;
  className?: string;
};

export default function ImageInput({
  label,
  imageUrl = '',
  setImageUrl,
  className = 'col-span-full',
}: ImageInputProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [oldImageUrl, setOldImageUrl] = useState<string | null>(null);

  const deleteImage = async (urlToDelete: string): Promise<boolean> => {
    const publicId = getPublicIdFromUrl(urlToDelete);
    if (!publicId) {
      console.error(
        'Invalid URL or publicId could not be extracted:',
        urlToDelete
      );
      return false;
    }

    try {
      const response = await fetch('/api/cloudinary/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ publicId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Failed to delete image:', errorData.error);
        return false;
      }

      console.log(`Image ${publicId} deleted from Cloudinary`);
      return true;
    } catch (error) {
      console.error('Error deleting image:', error);
      return false;
    }
  };

  const handleChangeImage = () => {
    if (imageUrl) {
      setOldImageUrl(imageUrl);
    }
    setImageUrl('');
  };

  const handleUpload = async (result: any) => {
    if (typeof result.info !== 'object' || !('secure_url' in result.info)) {
      console.error('Upload failed or invalid result:', result);
      return;
    }

    const newImageUrl = result.info.secure_url;
    setIsUploading(true);

    // Store the old image URL for potential revert
    const previousImageUrl = imageUrl;

    // Optimistically set the new image URL
    setImageUrl(newImageUrl);

    try {
      // If there was a previous image, delete it
      if (previousImageUrl) {
        const deletionSuccess = await deleteImage(previousImageUrl);
        if (!deletionSuccess) {
          // Revert to the old image if deletion fails
          setImageUrl(previousImageUrl);
          setIsUploading(false);
          return;
        }
      }

      // Upload succeeded and old image (if any) was deleted
      setIsUploading(false);
      document.body.style.overflow = 'auto';
    } catch (error) {
      console.error('Unexpected error during upload process:', error);
      // Revert to the previous image if something goes wrong
      setImageUrl(previousImageUrl || '');
      setIsUploading(false);

      // Optionally, delete the new image from Cloudinary if it was uploaded
      if (newImageUrl && previousImageUrl) {
        await deleteImage(newImageUrl);
      }
    }
  };

  return (
    <div className={className}>
      <div className="flex justify-between items-center mb-4">
        <label className="block text-sm font-medium leading-6 text-slate-800 dark:text-slate-100 mb-2">
          {label}
        </label>
        {imageUrl && !isUploading && (
          <button
            onClick={handleChangeImage}
            type="button"
            className="flex space-x-2 bg-slate-900 rounded-md shadow text-slate-50 py-2 px-4"
          >
            <Pencil className="w-5 h-5" />
            <span>Change Image</span>
          </button>
        )}
      </div>
      {imageUrl && !isUploading ? (
        <Image
          src={imageUrl}
          alt="Uploaded image"
          width={1000}
          height={667}
          className="w-full h-64 object-contain"
        />
      ) : (
        <CldUploadWidget
          uploadPreset="mindfuel_storage"
          onSuccess={handleUpload}
        >
          {({ open }) => (
            <button
              onClick={() => open()}
              type="button"
              disabled={isUploading}
              className={`w-full py-10 text-center border border-dashed border-gray-400 dark:border-gray-500 rounded-lg ${
                isUploading
                  ? 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed'
                  : 'bg-gray-200 dark:bg-gray-700'
              }`}
            >
              {isUploading ? 'Uploading...' : 'Click to Upload Image'}
            </button>
          )}
        </CldUploadWidget>
      )}
    </div>
  );
}

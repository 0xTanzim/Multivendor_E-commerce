'use client';

import { Pencil } from 'lucide-react';
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';

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
  const handleUpload = (result: any) => {
    if (typeof result.info === 'object' && 'secure_url' in result.info) {
      setImageUrl(result.info.secure_url);
      document.body.style.overflow = 'auto';
    }
  };

  return (
    <div className={className}>
      <div className="flex justify-between items-center mb-4">
        <label className="block text-sm font-medium leading-6 text-slate-800 dark:text-slate-100 mb-2">
          {label}
        </label>
        {imageUrl && (
          <button
            onClick={() => setImageUrl('')}
            type="button"
            className="flex space-x-2 bg-slate-900 rounded-md shadow text-slate-50 py-2 px-4"
          >
            <Pencil className="w-5 h-5" />
            <span>Change Image</span>
          </button>
        )}
      </div>
      {imageUrl ? (
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
              className="w-full py-10 text-center bg-gray-200 dark:bg-gray-700 border border-dashed border-gray-400 dark:border-gray-500 rounded-lg"
            >
              Click to Upload Image
            </button>
          )}
        </CldUploadWidget>
      )}
    </div>
  );
}

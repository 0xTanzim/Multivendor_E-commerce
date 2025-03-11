import { UploadDropzone } from "@/lib/uploadthing";
import { Pencil } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";

type ImageInputProps = {
  label: string;
  imageUrl?: string | null;
  setImageUrl: (url: string) => void;
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  endpoint?: any;
};

export default function ImageInput({
  label,
  imageUrl = "",
  setImageUrl,
  className = "col-span-full",
  endpoint,
}: ImageInputProps) {
  return (
    <div className={className}>
      <div className="flex justify-between items-center mb-4">
        <label
          htmlFor="course-image"
          className="block text-sm font-medium leading-6 text-slate-800 dark:text-slate-100 mb-2"
        >
          {label}
        </label>
        {imageUrl && (
          <button
            onClick={() => setImageUrl("")}
            type="button"
            className="flex space-x-2  bg-slate-900 rounded-md shadow text-slate-50  py-2 px-4"
          >
            <Pencil className="w-5 h-5" />
            <span>Change Image</span>
          </button>
        )}
      </div>
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt="Item image"
          width={1000}
          height={667}
          className="w-full h-64 object-contain"
        />
      ) : (
        <UploadDropzone
          endpoint={endpoint}
          onClientUploadComplete={(res) => {
            if (res && res[0]) {
              setImageUrl(res[0].url);
              // Do something with the response
              toast.success("Image uploaded successfully");
              console.log("Files: ", res);
              console.log("Upload Completed");
            }
          }}
          onUploadError={(error) => {
            // Do something with the error.
            toast.error("Image upload failed");
            console.log(`ERROR! ${error.message}`);
          }}
        />
      )}
    </div>
  );
}


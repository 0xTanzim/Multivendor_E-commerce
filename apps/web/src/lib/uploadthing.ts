
import {
  generateUploadButton,
  generateUploadDropzone,
  generateUploader,
} from '@uploadthing/react';

import type { OurFileRouter } from '@/app/api/uploadthing/core';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const UploadButton = generateUploadButton<OurFileRouter>() as any;


export const UploadDropzone = generateUploadDropzone<OurFileRouter>();
export const Uploader = generateUploader<OurFileRouter>();

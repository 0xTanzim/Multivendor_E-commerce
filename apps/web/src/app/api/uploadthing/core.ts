import { createUploadthing, FileRouter } from 'uploadthing/next';

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter: FileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  categoryImageUploader: f({ image: { maxFileSize: '4MB' } })
    // Set permissions and file types for this FileRoute
    .onUploadComplete(async ({ metadata, file }) => {
      console.log('file url', file.url, metadata);
      return { url: file.url };
    }),

  imageUploader: f({ image: { maxFileSize: '4MB' } }).onUploadComplete(
    async ({ metadata, file }) => {
      console.log('file url', file.url, metadata);
      return { url: file.url };
    }
  ),

  marketLogoUploader: f({ image: { maxFileSize: '1MB' } }).onUploadComplete(
    async ({ metadata, file }) => {
      console.log('file url', file.url, metadata);
      return { url: file.url };
    }
  ),

  productImageUploader: f({ image: { maxFileSize: '4MB' } }).onUploadComplete(
    async ({ metadata, file }) => {
      console.log('file url', file.url, metadata);
      return { url: file.url };
    }
  ),

  trainingImageUploader: f({ image: { maxFileSize: '4MB' } }).onUploadComplete(
    async ({ metadata, file }) => {
      console.log('file url', file.url, metadata);
      return { url: file.url };
    }
  ),

  bannerImageUploader: f({ image: { maxFileSize: '4MB' } }).onUploadComplete(
    async ({ metadata, file }) => {
      console.log('file url', file.url, metadata);
      return { url: file.url };
    }
  ),
  farmerImageUploader: f({ image: { maxFileSize: '4MB' } }).onUploadComplete(
    async ({ metadata, file }) => {
      console.log('file url', file.url, metadata);
      return { url: file.url };
    }
  ),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

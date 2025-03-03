export type Banner = {
  id?: string;
  title: string;
  link: string;
  imageUri?: string;
  isActive?: boolean;
};

export function isBannerArray(obj: unknown): obj is Banner[] {
  return Array.isArray(obj) && obj.every(isBanner);
}

export function isBanner(obj: unknown): obj is Banner {
  if (typeof obj !== 'object' || obj === null) return false;
  const bannerObj = obj as Banner;

  return (
    typeof bannerObj.title === 'string' &&
    typeof bannerObj.link === 'string' &&
    (bannerObj.imageUri === undefined ||
      typeof bannerObj.imageUri === 'string') &&
    (bannerObj.isActive === undefined ||
      typeof bannerObj.isActive === 'boolean')
  );
}


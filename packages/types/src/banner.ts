export type Banner = {
  id?: string;
  title: string;
  link: string;
  imageUrl?: string;
  isActive: boolean;
};

export function isBannerArray(obj: unknown): obj is Banner[] {
  return Array.isArray(obj) && obj.every(isBanner);
}

export function isBanner(obj: unknown): obj is Banner {
  if (typeof obj !== 'object' || obj === null) return false;
  const bannerObj = obj as Banner;

  return (
    'title' in bannerObj &&
    typeof bannerObj.title === 'string' &&
    'link' in bannerObj &&
    typeof bannerObj.link === 'string' &&
    'isActive' in bannerObj &&
    typeof bannerObj.isActive === 'boolean' &&
    (typeof bannerObj.imageUrl === 'string' || bannerObj.imageUrl === undefined)
  );
}

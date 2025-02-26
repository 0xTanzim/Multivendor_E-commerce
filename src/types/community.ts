export type Community = {
  id?: string;
  title: string;
  expertId: string;
  categoryId: number;
  slug?: string;
  description: string;
  image?: string;
  content?: string;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export function isCommunityArray(obj: unknown): obj is Community[] {
  return Array.isArray(obj) && obj.every(isCommunity);
}

export function isCommunity(obj: unknown): obj is Community {
  if (typeof obj !== 'object' || obj === null) return false;
  const communityObj = obj as Community;

  return (
    'title' in communityObj &&
    typeof communityObj.title === 'string' &&
    'categoryId' in communityObj &&
    typeof communityObj.categoryId === 'number' &&
    'description' in communityObj &&
    typeof communityObj.description === 'string' &&
    (communityObj.slug === undefined ||
      typeof communityObj.slug === 'string') &&
    (communityObj.image === undefined ||
      typeof communityObj.image === 'string') &&
    (communityObj.content === undefined ||
      typeof communityObj.content === 'string') &&
    (communityObj.isActive === undefined ||
      typeof communityObj.isActive === 'boolean')
  );
}


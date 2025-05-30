import { Training } from './community';
import { Market } from './market';
import { Product } from './products';

export interface CreateCategory {
  title: string;
  slug: string;
  imageUrl?: string;
  description?: string;
  isActive: boolean;
  marketIds?: string[];
}

export type Category = CreateCategory &  {
  id?: string;
  products?: Product[];
  marketIds?: string[];
  markets?: Market[];
  trainings?: Training[];
};

export function isCategoryArray(obj: unknown): obj is Category[] {
  return Array.isArray(obj) && obj.every(isCategory);
}

export function isCategory(obj: unknown): obj is Category {
  if (typeof obj !== 'object' || obj === null) return false;
  const categoryObj = obj as Category;

  return (
    typeof categoryObj.title === 'string' &&
    typeof categoryObj.description === 'string' &&
    (categoryObj.imageUrl === undefined ||
      typeof categoryObj.imageUrl === 'string')
  );
}

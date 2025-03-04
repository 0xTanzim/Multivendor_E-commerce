import { prisma } from '@repo/database';
import { CreateCategory } from '@repo/types';

export class CategoryService {
  public static instance: CategoryService;

  private constructor() {}

  public static getInstance(): CategoryService {
    if (!CategoryService.instance) {
      CategoryService.instance = new CategoryService();
    }
    return CategoryService.instance;
  }

  async createCategory(data: CreateCategory) {
    try {
      const newCategory: CreateCategory = {
        title: data.title,
        slug: data.slug,
        imageUrl: data.imageUrl ?? '',
        description: data.description ?? '',
        isActive: data.isActive ?? false,
      };

      const res = await prisma.category.create({
        data: newCategory,
      });

      return res;
    } catch (err) {
      console.error(err);
      throw new Error('Failed to create category');
    }
  }

  async getCategories() {
    try {
      const categories = await prisma.category.findMany({
        orderBy: {
          createdAt: 'desc',
        },
      });
      return categories;
    } catch (err) {
      console.error(err);
      throw new Error('Failed to fetch categories');
    }
  }

  async isExistingCategory(slug: string) {
    try {
      if (!slug) {
        throw new Error('Invalid slug');
      }

      const category = await prisma.category.findUnique({
        where: {
          slug,
        },
      });

      return !!category;
    } catch (err) {
      console.error(err);
      throw new Error('Failed to check category');
    }
  }
}

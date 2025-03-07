import { prisma} from '@repo/database';
import { Banner } from '@repo/types';



export class BannerService {
  public static instance: BannerService;

  private constructor() {}

  public static getInstance(): BannerService {
    if (!BannerService.instance) {
      BannerService.instance = new BannerService();
    }
    return BannerService.instance;
  }

  async createBanner(data: Banner) {
    try {
      const newBanner = {
        link: data.link,
        title: data.title,
        isActive: data.isActive || false,
        imageUrl: data.imageUri || '',
      };

      const res = await prisma.banner.create({
        data: newBanner,
      });

      return res;
    } catch (err) {
      console.error(err);
      throw new Error('Failed to create banner');
    }
  }

  async getBanners(): Promise<Banner[]> {
    try {
      const banners = await prisma.banner.findMany({
        orderBy: {
          createdAt: 'desc',
        },
      });
      return banners;
    } catch (err) {
      console.error(err);
      throw new Error('Failed to fetch banners');
    }
  }
}

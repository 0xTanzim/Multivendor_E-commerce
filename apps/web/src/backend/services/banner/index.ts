import { Banner } from '@repo/types';
import { prisma } from '@repo/database';

export const createBanner = async (data: Banner) => {
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

    console.log('Banner created successfully', res);
    

    return res;
  } catch (err) {
    console.error(err);
    throw new Error('Failed to create banner');
  }
};

import prisma from '@/backend/lib/prisma';
import { Banner } from '@/types';

export const createBanner = async (data: Banner) => {
  try {
    const newBanner = {
      link: data.link,
      title: data.title,
      isActive: data.isActive || false,
      imageUrl: data.imageUri,
    };

    const res = await prisma.banner.create({
      data: newBanner,
    });

    return res;
  } catch (err) {
    console.error(err);
    throw new Error('Failed to create banner');
  }
};


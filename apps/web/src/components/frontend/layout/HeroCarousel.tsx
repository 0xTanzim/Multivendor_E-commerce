'use client';

import { Banner } from '@repo/types';
import { Carousel } from 'nuka-carousel';

type HeroCarouselProps = {
  banners: Banner[];
};

const HeroCarousel = ({ banners }: HeroCarouselProps) => {
  const defaultImage = 'https://picsum.photos/800/400';

  return (
    <Carousel autoplay showArrows className="rounded-md over-flow-hidden">
      {banners && banners.length > 0 ? (
        banners.map((banner) => (
          <img
            key={banner.id}
            src={banner.imageUrl || defaultImage}
            width={1000}
            height={500}
            alt={banner.title}
          />
        ))
      ) : (
        <>
          <img src={defaultImage} width={1000} height={500} alt="Banner 1" />
        </>
      )}
    </Carousel>
  );
};

export default HeroCarousel;

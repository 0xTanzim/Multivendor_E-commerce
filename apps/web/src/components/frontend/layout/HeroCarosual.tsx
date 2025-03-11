'use client';

import { Carousel } from 'nuka-carousel';

const HeroCarosual = () => {
  return (
    <Carousel autoplay showArrows className="rounded-md over-flow-hidden">
      <img
        src="https://picsum.photos/800/400"
        width={1000}
        height={500}
        alt="Banner 1"
      />
      <img
        src="https://picsum.photos/800/400"
        width={1000}
        height={500}
        alt="Banner 2"
      />
    </Carousel>
  );
};

export default HeroCarosual;

'use client';

import { Market } from '@repo/types';
import Image from 'next/image';
import Link from 'next/link';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

type MarketsCarouselProps = {
  markets: Market[];
};

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const MarketsCarousel = ({ markets }: MarketsCarouselProps) => {
  const defaultImage = '/images/tometo.webp';

  return (
    <>
      <Carousel
        swipeable={false}
        draggable={false}
        showDots={true}
        responsive={responsive}
        ssr={true}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={1000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={['tablet', 'mobile']}
        // deviceType={this.props.deviceType}
        dotListClass="custom-dot-list-style"
        itemClass="px-4"
      >
        {markets &&
          markets.map((market) => (
            <Link
              href={`/market/${market?.slug}`}
              key={market?.id}
              className="rounded-lg mr-3  bg-red-300"
            >
              <Image
                src={market?.logoUrl || defaultImage}
                alt={market?.title}
                width={550}
                height={550}
                className="w-full rounded-2xl"
              />
              <h2 className=" text-center mt-2 dark:text-slate-200  text-slate-800">
                {market?.title}
              </h2>
            </Link>
          ))}
      </Carousel>
    </>
  );
};

export default MarketsCarousel;

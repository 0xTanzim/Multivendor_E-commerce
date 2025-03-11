'use client';

import Image from 'next/image';
import Link from 'next/link';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

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

const MarketsCarousel = () => {
  const slides = [{}, {}, {}, {},{}, {},{}, {}, {}];

  return (
    <>
      <Carousel
        swipeable={false}
        draggable={false}
        showDots={true}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
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
        {slides &&
          slides.map((slides, inx) => (
            <Link href="#" key={inx} className="rounded-lg mr-3  bg-red-300">
              <Image
                src="/images/tometo.webp"
                alt="11.jpg"
                width={550}
                height={550}
                className="w-full rounded-sm"
              />
              <h2 className=" text-center mt-2 dark:text-slate-200  text-slate-800">Vegetables</h2>
            </Link>
          ))}
      </Carousel>
    </>
  );
};

export default MarketsCarousel;

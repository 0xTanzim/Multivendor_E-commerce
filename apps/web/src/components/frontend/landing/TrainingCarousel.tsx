'use client';

import { Training } from '@repo/types';
import Image from 'next/image';
import Link from 'next/link';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

type TrainingCarouselProps = {
  trainings: Training[];
};

const TrainingCarousel = ({ trainings }: TrainingCarouselProps) => {
  const defaultImage = '/images/community.png';

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
        {trainings &&
          trainings.map((training) => (
            <div
              key={training?.id}
              className="rounded-lg mr-3 bg-slate-200  dark:bg-slate-900 overflow-hidden"
            >
              <Link href={'#'}>
                <Image
                  src={training?.image || defaultImage}
                  alt={training?.title}
                  width={550}
                  height={550}
                  className="w-full rounded-sm h-48 object-cover"
                />
              </Link>

              <h2 className=" text-center mt-2 dark:text-slate-200 my-2 text-slate-800 text-xl">
                {training?.title}
              </h2>
              <p className="px-4 line-clamp-3 text-slate-800 dark:text-slate-200">
                {training?.description}
              </p>

              <div className="flex justify-between items-center px-4 py-2">
                <Link
                  href={'#'}
                  className="bg-lime-600 hover:bg-lime-700 duration-300 transition-all text-slate-50 rounded-md px-4 py-2"
                >
                  Read More
                </Link>

                <Link
                  className="dark:text-slate-200  text-slate-800"
                  href={'#'}
                >
                  Talk to the Consultant
                </Link>
              </div>
            </div>
          ))}
      </Carousel>
    </>
  );
};

export default TrainingCarousel;

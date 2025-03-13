'use client';

import { Product } from '@repo/types';
import { BaggageClaim } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
    slidesToSlide: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
    slidesToSlide: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
    slidesToSlide: 1,
  },
};

type CategoryCarouselProps = {
  products: Product[];
};

const CategoryCarousel = ({ products }: CategoryCarouselProps) => {
  const defaultImage = '/images/tometo.webp';
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
        {products &&
          products.map((product) => (
            <div key={product.id} className="rounded-lg mr-3  bg-white dark:bg-slate-900 border shadow-md  overflow-hidden">
              <Link href={`#`}>
                <Image
                  src={
                    product?.imageUrl?.trim() ? product.imageUrl : defaultImage
                  }
                  alt={product?.title || 'Product Image'}
                  width={550}
                  height={550}
                  className="w-full rounded-sm h-48 object-cover"
                />
              </Link>

              <div className="px-4">
                <Link href={`#`}>
                  <h2 className=" text-center font-semibold my-2 dark:text-slate-200  text-slate-800">
                    {product?.title}
                  </h2>
                </Link>

                <div className="flex justify-between gap-2 pb-3 items-center dark:text-slate-200  text-slate-800">
                  <p>$ {product?.sellPrice}</p>

                  <button className="flex items-center text-white  space-x-2 bg-lime-600 px-4 py-2 rounded-md ">
                    <BaggageClaim /> <span>Add</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
      </Carousel>
    </>
  );
};

export default CategoryCarousel;

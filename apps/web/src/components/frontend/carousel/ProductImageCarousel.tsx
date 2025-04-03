'use client';

import React, { useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import Image from 'next/image';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
const ProductImageCarousel = ({
  productImages,
  thumbnail,
}: {
  productImages: string[];
  thumbnail: string;
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  return (
    <div className="col-span-3">
      {productImages.length > 0 ? (
        <>
          <Swiper
            style={
              {
                '--swiper-navigation-color': '#fff',
                '--swiper-pagination-color': '#fff',
              } as React.CSSProperties
            }
            loop={true}
            spaceBetween={10}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper2"
          >
            {productImages.map((image, index) => (
              <SwiperSlide key={index}>
                <Image
                  src={image}
                  alt={`Product Image ${index}`}
                  width={500}
                  height={500}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <Swiper
            onSwiper={(swiper) => setThumbsSwiper(swiper)}
            loop={true}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper"
          >
            {productImages.map((image, index) => (
              <SwiperSlide key={index}>
                <Image
                  src={image}
                  alt={`Thumbnail ${index}`}
                  width={100}
                  height={100}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      ) : (
        <>
          {' '}
          <Image
            src={thumbnail ?? '/images/tometo.webp'}
            alt="Product Image"
            width={500}
            height={500}
          />
        </>
      )}
    </div>
  );
};

export default ProductImageCarousel;

'use client';

import { Product } from '@repo/types';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ProductItem from './ProductItem';

type CategoryCarouselProps = {
  products: Product[];
  isMarketPage?: boolean;
};

const CategoryCarousel = ({
  products,
  isMarketPage,
}: CategoryCarouselProps) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: isMarketPage ? 3 : 4,
      slidesToSlide: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: isMarketPage ? 2 : 3,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      slidesToSlide: 1,
    },
  };
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
        transitionDuration={1000}
        containerClass="carousel-container"
        removeArrowOnDeviceType={['tablet', 'mobile']}
        // deviceType={this.props.deviceType}
        dotListClass="custom-dot-list-style"
        itemClass="px-4"
      >
        {products &&
          products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
      </Carousel>
    </>
  );
};

export default CategoryCarousel;

import React from 'react';
import Slider from 'react-slick';
import {
    carouselFullwidth,
    carouselStandard,
} from '~/utilities/carousel-helpers';
import Product from '~/components/elements/products/Product';

export const ProductGroupWithCarousel = ({ products, type = 'normal' }) => {
    if (type === 'fullwidth') {
        return (
            <Slider
                {...carouselFullwidth}
                infinite={true}
                dots={true}
                className='center'
                infinite={true}
                slidesToShow={products.length}
                // infinite={products.length > 7 ? true : false}
                className="ps-carousel outside">
                {products.map((item) => (
                    <div className="ps-carousel-item" key={item.id_product}>
                        <Product product={item} />
                    </div>
                ))}
            </Slider>
        );
    } else {
        return (
            <Slider
                {...carouselStandard}
                infinite={products.length > 5 ? true : false}
                className="ps-carousel outside">
                {products.map((item) => (
                    <div className="ps-carousel-item" key={item.id_product}>
                        <Product product={item} />
                    </div>
                ))}
            </Slider>
        );
    }
};

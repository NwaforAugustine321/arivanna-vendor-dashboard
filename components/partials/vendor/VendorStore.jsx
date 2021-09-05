import React, { Component } from 'react';
import Slider from 'react-slick';
import { relatedProduct } from '../../../public/static/data/product';
import Product from '../../elements/products/Product';
import VendorProducts from './modules/VendorProducts';
import NextArrow from '../../elements/carousel/NextArrow';
import PrevArrow from '../../elements/carousel/PrevArrow';
import Rating from '../../elements/Rating';
import { carouselStandard } from '../../../utilities/carousel-helpers';
import ProductOffline from '../../elements/products/ProductOffline';
import withAuth from '~/components/hoc/RouteAuth';
import { AccessLevel } from '~/utilities/constant-class';

const VendorStore = ({ vendor,vendorProducts }) => {
    return (
        <div className="ps-vendor-store">
            <div className="container">
                <div className="ps-section__container">
                    <div className="ps-section__left">
                        <div className="ps-block--vendor">
                            <div className="ps-block__thumbnail">
                                <img
                                    src="/static/img/vendor/vendor-store.jpg"
                                    alt="martfury"
                                />
                            </div>
                            <div className="ps-block__container">
                                <div className="ps-block__header">
                                    <h4>{vendor.business_name}</h4>
                                    
                                </div>
                                <div className="ps-block__divider"></div>
                              
                            </div>
                        </div>
                    </div>
                    <div className="ps-section__right">
                        <div className="ps-block--vendor-filter">
                            <div className="ps-block__left">
                                <ul>
                                    <li className="active">
                                        <a href="#">Products</a>
                                    </li>
                            
                                </ul>
                            </div>
                    
                        </div>
                        {/* <div className="ps-vendor-best-seller">
                            <div className="ps-section__header">
                                <h3>Best Seller items</h3>
                                <div className="ps-section__nav">
                                    <a
                                        className="ps-carousel__prev"
                                        href="#vendor-bestseller">
                                        <i className="icon-chevron-left"></i>
                                    </a>
                                    <a
                                        className="ps-carousel__next"
                                        href="#vendor-bestseller">
                                        <i className="icon-chevron-right"></i>
                                    </a>
                                </div>
                            </div>
                            <div className="ps-section__content">
                                <Slider
                                    {...carouselStandard}
                                    className="ps-carousel">
                                    {relatedProduct &&
                                        relatedProduct.map((product) => (
                                            <ProductOffline
                                                product={product}
                                                key={product.id}
                                            />
                                        ))}
                                </Slider>
                            </div>
                        </div> */}
                        <VendorProducts vendorProducts={vendorProducts} />
                    </div>
                </div>
            </div>
        </div>
    );
};

// export default VendorStore;
export default withAuth(VendorStore, AccessLevel.ALWAYS_ACCESS_LEVEL);

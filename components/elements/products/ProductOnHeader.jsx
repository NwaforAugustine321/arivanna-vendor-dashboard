import React from 'react';
import Link from 'next/link';

import {
    StrapiProductPrice,
    StrapiProductThumbnail,
} from '~/utilities/product-helper';

import { connect, useDispatch } from 'react-redux';
import { addItem } from '~/store/cart/action';

const ProductOnHeader = ({ product, currency }) => {
    // Views
    const priceView = StrapiProductPrice(product, currency);
    const thumbnailImage = StrapiProductThumbnail(product);
    const dispatch = useDispatch();

    const handleAddItemToCart = (e) => {
        e.preventDefault();
        dispatch(addItem(product));
    };
    return (
        <div className="ps-product--header-sticky">
            <div className="ps-product__thumbnail">{thumbnailImage}</div>
            <div className="ps-product__wrapper">
                <div className="ps-product__content">
                    <Link href="/product/[pid]" as={`/product/${product.id}`}>
                        <a className="ps-product__title">
                            {product.product_title}
                        </a>
                    </Link>
                </div>
                <div className="ps-product__shopping">
                    {priceView}
                    <a
                        className="ps-btn"
                        href="#"
                        onClick={(e) => handleAddItemToCart(e)}>
                        Add to Cart
                    </a>
                </div>
            </div>
        </div>
    );
};

export default connect((state => ({currency: state.setting.currency})))(ProductOnHeader);

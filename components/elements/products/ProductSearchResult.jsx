import React from 'react';
import Link from 'next/link';

import {
    StrapiProductPrice,
    StrapiProductThumbnail,
} from '~/utilities/product-helper';
import Rating from '~/components/elements/Rating';
import { connect } from 'react-redux';

const ProductSearchResult = ({ product, currency }) => {
    return (
        <div className="ps-product ps-product--wide ps-product--search-result">
            <div className="ps-product__thumbnail">
                {StrapiProductThumbnail(product)}
            </div>
            <div className="ps-product__content">
                {/* <Link
                    href="/product/[pid]"
                    as={`/product_get/${product.data.id_product_m2m_vendor}`}>
                    <a className="ps-product__title">
                        {product.data.product_title}
                    </a>
                </Link> */}
                <Link
                    href="/product/[pid]"
                    as={`/product/${product.id_product_m2m_vendor}`}>
                    <a className="ps-product__title">{product.product_title}</a>
                </Link>

                <div className="ps-product__rating">
                    <Rating />
                    <span>{product.ratingCount}</span>
                </div>
                {StrapiProductPrice(product, currency)}
            </div>
        </div>
    );
};
export default connect((state => ({currency: state.setting.currency})))(ProductSearchResult);

import React from 'react';
import Link from 'next/link';
import {
    StrapiProductPrice,
    StrapiProductThumbnailHorizontal,
} from '~/utilities/product-helper';
import Rating from '~/components/elements/Rating';
import { connect } from 'react-redux';

const ProductHorizontal = ({ product, currency }) => {
    return (
        <div className="ps-product--horizontal">
            <div className="ps-product__thumbnail">
                {StrapiProductThumbnailHorizontal(product)}
            </div>
            <div className="ps-product__content">
                <Link href="/product/[pid]" as={`/product/${product.id_product_m2m_vendor}`}>
                    <a className="ps-product__title">{product.product_title}</a>
                </Link>
                <div className="ps-product__rating">
                    
                </div>
                {StrapiProductPrice(product, currency)}
            </div>
        </div>
    );
};

export default connect((state => ({currency: state.setting.currency})))(ProductHorizontal);
//<Rating />
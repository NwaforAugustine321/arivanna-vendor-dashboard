import React from 'react';
import Link from 'next/link';
import {
    StrapiProductBadge,
    StrapiProductPrice,
    StrapiProductThumbnail,
} from '~/utilities/product-helper';

import ModuleProductActions from '~/components/elements/products/modules/ModuleProductActions';
import Rating from '~/components/elements/Rating';
import { connect } from 'react-redux';

const ProductSimple = ({ product , currency}) => {
    return (
        <div className="ps-product ps-product--simple">
            <div className="ps-product__thumbnail">
                {StrapiProductThumbnail(product)}
                {StrapiProductBadge(product)}
                <ModuleProductActions />
            </div>
            <div className="ps-product__container">
                <div className="ps-product__content">
                    <Link href="/product/[pid]">
                        <a className="ps-product__title">
                            {product.product_title}
                        </a>
                    </Link>
                    <div className="ps-product__rating">
                        <Rating />
                        <span>{product.ratingCount}</span>
                    </div>
                    {StrapiProductPrice(product, currency)}
                </div>
            </div>
        </div>
    );
};

export default connect((state => ({currency: state.setting.currency})))(ProductSimple);

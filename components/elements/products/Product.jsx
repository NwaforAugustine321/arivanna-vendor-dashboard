import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Rating from '../Rating';

import {
    StrapiProductBadge,
    StrapiProductPriceShopItems,
    StrapiProductThumbnail,
} from '~/utilities/product-helper';

import ModuleProductActions from '~/components/elements/products/modules/ModuleProductActions';
import { connect } from 'react-redux';

const Product = ({ product, currency }) => {
    // Views
    const priceView = StrapiProductPriceShopItems(product, currency);
    const thumbnailImage = StrapiProductThumbnail(product);
    const badgeView = StrapiProductBadge(product);

    return (
        <div className="ps-product">
            <div className="ps-product__thumbnail">
                    {thumbnailImage}
                {/* {badgeView} */}
                <ModuleProductActions product={product} />
            </div>
            <div className="ps-product__container">
                <Link href="/shop">
                    <a className="ps-product__vendor">
                        {product.business_name}
                    </a>
                </Link>
                <div className="ps-product__content">
                    <Link
                        href="/product/[pid]"
                        as={`/product/${product.id_product_m2m_vendor}`}>
                        <a className="ps-product__title">
                            {product.product_title}
                        </a>
                    </Link>
                    <div hidden className="ps-product__rating">
                        <Rating />
                        <span>02</span>
                    </div>
                    {priceView}
                </div>
                <div className="ps-product__content hover">
                    <Link
                        href="/product/[pid]"
                        as={`/product/${product.id_product_m2m_vendor}`}>
                        <a className="ps-product__title">
                            {product.product_title}
                        </a>
                    </Link>
                    {priceView}
                </div>
            </div>
        </div>
    );
};

export default connect((state => ({currency: state.setting.currency})))(Product);

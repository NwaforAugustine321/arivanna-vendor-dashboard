import React from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import Rating from '../Rating';
import {
    StrapiProductBadge,
    StrapiProductPriceExpanded,
    StrapiProductThumbnail,
} from '~/utilities/product-helper';
import ModuleProductActions from '~/components/elements/products/modules/ModuleProductActions';
import ModuleProductProgressbar from '~/components/elements/products/modules/ModuleProductProgressbar';

const ProductDealOfDay = ({ product, currency }) => {
    return (
        <div className="ps-product ps-product--inner">
            <div className="ps-product__thumbnail">
                {StrapiProductThumbnail(product)}
                {StrapiProductBadge(product)}
                <ModuleProductActions product={product} />
            </div>
            <div className="ps-product__container">
                <Link href="/shop">
                    <a className="ps-product__vendor">{product.business_name}</a>
                </Link>
                <div className="ps-product__content">
                    {StrapiProductPriceExpanded(product, currency)}

                    <Link href="/product/[pid]" as={`/product/${product.id}`}>
                        <a className="ps-product__title">{product.product_title}</a>
                    </Link>
                    {/* <div className="ps-product__rating">
                        <Rating />
                        <span>{product.ratingCount}</span>
                    </div> */}
                    {/* <ModuleProductProgressbar product={product} /> */}
                </div>
            </div>
        </div>
    );
};

export default connect((state) => ({ currency: state.setting.currency }))(
    ProductDealOfDay
);

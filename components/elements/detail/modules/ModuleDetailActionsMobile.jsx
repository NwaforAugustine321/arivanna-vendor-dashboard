import React, { useCallback, useState } from 'react';
import { addItem } from '~/store/cart/action';
import { connect, useDispatch } from 'react-redux';
import { checkIfShippingAvailableForLocation } from '~/utilities/product-helper';

const ModuleDetailActionsMobile = ({ product, country }) => {
    const dispatch = useDispatch();
    const handleAddItemToCart = (e) => {
        e.preventDefault();
        let tmp = product;
        if (tmp) {
            tmp.quantity = 1;
            dispatch(addItem(tmp));
        }
    };

    const isShippingAvailable = useCallback(() => {
        let isAvailable = true;
        if (product?.shipping_locations) {
            const locations = JSON.parse(product.shipping_locations) || [];
            if (Array.isArray(locations))
                isAvailable = locations.includes(country.code);
        }

        return isAvailable;
    }, [product, country]);

    if (!isShippingAvailable()) {
        return null;
    }

    return (
        <div className="ps-product__actions-mobile">
            <a
                className="ps-btn ps-btn--black"
                href="#"
                onClick={(e) => handleAddItemToCart(e)}>
                Add to cart
            </a>
            <a
                className="ps-btn"
                href="#"
                onClick={(e) => handleAddItemToCart(e)}>
                Buy Now
            </a>
        </div>
    );
};

export default connect((state) => ({ country: state.setting.country }))(
    ModuleDetailActionsMobile
);

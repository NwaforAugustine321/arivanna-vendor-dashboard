import React, { useCallback } from 'react';
import { checkIfShippingAvailableForLocation, StrapiProductPrice } from '~/utilities/product-helper';
import { connect, useDispatch } from 'react-redux';
import { addItem } from '~/store/cart/action';
import { addItemToCompare } from '~/store/compare/action';
import { addItemToWishlist } from '~/store/wishlist/action';

const ModuleProductWideActions = ({ product, currency, country, auth }) => {
    const dispatch = useDispatch();

    const handleAddItemToCompare = (e) => {
        e.preventDefault();
        dispatch(addItemToCompare(product));
    };

    const handleAddItemToWishlist = (e) => {
        e.preventDefault();
        dispatch(addItemToWishlist(product));
    };

    const handleAddItemToCart = (e) => {
        if (auth.isLoggedIn && Boolean(auth.isLoggedIn) === true) {
            e.preventDefault();
            dispatch(addItem(product));
        } else {
            window.location = 'account/login';
        }

    };

    return (
        <div className="ps-product__shopping">
            {StrapiProductPrice(product, currency)}
            { checkIfShippingAvailableForLocation(product) &&
                <a className="ps-btn" href="#" onClick={(e) => handleAddItemToCart(e)}>
                    Add to cart
            </a>
            }
            <ul className="ps-product__actions">
                <li>
                    <a href="#" onClick={(e) => handleAddItemToWishlist(e)}>
                        <i className="icon-heart"></i> Wishlist
                    </a>
                </li>
                <li>
                    <a href="#" onClick={(e) => handleAddItemToCompare(e)}>
                        <i className="icon-chart-bars"></i> Compare
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default connect((state => ({
    currency: state.setting.currency,
    country: state.setting.country,
    auth: state.auth
})))(ModuleProductWideActions);

import React, { useCallback, useState } from 'react';
import { Modal } from 'antd';
import { addItem } from '~/store/cart/action';
import { addItemToCompare } from '~/store/compare/action';
import { addItemToWishlist } from '~/store/wishlist/action';
import { connect, useDispatch } from 'react-redux';
import ProductDetailQuickView from '~/components/elements/detail/ProductDetailQuickView';
import { checkIfShippingAvailableForLocation } from '~/utilities/product-helper';

const ModuleProductActions = ({ product, country, auth }) => {
    const dispatch = useDispatch();
    const [isQuickView, setIsQuickView] = useState(false);

    const handleAddItemToCart = (e) => {
        if (auth.isLoggedIn && Boolean(auth.isLoggedIn) === true) {
            e.preventDefault();
            dispatch(addItem(product));
        } else {
            window.location = 'account/login';
        }
    };

    const handleAddItemToCompare = (e) => {
        e.preventDefault();
        dispatch(addItemToCompare(product.product_title));
    };

    const handleAddItemToWishlist = (e) => {
        e.preventDefault();
        dispatch(addItemToWishlist(product));
    };

    const handleShowQuickView = (e) => {
        e.preventDefault();
        setIsQuickView(true);
    };

    const handleHideQuickView = (e) => {
        e.preventDefault();
        setIsQuickView(false);
    };

    return (
        <ul className="ps-product__actions">
            {checkIfShippingAvailableForLocation(product) && (
                <li>
                    <a
                        href="#"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Add To Cart"
                        onClick={handleAddItemToCart}>
                        <i className="icon-cart"></i>
                    </a>
                </li>
            )}
            <li hidden>
                <a
                    href="#"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Quick View"
                    onClick={handleShowQuickView}>
                    <i className="icon-eye"></i>
                </a>
            </li>
            <li>
                <a
                    href="#"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Add to wishlist"
                    onClick={handleAddItemToWishlist}>
                    <i className="icon-heart"></i>
                </a>
            </li>
            <li hidden>
                <a
                    href="#"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Compare"
                    onClick={handleAddItemToCompare}>
                    <i className="icon-chart-bars"></i>
                </a>
            </li>
            <Modal
                centered
                footer={null}
                width={1024}
                onCancel={(e) => handleHideQuickView(e)}
                visible={isQuickView}
                closeIcon={<i className="icon icon-cross2"></i>}>
                <h3>Quickview</h3>
                <ProductDetailQuickView product={product} />
            </Modal>
        </ul>
    );
};

const mapStateToProps = (state) => ({
    country: state.setting.country,
    auth: state.auth,
});

export default connect(mapStateToProps)(ModuleProductActions);

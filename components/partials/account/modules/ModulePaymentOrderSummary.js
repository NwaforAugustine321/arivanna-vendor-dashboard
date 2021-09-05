import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import {formatCurrency} from '~/utilities/product-helper';

const ModulePaymentOrderSummary = ({
    isShippingCostShow = true,
    cart: {
        shipping,
        amount,
        cartItems,
        shippingCart
    },
    setting: { currency }
}) => {
    const [shippingCosts, setShippingCosts] = useState([0]);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('182heU'));
        if (data) {
            setShippingCosts(data);
        }
    }, []);

    let listItemsView, shippingView, totalView;
    if (shippingCart && shippingCart.CartItems.length > 0) {
        listItemsView = shippingCart.CartItems.map((product) => (
            <Link href="/" key={product.id_product_m2m_vendor}>
                <a>
                    <strong>
                        {product.product_title}
                        <span>x{product.quantity}</span>
                    </strong>
                    <small>
                        {currency?.symbol ?? '$'}
                        {formatCurrency(product.quantity *
                            (product.p2v_promo_price ?? product.p2v_price), currency)}
                    </small>
                </a>
            </Link>
        ));
    } else {
        listItemsView = <p>No Product.</p>;
    }
    if (isShippingCostShow) {
        shipping = shippingCart && shippingCart.CartItems.length > 0 ? shipping : 0;
        shippingView = (
            <figure>
                { shippingCart.amount === 0 ? 
                    <figcaption>
                    <strong>Shipping Fee</strong>
                    <small>
                        {currency?.symbol ?? '$'}{'0.00'}
                    </small>
                </figcaption>
                : <figcaption>
                <strong>Shipping Fee</strong>
                <small>
                    {currency?.symbol ?? '$'}{formatCurrency(shipping, currency)}
                </small>
            </figcaption>}
            </figure>
        );
        totalView = (
            <figure className="ps-block__total">
                { shippingCart.amount === 0 ?
                <h3>
                    Total
                    <strong>
                        {currency?.symbol ?? '$'}
                        {'0.00'}
                    </strong>
                </h3>
                :<h3>
                    Total
                    <strong>
                        {currency?.symbol ?? '$'}
                        {formatCurrency(parseFloat(shippingCart.amount) + parseFloat(shipping), currency)}
                    </strong>
                </h3>}
            </figure>
        );
    } else {
        totalView = (
            <figure className="ps-block__total">
                <h3>
                    Total
                    <strong>{currency?.symbol ?? '$'}{formatCurrency(amount, currency)}</strong>
                </h3>
            </figure>
        );
    }
    return (
        <div className="ps-block--checkout-order">
            <div className="ps-block__content">
                <figure>
                    <figcaption>
                        <strong>Product</strong>
                        <strong>total</strong>
                    </figcaption>
                </figure>
                <figure className="ps-block__items">{listItemsView}</figure>
                <figure>
                    { shippingCart.amount === 0 ?
                    <figcaption>
                        <strong>Subtotal</strong>
                        <small>{currency?.symbol ?? '$'}{'0.00'}</small>
                    </figcaption>
                    :                     <figcaption>
                    <strong>Subtotal</strong>
                    <small>{currency?.symbol ?? '$'}{formatCurrency(shippingCart.amount, currency)}</small>
                </figcaption>
                    }
                </figure>
                {shippingView}
                {totalView}
            </div>
        </div>
    );
};
export default connect((state) => ({ cart: state.cart, setting: state.setting }))(ModulePaymentOrderSummary);

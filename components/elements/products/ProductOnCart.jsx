import React from 'react';
import Link from 'next/link';
import { StrapiProductThumbnail } from '~/utilities/product-helper';
import { removeItem } from '~/store/cart/action';
import { useDispatch } from 'react-redux';
import { formatCurrency } from '~/utilities/product-helper';

const ProductOnCart = ({ product, currency, handleCheckBoxClick }) => {
    const dispatch = useDispatch();

    const handleRemoveCartItem = (e) => {
        e.preventDefault();
        dispatch(removeItem(product));
    };

    return (
        <div className="ps-product--cart-mobile">
            <input
                type="checkbox"
                checked={product.isChecked}
                onChange={e => handleCheckBoxClick(e, product)}
            ></input>
            <div className="ps-product__thumbnail">
                {StrapiProductThumbnail(product)}
            </div>
            <div className="ps-product__content">
                <a
                    className="ps-product__remove"
                    onClick={(e) => handleRemoveCartItem(e)}>
                    <i className="icon-cross"></i>
                </a>
                <Link
                    href="/product/[pid]"
                    as={`/product/${product.id_product_m2m_vendor}`}>
                    <a className="ps-product__title">{product.product_title}</a>
                </Link>
                <p>
                    <small>
                        {currency?.symbol ?? '$'}
                        {product.is_sale
                            ? formatCurrency(product.p2v_promo_price, currency)
                            : formatCurrency(product.p2v_price, currency)}{' '}
                        x {product.quantity}
                    </small>
                </p>
            </div>
        </div>
    );
};

export default ProductOnCart;

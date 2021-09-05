import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    getCart,
    increaseItemQty,
    decreaseItemQty,
    removeItem,
    clearCart,
    addItemsShippingCart
} from '../../../store/cart/action';
import ModulePaymentOrderSummary from '~/components/partials/account/modules/ModulePaymentOrderSummary';
import Link from 'next/link';
import ProductCart from '../../elements/products/ProductCart';
import { formatCurrency } from '~/utilities/product-helper';

class ShoppingCart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: "",
            currentCartItems: []
        }

    }

    componentDidMount() {
        this.props.dispatch(getCart());
        this.setShippingItems();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.cart.cartItems !== this.props.cart.cartItems) {
            this.setShippingItems();
        }
      }

    setShippingItems() {
        const { cart: { cartItems } } = this.props;
        if (cartItems.length > 0) {
            var totalAmount = 0;
            const filteredResult = cartItems.map((item) => {
                totalAmount = totalAmount + (item.p2v_promo_price * item.quantity)
                return {
                    ...item,
                    isChecked: true
                };
            });
            this.setState({
                currentCartItems: filteredResult,
                amount: totalAmount,
            });
            this.props.dispatch(addItemsShippingCart({
                CartItems: filteredResult,
                amount: totalAmount
            }));
        }
    }


    handleIncreaseItemQty(product) {
        this.props.dispatch(increaseItemQty(product));
    }

    handleDecreaseItemQty(product) {
        this.props.dispatch(decreaseItemQty(product));
    }

    handleRemoveCartItem = (product) => {
        const { currentCartItems, amount } = this.state;
        var newAmount = amount;
        newAmount = newAmount - (product.p2v_promo_price * product.quantity);

        const filteredResult = currentCartItems.filter(item => item.id_product != product.id_product);
        this.setState({
            currentCartItems: filteredResult,
            amount: newAmount
        });

        this.props.dispatch(removeItem(product));
    };

    handleClearCart = () => {
        this.props.dispatch(clearCart());
    };

    handleCheckBoxClick(event, product) {
        const { checked } = event.target;
        var cart = this.props.cart;
        const { currentCartItems, amount } = this.state;
        var newAmount = amount;
        const filteredResult = currentCartItems.map((item) => {
            if (item.id_product == product.id_product) {
                item.isChecked = checked;
                newAmount = checked ? newAmount + (item.p2v_promo_price * item.quantity) : newAmount - (item.p2v_promo_price * item.quantity)
            }
            return item;
        });
        this.setState({
            currentCartItems: filteredResult,
            amount: newAmount
        });
        const shippingItems = filteredResult.filter(item => item.isChecked);
        this.props.dispatch(addItemsShippingCart({
            CartItems: shippingItems,
            amount: newAmount
        }));
    }


    render() {
        const { cart: { amount, cartTotal, cartItems }, setting: { currency } } = this.props;
        let currentCartItems = [];
        if (cartItems && cartItems.length > 0) {
            currentCartItems = cartItems;
        }
        return (
            <div className="ps-section--shopping ps-shopping-cart">
                <div className="container">
                    <div className="ps-section__header">
                        <h1>Shopping Cart</h1>
                    </div>
                    <div className="ps-section__content">
                        <div className="table-responsive">
                            <table className="table ps-table--shopping-cart">
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Total</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentCartItems.map((product) => (
                                        <tr key={product.id_product_m2m_vendor}>
                                            <td>
                                                <ProductCart
                                                    product={product}
                                                />
                                                {/*<div className="ps-product--cart">
                                                    <div className="ps-product__thumbnail">
                                                        <Link
                                                            href="/product/[pid]"
                                                            as={`/product/${product.id}`}>
                                                            <a>
                                                                <img
                                                                    src={
                                                                        product.thumbnail
                                                                    }
                                                                    alt="martfury"
                                                                />
                                                            </a>
                                                        </Link>
                                                    </div>
                                                    <div className="ps-product__content">
                                                        <Link
                                                            href="/product/[pid]"
                                                            as={`/product/${product.id}`}>
                                                            <a className="ps-product__title">
                                                                {product.product_title}
                                                            </a>
                                                        </Link>
                                                        <p>
                                                            Sold By:
                                                            <strong>
                                                                {product.vendor}
                                                            </strong>
                                                        </p>
                                                    </div>
                                                </div>*/}
                                            </td>
                                            <td className="price">
                                                {product.is_sale ? (
                                                    <>
                                                        {currency?.symbol ?? '$'}
                                                        {
                                                            formatCurrency(product.p2v_promo_price, currency)
                                                        }
                                                    </>
                                                ) : (
                                                    <>{currency?.symbol ?? '$'}{formatCurrency(product.p2v_price, currency)}</>
                                                )}
                                            </td>
                                            <td>
                                                <div className="form-group--number">
                                                    <button
                                                        className="up"
                                                        onClick={() => this.handleIncreaseItemQty(
                                                            product
                                                        )}>
                                                        +
                                                    </button>
                                                    <button
                                                        className="down"
                                                        onClick={() => this.handleDecreaseItemQty(
                                                            product
                                                        )}>
                                                        -
                                                    </button>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        placeholder="1"
                                                        value={product.quantity || ""}
                                                        readOnly={true}
                                                    />
                                                </div>
                                            </td>
                                            <td>
                                                {product.is_sale ? (
                                                    <>
                                                        {currency?.symbol ?? '$'}
                                                        {formatCurrency(product.quantity *
                                                            product.p2v_promo_price, currency)}
                                                    </>
                                                ) : (
                                                    <>
                                                        {currency?.symbol ?? '$'}
                                                        {formatCurrency(product.quantity *
                                                            product.p2v_price, currency)}
                                                    </>
                                                )}
                                            </td>
                                            <td>
                                                <a
                                                    href="#"
                                                    onClick={this.handleRemoveCartItem.bind(
                                                        this,
                                                        product
                                                    )}>
                                                    <i className="icon-cross"></i>
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {currentCartItems.length > 0 && (
                                <button
                                    onClick={this.handleClearCart}
                                    className="ps-btn">
                                    Clear cart
                                </button>
                            )}
                        </div>
                        <div className="ps-section__cart-actions">
                            <Link href="/shop">
                                <a>
                                    <i className="icon-arrow-left mr-2"></i>
                                    Back to Shop
                                </a>
                            </Link>
                        </div>
                    </div>
                    <div className="ps-form__content">
                        <div className="row">
                            <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                                <div className="ps-form__orders">
                                    <h3>Your order</h3>
                                    <ModulePaymentOrderSummary />
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 ">
                            <h3>Items to checkout</h3>
                                <div className="ps-block--shopping-total">
                                    <div className="ps-block__header">
                                        {this.state.amount === 0 ? 
                                        <p>
                                        Subtotal <span> {currency?.symbol ?? '$'}{'0.00'}</span>
                                        </p>
                                        :<p>
                                            Subtotal <span> {currency?.symbol ?? '$'}{formatCurrency(this.state.amount, currency)}</span>
                                        </p>}
                                    </div>
                                    <div className="ps-block__content">
                                        <ul className="ps-block__product">
                                            {this.state.currentCartItems.length > 0
                                                ? this.state.currentCartItems.map(
                                                    (product, index) => {
                                                        return (
                                                            <li
                                                                key={
                                                                    product.id_product_m2m_vendor
                                                                }>
                                                                <input
                                                                    type="checkbox"
                                                                    checked={product.isChecked}
                                                                    onChange={e => this.handleCheckBoxClick(e, product)}
                                                                ></input>
                                                                <span className="ps-block__estimate">
                                                                    <Link
                                                                        href="/product/[pid]"
                                                                        as={`/product/${product.id}`}>
                                                                        <a className="ps-product__title">
                                                                            {
                                                                                product.product_title
                                                                            }
                                                                            <br />{' '}
                                                                            x{' '}
                                                                            {
                                                                                product.quantity
                                                                            }
                                                                        </a>
                                                                    </Link>
                                                                </span>
                                                            </li>
                                                        );
                                                    }

                                                )
                                                : ''}

                                        </ul>
                                        {this.state.amount === 0 ? 
                                        <h3>
                                        Total <span> {currency?.symbol ?? '$'}{'0.00'}</span>
                                    </h3>
                                        :<h3>
                                        Total <span>{currency?.symbol ?? '$'}{formatCurrency(this.state.amount, currency)}</span>
                                    </h3>}
                                    </div>
                                </div>
                                {this.state.amount === 0
                                ?<a className="ps-btn">
                                        Proceed to Checkout
                                </a>
                                :<Link href='/account/checkout'>
                                    <a className="ps-btn">
                                        Proceed to Checkout
                                    </a>
                                </Link>}
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        cart: state.cart,
        setting: state.setting
    }
};
export default connect(mapStateToProps)(ShoppingCart);

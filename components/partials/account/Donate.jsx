import React, { Component, useCallback  } from 'react';
import { connect } from 'react-redux';
import withAuth from '~/components/hoc/RouteAuth';
import { AccessLevel } from '~/utilities/constant-class';
import ShippingInfo from '~/components/shared/ShippingInfo';
import Link from 'next/link';
import ModulePaymentOrderSummaryDonate from '~/components/partials/account/modules/ModulePaymentOrderSummary';
import Router from 'next/router';
import api from '~/api/handler';
import { Radio, Select, notification, Spin, Input, Form } from 'antd';
import {formatCurrency} from '~/utilities/product-helper';


class Donate extends Component {
    constructor(props) {
        super(props);
        this.state = { id_user: props.id_user, loading: false, userInformation: '',  canSubmit: false};
    }

    createOrder = async () => {
        const modalSuccess = (type) => {
            notification[type]({
                message: 'Success',
                description: 'Payment made successfully',
                duration: 5,
            });
        };

        const modalWarning = (type) => {
            notification[type]({
                message: 'Error',
                description: 'Could not process donation',
                duration: 2,
            });
        };

        const localCart = JSON.parse(
            localStorage.getItem('persist:martfury')
        ).cart;

        const cart = JSON.parse(localCart).cartItems;

        let id_products_m2m_vendor = [];

        cart.forEach((cartItem) => {
            const ip_m_v = cartItem.id_product_m2m_vendor;
            for (let i = 0; i < cartItem.quantity; i++) {
                id_products_m2m_vendor.push(ip_m_v);
            }
        });

        let data = {
            id_user: this.props.auth.id_user,
            id_product_m2m_vendor: id_products_m2m_vendor,
            shipping_cost_product_ids: this.props.cart.shipping_cost_product_ids,
            paymentMethod: ''
        };

        this.setState({ loading: true });

        const route = 'order_create';

        await api.handler
            .api_post(data, route)
            .then((response) => {
                if (!response.success) {
                    this.setState({ loading: false });
                    this.setState({ error: 'Could not create order' });
                    modalWarning('warning');
                } else {
                    this.setState({ loading: false });
                    // localStorage.setItem(
                    //     'be890bs90',
                    //     JSON.stringify(response.data.id_order)
                    // );
                    Router.push('/account/paymentDonate');
                }
            })
            .catch((error) => {
                throw error;
            });
    };
    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [e.target.name]: e.target.value,
        });
    };
    onSubmit(e){
        alert(this.state.userInformation)
        e.preventDefault();
        var currency = this.refs.currency.value;
        var amount = parseFloat(this.refs.amount.value.trim());
        
        if(amount > 100 || amount < 0){
            this.setState({error :"Amount must be a Number"});
            return;
        }

        //Helps to disable donate button..
        // this.setState({canSubmit: true});
        this.props.formatCurrency(amount, currency);
    }
    
    render() {
        const {userInformation,amount,currency} = this.state
        return (
            <div className="ps-checkout ps-section--shopping">
                <div className="container">
                    <div className="ps-section__header">
                        <h1>Donation Information</h1>
                    </div>
                    <div className="ps-section__content">
                        <div className="row">
                            <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                                <div className="ps-block--shipping">
                                    <ShippingInfo
                                        id_user={this.state.id_user}
                                    />
                                    <Form onSubmit={this.onSubmit.bind(this)}>
                                    <Form.Item
                                        // name="user_Donation"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'please Donate',
                                            },
                                        ]}>
                                            
                                        <Input
                                            className="form-control"
                                            type="number"
                                            placeholder="Amount"
                                            value={(e) => this.setState({userInformation: e.target.value})}
                                            name="user_Donation"
                                            onChange={this.handleChange}
                                            required
                                        > 
                                        {formatCurrency(amount, currency)}
                                        </Input>
                                     </Form.Item>
                                     <div className="ps-block__footer">
                                        <Link href='/account/checkout'>
                                            <a>
                                                <i className="icon-arrow-left mr-2"></i>
                                                Return to information
                                            </a>
                                        </Link>

                                        <button
                                            onClick={this.createOrder}
                                            className="ps-btn">
                                            {this.state.loading ? (
                                                <Spin />
                                            ) : (
                                                'Continue to donate'
                                            )}
                                        </button>
                                    </div>
                                    </Form>
                                </div>
                            </div>
                            {/* <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12  ps-block--checkout-order">
                                <div className="ps-form__orders">
                                    <ModulePaymentOrderSummaryDonate />
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

// export default Shipping;

const mapStateToProps = (state) => {
    return {...state.auth, cart: state.cart};
};

export default connect(mapStateToProps)(
    withAuth(Donate, AccessLevel.USER_ACCESS_LEVEL)
);

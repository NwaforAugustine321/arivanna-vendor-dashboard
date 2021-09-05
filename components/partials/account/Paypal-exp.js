import React from 'react';
import { connect } from 'react-redux';
import api from '~/api/handler';
import PaypalExpressBtn from 'react-paypal-express-checkout';
import { Radio, Select, notification, Spin, Button } from 'antd';
import Router from 'next/router';
import { formatCurrency } from '~/utilities/product-helper';
import {clearCart} from '~/store/cart/action'
const paypal = process.env.paypal;

export default connect((state) => state)(
    // Paypal Test account Credentials
    // Email: usersmay@gmail.com
    // Password: 87654321

    class MyApp extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                env: paypal.paypalEnv,
                currency: props.setting?.currency?.text ?? 'AUD',
                amount: props?.donate > 0 ? props?.donate :
                    parseFloat(props.cart.amount) +
                    parseFloat(props.cart.shipping),
                sandboxClient: {
                    sandbox: paypal.paypalKey,
                },
                productionClient: {
                    production: paypal.paypalKey,
                },
                error: '',
                loading: false,
            };
        }

        componentDidUpdate(prevProps) {
            
            if (prevProps.donate !== this.props.donate) {
                this.setState({
                    amount: this.props.donate > 0 ? this.props.donate :
                        parseFloat(this.props.cart.amount) +
                        parseFloat(this.props.cart.shipping)
                })
            }

        }

        test = () => {
            console.log(this.state);
        };

        jeetfun(err) {}
        parthafun(suc) {}
        prakashfun(canc) {}

        handleSuccess = async (suc) => {
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
                    description: 'Could not process payment',
                    duration: 2,
                });
            };

            let data = {
                id_order: JSON.parse(localStorage.getItem('be890bs90')),
                token: this.props.auth.token,
                paymentMethod: 'PayPal',
                isPaid: 1,
                id_order_status: {
                    id_order_status: 2,
                    order_status: 'Paid',
                    datetime_updated: '',
                },
                key: 'order_paid',
            };

            this.setState({ loading: true });

            const route = 'order_update';

            await api.handler
                .api_post(data, route)
                .then((response) => {
                    if (!response.success) {
                        this.setState({ loading: false });
                        this.setState({ error: 'Could not make payment' });
                        modalWarning('warning');
                    } else {
                        this.setState({ loading: false });
                        this.props.dispatch(clearCart(data))
                        
                        modalSuccess('success');
                        setTimeout(function () {
                            this.props.donate > 0 ?
                                Router.push('/donate/thanks'):
                                Router.push('/');
                        }, 2500);
                    }
                })
                .catch((error) => {
                    throw error;
                });
        };

        render() {
            console.log(this.state.amount)
            return (
                <>
                    {
                        this.state.loading ? (
                            <Spin />
                        ) : (
                            // : (
                            <PaypalExpressBtn
                                env={this.state.env}
                                client={
                                    this.state.env == 'sandbox'
                                        ? this.state.sandboxClient
                                        : this.state.productionClient
                                }
                                currency={this.state.currency}
                                total={this.state.amount}
                                onError={this.jeetfun}
                                onSuccess={this.handleSuccess}
                                // onSuccess={this.parthafun}
                                onCancel={this.prakashfun}
                                style={{
                                    size: 'large',
                                }}
                            />
                        )
                        // <button onClick={this.test}>test</button>
                        // )
                    }
                </>
            );
        }
    }
);

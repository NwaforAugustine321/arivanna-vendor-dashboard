import React from 'react';
import { connect } from 'react-redux';
import api from '~/api/handler';
import PaypalExpressBtn from 'react-paypal-express-checkout';
import { notification, Spin } from 'antd';
import Router from 'next/router';
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
                currency: 'AUD',
                amount: props?.donate,
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
            if (prevProps?.donate !== this.props?.donate) {
                this.setState({ amount: this.props?.donate })
            }
        }

        jeetfun(err) {}
        parthafun(suc) {}
        prakashfun(canc) {}

        handleSuccess = async (suc) => {
            const modalSuccess = (type) => {
                notification[type]({
                    message: 'Success',
                    description: 'Donation is done successfully',
                    duration: 5,
                });
            };

            modalSuccess('success');
            setTimeout(function () {
                Router.push('/donations/thanks');
            }, 2500);
        };

        render() {
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
                    }
                </>
            );
        }
    }
);

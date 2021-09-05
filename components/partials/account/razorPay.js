import React, { useState } from 'react';
import razorpayImage from '~/public/static/img/payment-method/razorpay-icon.png';
import api from '~/api/handler';
import { connect } from 'react-redux';
const __dev_key__ = 'rzp_test_IeNoKbszLKraUM';
const __pro_key__ = 'dev';
const route = 'razorpay_payment_order';
import { notification } from 'antd';
const Razorpay = (props) => {
    const { total, user_first_name, email, country } = props;
    console.log(props);
    const [user, setUser] = useState([]);
    const loadScript = async (url) => {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = url;
            script.async = true;
            document.body.appendChild(script);

            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                reject(false);
            };
        });
    };

    const handleRazorPay = async () => {
        const result = await loadScript(
            'https://checkout.razorpay.com/v1/checkout.js'
        );

        if (!result) {
            return;
        }
        const data = {
            itemTotal: 4000,
            user_id: props.id_user,
            user_name: user_first_name,
            email: email,
            // country: 'NGN',
        };
        const args = {
            message: 'Payment Loading...',

            duration: 1.9,
        };
        notification.open(args);
        await api.handler
            .api_post(data, route)
            .then((response) => {
                if (!response.success) {
                } else {
                    const { data } = response.data;

                    let options = {
                        key:
                            document.domain === 'localhost'
                                ? __dev_key__
                                : __pro_key__,
                        amount: data.data.amount,
                        currency: data.data.currency,
                        name: 'Payment',
                        description: 'UtopiaTech',
                        // image: 'https://example.com/your_logo',
                        order_id: data.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                        handler: function (response) {
                            alert(response.razorpay_payment_id);
                            alert(response.razorpay_order_id);
                            alert(response.razorpay_signature);
                        },
                        prefill: {
                            name: user_first_name,
                            email: email,

                            // contact: 'user contact 9999999999',
                        },
                        notes: {
                            // address: 'user address',
                            name: user_first_name,
                        },
                        theme: {
                            color: '#3399cc',
                        },
                    };

                    let instance = new window.Razorpay(options);
                    instance.open();
                    instance.on('payment.failed', function (response) {
                        const args = {
                            message: 'Processing...',
                            description: 'payment cannot proceed. Thanks',
                            duration: 0,
                        };
                        notification.open(args);
                    });
                }
            })
            .catch((error) => {
                throw error;
            });
    };

    return (
        <img
            src={razorpayImage}
            style={{ width: 200, height: 45 }}
            onClick={handleRazorPay}
        />
    );
};

const mapStateToProps = (state) => {
    return state.auth;
};

export default connect(mapStateToProps)(Razorpay);

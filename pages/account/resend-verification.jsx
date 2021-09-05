import React, { useState } from 'react';

import BreadCrumb from '~/components/elements/BreadCrumb';
import ContainerPage from '~/components/layouts/ContainerPage';
import withAuth from '~/components/hoc/RouteAuth';
import { AccessLevel } from '~/utilities/constant-class';
import { Form, Input, notification, Spin } from 'antd';
import UserInformationRepository from '../../repositories/UserInformationRepository';
import api from '~/api/handler';
import Router from 'next/router';
import Link from 'next/link';

const UserVerificationPage = () => {
    const [message, setMessage] = useState('Enter your email address below.');
    const [user_email, set_user_email] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Verify Account',
        },
    ];

    const email_number_check = (e) => {
        if (!e.target.value) {
            return false;
        } else if (isNaN(e.target.value) == true) {
            const EMAIL_EXP =
                /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            const isEmailValid = new RegExp(EMAIL_EXP).test(e.target.value);
            if (!isEmailValid) {
                setError('Invalid email');
            }
        } else if (isNaN(e.target.value) == false) {
            var NUMBER_EXP = /^(\+\d{1,3}[- ]?)?\d{10}$/;
            const isPhoneNumberValid = new RegExp(NUMBER_EXP).test(
                e.target.value
            );
            if (!isPhoneNumberValid) {
                setError('Invalid Phone Number');
            }
        } else {
            setError('Invalid email');
        }
    };

    const handleResendVerification = async (e) => {
        const route = 'user_resend_verification';
        let data = { user_email };

        setLoading(true);

        await api.handler
            .api_post(data, route)
            .then((response) => {
                if (!response.success) {
                    setLoading(false);
                    notification['error']({
                        // message: `${response.data}`,
                        description: response.data || response.data,
                    });
                    throw `${response.data}`;
                } else {
                    Router.push('/account/login');
                    notification['success']({
                        message: `Verification code sent!`,
                        description:
                            'Verification code sent to your email address',
                    });
                    setLoading(false);
                }
            })
            .catch((e) => {
                setLoading(false);
            });

        setLoading(false);
    };

    return (
        <ContainerPage title="Verify Account" boxed={true}>
            <div className="ps-page--my-account">
                <BreadCrumb breacrumb={breadCrumb} />
                <div className="container">
                    <Form
                        className="ps-form--account forgot-passoword-form"
                        onFinish={handleResendVerification}>
                        <div className="ps-tab active" id="sign-in">
                            <div className="ps-form__content">
                                <h3>Resend verification email</h3>
                                <h5>{message}</h5>
                                <h5
                                    style={{
                                        color: 'red',
                                        fontWeight: 600,
                                        // marginBottom: 16,
                                    }}>
                                    {error}
                                </h5>
                                <div className="enter-verification-code">
                                    <div className="form-group">
                                        <Form.Item
                                            // name="user_email"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Please input your email ',
                                                },
                                            ]}>
                                            <Input
                                                className="form-control"
                                                type="text"
                                                name="user_email"
                                                placeholder="Email address"
                                                value={user_email}
                                                onChange={(e) =>
                                                    set_user_email(
                                                        e.target.value
                                                    )
                                                }
                                                onBlur={email_number_check}
                                            />
                                        </Form.Item>
                                    </div>
                                    <div className="form-group submit">
                                        <button
                                            type="submit"
                                            className="ps-btn ps-btn--fullwidth">
                                            {loading === false ? (
                                                'Resend verification code'
                                            ) : (
                                                <>
                                                    <Spin /> Resending
                                                    Verification code...
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </ContainerPage>
    );
};

export default UserVerificationPage;

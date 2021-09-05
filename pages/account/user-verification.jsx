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
    const [verifyInfo, setVerifyInfo] = useState({
        user_email: '',
        verification_code: '',
    });
    const [message, setMessage] = useState(
        'A verification code has been sent to your email.'
    );
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

    const handleChange = (e) => {
        setVerifyInfo({
            ...verifyInfo,
            [e.target.name]: e.target.value,
        });
    };

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

    const handleVerifyEmail = async () => {
        setLoading(true);
        await api.handler
            .api_post(verifyInfo, 'user_verify')
            .then((response) => {
                setLoading(false);
                if (response.success) {
                    notification['success']({
                        message: `Email verified successfully!`,
                        description: 'Your account has been verified!',
                    });
                    Router.push('/account/login');
                } else {
                    notification['error']({
                        message: `${response.data}`,
                    });
                    setError(response.data);
                }
            })
            .catch((e) => {
                setLoading(false);
                console.log(e);
            });
    };

    return (
        <ContainerPage title="Verify Account" boxed={true}>
            <div className="ps-page--my-account">
                <BreadCrumb breacrumb={breadCrumb} />
                <div className="container">
                    <Form
                        className="ps-form--account forgot-passoword-form"
                        onFinish={handleVerifyEmail}>
                        <div className="ps-tab active" id="sign-in">
                            <div className="ps-form__content">
                                <h3>Verify Email</h3>
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
                                                value={verifyInfo.user_email}
                                                onChange={handleChange}
                                                onBlur={email_number_check}
                                            />
                                        </Form.Item>
                                    </div>

                                    <div className="form-group">
                                        <Form.Item
                                            // name="verification_code"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Please input your verification code!',
                                                },
                                            ]}>
                                            <Input
                                                className="form-control"
                                                type="text"
                                                name="verification_code"
                                                placeholder="Verification Code"
                                                value={
                                                    verifyInfo.verification_code
                                                }
                                                onChange={handleChange}
                                            />
                                        </Form.Item>
                                    </div>
                                    <div className="form-group submit">
                                        <button
                                            type="submit"
                                            className="ps-btn ps-btn--fullwidth">
                                            {loading === false ? (
                                                ' Verify Account'
                                            ) : (
                                                <>
                                                   <Spin /> Verifying... 
                                                </>
                                            )}
                                        </button>
                                    </div>

                                    <Link href="/account/resend-verification">
                                        <a>Resend verification code</a>
                                    </Link>
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

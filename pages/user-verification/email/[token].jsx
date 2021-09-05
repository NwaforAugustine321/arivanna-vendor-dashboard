import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ContainerPage from '~/components/layouts/ContainerPage';
import BreadCrumb from '~/components/elements/BreadCrumb';
import UserInformationRespository from '../../../repositories/UserInformationRepository';
import Router from 'next/router';

const EmailVerification = () => {
    const router = useRouter();
    const { token } = router.query;
    const [message, setMessage] = useState('Verifying...');

    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'User Verification',
        },
    ];

    const verifyUser = async () => {
        const response = await UserInformationRespository.userVerify({
            type: 'email',
            token,
        })
            .then((res) => {
                setMessage('Your email was verified successfully');
                setTimeout(function () {
                    Router.push('/account/login');
                }, 1500);
            })
            .catch((e) => {
                setMessage('Email verification failed!');
            });
    };

    useEffect(() => {
        verifyUser();
    }, []);

    return (
        <ContainerPage title="User Verification" boxed={true}>
            <div className="ps-page--single">
                <BreadCrumb breacrumb={breadCrumb} />
                <div className="container">
                    <h2>{message}</h2>
                </div>
            </div>
        </ContainerPage>
    );
};

export default EmailVerification;

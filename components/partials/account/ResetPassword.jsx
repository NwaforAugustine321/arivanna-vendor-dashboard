import React from 'react';
import { AccessLevel } from '~/utilities/constant-class';
import withAuth from '~/components/hoc/RouteAuth';
import FormResetPassword from './modules/FormResetPassword';
import AccountMenuSidebar from './modules/AccountMenuSidebar';
import accountLinks from './accountlinks';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Skeleton } from 'antd';
import { useEffect } from 'react';
import UserInformationRepository from '../../../repositories/UserInformationRepository';
import { useRef } from 'react';
import { connect } from 'react-redux';

const ResetPassword = ({ isLoggedIn }) => {
    const router = useRouter();

    const [isTokenVerified, setIsTokenVerified] = useState(null);

    const [error, setError] = useState(null);

    const { token } = router.query;

    useEffect(() => {
        if (isLoggedIn) {
            router.push('/');
        }
    }, [isLoggedIn]);

    useEffect(() => {
        if (token) {
            UserInformationRepository.verifyPassowordToken({
                token: token.replace(/\//g, ''),
            })
                .then((result) => {
                    if (result.success) {
                        setIsTokenVerified(true);
                    } else {
                        setIsTokenVerified(null);
                        setError(
                            'Password reset link is invalid or may be expired, please try again'
                        );
                    }
                })
                .catch((error) => {
                    setIsTokenVerified(null);
                    setError(
                        'Password reset link is invalid or may be expired, please try again'
                    );
                });
        } else {
            setIsTokenVerified(null);
            setError(
                'Password reset link is invalid or may be expired, please try again'
            );
        }
    }, [token]);

    const redirectToForgotPassword = useRef(() => {
        router.push('/account/forgot-password');
    }).current;

    return (
        <section className="ps-my-account ps-page--account">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-sm-12 m-auto">
                        <div className="ps-page__content">
                            <div className="ps-section--account-setting">
                                <div className="ps-section__header">
                                    <h3>Reset Password</h3>
                                </div>
                                {isTokenVerified ? (
                                    <div className="ps-section__content">
                                        <FormResetPassword token={token} />
                                    </div>
                                ) : (
                                    <div>
                                        {error ? (
                                            <div className="ps-section__content">
                                                <div className="ps-form__content">
                                                    <div className="error">
                                                        {error}
                                                    </div>
                                                    <hr className="divider" />
                                                    <div>
                                                        <Button
                                                            onClick={
                                                                redirectToForgotPassword
                                                            }>
                                                            Generate a new link
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <Skeleton active loading />
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const mapStateToProps = (state) => {
    return state.auth;
};

export default connect(mapStateToProps)(ResetPassword);

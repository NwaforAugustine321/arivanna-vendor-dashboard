import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { login } from '../../../store/auth/action';
import { Alert } from 'reactstrap';

import { Form, Input, notification, Spin } from 'antd';
import { connect } from 'react-redux';
import axios from 'axios';
import api from '../../../api/handler';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_email: '',
            user_password: '',
            isValidating: false,
            verifyEmail: false,
            error: '',
            loading: false,
            city: '',
            country: '',
        };
    }

    static getDerivedStateFromProps(props) {
        if (props.isLoggedIn === true) {
            Router.push('/');
        }

        return false;
    }

    handleChange = (e) => {
        this.setState({
            error: '',
            [e.target.name]: e.target.value,
        });
    };

    emailValidation = (value) => {
        const regex =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        return regex.test(value);
    };

    handleFeatureWillUpdate(e) {
        e.preventDefault();
        notification.open({
            message: 'Opp! Something went wrong.',
            description: 'This feature has been updated later!',
            duration: 500,
        });
    }

    handleLoginSubmit = async (e) => {
        this.setState({ loading: true });
        const { user_email, user_password, loading } = this.state;

        let data = {
            user_email,
            user_password,
            loading,
        };

        const route = 'user_login';

        await api.handler
            .api_post(data, route)
            .then((response) => {
                if (!response.success) {
                    if (response.data === 'verify email') {
                        this.setState({ loading: false });
                        this.state.verifyEmail = true;
                        Router.push('/account/user-verification');
                    }
                    this.setState({ loading: false });
                    throw 'Invalid login';
                } else {
                    this.setState({ loading: false });
                    this.props.handleLogin({
                        isLoggedIn: true,
                        token: response.data.token,
                        accessLevel: response.data.user_access_level,
                        id_user: response.data.id_user,
                        user_first_name: response.data.user_first_name,
                        email: response.data.user_email,
                        city: response.data.city ? response.data.city : '',
                        country: response.data.country
                            ? response.data.country
                            : '',
                    });
                }
            })
            .catch((e) => {
                this.setState({ error: e });
            });
    };

    render() {
        return (
            <div className="ps-my-account">
                <div className="container">
                    <Form
                        className="ps-form--account"
                        onFinish={this.handleLoginSubmit.bind(this)}>
                        <ul className="ps-tab-list">
                            <li className="active">
                                <Link href="/account/login">
                                    <a>Login</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/account/register">
                                    <a>Register</a>
                                </Link>
                            </li>
                        </ul>
                        <div className="ps-tab active" id="sign-in">
                            <div className="ps-form__content">
                                <h5>Log in to Your Arivanna Account</h5>
                                {this.state.error && (
                                    <Alert color="danger">
                                        {this.state.error}
                                    </Alert>
                                )}
                                <div className="form-group">
                                    <Form.Item
                                        // name="user_email"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Please input your email!',
                                            },
                                            {
                                                validator: (rule, value) => {
                                                    const isValidEmail =
                                                        this.emailValidation(
                                                            value
                                                        );
                                                    if (
                                                        value.length > 0 &&
                                                        !isValidEmail
                                                    ) {
                                                        return Promise.reject(
                                                            'Email is invalid'
                                                        );
                                                    }

                                                    return Promise.resolve();
                                                },
                                            },
                                        ]}>
                                        <Input
                                            className="form-control"
                                            type="text"
                                            name="user_email"
                                            placeholder="Email address"
                                            value={this.state.user_email}
                                            onChange={this.handleChange}
                                        />
                                    </Form.Item>
                                </div>
                                <div className="form-group form-forgot">
                                    <Form.Item
                                        // name="user_password"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Please input your password!',
                                            },
                                        ]}>
                                        <Input.Password
                                            className="form-control"
                                            placeholder="Password..."
                                            type="password"
                                            name="user_password"
                                            value={this.state.user_password}
                                            onChange={this.handleChange}
                                        />
                                    </Form.Item>
                                </div>
                                {this.state.verifyEmail ? (
                                    <Link href="/account/resend-verification">
                                        <a>Resend verification code</a>
                                    </Link>
                                ) : (
                                    ''
                                )}

                                <div className="form-group">
                                    <div className="ps-checkbox">
                                        <input
                                            className="form-control"
                                            type="checkbox"
                                            id="remember-me"
                                            name="remember-me"
                                        />
                                        <label htmlFor="remember-me">
                                            Remember me
                                        </label>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <button
                                        id="login-btn-buyer"
                                        type="submit"
                                        className="ps-btn ps-btn--fullwidth">
                                        {this.state.loading === false ? (
                                            'Login'
                                        ) : (
                                            <>
                                                <Spin /> Logging in...
                                            </>
                                        )}
                                    </button>
                                </div>
                                <div className="form-group">
                                    <a
                                        target="_blank"
                                        href={process.env.vendor_route}
                                        className="ps-btn ps-btn--fullwidth">
                                        Login As A Vendor
                                    </a>
                                </div>

                                <div className="form-group login-form-forgot">
                                    <Link href="/account/forgot-password">
                                        <a>Forgot password</a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
            // </ContainerShop>
        );
    }
}
const mapStateToProps = (state) => {
    return state.auth;
};

const dispatchActionToProps = {
    handleLogin: login,
};

export default connect(mapStateToProps, dispatchActionToProps)(Login);

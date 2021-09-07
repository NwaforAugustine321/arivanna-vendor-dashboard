import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { login } from '../../../store/auth/action';
import VendorInformationRepository from '~/repositories/VendorInformationRepository';
import { Form, Input, notification, Spin } from 'antd';
import { connect } from 'react-redux';
import api from '../../../api/handler';

class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_email: '',
            type: '',
            error: '',
            loading: false,
        };
    }
    email_number_check = (e) => {
        if (!e.target.value) {
            return false;
        } else if (isNaN(e.target.value) == true) {
            const EMAIL_EXP =
                /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            const isEmailValid = new RegExp(EMAIL_EXP).test(e.target.value);
            if (!isEmailValid) {
                this.setState({ error: 'Invalid email' });
            } else {
                this.setState({ type: 'email' });
            }
        } else if (isNaN(e.target.value) == false) {
            var NUMBER_EXP = /^(\+\d{1,3}[- ]?)?\d{10}$/;
            const isPhoneNumberValid = new RegExp(NUMBER_EXP).test(
                e.target.value
            );
            if (!isPhoneNumberValid) {
                this.setState({ error: 'Invalid Phone Number' });
            } else {
                this.setState({ type: 'phone' });
            }
        } else {
            this.setState({ error: 'Invalid email or phone number' });
        }
    };

    static getDerivedStateFromProps(props) {
        if (props.isLoggedIn === true) {
            Router.push('/');
        }

        return false;
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    handleFeatureWillUpdate(e) {
        e.preventDefault();
        notification.open({
            message: 'Opp! Something went wrong.',
            description: 'This feature has been updated later!',
            duration: 500,
        });
    }

    UpdatePassword = (data) => {
        const response = Repository.put(`${base_url}forgot_password`, data)
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return response;
    };

    handleForgetPasswordSubmit = async (e) => {
        const { vendor_email_phone, type, loading } = this.state;
        let data = {};

        type == 'email'
            ? (data = {
                  type,
                  user_email: vendor_email_phone,
              })
            : (data = {
                  type,
                  user_phone_number: vendor_email_phone,
              });
        this.setState({ loading: true });

        const res = await VendorInformationRepository.updateVendorPassword(data);
        if (res.success) {
            notification['success']({
                message: `Password Sent`,
                description: 'Password sent to your email address',
            });
            Router.push('/account/login');
        } else {
            notification['error']({
                message: `Vendor not found`,
                description: res.data,
            });
        }
        this.setState({ loading: false });
    };

    render() {
        return (
            // <ContainerShop title="Shop">
            <div className="ps-my-account">
                <div className="container">
                    <Form
                        className="ps-form--account forgot-passoword-form"
                        onFinish={this.handleForgetPasswordSubmit.bind(this)}>
                        <div className="ps-tab active" id="sign-in">
                            <div className="ps-form__content">
                                <h5>Forgot Password</h5>
                                <h5
                                    style={{
                                        color: 'red',
                                        fontWeight: 600,
                                        // marginBottom: 16,
                                    }}>
                                    {this.state.error}
                                </h5>
                                <div className="form-group">
                                    <Form.Item
                                        name="vendor_email_phone"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Please input your email or phone number!',
                                            },
                                        ]}>
                                        <Input
                                            className="form-control"
                                            type="text"
                                            name="vendor_email_phone"
                                            placeholder="Email address Or Phone number"
                                            value={this.state.vendor_email_phone}
                                            onChange={this.handleChange}
                                            onFocus={() => {
                                                this.state.error = '';
                                            }}
                                            onBlur={this.email_number_check}
                                        />
                                    </Form.Item>
                                </div>
                                <div className="form-group submit">
                                    <button
                                        type="submit"
                                        className="ps-btn ps-btn--fullwidth">
                                        {this.state.loading === false ? (
                                            'Recover Password'
                                        ) : (
                                            <>
                                                Sending password... <Spin />
                                            </>
                                        )}
                                    </button>
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

export default connect(mapStateToProps)(ForgotPassword);

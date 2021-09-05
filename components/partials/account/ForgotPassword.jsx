import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { login } from '../../../store/auth/action';
import UserInformationRepository from '~/repositories/UserInformationRepository';
import { Form, Input, notification, Spin } from 'antd';
import { connect } from 'react-redux';
import api from '../../../api/handler';
class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_email: '',
            type: 'email',
            error: '',
            loading: false,
        };
    }
    static getDerivedStateFromProps(props) {
        if (props.isLoggedIn === true) {
            Router.push('/');
        }
        return false;
    }
    handleChangeField = ({target: {name, value: input}}) => {
        this.setState({[name]: input});
    };
    handleForgetPasswordSubmit = async (e) => {
        const { user_email, type, loading } = this.state;
        this.setState({ loading: true });
        await api.handler
            .api_post({type, user_email}, 'forgot_password')
            .then((response) => {
                if (!response.success) {
                    this.setState({ loading: false });
                    notification['error']({
                        message: `Failed`,
                        description: 'Operation Failed, please try again'
                    });
                    throw response.data || 'Something went wrong';
                } else {
                    Router.push('/account/login');
                    notification['success']({
                        message: `Success`,
                        description: 'Password reset link is sent to your email address',
                    });
                    this.setState({ loading: false });
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
                        className="ps-form--account forgot-passoword-form"
                        onFinish={this.handleForgetPasswordSubmit.bind(this)}>
                        <div className="ps-tab active" id="sign-in">
                            <div className="ps-form__content">
                                <h5>Forgot Password</h5>
                                <h5 style={{  color: 'red', fontWeight: 600}}>
                                    {this.state.error}
                                </h5>
                                <div className="form-group">
                                    <Form.Item
                                        name="user_email"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Please enter your email',
                                            },
                                            {
                                                type: 'email',
                                                message: 'Email format is invalid',
                                            },
                                        ]}>
                                        <Input
                                            className="form-control"
                                            type="text"
                                            name="user_email"
                                            placeholder="Email address"
                                            value={this.state.user_email}
                                            onChange={this.handleChangeField}
                                        />
                                    </Form.Item>
                                </div>
                                <div className="form-group submit">
                                    <button
                                        type="submit"
                                        className="ps-btn ps-btn--fullwidth">
                                        {this.state.loading === false ? (
                                            'Reset Password'
                                        ) : (
                                            <>
                                                Please wait... <Spin />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return state.auth;
};
export default connect(mapStateToProps)(ForgotPassword);
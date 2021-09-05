import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { login } from '../../../store/auth/action';
import { Alert } from 'reactstrap';
import accountLinks from './accountlinks';

import { Form, Input, notification, Spin } from 'antd';
import { connect } from 'react-redux';
import axios from 'axios';
import api from '../../../api/handler';
import AccountMenuSidebar from './modules/AccountMenuSidebar';

class Referral extends Component {
    constructor(props) {
        super(props);
        this.state = {
            referral_code: '',
            error: '',
            loading: false,
            fetchRefLoader: true,
            newReferral: true,
        };
        this.token = this.props.token;
    }

    handleChange = (e) => {
        this.setState({
            error: '',
            referral_code: e.target.value,
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

    handleGenerateReferral = async (e) => {
        this.setState({ loading: true });
        const { referral_code, loading } = this.state;

        let data = {
            referral_code,
            token: this.token,
        };

        const route = 'referral_code_create';

        await api.handler
            .api_post(data, route)
            .then((response) => {
                if (!response.success) {
                    this.setState({ loading: false });
                    throw 'Error, referral code already exists!';
                } else {
                    this.setState({ loading: false });
                    notification.success({
                        message: 'Success',
                        description: 'Referral code sucessfully generated',
                        duration: 1,
                    });
                }
            })
            .catch((e) => {
                this.setState({ error: e });
            });
    };

    componentWillMount() {
        let data = {
            token: this.token,
        };

        const route = 'referral_code_get';

        api.handler
            .api_post(data, route)
            .then((response) => {
                this.setState({ fetchRefLoader: false });

                if (!response.success) {
                    throw 'Error, No referral code yet!';
                } else {
                    this.setState({ newReferral: false });
                    this.setState({ referral_code: response.data });
                }
            })
            .catch((e) => {
                // this.setState({ error: e });
                this.setState({ fetchRefLoader: false });
            });
    }

    render() {
        return (
            <section className="ps-my-account ps-page--account">
                <div className="container">
                    <div className="row">
                        <AccountMenuSidebar />

                        <div className="col-lg-5 mb-5">
                            <section className="ps-section--account-setting">
                                <Form
                                    className="ps-form--account"
                                    onFinish={this.handleGenerateReferral.bind(
                                        this
                                    )}>
                                    <div
                                        className="ps-tab"
                                        id="generate-code-referral">
                                        <div className="ps-form__content">
                                            <h5>Get Referral Code Now</h5>
                                            {this.state.error && (
                                                <Alert color="danger">
                                                    {this.state.error}
                                                </Alert>
                                            )}
                                            <div className="form-group">
                                                <Form.Item
                                                    // name="referral_code"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message:
                                                                'Please enter your code!',
                                                        },
                                                        {
                                                            pattern:
                                                                /^[a-zA-Z0-9]*$/,
                                                            message:
                                                                'Invalid code, must be alpha numeric only',
                                                        },
                                                    ]}>
                                                    <div>
                                                        <Input
                                                            className="form-control"
                                                            type="text"
                                                            name="referral_code"
                                                            placeholder="Referral Code"
                                                            defaultValue={
                                                                this.state
                                                                    .fetchRefLoader
                                                                    ? null
                                                                    : this.state
                                                                          .referral_code
                                                            }
                                                            value={
                                                                this.state
                                                                    .referral_code
                                                            }
                                                            maxLength={45}
                                                            onChange={
                                                                this
                                                                    .handleChange
                                                            }
                                                        />
                                                    </div>
                                                </Form.Item>
                                            </div>

                                            <div className="form-group submit">
                                                <button
                                                    type="submit"
                                                    className="ps-btn ps-btn--fullwidth">
                                                    {this.state.loading ===
                                                    false ? (
                                                        this.state
                                                            .newReferral ? (
                                                            'Generate'
                                                        ) : (
                                                            'Change'
                                                        )
                                                    ) : (
                                                        <>
                                                            <Spin /> Loading...
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </Form>
                            </section>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

const mapStateToProps = (state) => {
    return state.auth;
};

export default connect(mapStateToProps)(Referral);

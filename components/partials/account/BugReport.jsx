import React, { Component } from 'react';
import Router from 'next/router';
import { Alert } from 'reactstrap';
import { Form, Input, notification, Spin } from 'antd';
import { connect } from 'react-redux';

import { AccessLevel } from '~/utilities/constant-class';
import withAuth from '~/components/hoc/RouteAuth';
import api from '../../../api/handler';

class BugReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_email: this.props.email,
            content: '',
            message: '',
            loading: false,
            success: false,
        };
    }

    handleLoginSubmit = async () => {
        this.setState({ loading: true });

        const { user_email, content } = this.state;
        let data = {
            user_email,
            content,
        };
        const route = `bug_report`;

        await api.handler
            .api_post(data, route)
            .then((response) => {
                if (!response.success) {
                    this.setState({
                        success: false,
                        loading: false,
                        message: 'Something went wrong. Try again later',
                    });
                } else {
                    this.setState({
                        loading: false,
                        success: true,
                    });
                    notification['success']({
                        message: 'Report sent successfully!',
                        description: response.data.message,
                        duration: 500,
                    });
                    Router.push('/');
                }
            })
            .catch((e) => {
                this.setState({
                    message: e.message,
                    loading: false,
                    success: false,
                });
            });
    };

    handleChange = (e) => {
        this.setState({
            content: e.target.value,
        });
    };

    handleFocus = () => {
        this.setState({
            content: '',
            success: false,
            message: '',
        });
    };

    render() {
        return (
            <div className="ps-my-account">
                <div className="container">
                    <Form
                        className="ps-form--account"
                        onFinish={this.handleLoginSubmit.bind(this)}>
                        <div className="ps-tab active" id="sign-in">
                            <div className="ps-form__content">
                                <h5>Arivanna Bug Reporting Form</h5>

                                {!this.state.success && this.state.message && (
                                    <Alert color="danger">
                                        {this.state.message}
                                    </Alert>
                                )}
                                <div className="form-group">
                                    <Form.Item>
                                        <Input
                                            className="form-control"
                                            type="text"
                                            name={this.state.user_email}
                                            placeholder="Email address"
                                            defaultValue={this.state.user_email}
                                        />
                                    </Form.Item>
                                </div>
                                <div className="form-group form-forgot">
                                    <Form.Item
                                        name="content"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Please enter your message here',
                                            },
                                        ]}>
                                        <Input.TextArea
                                            className="form-control"
                                            placeholder="Write your message..."
                                            value={this.state.content}
                                            onChange={this.handleChange}
                                        />
                                    </Form.Item>
                                </div>

                                <div className="form-group">
                                    <button
                                        id="login-btn-buyer"
                                        type="submit"
                                        className="ps-btn ps-btn--fullwidth">
                                        {this.state.loading === false ? (
                                            'Send Report'
                                        ) : (
                                            <>
                                                <Spin /> Sending Report...
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

export default connect(mapStateToProps)(
    withAuth(BugReport, AccessLevel.USER_ACCESS_LEVEL)
);

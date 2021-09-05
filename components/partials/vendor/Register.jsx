import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { register } from '../../../store/auth/action';
import { Alert } from 'reactstrap';
import { Form, Input, notification, Spin } from 'antd';
import { connect } from 'react-redux';
import api from '../../../api/handler';
class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id_user: this.props.id_user,
            business_name: '',
            vendor_phone_number: '',
            vendor_address: '',
            vendor_short_desc: '',
            error: '',
            loading: false,
        };

    }

    componentDidMount() {
        const { isLoggedIn } = this.props
        if (isLoggedIn === false) {
            Router.push('/account/register');
        }
    }

    // static getDerivedStateFromProps(props) {
    //     if (props.isLoggedIn === false) {
    //         Router.push('/');
    //     }

    //     return true ;
    // }

    handleChange = (e) => {
        const { name, value } = e.target;
        let err = this.state.errors;

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

    handleSubmit = async (e) => {
        // const isVendor = this.state.id_user_access_level == 1;
        const {
            id_user,
            business_name,
            vendor_phone_number,
            vendor_address,
            vendor_short_desc,
            loading,
        } = this.state;

        this.setState({ loading: true });

        const vendorSchema = {
            id_user: this.props.id_user,
            business_name: business_name,
            vendor_phone_number: vendor_phone_number,
            vendor_address: vendor_address,
            vendor_short_desc: vendor_short_desc,
        };

        const route = 'vendor_create';

        await api.handler
            .api_post(vendorSchema, route)
            .then((response) => {
                if (!response.success) {
                    this.setState({ loading: false });
                    this.setState({ error: response.data });
                } else {
                    this.setState({ loading: false });
                    Router.push(process.env.vendor_route);
                }
            })
            .catch((error) => {
                throw error;
            });
    };

    render() {

        const { errors } = this.state;
        return (
            <div  className="ps-my-account">
                <div className="container">
                    <Form
                        className="ps-form--account"
                        

                        onFinish={this.handleSubmit.bind(this)}>
                        <h2 style={{ textAlign: "center" }}>Become A Vendor</h2>
                        <div  className="ps-tab active" name="register">
                            <div className="ps-form__content">
                                <h5 style={{ textAlign: "center" }}>Register as a vendor </h5>
                                {this.state.error && (
                                    <Alert color="danger">
                                        {this.state.error}
                                    </Alert>
                                )}
                                <>
                                    <div>
                                        <Form.Item
                                            // name="business_name"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Please input business name!',
                                                },

                                            ]}>
                                            <Input
                                                className="form-control"
                                                type="text"
                                                name="business_name"
                                                placeholder="Business Name"
                                                value={
                                                    this.state.business_name
                                                }
                                                onChange={this.handleChange}
                                            />
                                        </Form.Item>
                                    </div>
                                    <div className="form-group">
                                        <Form.Item
                                            // name="vendor_phone_number"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Please input your phone number!',
                                                },
                                                {
                                                    pattern: /^\d{10,14}$/,
                                                    message:
                                                        'Phone number must be 10 - 14 digits only',
                                                },
                                            ]}>
                                            <Input
                                                className="form-control"
                                                type="number"
                                                name="vendor_phone_number"
                                                placeholder="Phone Number"
                                                value={this.state.vendor_phone_number}
                                                onChange={this.handleChange}
                                            />
                                        </Form.Item>
                                    </div>
                                    <div>
                                        <Form.Item
                                            // name="vendor_address"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Please input vendor address!',
                                                },
                                            ]}>
                                            <Input
                                                className="form-control"
                                                type="text"
                                                name="vendor_address"
                                                placeholder="Business Address"
                                                value={
                                                    this.state
                                                        .vendor_address
                                                }
                                                onChange={this.handleChange}
                                            />
                                        </Form.Item>
                                    </div>
                                    <div>
                                        <Form.Item
                                            // name="vendor_short_desc"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Please input business short description!',
                                                },
                                            ]}>
                                            <Input.TextArea
                                                className="form-control"
                                                type="textarea"
                                                rows={2}
                                                name="vendor_short_desc"
                                                placeholder="Business Short Description"
                                                value={
                                                    this.state
                                                        .vendor_short_desc
                                                }
                                                onChange={this.handleChange}
                                            />
                                        </Form.Item>
                                    </div>
                                </>
                                <div className="form-group submit">
                                    <button
                                        type="submit"
                                        className="ps-btn ps-btn--fullwidth">
                                        {this.state.loading === false ? (
                                            'Register'
                                        ) : (
                                            <>
                                                <Spin /> Registering...
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

const dispatchActionToProps = {
    handleRegister: register,
};
export default connect(mapStateToProps, dispatchActionToProps)(Register);

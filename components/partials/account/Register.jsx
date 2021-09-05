import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { register } from '../../../store/auth/action';
import { Alert } from 'reactstrap';

import { Form, Input, notification, Checkbox, Spin, Select } from 'antd';

import { connect } from 'react-redux';
import api from '../../../api/handler';
import locations from '~/files/locations.json';
import SettingRepository from '~/repositories/SettingRepository';
class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user_first_name: '',
            verification_code: '',
            user_last_name: '',
            company_name: '',
            company_id: '',
            company_description: '',
            company_address: '',
            user_phone_number: '',
            user_email: '',
            user_password: '',
            user_confirm_password: '',
            referral_code: '',
            country: null,
            state: null,
            city: null,
            id_user_access_level: 1,
            error: '',
            loading: false,
            errors: {
                user_password: '',
                user_confirm_password: '',
            },
            password_strength: '',
            password_strength_indicator: '',
            terms_and_condition_accepted: false,
            opacity: 0.5,
            showCompanyInfo: false,
        };
    }

    static getDerivedStateFromProps(props) {
        if (props.isLoggedIn === true) {
            Router.push('/');
        }
        return null;
    }

    modalSuccess = (type) => {
        notification[type]({
            message: 'Registration Successful',
            description: 'Check your email for verfication!',
            duration: 5,
        });
    };

    handleChange = (e) => {
        const { name, value } = e.target;
        let err = this.state.errors;

        switch (name) {
            case 'user_password':
                let strength = '';
                let strength_indicator = '';
                if (value.length >= 1) {
                    if (
                        /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/.test(
                            value
                        )
                    ) {
                        strength = 'Strong';
                        strength_indicator = 'success';
                    } else if (
                        /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,})|(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})|(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})|(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,})|(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/.test(
                            value
                        )
                    ) {
                        strength = 'Medium';
                        strength_indicator = 'warning';
                    } else {
                        strength = 'Weak';
                        strength_indicator = 'danger';
                    }
                    this.setState({
                        password_strength: strength,
                        password_strength_indicator: strength_indicator,
                    });
                } else {
                    this.setState({
                        password_strength: '',
                        password_strength_indicator: 'light',
                    });
                }

                err.user_password =
                    value.length >= 1 && value.length < 8
                        ? 'Password field should be minimum of 8 characters'
                        : 'Please input your password!' && value.length >= 8
                            ? ''
                            : 'Please input your password!';
                break;
            default:
                break;
        }

        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    handleCountrySelection = (country) => {
        this.setState({ country });
        this.setState({ city: null });
    };

    handleStateSelection = (city) => {
        this.setState({ city });
    };

    handleGenderSelect = (e) => {
        this.setState({ user_gender: e.target.value });
    };

    handleCheckBox = (e) => {
        if (e.target.name === 'id_user_access_level') {
            const value = e.target.checked ? 2 : 1;
            this.setState({ [e.target.name]: value });
        } else {
            const value = e.target.checked;
            value
                ? this.setState({ [e.target.name]: value, opacity: 1 })
                : this.setState({ [e.target.name]: value, opacity: 0.5 });
        }
    };

    handleSubmit = async (e) => {
        if (this.state.terms_and_condition_accepted) {
            const isVendor = this.state.id_user_access_level == 2;
            const {
                user_first_name,
                user_last_name,
                company_name,
                company_id,
                company_address,
                company_description,
                user_phone_number,
                user_email,
                user_password,
                user_confirm_password,
                referral_code,
                country,
                city,
                id_user_access_level,
                loading,
            } = this.state;

            const userSchema = {
                user_email,
                user_phone_number,
                user_first_name,
                user_last_name,
                user_password,
                country,
                city: city ?? country,
                id_user_access_level,
            };

            this.setState({ loading: true });

            const vendorSchema = {
                user_first_name,
                user_last_name,
                business_name: company_name,
                business_abn: company_id,
                vendor_email: user_email,
                vendor_phone_number: user_phone_number,
                vendor_address: company_address,
                vendor_short_desc: company_description,
                id_vendor_status: 1,
                vendor_password: user_password,
                id_user_access_level,
                country,
                city: city ?? country,
            };

            const data = isVendor ? vendorSchema : userSchema;

            const route = isVendor
                ? 'vendor_create_now'
                : referral_code
                    ? `user_create/${referral_code}`
                    : 'user_create';

            await api.handler
                .api_post(data, route)
                .then((response) => {
                    if (!response.success) {
                        this.setState({ loading: false });
                        this.setState({ error: response.data });
                    } else {
                        this.modalSuccess('success');
                        this.setState({ loading: false });
                        Router.push('/account/user-verification');
                    }
                })
                .catch((error) => {
                    this.setState({ loading: false });
                    throw error;
                });
        }
    };

    render() {
        const { errors } = this.state;
        const { Option } = Select;
        return (
            <div className="ps-my-account">
                <div className="container">
                    <Form
                        className="ps-form--account"
                        onFinish={this.handleSubmit.bind(this)}>
                        <ul className="ps-tab-list">
                            <li>
                                <Link href="/account/login">
                                    <a>Login</a>
                                </Link>
                            </li>
                            <li className="active">
                                <Link href="/account/register">
                                    <a>Register</a>
                                </Link>
                            </li>
                        </ul>

                        <div className="ps-tab active" name="register">
                            <div className="ps-form__content">
                                <h5>Register An Account with Arivanna</h5>
                                {this.state.error && (
                                    <Alert color="danger">
                                        {this.state.error}
                                    </Alert>
                                )}
                                <div>
                                    {this.state.id_user_access_level === 2 && (
                                        <p>OWNER</p>
                                    )}
                                    <Form.Item
                                        // name="user_first_name"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Please input your first name!',
                                            },
                                            {
                                                pattern: /^[a-zA-Z ]+$/,
                                                message:
                                                    'First Name should be letters only',
                                            },
                                        ]}>
                                        <Input
                                            className="form-control"
                                            type="text"
                                            name="user_first_name"
                                            placeholder="First Name"
                                            value={this.state.user_first_name}
                                            onChange={this.handleChange}
                                        />
                                    </Form.Item>
                                </div>
                                <div>
                                    <Form.Item
                                        // name="user_last_name"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Please input your last name!',
                                            },
                                            {
                                                pattern: /^[a-zA-Z ]+$/,
                                                message:
                                                    'Last name should be letters only',
                                            },
                                        ]}>
                                        <Input
                                            className="form-control"
                                            type="text"
                                            name="user_last_name"
                                            placeholder="Last Name"
                                            value={this.state.user_last_name}
                                            onChange={this.handleChange}
                                        />
                                    </Form.Item>
                                </div>

                                <div className="form-group">
                                    <Form.Item
                                        // name="user_phone_number"
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
                                            name="user_phone_number"
                                            placeholder="Phone Number"
                                            value={this.state.user_phone_number}
                                            onChange={this.handleChange}
                                        />
                                    </Form.Item>
                                </div>
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
                                                type: 'email',
                                                message:
                                                    'Email format is wrong',
                                            },
                                        ]}>
                                        <Input
                                            className="form-control"
                                            type="email"
                                            name="user_email"
                                            placeholder="Email Address"
                                            value={this.state.user_email}
                                            onChange={this.handleChange}
                                        />
                                    </Form.Item>
                                </div>
                                <div className="form-group">
                                    <Form.Item
                                        // name="user_country"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Please select your country!',
                                            },
                                        ]}>
                                        <Select
                                            id="country-select"
                                            name="user_country"
                                            showSearch
                                            style={{ width: '100%' }}
                                            placeholder="Select Country"
                                            value={this.state.country}
                                            onSelect={
                                                this.handleCountrySelection
                                            }
                                            filterOption={(input, option) =>
                                                option.value
                                                    .toLowerCase()
                                                    .indexOf(
                                                        input.toLowerCase()
                                                    ) >= 0 ||
                                                option.label
                                                    .toLowerCase()
                                                    .indexOf(
                                                        input.toLowerCase()
                                                    ) >= 0
                                            }>
                                            {locations.map((country, idx) => (
                                                <Option
                                                    key={idx}
                                                    value={country.code2}
                                                    label={country.name}>
                                                    <div className="demo-option-label-item">
                                                        <span
                                                            role="img"
                                                            aria-label={
                                                                country.name
                                                            }>
                                                            <img
                                                                src={`https://www.countryflags.io/${country.code2}/shiny/64.png`}
                                                                style={{
                                                                    width: 25,
                                                                    margin: '0 10px 0 0',
                                                                }}
                                                                alt={
                                                                    country.code2
                                                                }></img>
                                                        </span>
                                                        {country.name} (
                                                        {country.code2})
                                                    </div>
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </div>
                                {locations.find(
                                    (c) => c.code2 === this.state.country
                                )?.states?.length > 0 && (
                                        <div className="form-group">
                                            <Form.Item
                                                // name="user_state"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message:
                                                            'Please select your state',
                                                    },
                                                ]}>
                                                <Select
                                                    id="city-select"
                                                    name="user_state"
                                                    showSearch
                                                    placeholder="Select a state/city"
                                                    style={{ width: '100%' }}
                                                    placeholder={
                                                        'Select State for ' +
                                                        this.state.country
                                                    }
                                                    value={this.state.city}
                                                    filterOption={(input, option) =>
                                                        option.value
                                                            .toLowerCase()
                                                            .indexOf(
                                                                input.toLowerCase()
                                                            ) >= 0 ||
                                                        option.label
                                                            .toLowerCase()
                                                            .indexOf(
                                                                input.toLowerCase()
                                                            ) >= 0
                                                    }
                                                    onSelect={
                                                        this.handleStateSelection
                                                    }>
                                                    {locations
                                                        .find(
                                                            (c) =>
                                                                c.code2 ===
                                                                this.state.country
                                                        )
                                                        ?.states?.map(
                                                            (state, idx) => (
                                                                <Option
                                                                    key={idx}
                                                                    value={
                                                                        state.code
                                                                    }
                                                                    label={
                                                                        state.name
                                                                    }>
                                                                    <div className="demo-option-label-item">
                                                                        {state.name}{' '}
                                                                        (
                                                                        {state.code}
                                                                        )
                                                                    </div>
                                                                </Option>
                                                            )
                                                        )}
                                                </Select>
                                            </Form.Item>
                                        </div>
                                    )}

                                <div className="form-group form-forgot">
                                    <Form.Item
                                        // name="password"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Password is required',
                                            },
                                            {
                                                min: 8,
                                                message:
                                                    'Password should be atleast 8 characters',
                                            },
                                        ]}>
                                        <Input.Password
                                            id="user_password"
                                            className="form-control"
                                            type="password"
                                            name="user_password"
                                            value={this.state.user_password}
                                            placeholder="Please input your password"
                                            onChange={this.handleChange}
                                        />
                                    </Form.Item>
                                    {this.state.password_strength ? (
                                        <Alert
                                            color={
                                                this.state
                                                    .password_strength_indicator
                                            }>
                                            {this.state.password_strength}
                                        </Alert>
                                    ) : undefined}
                                </div>

                                <div className="form-group">
                                    <Form.Item
                                        // name="confirm_password"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Please confirm your password',
                                            },
                                            {
                                                validator: (rule, value) => {
                                                    if (
                                                        value &&
                                                        this.state
                                                            .user_password !==
                                                        value
                                                    ) {
                                                        return Promise.reject(
                                                            'The two passwords that you entered do not match!'
                                                        );
                                                    }
                                                    return Promise.resolve();
                                                },
                                            },
                                        ]}>
                                        <Input.Password
                                            name="user_confirm_password"
                                            value={
                                                this.state.user_confirm_password
                                            }
                                            className="form-control"
                                            id="user_confirm_password"
                                            type="password"
                                            placeholder="Confirm Password"
                                            onChange={this.handleChange}
                                        />
                                    </Form.Item>
                                </div>

                                {this.state.id_user_access_level == 1 && (
                                    <>
                                        <div className="form-group">
                                            <Form.Item 
                                            // name="referral_code"
                                            >
                                                <Input
                                                    className="form-control"
                                                    type="text"
                                                    name="referral_code"
                                                    placeholder="Referral Code (optional)"
                                                    value={
                                                        this.state.referral_code
                                                    }
                                                    onChange={this.handleChange}
                                                />
                                            </Form.Item>
                                        </div>
                                    </>
                                )}
                                {this.state.id_user_access_level === 2 && (
                                    <>
                                        <p>COMPANY</p>
                                        <div>
                                            <Form.Item
                                                // name="company_name"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message:
                                                            'Please input company name!',
                                                    },
                                                    {
                                                        pattern: /^[a-zA-Z ]+$/,
                                                        message:
                                                            'First Name should be letters only',
                                                    },
                                                ]}>
                                                <Input
                                                    className="form-control"
                                                    type="text"
                                                    name="company_name"
                                                    placeholder="Company Name"
                                                    value={
                                                        this.state.company_name
                                                    }
                                                    onChange={this.handleChange}
                                                />
                                            </Form.Item>
                                        </div>
                                        <div>
                                            <Form.Item
                                                // name="company_id"
                                                dependencies={['user_country']}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message:
                                                            'Please input business ID!',
                                                    },


                                                ]}>
                                                <Input
                                                    className="form-control"
                                                    type="text"
                                                    name="company_id"
                                                    placeholder="Business ID"
                                                    value={
                                                        this.state.company_id
                                                    }
                                                    onChange={this.handleChange}
                                                />
                                            </Form.Item>
                                        </div>
                                        <div>
                                            <Form.Item
                                                // name="company_address"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message:
                                                            'Please input company address!',
                                                    },
                                                ]}>
                                                <Input
                                                    className="form-control"
                                                    type="text"
                                                    name="company_address"
                                                    placeholder="Company Address"
                                                    value={
                                                        this.state
                                                            .company_address
                                                    }
                                                    onChange={this.handleChange}
                                                />
                                            </Form.Item>
                                        </div>

                                        <div>
                                            <Form.Item
                                                // name="company_description"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message:
                                                            'Please input company short description!',
                                                    },
                                                ]}>
                                                <Input.TextArea
                                                    className="form-control"
                                                    type="textarea"
                                                    rows={2}
                                                    name="company_description"
                                                    placeholder="Company Short Description"
                                                    value={
                                                        this.state
                                                            .company_description
                                                    }
                                                    onChange={this.handleChange}
                                                />
                                            </Form.Item>
                                        </div>
                                    </>
                                )}
                                <div className="form-group">
                                    <Form.Item>
                                        <Checkbox
                                            name="id_user_access_level"
                                            checked={
                                                this.state
                                                    .id_user_access_level === 2
                                            }
                                            onChange={this.handleCheckBox}>
                                            <u>Register as a seller</u>
                                        </Checkbox>
                                    </Form.Item>
                                </div>
                                <div className="form-group">
                                    <Form.Item>
                                        <Checkbox
                                            name="terms_and_condition_accepted"
                                            checked={
                                                this.state
                                                    .terms_and_condition_accepted
                                            }
                                            onChange={this.handleCheckBox}>
                                            <u>
                                                <a
                                                    href="/page/terms"
                                                    target="_blank">
                                                    I accept the terms and
                                                    conditions
                                                </a>
                                            </u>
                                        </Checkbox>
                                    </Form.Item>
                                </div>
                                <div className="form-group submit">
                                    <button
                                        id="create-account-btn"
                                        type="submit"
                                        className="ps-btn ps-btn--fullwidth"
                                        disabled={
                                            !this.state
                                                .terms_and_condition_accepted
                                        }>
                                        {!this.state.loading ? (
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



/*

({ getFieldValue }) => ({
                                                        validator(_, value) {
                                                            {
                                                                //   ^[0-9]{11}$-- Australian abn is 11 digit number
                                                                if (
                                                                    !value ||
                                                                    (/(^[0-9]{11}$)/.test(
                                                                        value
                                                                    ) &&
                                                                        getFieldValue(
                                                                            'user_country'
                                                                        ) ===
                                                                            'AU')
                                                                ) {
                                                                    return Promise.resolve();
                                                                } else if (
                                                                    //The correspective VAT code for indian companies is the CIN Number. It is a composition of: - First char( U or L) - 5 numbers - 2 chars (province code) - 4 numbers (company registration year) - 3 chars (company type like LTD) - 6 numbers
                                                                    //     //^([L|U]{1})([0-9]{5})([A-Za-z]{2})([0-9]{4})([A-Za-z]{3})([0-9]{6})$
                                                                    !value ||
                                                                    (/^([L|U]{1})([0-9]{5})([A-Za-z]{2})([0-9]{4})([A-Za-z]{3})([0-9]{6})$/.test(
                                                                        value
                                                                    ) &&
                                                                        getFieldValue(
                                                                            'user_country'
                                                                        ) ===
                                                                            'IN')
                                                                ) {
                                                                    return Promise.resolve();
                                                                }
                                                            }

                                                            return Promise.reject(
                                                                new Error(
                                                                    'Invalid Business ID!'
                                                                )
                                                            );
                                                        },
                                                    }),

*/
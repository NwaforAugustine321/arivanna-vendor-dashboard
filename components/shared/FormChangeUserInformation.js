import React, { useState, useEffect } from 'react';
import {
    DatePicker,
    Form,
    Input,
    Radio,
    notification,
    Select,
    Spin,
    Button,
} from 'antd';
import UserInformationRepository from '~/repositories/UserInformationRepository';
import Locations from '~/files/locations.json';
import { useDispatch } from 'react-redux';
import { updateUserLocation } from '~/store/auth/action';
import { updateShippingCost } from '~/store/cart/action';

const FormChangeUserInformation = ({ id_user, token }) => {
    const dispatch = useDispatch();
    const [user_first_name, setFirstName] = useState('');
    const [user_last_name, setLastName] = useState('');
    const [user_middle_name, setMiddleName] = useState('');
    const [user_email, setEmail] = useState('');
    const [user_phone_number, setPhoneNo] = useState('');
    const [user_address_shipping, setAddress] = useState('');
    const [user_postal_number, setPostalNo] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [error, setError] = useState('');
    const { Option } = Select;

    const [loading, setLoading] = useState(null);

    async function getUserInformation(id_user) {
        const responseData = await UserInformationRepository.getUserById(
            id_user
        );
        if (responseData) {
            const {
                user_first_name,
                user_last_name,
                user_middle_name,
                user_email,
                user_address_shipping,
                user_phone_number,
                user_postal_number,
                city,
                country,
            } = responseData;
            setFirstName(user_first_name);
            setLastName(user_last_name);
            setMiddleName(user_middle_name);
            setEmail(user_email);
            setPhoneNo(user_phone_number);
            setAddress(user_address_shipping);
            setCity(city);
            setCountry(country);
            setPostalNo(user_postal_number);
        }
    }

    async function updateUserInformation(id_user) {
        if (!error && user_first_name && user_last_name) {
            const data = {
                id_user,
                token: token,
                user_first_name,
                user_last_name,
                user_middle_name,
                user_email,
                user_phone_number,
                user_postal_number,
                user_address_shipping,
                city: city ?? country,
                country,
            };

            setLoading(true);

            const res = await UserInformationRepository.updateUser(data);
            if (res.success) {
                dispatch(updateUserLocation({ country, city }));
                dispatch(updateShippingCost(country));
                notification['success']({
                    message: 'Update successfull!',
                    description: 'Account Information updated successfully..',
                });
            } else {
                notification['error']({
                    message: 'Update Failed!',
                });
            }

            setLoading(null);
        }
    }

    useEffect(() => {
        getUserInformation(id_user);
    }, [id_user]);

    return (
        <Form
            className="ps-form--account-setting"
            fields={[
                {
                    name: ['first_name'],
                    value: user_first_name,
                },
                {
                    name: ['last_name'],
                    value: user_last_name,
                },
                {
                    name: ['middle_name'],
                    value: user_middle_name,
                },
                {
                    name: ['email_address'],
                    value: user_email,
                },
                {
                    name: ['phone_no'],
                    value: user_phone_number,
                },
                {
                    name: ['address'],
                    value: user_address_shipping,
                },
                {
                    name: ['city'],
                    value: city,
                },
                {
                    name: ['country'],
                    value: country,
                },
                {
                    name: ['postal'],
                    value: user_postal_number,
                },
            ]}>
            <div className="ps-form__header">
                <h3>Account Information</h3>
            </div>
            <div className="ps-form__content">
                <div className="row">
                    <div className="col-sm-6">
                        <div className="form-group">
                            <Form.Item
                                // name="first_name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input first name!',
                                    },
                                ]}>
                                <Input
                                    className="form-control"
                                    type="text"
                                    placeholder="First Name"
                                    onChange={(e) =>
                                        setFirstName(e.target.value)
                                    }
                                />
                            </Form.Item>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group">
                            <Form.Item
                                // name="last_name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input last name!',
                                    },
                                ]}>
                                <Input
                                    className="form-control"
                                    type="text"
                                    placeholder="Last Name"
                                    onChange={(e) =>
                                        setLastName(e.target.value)
                                    }
                                />
                            </Form.Item>
                        </div>
                    </div>

                    <div className="col-sm-6">
                        <div className="form-group">
                            <Form.Item 
                            // name="middle_name"
                            >
                                <Input
                                    className="form-control"
                                    type="text"
                                    placeholder="Middle Name"
                                    onChange={(e) =>
                                        setMiddleName(e.target.value)
                                    }
                                />
                            </Form.Item>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group">
                            <Form.Item 
                            // name="phone_no"
                            >
                                <Input
                                    className="form-control"
                                    type="text"
                                    placeholder="Phone Number"
                                    onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                        }
                                    }}
                                    onChange={(e) => setPhoneNo(e.target.value)}
                                />
                            </Form.Item>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group">
                            <Form.Item 
                            // name="email_address"
                            >
                                <Input
                                    className="form-control"
                                    type="text"
                                    placeholder="Email Address"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Item>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group">
                            <Form.Item 
                            // name="postal"
                            >
                                <Input
                                    className="form-control"
                                    type="text"
                                    placeholder="Postal Number"
                                    onChange={(e) =>
                                        setPostalNo(e.target.value)
                                    }
                                />
                            </Form.Item>
                        </div>
                    </div>
                    <div className="col-sm-12">
                        <div className="form-group">
                            <Form.Item 
                            // name="address"
                            >
                                <Input
                                    className="form-control"
                                    type="text"
                                    placeholder="Address"
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </Form.Item>
                        </div>
                    </div>

                    <div className="col-sm-6">
                        <div className="form-group">
                            <Form.Item
                                // name="country"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Country is required',
                                    },
                                ]}>
                                <Select
                                    showSearch
                                    style={{ width: '100%' }}
                                    placeholder="Select country"
                                    optionLabelProp="label"
                                    autoClearSearchValue
                                    suffixIcon={
                                        country && (
                                            <img
                                                src={`https://www.countryflags.io/${country}/shiny/64.png`}
                                                style={{ width: 50 }}
                                                alt={country.code2}
                                            />
                                        )
                                    }
                                    onSelect={(country) => {
                                        setCity(null);
                                        setCountry(country);
                                    }}
                                    filterOption={(input, option) =>
                                        option.props.value
                                            .toLowerCase()
                                            .indexOf(input.toLowerCase()) >=
                                            0 ||
                                        option.props.label
                                            .toLowerCase()
                                            .indexOf(input.toLowerCase()) >= 0
                                    }
                                    value={country ?? null}>
                                    {Locations.map((country, idx) => (
                                        <Option
                                            key={idx}
                                            value={country.code2}
                                            label={country.name}>
                                            <div className="demo-option-label-item">
                                                <span
                                                    role="img"
                                                    aria-label={country.name}>
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
                                                {country.name} ({country.code2})
                                            </div>
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </div>
                    </div>
                    {country &&
                        Locations.find((loc) => loc.code2 === country)?.states
                            ?.length > 1 && (
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <Form.Item
                                        // name="city"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'City is required',
                                            },
                                        ]}>
                                        <Select
                                            showSearch
                                            style={{ width: '100%' }}
                                            placeholder="Select State/City"
                                            optionLabelProp="label"
                                            autoClearSearchValue
                                            onSelect={(city) => setCity(city)}
                                            filterOption={(input, option) =>
                                                option.props.value
                                                    .toLowerCase()
                                                    .indexOf(
                                                        input.toLowerCase()
                                                    ) >= 0 ||
                                                option.props.label
                                                    .toLowerCase()
                                                    .indexOf(
                                                        input.toLowerCase()
                                                    ) >= 0
                                            }
                                            value={city ?? null}>
                                            {Locations.find(
                                                (loc) => loc.code2 === country
                                            ).states.map((city, idx) => (
                                                <Option
                                                    key={idx}
                                                    label={city.name}
                                                    value={city.code}>
                                                    <div className="demo-option-label-item">
                                                        {city.name}
                                                    </div>
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </div>
                            </div>
                        )}
                </div>

                <div className="form-group submit">
                    <button
                        className="ps-btn"
                        disabled={loading}
                        onClick={(e) => updateUserInformation(id_user)}>
                        {loading ? (
                            <span>
                                {' '}
                                <Spin size="small" /> Please wait ...
                            </span>
                        ) : (
                            <span>Update profile</span>
                        )}
                    </button>
                </div>
            </div>
        </Form>
    );
};

export default FormChangeUserInformation;

import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Form, Input, notification, Select, Spin } from 'antd';
import Link from 'next/link';
import Router from 'next/router';
import UserInformationRepository from '~/repositories/UserInformationRepository';
import Locations from '~/files/locations.json';
import { useDispatch } from 'react-redux';
import { updateUserLocation } from '~/store/auth/action';
import { updateShippingCost } from '~/store/cart/action';
import { checkIfShippingAvailableAllCart } from '~/utilities/product-helper';

const FormCheckoutUserInformation = ({ id_user }) => {
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(null);

    const [userInformation, setUserInformation] = useState({});
    const [validatePostalCode, setValidatePostalCode] = useState({
                                                            validateStatus:'',
                                                            help:''
                                                        });

    async function getUserInformation(id_user) {
        const responseData = await UserInformationRepository.getUserById(
            id_user
        );
        if (responseData) {
            setUserInformation(responseData);
        }
    }

    useEffect(() => {
        getUserInformation(id_user);
    }, [id_user]);

    const [isAllProductsShippable, setIsAllProductsShippable] = useState(true);

    useEffect(() => {
        const isShippingAvailableToAll = checkIfShippingAvailableAllCart({
            country: userInformation?.country,
            city: userInformation?.city,
        });

        if (!isShippingAvailableToAll) {
            setIsAllProductsShippable(false);
        } else {
            setIsAllProductsShippable(true);
        }
    }, [userInformation]);

    const handleLoginSubmit = async () => {
        setLoading(true);

        const res = await UserInformationRepository.updateUser(userInformation);

        if (res.success) {
            dispatch(
                updateUserLocation({
                    country: userInformation.country,
                    city: userInformation.city,
                })
            );
            dispatch(updateShippingCost(userInformation.country));
            Router.push('/account/shipping');
        } else {
            notification['error']({
                message: 'Update Failed!',
            });
            setLoading(null);
        }

        Router.push('/account/shipping');
    };

    const onChangeField = useCallback(
        ({ target: { name, value: input } }) => {
            if(name === 'user_postal_number'){
                //alert('soli')
                var RegExp = /^[0-9]+$/g
                if(!input.match(RegExp)) {
                    console.log(input.match(RegExp))
                    setValidatePostalCode({
                        validateStatus:'error',
                        help:"Invalid PostCode"
                    });
                } else if(input.length < 6 || input.length > 6){
                    setValidatePostalCode({
                        validateStatus:'error',
                        help:"Postal Code must be 6 digits only"
                    });
                }else if(input.match(RegExp) || input === ''){
                    setValidatePostalCode({
                        validateStatus:'',
                        help:""
                    });
                }
            }
            setUserInformation((info) => ({ ...info, [name]: input }));
        },
        [setUserInformation]
    );

    return (
        <Form className="ps-form__billing-info" onFinish={handleLoginSubmit}>
            <h3 className="ps-form__heading">Contact information</h3>
            <div className="form-group">
                <Form.Item >
                    <Input
                        className="form-control"
                        type="text"
                        placeholder="Email or phone number"
                        value={userInformation.user_email}
                    />
                </Form.Item>
                
            </div>
            <div className="form-group">
                <div className="ps-checkbox">
                    <input
                        className="form-control"
                        type="checkbox"
                        id="keep-update"
                    />
                    <label htmlFor="keep-update">
                        Keep me up to date on news and exclusive offers?
                    </label>
                </div>
            </div>
            <h3 className="ps-form__heading">Shipping address</h3>
            <div className="row">
                <div className="col-sm-6">
                    <div className="form-group">
                        <Form.Item >
                            <Input
                                className="form-control"
                                type="text"
                                placeholder="First Name"
                                value={userInformation.user_first_name}
                                name="user_first_name"
                                onChange={onChangeField}
                            />
                        </Form.Item>
                            
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="form-group">
                        <Form.Item >
                            <Input
                                className="form-control"
                                type="text"
                                placeholder="Last Name"
                                value={userInformation.user_last_name}
                                name="user_last_name"
                                onChange={onChangeField}
                            />
                        </Form.Item>
                        
                    </div>
                </div>
            </div>
            <div className="form-group">
                <Form.Item
                    // name="user_address_shipping"
                    rules={[
                        {
                            required: true,
                            message: 'please provide shipping address',
                        },
                    ]}>
                    <Input
                        className="form-control"
                        type="text"
                        placeholder="Address"
                        value={userInformation.user_address_shipping}
                        name="user_address_shipping"
                        onChange={onChangeField}
                    />
                </Form.Item>
            </div>
            <div className="row">
                <div className="col-sm-6">
                    <div className="form-group">
                        <Form.Item >
                            <Input
                                className="form-control"
                                type="text"
                                placeholder="Apartment, suite, etc. (optional)"
                                value={userInformation.user_building_number}
                                name="user_building_number"
                                onChange={onChangeField}
                                required
                            />
                        </Form.Item>
                        
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="form-group">
                        <Form.Item
                            name="user_postal_number"
                            validateStatus={validatePostalCode.validateStatus}
                            help={validatePostalCode.help}
                        >
                            <Input
                                className="form-control"
                                type="text"
                                placeholder="Postal Code. (optional)"
                                value={userInformation.user_postal_number}
                                name="user_postal_number"
                                onChange={onChangeField}
                                required
                            />
                        </Form.Item>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-6">
                    <div className="form-group">
                        <Select
                            showSearch
                            style={{ width: '100%' }}
                            placeholder="Select country"
                            onSelect={(country) => {
                                setUserInformation({
                                    ...userInformation,
                                    city: null,
                                    country,
                                });
                            }}
                            filterOption={(input, option) =>
                                option.props.value
                                    .toLowerCase()
                                    .indexOf(input.toLowerCase()) >= 0 ||
                                option.props.label
                                    .toLowerCase()
                                    .indexOf(input.toLowerCase()) >= 0
                            }
                            value={userInformation?.country ?? null}>
                            {Locations.map((country, idx) => (
                                <Select.Option
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
                                                alt={country.code2}></img>
                                        </span>
                                        {country.name} ({country.code2})
                                    </div>
                                </Select.Option>
                            ))}
                        </Select>
                    </div>
                </div>
                {userInformation?.country &&
                    Locations.find(
                        (loc) => loc.code2 === userInformation?.country
                    )?.states?.length > 1 && (
                        <div className="col-sm-6">
                            <div className="form-group">
                                <Select
                                    showSearch
                                    style={{ width: '100%' }}
                                    placeholder="Select State/City"
                                    optionLabelProp="label"
                                    autoClearSearchValue
                                    onSelect={(city) =>
                                        setUserInformation({
                                            ...userInformation,
                                            city,
                                        })
                                    }
                                    filterOption={(input, option) =>
                                        option.props.value
                                            .toLowerCase()
                                            .indexOf(input.toLowerCase()) >=
                                            0 ||
                                        option.props.label
                                            .toLowerCase()
                                            .indexOf(input.toLowerCase()) >= 0
                                    }
                                    value={userInformation?.city ?? null}>
                                    {Locations.find(
                                        (loc) =>
                                            loc.code2 ===
                                            userInformation?.country
                                    ).states.map((city, idx) => (
                                        <Select.Option
                                            key={idx}
                                            label={city.name}
                                            value={city.code}>
                                            <div className="demo-option-label-item">
                                                {city.name}
                                            </div>
                                        </Select.Option>
                                    ))}
                                </Select>
                            </div>
                        </div>
                    )}
            </div>
            <div className="form-group">
                <div className="ps-checkbox">
                    <input
                        className="form-control"
                        type="checkbox"
                        id="save-information"
                    />
                    <label htmlFor="save-information">
                        Save this information for next time
                    </label>
                </div>
            </div>
            <div className="ps-form__submit">
                <Link href="/account/shopping-cart">
                    <a>
                        <i className="icon-arrow-left mr-2"></i>
                        Return to shopping cart
                    </a>
                </Link>
                <div className="ps-block__footer">
                    {isAllProductsShippable ? (
                        <button className="ps-btn" disabled={loading}>
                            {loading ? (
                                <Spin size="small" />
                            ) : (
                                'Continue to shipping'
                            )}
                        </button>
                    ) : (
                        <button className="ps-btn" disabled>
                            {
                                'Some products cannot be shipped to above location !'
                            }
                        </button>
                    )}
                </div>
                <Link href="/account/donate">
                    <button className="ps-btn">Donate</button>
                </Link>
            </div>
        </Form>
    );
};

export default FormCheckoutUserInformation;

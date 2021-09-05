import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import UserInformationRepository from '~/repositories/UserInformationRepository';
import { connect } from 'react-redux';
import Locations from '~/files/locations.json';

const Shipping = ({ id_user, shipping, cartTotal, cartItems }) => {
    const [userInformation, setUserInformation] = useState({});

    async function getUserInformation(id_user) {
        const responseData = await UserInformationRepository.getUserById(
            id_user
        );
        if (responseData) {
            setUserInformation(responseData);
        }
    }

    const getShippingCosts = () => {
        if (userInformation.country) {
            const productsShippingCost = cartItems.map((item) =>
                item.vendor_country == userInformation.country
                    ? item.shipping_cost_local
                    : item.shipping_cost_intl
            );

            localStorage.setItem(
                '182heU',
                JSON.stringify(productsShippingCost)
            );
        }
    };

    useEffect(() => {
        getUserInformation(id_user);
        getShippingCosts();
    }, []);
    
    return (
        <>
            <div className="ps-block__panel shipping-container">
                <figure>
                    <small>Contact</small>
                    <p>{userInformation.user_email}</p>
                </figure>
                <figure>
                    <small>Ship to</small>
                    <div>
                        <p>{userInformation.user_building_number}</p>
                        <p>{userInformation.user_address_shipping}</p>
                        <p>
                            {userInformation.city
                                ? Locations.find(
                                      (c) =>
                                          c.code2 === userInformation?.country
                                  )?.states?.find(
                                      (c) => c.code === userInformation?.city
                                  )?.name
                                : userInformation?.city}
                        </p>
                        <p>
                            {userInformation.country
                                ? Locations.find(
                                      (c) =>
                                          c.code2 === userInformation?.country
                                  )?.name
                                : userInformation?.country}
                        </p>
                        <p>{userInformation.user_postal_number}</p>
                    </div>

                    <Link href='/account/checkout'>
                        <a>Change Address</a>
                    </Link>
                </figure>
            </div>
            {/* <h4>Shipping Details</h4>
            {cartItems.map((item) => {
                console.log(item.vendor_country, userInformation.country);
                const shippingType =
                    item.vendor_country == userInformation.country
                        ? 'Local'
                        : 'International';
                console.log(shippingType);
                return (
                    <div className="ps-block__panel" key={item.id_product}>
                        <figure>
                            <small>
                                {item.product_title} ({shippingType})
                            </small>
                            <strong>
                                $
                                {shippingType === 'Local'
                                    ? item.shipping_cost_local
                                    : item.shipping_cost_intl}
                            </strong>
                        </figure>
                    </div>
                );
            })} */}
        </>
    );
};

export default connect((state) => state.cart)(Shipping);

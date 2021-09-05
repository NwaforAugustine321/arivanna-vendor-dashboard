import React, { Component } from 'react';
import Link from 'next/link';
import { notification } from 'antd';
import Menu from '~/components/elements/menu/Menu';
// import Menu from '../../elements/menu/Menu';

import menuData from '../../../public/static/data/menu';
import CurrencyDropdown from '../headers/modules/CurrencyDropdown';
import LanguageSwitcher from '../headers/modules/LanguageSwitcher';

const menuTechnology = [
    {
        text: 'Home',
        url: '/',
    },
    {
        text: 'Shop',
        url: '/shop',
    },
    {
        text: 'About Us',
        url: '/page/about-us',
    },
    {
        text: 'Contact Us',
        url: '/page/contact-us',
    },
];
const devRoutes = [
    {
        text: '404',
        url: '/404',
    },
    {
        text: 'Vendors',
        url: '/vendor/vendor-store',
    },
    {
        text: 'Products Countdown',
        url: '/product/countdown/14',
    },
    {
        text: 'Products Imageswatches',
        url: '/product/image-swatches/14',
    },
    {
        text: 'Product Full Content',
        url: '/product/full-content/14',
    },
    {
        text: 'Simple Product Type',
        url: '/product/3',
    },
    {
        text: 'Products',
        url: '/product/all',
    },
    {
        text: 'Shop Catalog Carousel',
        url: '/shop/shop-carousel',
    },
    {
        text: 'Stores',
        url: '/stores',
    },
    {
        text: 'FAQs',
        url: '/page/faqs',
    },
    {
        text: 'ALWAYS_ACCESS_LEVEL',
        url: '/authorization_tests/ALWAYS_ACCESS_LEVEL',
    },
    {
        text: 'DEV_ACCESS_LEVEL',
        url: '/authorization_tests/DEV_ACCESS_LEVEL',
    },
    {
        text: 'PUBLIC_ACCESS_LEVEL',
        url: '/authorization_tests/PUBLIC_ACCESS_LEVEL',
    },
    {
        text: 'USER_ACCESS_LEVEL',
        url: '/authorization_tests/USER_ACCESS_LEVEL',
    },
    {
        text: 'USER_BUYER_ACCESS_LEVEL',
        url: '/authorization_tests/USER_BUYER_ACCESS_LEVEL',
    },
    {
        text: 'USER_VENDOR_TM_LEVEL',
        url: '/authorization_tests/USER_VENDOR_TM_LEVEL',
    },
];

class NavigationTablet extends Component {
    constructor(props) {
        super(props);
    }

    handleFeatureWillUpdate(e) {
        e.preventDefault();
        notification.open({
            message: 'Opp! Something went wrong.',
            description: 'This feature has been updated later!',
            duration: 500,
        });
    }

    render() {
        return (
            <nav className="navigation navigation--tablet">
                <div className="ps-container">
                    <div className="navigation__right">
                        <Menu
                            source={menuTechnology}
                            className="menu menu--technology"
                        />
                        <div className="dev-routes-categories dev-routes">
                            <div className="menu__toggle dev-routes-toggle">
                                Dev Routes{' '}
                                <i className="icon-menu dev-routes-menu-icon"></i>
                            </div>
                            <div className="menu__content">
                                <Menu
                                    source={devRoutes}
                                    className="menu--dropdown"
                                />
                            </div>
                        </div>
                        <div className="dev-routes-categories dev-routes">
                            <div className="menu__toggle dev-routes-toggle">
                                Shop By Department{' '}
                                <i className="icon-menu dev-routes-menu-icon"></i>
                            </div>
                            <div className="menu__content">
                                <Menu
                                    source={menuData.product_categories}
                                    className="menu--dropdown"
                                />
                            </div>
                        </div>
                        {/* <Menu
                            source={menuData.menuPrimary.menu_1}
                            className="menu"
                        /> */}
                        <ul className="navigation__extra">
                            <li className="nav_extra_arivanna">
                                <Link href="/vendor/become-a-vendor">
                                    <a>Sell on Arivanna</a>
                                </Link>
                            </li>
                            {/* <li className="nav_extra_arivanna">
                                <Link href="/account/order-tracking">
                                    <a>Track your order</a>
                                </Link>
                            </li> */}
                            <li>
                                <CurrencyDropdown />
                            </li>
                            <li>
                                <LanguageSwitcher />
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default NavigationTablet;

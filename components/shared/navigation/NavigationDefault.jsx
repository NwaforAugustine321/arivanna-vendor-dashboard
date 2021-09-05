import React, { Component } from 'react';
import Link from 'next/link';
import { notification } from 'antd';
import Menu from '~/components/elements/menu/Menu';
// import Menu from '../../elements/menu/Menu';

import menuData from '../../../public/static/data/menu';
import CurrencyDropdown from '../headers/modules/CurrencyDropdown';
import LanguageSwitcher from '../headers/modules/LanguageSwitcher';
import CountryPicker from '../headers/modules/CountryPicker';
import ProductRepository from '~/repositories/ProductRepository';
const menuTechnology = [
    {
        text: ' HOME',
        url: '/',
        icon: 'icon-home',
    },
    {
        text: ' SHOP',
        url: '/shop',
        icon: 'icon-bag2',
    },
    {
        text: ' ABOUT US',
        url: '/page/about-us',
        icon: 'icon-users2',
    },
    {
        text: ' CONTACT US',
        url: '/page/contact-us',
        icon: 'icon-phone-wave',
    },
    {
        text: ' STORES',
        url: '/stores',
        icon: 'icon-store',
    },
    {
        text: ' FAQs',
        url: '/page/faqs',
    },
];
const menuTechnologyTablet = [
    //loads this forAaron?
    {
        text: ' HOME',
        url: '/',
        icon: 'icon-home',
    },
    {
        text: ' SHOP',
        url: '/shop',
        icon: 'icon-bag2',
    },
    {
        text: ' ABOUT US',
        url: '/page/about-us',
        icon: 'icon-users2',
    },
    {
        text: ' CONTACT US',
        url: '/page/contact-us',
        icon: 'icon-phone-wave',
    },
    {
        text: ' STORES',
        url: '/stores',
        icon: 'icon-store',
    },
];
const menuTechnologyMiniTablet = [
    {
        text: ' HOME',
        url: '/',
        icon: 'icon-home',
    },
    {
        text: ' SHOP',
        url: '/shop',
        icon: 'icon-bag2',
    },
    {
        text: ' ABOUT US',
        url: '/page/about-us',
        icon: 'icon-users2',
    },
    {
        text: ' STORES',
        url: '/stores',
        icon: 'icon-store',
    },
];
const menuTechnologyMicroTablet = [
    {
        text: ' HOME',
        url: '/',
        icon: 'icon-home',
    },
    {
        text: ' SHOP',
        url: '/shop',
        icon: 'icon-bag2',
    },
    {
        text: ' ABOUT US',
        url: '/page/about-us',
        icon: 'icon-users2',
    },
];
const menuTechnologySmallTablet = [
    {
        text: ' HOME',
        url: '/',
        icon: 'icon-home',
    },
    {
        text: ' SHOP',
        url: '/shop',
        icon: 'icon-bag2',
    },
];
const menuTechnologyExtraSmallTablet = [
    {
        text: ' HOME',
        url: '/',
        icon: 'icon-home',
    },
    {
        text: ' SHOP',
        url: '/shop',
        icon: 'icon-bag2',
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
        url: '/product/countdown/14',
    },
    {
        text: 'Products',
        url: '/product/all',
    },
    {
        text: 'SHOP Catalog Carousel',
        url: '/shop/shop-carousel',
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
const devRoutesTablet = [
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
        url: '/product/countdown/14',
    },
    {
        text: 'Products',
        url: '/product/all',
    },
    {
        text: 'SHOP Catalog Carousel',
        url: '/shop/shop-carousel',
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
const devRoutesMiniTablet = [
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
        url: '/product/countdown/14',
    },
    {
        text: 'Products',
        url: '/product/all',
    },
    {
        text: 'SHOP Catalog Carousel',
        url: '/shop/shop-carousel',
    },
    {
        text: 'FAQs',
        url: '/page/faqs',
    },
    {
        text: 'CONTACT US',
        url: '/page/contact-us',
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
const devRoutesMicroTablet = [
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
        url: '/product/countdown/14',
    },
    {
        text: 'Products',
        url: '/product/all',
    },
    {
        text: 'SHOP Catalog Carousel',
        url: '/shop/shop-carousel',
    },
    {
        text: 'FAQs',
        url: '/page/faqs',
    },
    {
        text: 'CONTACT US',
        url: '/page/contact-us',
    },
    {
        text: 'STORES',
        url: '/stores',
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
const devRoutesSmall = [
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
        url: '/product/countdown/14',
    },
    {
        text: 'Products',
        url: '/product/all',
    },
    {
        text: 'SHOP Catalog Carousel',
        url: '/shop/shop-carousel',
    },
    {
        text: 'FAQs',
        url: '/page/faqs',
    },
    {
        text: 'CONTACT US',
        url: '/page/contact-us',
    },
    {
        text: 'STORES',
        url: '/stores',
    },
    {
        text: 'ABOUT US',
        url: '/page/about-us',
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
const devRoutesExtraSmall = [
    {
        text: '404',
        url: '/404',
    },
    {
        text: 'Vendors',
        url: '/vendor/vendor-store',
    },
    {
        text: 'Products',
        url: '/product/countdown/14',
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
        url: '/product/countdown/14',
    },
    {
        text: 'Products All',
        url: '/product/all',
    },
    {
        text: 'SHOP Catalog Carousel',
        url: '/shop/shop-carousel',
    },
    {
        text: 'FAQs',
        url: '/page/faqs',
    },
    {
        text: 'CONTACT US',
        url: '/page/contact-us',
    },
    {
        text: 'STORES',
        url: '/stores',
    },
    {
        text: 'ABOUT US',
        url: '/page/about-us',
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

const icons = {
    1: 'icon-home',
    3: 'icon-laptop',
    4: 'icon-glass',
    5: 'icon-truck',
    7: 'icon-play-circle',
    9: '',
    10: 'icon-tablet',
    11: 'icon-inbox',
};

class NavigationDefault extends Component {
    constructor(props) {
        super(props);
        this.state = { categories: [] };
    }
    // const icons = { All: }

    handleFeatureWillUpdate(e) {
        e.preventDefault();
        notification.open({
            message: 'Opp! Something went wrong.',
            description: 'This feature has been updated later!',
            duration: 500,
        });
    }

    async getProductCategories() {
        const cat = await ProductRepository.getProductCategories();
        const data = cat.map((item) => {
            return {
                // icon: (
                //     <img
                //         src={item.category_icon_url}
                //         alt={item.category_name}
                //         height={20}
                //         style={{
                //             margin: '0 12px 0 0',
                //             paddingTop: 10,
                //             float: 'left',
                //         }}
                //     />
                // ),

                text: (
                    <div className="row ">
                        <div className="col-12">
                            <img
                                className="pr-10 pb-2"
                                src={item.category_icon_url}
                                alt={item.category_name}
                                height={25}
                                width={25}
                            />

                            <span>{item.category_name}</span>
                        </div>
                    </div>
                ),

                url: `/shop?category=${item.id_product_category}&name=${item.category_name}`,
            };
        });

        this.setState({ categories: data });
        // const asd = await ProductRepository.getProductsByCategory(1);
        // console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>', asd);
    }

    componentDidMount() {
        this.getProductCategories();
    }

    componentWillUnmount() {
        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState = (state,callback)=>{
            return;
        };
    }
    
    render() {
        return (
            <>
                <nav className="navigation">
                    <div className="ps-container">
                        <div className="navigation__right">
                            <Menu
                                source={menuTechnology}
                                className="menu menu--technology"
                            />
                            {/* <div className="dev-routes-categories dev-routes">
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
                            </div> */}
                            <div className="dev-routes-categories dev-routes">
                                <div className="menu__toggle dev-routes-toggle">
                                    Shop by Category{' '}
                                    <i className="icon-menu dev-routes-menu-icon"></i>
                                </div>
                                <div className="menu__content">
                                    <Menu
                                        source={this.state.categories}
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
                                        <a>Sell on Arivanna LA</a>
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
                                <li className="mini-language-switcher">
                                    <CountryPicker />
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <nav className="navigation-tablet">
                    <div className="ps-container">
                        <div className="navigation__right">
                            <Menu
                                source={menuTechnologyTablet}
                                className="menu menu--technology"
                            />
                            {/* <div className="dev-routes-categories dev-routes">
                                <div className="menu__toggle dev-routes-toggle">
                                    Dev Routes{' '}
                                    <i className="icon-menu dev-routes-menu-icon"></i>
                                </div>
                                <div className="menu__content">
                                    <Menu
                                        source={devRoutesTablet}
                                        className="menu--dropdown"
                                    />
                                </div>
                            </div> */}
                            <div className="dev-routes-categories dev-routes">
                                <div className="menu__toggle dev-routes-toggle">
                                    Shop by Category{' '}
                                    <i className="icon-menu dev-routes-menu-icon"></i>
                                </div>
                                <div className="menu__content">
                                    <Menu
                                        source={this.state.categories}
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
                                <li className="mini-language-switcher">
                                    <CountryPicker />
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <nav className="navigation-mini-tablet">
                    <div className="ps-container">
                        <div className="navigation__right">
                            <Menu
                                source={menuTechnologyMiniTablet}
                                className="menu menu--technology menu-mini-tablet"
                            />
                            {/* <div className="dev-routes-categories dev-routes mini-dev-routes">
                                <div className="menu__toggle dev-routes-toggle">
                                    Dev Routes{' '}
                                    <i className="icon-menu dev-routes-menu-icon"></i>
                                </div>
                                <div className="menu__content">
                                    <Menu
                                        source={devRoutesMiniTablet}
                                        className="menu--dropdown"
                                    />
                                </div>
                            </div> */}
                            <div className="dev-routes-categories dev-routes mini-dev-routes">
                                <div className="menu__toggle dev-routes-toggle">
                                    Shop by Category{' '}
                                    <i className="icon-menu dev-routes-menu-icon"></i>
                                </div>
                                <div className="menu__content">
                                    <Menu
                                        source={this.state.categories}
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
                                <li className="mini-language-switcher">
                                    <CountryPicker />
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <nav className="navigation-micro-tablet">
                    <div className="ps-container">
                        <div className="navigation__right">
                            <Menu
                                source={menuTechnologyMicroTablet}
                                className="menu menu--technology menu-micro-tablet"
                            />
                            {/* <div className="dev-routes-categories dev-routes micro-dev-routes">
                                <div className="menu__toggle dev-routes-toggle">
                                    Dev Routes{' '}
                                    <i className="icon-menu dev-routes-menu-icon"></i>
                                </div>
                                <div className="menu__content">
                                    <Menu
                                        source={devRoutesMicroTablet}
                                        className="menu--dropdown"
                                    />
                                </div>
                            </div> */}
                            <div className="dev-routes-categories dev-routes micro-dev-routes">
                                <div className="menu__toggle dev-routes-toggle">
                                    Shop by Category{' '}
                                    <i className="icon-menu dev-routes-menu-icon"></i>
                                </div>
                                <div className="menu__content">
                                    <Menu
                                        source={this.state.categories}
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
                                <li className="mini-language-switcher">
                                    <CountryPicker />
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <nav className="navigation-micro-tablet-small">
                    <div className="ps-container">
                        <div className="navigation__right">
                            <Menu
                                source={menuTechnologySmallTablet}
                                className="menu menu--technology menu-micro-tablet"
                            />
                            {/* <div className="dev-routes-categories dev-routes micro-dev-routes">
                                <div className="menu__toggle dev-routes-toggle">
                                    Dev Routes{' '}
                                    <i className="icon-menu dev-routes-menu-icon"></i>
                                </div>
                                <div className="menu__content">
                                    <Menu
                                        source={devRoutesSmall}
                                        className="menu--dropdown"
                                    />
                                </div>
                            </div> */}
                            <div className="dev-routes-categories dev-routes micro-dev-routes">
                                <div className="menu__toggle dev-routes-toggle">
                                    Shop by Category{' '}
                                    <i className="icon-menu dev-routes-menu-icon"></i>
                                </div>
                                <div className="menu__content">
                                    <Menu
                                        source={this.state.categories}
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
                                <li className="mini-language-switcher">
                                    <CountryPicker />
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <nav className="navigation-micro-tablet-extra-small">
                    <div className="ps-container">
                        <div className="navigation__right">
                            <Menu
                                source={menuTechnologyExtraSmallTablet}
                                className="menu menu--technology menu-micro-tablet"
                            />
                            {/* <div className="dev-routes-categories dev-routes micro-dev-routes">
                                <div className="menu__toggle dev-routes-toggle">
                                    Dev Routes{' '}
                                    <i className="icon-menu dev-routes-menu-icon"></i>
                                </div>
                                <div className="menu__content">
                                    <Menu
                                        source={devRoutesExtraSmall}
                                        className="menu--dropdown"
                                    />
                                </div>
                            </div> */}
                            <div className="dev-routes-categories dev-routes micro-dev-routes">
                                <div className="menu__toggle dev-routes-toggle">
                                    Shop by Category{' '}
                                    <i className="icon-menu dev-routes-menu-icon"></i>
                                </div>
                                <div className="menu__content">
                                    <Menu
                                        source={this.state.categories}
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
                                <li className="mini-language-switcher">
                                    <LanguageSwitcher />
                                </li>
                                <li className="mini-language-switcher">
                                    <CountryPicker />
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </>
        );
    }
}

export default NavigationDefault;

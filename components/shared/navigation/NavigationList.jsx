import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Drawer } from 'antd';
import PanelMenu from '../panel/PanelMenu';
import PanelCartMobile from '../panel/PanelCartMobile';
import PanelSearch from '../panel/PanelSearch';
import PanelCategories from '../panel/PanelCategories';

class NavigationList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuDrawer: false,
            cartDrawer: false,
            searchDrawer: false,
            categoriesDrawer: false,
        };
    }

    handleDrawerClose = () => {
        this.setState({
            menuDrawer: false,
            cartDrawer: false,
            searchDrawer: false,
            categoriesDrawer: false,
        });
    };

    handleShowMenuDrawer = () => {
        this.setState({
            menuDrawer: !this.state.menuDrawer,
            cartDrawer: false,
            searchDrawer: false,
            categoriesDrawer: false,
        });
    };

    handleShowCartDrawer = () => {
        this.setState({
            menuDrawer: false,
            cartDrawer: !this.state.cartDrawer,
            searchDrawer: false,
            categoriesDrawer: false,
        });
    };
    handleShowSearchDrawer = () => {
        this.setState({
            menuDrawer: false,
            cartDrawer: false,
            searchDrawer: !this.state.searchDrawer,
            categoriesDrawer: false,
        });
    };
    handleShowCategoriesDrawer = () => {
        this.setState({
            menuDrawer: false,
            cartDrawer: false,
            searchDrawer: false,
            categoriesDrawer: !this.state.categoriesDrawer,
        });
    };

    render() {
        const {
            menuDrawer,
            searchDrawer,
            cartDrawer,
            categoriesDrawer,
        } = this.state;

        return (
            <div className="navigation--list">
                <Drawer
                    className="ps-panel--mobile"
                    placement="right"
                    closable={false}
                    onClose={this.handleDrawerClose}
                    visible={this.state.menuDrawer}>
                    <div className="ps-panel--wrapper">
                        <div className="ps-panel__header">
                            <h3>Menu</h3>
                            <span
                                className="ps-panel__close"
                                onClick={this.handleDrawerClose}>
                                <i className="icon-cross"></i>
                            </span>
                        </div>
                        <div className="ps-panel__content"> 
                            <PanelMenu />
                        </div>
                    </div>
                </Drawer>
                <Drawer
                    className="ps-panel--mobile"
                    placement="right"
                    closable={false}
                    onClose={this.handleDrawerClose}
                    visible={this.state.cartDrawer}>
                    <div className="ps-panel--wrapper">
                        <div className="ps-panel__header">
                            <h3>Shopping Cart</h3>
                            <span
                                className="ps-panel__close"
                                onClick={this.handleDrawerClose}>
                                <i className="icon-cross"></i>
                            </span>
                        </div>
                        <div className="ps-panel__content">
                            <PanelCartMobile />
                        </div>
                    </div>
                </Drawer>
                <Drawer
                    className="ps-panel--mobile"
                    placement="right"
                    closable={false}
                    onClose={this.handleDrawerClose}
                    visible={this.state.searchDrawer}>
                    <div className="ps-panel--wrapper">
                        <div className="ps-panel__header">
                            <h3>Search</h3>
                            <span
                                className="ps-panel__close"
                                onClick={this.handleDrawerClose}>
                                <i className="icon-cross"></i>
                            </span>
                        </div>
                        <div className="ps-panel__content">
                            <PanelSearch />
                        </div>
                    </div>
                </Drawer>
                <Drawer
                    className="ps-panel--mobile"
                    placement="right"
                    closable={false}
                    onClose={this.handleDrawerClose}
                    visible={this.state.categoriesDrawer}>
                    <div className="ps-panel--wrapper">
                        <div className="ps-panel__header">
                            <h3>Categories</h3>
                            <span
                                className="ps-panel__close"
                                onClick={this.handleDrawerClose}>
                                <i className="icon-cross"></i>
                            </span>
                        </div>
                        <div className="ps-panel__content">
                            <PanelCategories />
                        </div>
                    </div>
                </Drawer>
                <div className="navigation__content">
                    <a
                        className={`navigation__item ${
                            menuDrawer === true ? 'active' : ''
                        }`}
                        onClick={this.handleShowMenuDrawer}>
                        <i className="icon-menu"></i>
                        <span> Menu</span>
                    </a>
                    <a hidden
                        className={`navigation__item ${
                            categoriesDrawer === true ? 'active' : ''
                        }`}
                        onClick={this.handleShowCategoriesDrawer}>
                        <i className="icon-list4"></i>
                        <span> Categories</span>
                    </a>
                    <a
                        className={`navigation__item ${
                            searchDrawer === true ? 'active' : ''
                        }`}
                        onClick={this.handleShowSearchDrawer}>
                        <i className="icon-magnifier"></i>
                        <span> Search</span>
                    </a>
                    <a
                        className={`navigation__item ${
                            cartDrawer === true ? 'active' : ''
                        }`}
                        onClick={this.handleShowCartDrawer}>
                        <i className="icon-bag2"></i>
                        <span> Cart</span>
                    </a>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state.setting;
};
export default connect(mapStateToProps)(NavigationList);




////// old menu items. Keeping it as it has formatting options we might want to use later 

   /*   {
                "text": "Shop",
                "url": "/shop",
                "extraClass": "menu-item-has-children has-mega-menu",
                "subClass": "sub-menu",
                "mega": "true",
                "megaContent": [
                    {
                        "heading": "Catalog Pages",
                        "megaItems": [
                            {
                                "text": "All PRODUCTS",
                                "url": "/shop"
                            },
                            {
                                "text": "Shop Carousel",
                                "url": "/shop/shop-carousel"
                            }
                        ]
                    },
                    {
                        "heading": "Product Layout",
                        "megaItems": [
                            {
                                "text": "Default",
                                "url": "/product/3"
                            },
                            {
                                "text": "Full Content",
                                "url": "/product/full-content/7"
                            }
                        ]
                    },
                    {
                        "heading": "Product Types",
                        "megaItems": [
                            {
                                "text": "Simple",
                                "url": "/product/3"
                            },
                            {
                                "text": "Image swatches",
                                "url": "/product/image-swatches/11"
                            },
                            {
                                "text": "Countdown",
                                "url": "/product/countdown/14"
                            }
                        ]
                    },
                    {
                        "heading": "Ecomerce Pages",
                        "megaItems": [
                            {
                                "text": "Shopping Cart",
                                "url": "/account/shopping-cart"
                            },
                            {
                                "text": "Checkout",
                                "url": "/account/checkout"
                            },
                            {
                                "text": "Whishlist",
                                "url": "/account/wishlist"
                            },
                            {
                                "text": "Order Tracking",
                                "url": "/account/order-tracking"
                            },
                            {
                                "text": "Login / Register",
                                "url": "/account/login"
                            }
                        ]
                    }
                ]
            },
            {
                "text": "Pages",
                "url": "",
                "extraClass": "menu-item-has-children has-mega-menu",
                "subClass": "sub-menu",
                "mega": "true",
                "megaContent": [
                    {
                        "heading": "Vendor Pages",
                        "megaItems": [
                            {
                                "text": "Become a Vendor",
                                "url": "/vendor/become-a-vendor"
                            },
                            {
                                "text": "Vendor Store",
                                "url": "/vendor/vendor-store"
                            },
                            {
                                "text": "Store List",
                                "url": "/stores"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    "product_categories": [
        {
            "icon": "icon-star",
            "text": "Hot Promotions",
            "url": "/shop"
        },
        {
            "icon": "icon-laundry",
            "text": "Consumer Electronic",
            "url": "/shop",
            "extraClass": "menu-item-has-children has-mega-menu",
            "subClass": "sub-menu",
            "mega": true,
            "megaContent": [
                {
                    "heading": "Electronic",
                    "megaItems": [
                        {
                            "text": "Home Audio & Theathers",
                            "url": "/shop"
                        },
                        {
                            "text": "TV & Videos",
                            "url": "/shop"
                        },
                        {
                            "text": "Camera, Photos & Videos",
                            "url": "/shop"
                        },
                        {
                            "text": "Cellphones & Accessories",
                            "url": "/shop"
                        },
                        {
                            "text": "Headphones",
                            "url": "/shop"
                        },
                        {
                            "text": "Videosgames",
                            "url": "/shop"
                        },
                        {
                            "text": "Wireless Speakers",
                            "url": "/shop"
                        },
                        {
                            "text": "Office Electronic",
                            "url": "/shop"
                        }
                    ]
                },
                {
                    "heading": "Accessories & Parts",
                    "megaItems": [
                        {
                            "text": "Digital Cables",
                            "url": "/shop"
                        },
                        {
                            "text": "Audio & Video Cables",
                            "url": "/shop"
                        },
                        {
                            "text": "Batteries",
                            "url": "/shop"
                        }
                    ]
                }
            ]
        },
        {
            "icon": "icon-shirt",
            "text": "Clothing & Apparel",
            "url": "/shop"
        },
        {
            "icon": "icon-lampshade",
            "text": "Home, Garden & Kitchen",
            "url": "/shop"
        },
        {
            "icon": "icon-heart-pulse",
            "text": "Health & Beauty",
            "url": "/shop"
        },
        {
            "icon": "icon-diamond2",
            "text": "Yewelry & Watches",
            "url": "/shop"
        },
        {
            "icon": "icon-desktop",
            "text": "Computer & Technology",
            "url": "/shop",
            "extraClass": "menu-item-has-children has-mega-menu",
            "subClass": "sub-menu",
            "megaContent": [
                {
                    "heading": "Computer & Technologies",
                    "megaItems": [
                        {
                            "text": "Computer & Tablets",
                            "url": "/shop"
                        },
                        {
                            "text": "Laptop",
                            "url": "/shop"
                        },
                        {
                            "text": "Monitors",
                            "url": "/shop"
                        },
                        {
                            "text": "Networking",
                            "url": "/shop"
                        },
                        {
                            "text": "Drive & Storages",
                            "url": "/shop"
                        },
                        {
                            "text": "Computer Components",
                            "url": "/shop"
                        },
                        {
                            "text": "Security & Protection",
                            "url": "/shop"
                        },
                        {
                            "text": "Gaming Laptop",
                            "url": "/shop"
                        },
                        {
                            "text": "Accessories",
                            "url": "/shop"
                        }
                    ]
                }
            ]
        },
        {
            "icon": "icon-baby-bottle",
            "text": "Babies & Moms",
            "url": "/shop"
        },
        {
            "icon": "icon-baseball",
            "text": "Sport & Outdoor",
            "url": "/shop"
        },
        {
            "icon": "icon-smartphone",
            "text": "Phones & Accessories",
            "url": "/shop"
        },
        {
            "icon": "icon-book2",
            "text": "Books & Office",
            "url": "/shop"
        },
        {
            "icon": "icon-car-siren",
            "text": "Cars & Motocycles",
            "url": "/shop"
        },
        {
            "icon": "icon-wrench",
            "text": "Home Improments",
            "url": "/shop"
        },
        {
            "icon": "icon-tag",
            "text": "Vouchers & Services",
            "url": "/shop"
        }
   */
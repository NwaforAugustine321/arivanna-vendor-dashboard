import React, { Component } from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
import Link from 'next/link';
import { logOut } from '../../../../store/auth/action';
import { clearCart } from '~/store/cart/action';
import api from '../../../../api/handler';
import { Dropdown, Menu } from 'antd';
import { clearUserWishlist } from '../../../../store/wishlist/action';
import accountLinks from '../../../partials/account/accountlinks'

class AccountQuickLinks extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    static getDerivedStateFromProps(props) {
        if (props.isLoggedIn === false) {
            Router.push('/');
        }

        return false;
    }

    handleLogout = async (e) => {
        const data = { token: this.props.token };
        const route = 'user_logout';
        e.preventDefault();

        this.props.dispatch(clearUserWishlist());

        await api.handler
            .api_post(data, route)
            .then((response) => {
                if (!response.success) {
                } else {
                    this.props.dispatch(clearCart());
                    this.props.dispatch(logOut());
                }
            })
            .catch((error) => {
                throw error;
            });
    };

    render() {

        const menu = (
            <Menu>
                {accountLinks.map((link) => (
                    <Menu.Item key={link.url}>
                        <Link href={link.url}>
                            <a>{link.text}</a>
                        </Link>
                    </Menu.Item>
                ))}

                <Menu.Item>
                    <a href="#" onClick={this.handleLogout.bind(this)}>
                        Logout
                    </a>
                </Menu.Item>
            </Menu>
        );

        return (
            <Dropdown overlay={menu} placement="bottomLeft">
                <a href="#" className="header__extra ps-user--mobile">
                    <i className="icon-user"></i>
                </a>
            </Dropdown>
        );
    }
}
const mapStateToProps = (state) => {
    return state.auth;
};
export default connect(mapStateToProps)(AccountQuickLinks);

import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import Link from 'next/link';
import Router from 'next/router';
import { logOut } from '~/store/auth/action';
import { clearCart } from '~/store/cart/action';
import { clearWishlist } from '~/store/wishlist/action';
import api from '../../../../api/handler';
import { toggelChatbot, chat } from '../../../../store/setting/action';
import { clearUserWishlist } from '../../../../store/wishlist/action';
import accountLinks from '../../../partials/account/accountlinks';

const AccountQuickLinks = (props) => {
    const dispatch = useDispatch();

    const handleLogout = async (e) => {
        // localStorage.clear(); //temporary fix to logout bug
        const data = { token: props.token };
        const route = 'user_logout';
        e.preventDefault();

        dispatch(clearUserWishlist());

        await api.handler
            .api_post(data, route)
            .then((response) => {
                if (!response.success) {
                } else {
                    dispatch(clearCart());
                    dispatch(clearWishlist());
                    dispatch(logOut(props.user_first_name));
                    Router.push('/');
                }
            })
            .catch((error) => {
                throw error;
            });
    };

    const { isLoggedIn } = props;

    // View
    const linksView = accountLinks.map((item) =>
        item.url !== '' ? (
            <li key={item.text} className={item.active ? 'active' : ''}>
                <Link href={item.url}>
                    <a>{item.text}</a>
                </Link>
            </li>
        ) : (
            <li
                key={item.text}
                onClick={
                    item.text === 'Arivanna Chat/Customers'
                        ? props.handleToggelChat
                        : props.handleToggelChatbot
                }
                className={item.active ? 'active' : ''}>
                <a>{item.text}</a>
            </li>
        )
    );

    if (isLoggedIn === true) {
        return (
            <div className="ps-block--user-account">
                <i className="icon-user"></i>
                <div className="ps-block__content">
                    <ul className="ps-list--arrow">
                        {linksView}
                        <li className="ps-block__footer">
                            <a
                                id="icon-link"
                                href="#"
                                onClick={(e) => handleLogout(e)}>
                                Logout
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    } else {
        return (
            <div className="ps-block--user-header">
                <div className="ps-block__left">
                    <i className="icon-user"></i>
                </div>
                <div className="ps-block__right">
                    <Link href="/account/login">
                        <a>Login</a>
                    </Link>
                    <Link href="/account/register">
                        <a>Register</a>
                    </Link>
                </div>
            </div>
        );
    }
};

const mapDispatchToProps = (dispatch) => ({
    handleToggelChat: () => dispatch(chat()),
    handleToggelChatbot: () => dispatch(toggelChatbot()),
});

export default connect(
    (state) => state.auth,
    mapDispatchToProps
)(AccountQuickLinks);

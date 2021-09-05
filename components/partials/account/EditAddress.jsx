import React, { Component } from 'react';
import Link from 'next/link';
import FormEditAddress from './modules/FormEditAddress';
import { connect } from 'react-redux';
import Router from 'next/router';
import { logOut } from '../../../store/auth/action';
import api from '../../../api/handler';
import { AccessLevel } from '~/utilities/constant-class';
import withAuth from '~/components/hoc/RouteAuth';
import { clearUserWishlist } from '~/store/wishlist/action';
import ProfileImage from '~/components/shared/ProfileImage';

class EditAddress extends Component {
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
                    this.props.dispatch(logOut());
                }
            })
            .catch((error) => {
                throw error;
            });
    };

    render() {
       

        const { user_first_name } = this.props.auth;

        return (
            <section className="ps-my-account ps-page--account">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="ps-section__left">
                                <aside className="ps-widget--account-dashboard">
                                    <div className="ps-widget__header">
                                        <ProfileImage />
                                        <figure>
                                            <figcaption>Hello</figcaption>
                                            <p>{user_first_name}</p>
                                        </figure>
                                    </div>
                                    <div className="ps-widget__content">
                                        <ul>
                                            {accountLinks.map((link) => (
                                                <li
                                                    key={link.text}
                                                    className={
                                                        link.active
                                                            ? 'active'
                                                            : ''
                                                    }>
                                                    <Link href={link.url}>
                                                        <a>
                                                            <i
                                                                className={
                                                                    link.icon
                                                                }></i>
                                                            {link.text}
                                                        </a>
                                                    </Link>
                                                </li>
                                            ))}
                                            <li>
                                                <a
                                                    href="#"
                                                    onClick={this.handleLogout.bind(
                                                        this
                                                    )}>
                                                    <i className="icon-power-switch"></i>
                                                    Logout
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </aside>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="ps-page__content">
                                <FormEditAddress />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

const mapStateToProps = (state) => {
    return state.auth;
};

export default connect(mapStateToProps)(
    withAuth(EditAddress, AccessLevel.USER_ACCESS_LEVEL)
);
// export default connect(mapStateToProps)(EditAddress);

import React, { Component } from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import Router from 'next/router';
import { logOut } from '../../../store/auth/action';
import api from '../../../api/handler';
import { AccessLevel } from '~/utilities/constant-class';
import withAuth from '~/components/hoc/RouteAuth';
import ProfileImage from '~/components/shared/ProfileImage';

class RecentViewedProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

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
                                        </ul>
                                    </div>
                                </aside>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <section className="ps-section--account-setting">
                                <div className="ps-section__content">
                                    <p>No product here.</p>
                                </div>
                            </section>
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
    withAuth(RecentViewedProducts, AccessLevel.USER_ACCESS_LEVEL)
);

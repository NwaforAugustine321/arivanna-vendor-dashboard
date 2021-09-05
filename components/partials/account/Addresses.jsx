import React, { Component } from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import Router from 'next/router';
import { logOut } from '../../../store/auth/action';
import api from '../../../api/handler';
import { AccessLevel } from '~/utilities/constant-class';
import withAuth from '~/components/hoc/RouteAuth';
import accountLinks from './accountlinks'
import AccountMenuSidebar from './modules/AccountMenuSidebar';
import ProfileImage from '~/components/shared/ProfileImage';

class Addresses extends Component {
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
                        <AccountMenuSidebar />

                        <div className="col-lg-8">
                            <div className="ps-section--account-setting">
                                <div className="ps-section__content">
                                    <div className="row">
                                        <div className="col-md-6 col-12">
                                            <figure className="ps-block--address">
                                                <figcaption>
                                                    Billing address
                                                </figcaption>
                                                <div className="ps-block__content">
                                                    <p>
                                                        You Have Not Set Up This
                                                        Type Of Address Yet.
                                                    </p>
                                                    <Link href="/account/edit-address">
                                                        <a>Edit</a>
                                                    </Link>
                                                </div>
                                            </figure>
                                        </div>
                                        <div className="col-md-6 col-12">
                                            <figure className="ps-block--address">
                                                <figcaption>
                                                    Shipping address
                                                </figcaption>
                                                <div className="ps-block__content">
                                                    <p>
                                                        You Have Not Set Up This
                                                        Type Of Address Yet.
                                                    </p>
                                                    <Link href="/account/edit-address">
                                                        <a>Edit</a>
                                                    </Link>
                                                </div>
                                            </figure>
                                        </div>
                                    </div>
                                </div>
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
    withAuth(Addresses, AccessLevel.USER_ACCESS_LEVEL)
);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
import Link from 'next/link';
import { logOut } from '../../../store/auth/action';
import FormChangeUserInformation from '~/components/shared/FormChangeUserInformation';
import { AccessLevel } from '~/utilities/constant-class';
import withAuth from '~/components/hoc/RouteAuth';
import accountLinks from './accountlinks';
import AccountMenuSidebar from './modules/AccountMenuSidebar';

import ProfileImage from '~/components/shared/ProfileImage';
class UserInformation extends Component {
    constructor(props) {
        super(props);
        this.state = { id_user: props.id_user };
    }

    render() {
        //Views
        const accountLinkView = accountLinks.map((item) => (
            <li key={item.text} className={item.active ? 'active' : ''}>
                <Link href={item.url}>
                    <a>
                        <i className={item.icon}></i>
                        {item.text}
                    </a>
                </Link>
            </li>
        ));

        const { user_first_name } = this.props.auth;

        return (
            <section className="ps-my-account ps-page--account">
                <div className="container">
                    <div className="row">
                        <AccountMenuSidebar />

                        <div className="col-lg-9">
                            <div className="ps-page__content">
                                <FormChangeUserInformation
                                    id_user={this.state.id_user}
                                    token={this.props.token}
                                />
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
    withAuth(UserInformation, AccessLevel.USER_ACCESS_LEVEL)
);

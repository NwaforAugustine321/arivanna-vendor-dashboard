import React, { Component } from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
import Link from 'next/link';
import { logOut } from '../../../../store/auth/action';
import { toggelChatbot, chat } from '../../../../store/setting/action';
import api from '../../../../api/handler';
import { AccessLevel } from '~/utilities/constant-class';
import withAuth from '~/components/hoc/RouteAuth';
import accountLinks from '../accountlinks';
import ProfileImage from '~/components/shared/ProfileImage';

class AccountMenuSidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { user_first_name } = this.props.auth;

        return (
            <div className="col-lg-3 mb-5">
                <div className="ps-section__left">
                    <aside className="ps-widget--account-dashboard">
                        <div className="ps-widget__header">
                            <ProfileImage auth={this.props.auth} />
                            <figure>
                                <figcaption>Hello</figcaption>
                                <p>{user_first_name}</p>
                            </figure>
                        </div>
                        <div className="ps-widget__content">
                            <ul className="ps-list--user-links">
                                {accountLinks.map((link) =>
                                    link.url !== '' ? (
                                        <li
                                            key={link.text}
                                            className={
                                                link.active ? 'active' : ''
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
                                    ) : (
                                        <li
                                            key={link.text}
                                            onClick={
                                                link.text ===
                                                'Arivanna Chat/Customers'
                                                    ? this.props
                                                          .handleToggelChat
                                                    : this.props
                                                          .handleToggelChatbot
                                            }
                                            className={
                                                link.active ? 'active' : ''
                                            }>
                                            <a>
                                                <i className={link.icon}></i>
                                                {link.text}
                                            </a>
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>
                    </aside>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state.auth;
};

const mapDispatchToProps = (dispatch) => ({
    handleToggelChat: () => dispatch(chat()),
    handleToggelChatbot: () => dispatch(toggelChatbot()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withAuth(AccountMenuSidebar, AccessLevel.USER_ACCESS_LEVEL));

import { connect } from 'react-redux';

import React from 'react';

import { Spin } from 'antd';
import { Component } from 'react';
import axios from 'axios';

import { chat } from '../../../store/setting/action';
import { CometChat } from '@cometchat-pro/chat';
import { CometChatUI } from './controller/components/index';
const authkey = process.env.chatAuthkey;
const apiKey = process.env.chatapikey;
const id = process.env.chatAppId;
import { notification } from 'antd';

class CometChatNoSSR extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: undefined,
        };
    }

    openNotification = () => {
        const args = {
            message: 'Somethings Went Wrong',
            description: 'Reloading Chat!',
            duration: 3,
        };
        notification.open(args);
    };
    loginUser = async () => {
        CometChat.login(`${this.props.auth.id_user}`, authkey).then(
            (user) => {
                console.log('Login Successful:', { user });
            },
            (error) => {}
        );
    };

    logoutUser() {
        CometChat.logout().then(() => {});
    }

    createUser = async () => {
        await axios({
            method: 'post',
            url: 'https://api-eu.cometchat.io/v3.0/users',
            headers: {
                Accept: 'application/json',
                appId: id,
                apiKey: apiKey,
                'Content-Type': 'application/json',
            },
            params: {
                uid: `${this.props.auth.id_user}`,
                name: `${this.props.auth.user_first_name}`,
            },
        })
            .then((res) => {
                this.loginUser();
            })
            .catch((err) => {});
    };

    checkUserExist = async () => {
        CometChat.getLoggedinUser()
            .then((user) => {
                this.loginUser();
            })
            .catch((error) => {
                this.createUser();
            });
    };

    componentDidMount() {
        if (!CometChat.isInitialized()) {
            let appSetting = new CometChat.AppSettingsBuilder()
                .subscribePresenceForAllUsers()
                .setRegion('eu')
                .build();
            CometChat.init(id, appSetting)
                .then(() => {
                    this.checkUserExist();
                })
                .catch((e) => {
                    CometChat.init(id, appSetting);
                });
        } else this.checkUserExist();
    }

    // componentDidUpdate(props, state) {
    //     if (props.setting.chatHide === false) {
    //         // this.logoutUser();
    //     } else {
    //         this.checkUserExist();
    //     }
    // }

    render() {
        return (
            <div
                className={`${
                    this.props.setting.chatHide
                        ? 'ps-chatbot-hidden'
                        : 'ps-chatbot-show'
                } ps-chat ps-chatbot-screen`}>
                <div className={'ps-chatbot-header'}>
                    <span>Arivanna Chat/Customers care</span>
                    <div>
                        <span>
                            <button onClick={this.props.handleToggelChat}>
                                -
                            </button>
                            <button onClick={this.props.handleToggelChat}>
                                X
                            </button>
                        </span>
                    </div>
                </div>
                <div
                    className="ps-chatbot-form-container"
                    style={{
                        width: '930px',
                        height: '400px',
                    }}>
                    <CometChatUI />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        setting: state.setting,
    };
};
const mapDispatchToProps = (dispatch) => ({
    handleToggelChat: () => dispatch(chat()),
});
export default connect(mapStateToProps, mapDispatchToProps)(CometChatNoSSR);

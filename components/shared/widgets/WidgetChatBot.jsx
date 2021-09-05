import React, { useState } from 'react'
import { connect } from 'react-redux'
import { DatePicker, Form, Input, Radio, notification, Select, Spin, Button } from 'antd';
import { toggelChatbot } from '~/store/setting/action';
import api from '~/api/handler';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 20, color: "white" }} spin />;

export const WidgetChatBot = (props) => {
    const [user_first_name, setFirstName] = useState('');
    const [user_last_name, setLastName] = useState('');
    const [user_phone_number, setPhoneNo] = useState('');
    const [user_email, setAddress] = useState('');
    const [order_number, setOrderNumber] = useState('');
    const [loading, setLoading] = useState(false);

    const submitForm = async () => {
        let data = {
            user_first_name,
            user_last_name,
            user_phone_number,
            user_email,
            order_number
        }

        const route = 'user_live_help_request';
        setLoading(true);
        await api.handler
            .api_post(data, route)
            .then((response) => {
                setLoading(false);
                notification['success']({
                    message: "Request Submitted",
                    description: "Request Send you'll be contacted as soon as possible!",
                });
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
                notification['error']({
                    message: "Error",
                    description: "Please try later!",
                });
            })
    }

    return (
        <div className={`${props.chatbotHide ? "ps-chatbot-hidden" : "ps-chatbot-show"} ps-chatbot ps-chatbot-screen`}>
            <div className="ps-chatbot-header">
                <span>Live Help</span>
                <div>
                    <span>
                        <button onClick={props.handleToggelChatbot}> - </button>
                        <button onClick={props.handleToggelChatbot}> X </button>

                    </span>
                </div>
            </div>
            <div className="ps-chatbot-form-container">
                <Form
                    onFinish={submitForm}
                    className="ps-form--account-setting"
                    fields={[

                        {
                            name: ['first_name'],
                            value: user_first_name,
                        },
                        {
                            name: ['last_name'],
                            value: user_last_name,
                        },
                        {
                            name: ['phone_no'],
                            value: user_phone_number,
                        },
                        {
                            name: ['address'],
                            value: user_email,
                        },
                        {
                            name: ['order_number'],
                            value: order_number,
                        }
                    ]}>


                    <div className="row">
                        <div className="col-sm-6">
                            <div>
                                <Form.Item
                                    // name="first_name"
                                    className="ps-forced-margin"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input first name!',
                                        },
                                    ]}>
                                    <span style={{ color: "red" }}>*<span style={{ color: "black" }}>First Name</span></span>

                                    <Input
                                        type="text"
                                        placeholder="First Name"
                                        onChange={(e) =>
                                            setFirstName(e.target.value)
                                        }
                                    />
                                </Form.Item>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div>
                                <Form.Item
                                    // name="last_name"
                                    className="ps-forced-margin"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input last name!',
                                        },
                                    ]}>
                                    <span style={{ color: "red" }}>*<span style={{ color: "black" }}>Last Name</span></span>

                                    <Input
                                        type="text"
                                        placeholder="Last Name"
                                        onChange={(e) =>
                                            setLastName(e.target.value)
                                        }
                                    />
                                </Form.Item>
                            </div>
                        </div>
                        <div className="col-sm-12">
                            <div>
                                <Form.Item 
                                // name="address"
                                    className="ps-forced-margin"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input Email!',
                                        },
                                    ]}
                                >
                                    <span style={{ color: "red" }}>*<span style={{ color: "black" }}>Email</span></span>

                                    <Input
                                        type="text"
                                        placeholder="Email"
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
                                </Form.Item>
                            </div>
                        </div>
                        <div className="col-sm-12">
                            <div>
                                <Form.Item 
                                // name="phone_no"
                                    className="ps-forced-margin"
                                >
                                    <span style={{ color: "red" }}><span style={{ color: "black" }}>Phone Number</span></span>
                                    <Input
                                        type="text"
                                        placeholder="Phone Number"
                                        onKeyPress={(event) => {
                                            if (!/[0-9]/.test(event.key)) {
                                                event.preventDefault();
                                            }
                                        }}
                                        onChange={(e) => setPhoneNo(e.target.value)}
                                    />
                                </Form.Item>
                            </div>
                        </div>
                        <div className="col-sm-12">
                            <div>
                                <Form.Item 
                                // name="order_number"
                                    className="ps-forced-margin"
                                >
                                    <span style={{ color: "red" }}> <span style={{ color: "black" }}>Order Number</span></span>
                                    <Input
                                        type="text"
                                        placeholder="order_number"
                                        onChange={(e) => setOrderNumber(e.target.value)}
                                    />
                                </Form.Item>
                            </div>
                        </div>

                    </div>
                    <div className="row ps-chatbot-button-cotainer">
                            <button type="submit" className={`ps-btn-chatbot ps-chatbot-button ${props.chatbotHide ? "ps-close-height" : ""}`}>
                                {loading === false ? (
                                    'START'
                                ) : (
                                    <>
                                        <Spin indicator={antIcon} /> Submitting...
                                    </>
                                )}
                            </button>
                        </div>
                </Form>

            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return state.setting;
};

const mapDispatchToProps = (dispatch) => ({
    handleToggelChatbot: () => dispatch(toggelChatbot()),
}
);


export default connect(mapStateToProps, mapDispatchToProps)(WidgetChatBot);

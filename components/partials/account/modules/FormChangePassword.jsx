import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Form, Input } from 'antd';
import { notification, Spin } from 'antd';
import api from '../../../../api/handler';

const FormChangePassword = ({ id_user, token }) => {
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const data = {
                token,
                user_old_password: formData.currentPassword,
                user_new_password: formData.newPassword,
            };

            const route = `user_change_password`;

            const response = await api.handler.api_post(data, route);

            if (response.success) {
                notification['success']({
                    message: `${response.data.message}`,
                    description: 'Your password has been successfully updated!',
                });
            } else {
                notification['error']({
                    message: `${response.data}`,
                    description: 'Password update failed!',
                });
            }
            setLoading(false);
        } catch (error) {
            notification['error']({
                message: 'Something went wrong',
                description: 'Password update failed!',
            });
            setLoading(false);
        }
    };
    return (
        <Form className="ps-Form--account-setting" onFinish={handleSubmit}>
            <div className="ps-form__content">
                <div className="form-group">
                    <Form.Item
                        // name="currentPassword"
                        rules={[
                            {
                                required: true,
                                message: 'please enter your current password',
                            },
                        ]}>
                        <Input.Password
                            name="currentPassword"
                            value={formData.currentPassword}
                            className="form-control"
                            type="password"
                            placeholder="Current Password"
                            onChange={handleChange}
                        />
                    </Form.Item>
                </div>
                <div className="form-group">
                    <Form.Item
                        // name="newPassword"
                        rules={[
                            {
                                required: true,
                                message: 'please enter your new password',
                            },
                        ]}>
                        <Input.Password
                            name="newPassword"
                            value={formData.newPassword}
                            className="form-control"
                            type="password"
                            placeholder="New Password"
                            onChange={handleChange}
                        />
                    </Form.Item>
                </div>

                <div className="form-group">
                    <Form.Item
                        // name="confirmPassword"
                        dependencies={['newPassword']}
                        rules={[
                            {
                                required: true,
                                message: 'please confirm your password',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (
                                        !value ||
                                        getFieldValue('newPassword') === value
                                    ) {
                                        return Promise.resolve();
                                    }

                                    return Promise.reject(
                                        new Error('new passwords do not match!')
                                    );
                                },
                            }),
                        ]}>
                        <Input.Password
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            className="form-control"
                            type="password"
                            placeholder="Confirm New Password"
                            onChange={handleChange}
                        />
                    </Form.Item>
                </div>
                <div className="form-group submit">
                    <button className="ps-btn ps-btn--fullwidth">
                        {loading ? (
                            <>
                                Updating Password... <Spin />
                            </>
                        ) : (
                            'Submit'
                        )}
                    </button>
                </div>
            </div>
        </Form>
    );
};

const mapStateToProps = (state) => {
    return state.auth;
};

export default connect(mapStateToProps)(FormChangePassword);

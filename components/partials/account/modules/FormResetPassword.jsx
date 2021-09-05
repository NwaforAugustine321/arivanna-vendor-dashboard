import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Form, Input } from 'antd';
import { notification, Spin } from 'antd';
import api from '../../../../api/handler';
import UserInformationRepository from '../../../../repositories/UserInformationRepository';
import { useRouter } from 'next/router';

const FormResetPassword = ({ token }) => {

    const router = useRouter();

    const [formData, setFormData] = useState({
        newPassword: '',
        confirmPassword: '',
    });
    const [loading, setLoading] = useState(false);

    const handleChangeField = ({ target: { name, value: input } }) => {
        setFormData({ ...formData, [name]: input });
    };

    const handleSubmitForm = () => {

        setLoading(true);

        UserInformationRepository.resetPassword({
            token,
            user_old_password: formData.currentPassword,
            user_new_password: formData.newPassword,
        })
            .then((result) => {
                if (result.success) {
                    notification['success']({
                        message: 'Success',
                        description:
                            'Your password has been successfully updated!',
                    });

                    router.push('/account/login');
                } else {
                    notification['error']({
                        message: 'Failed',
                        description: 'Password reset failed!',
                    });
                }
            })
            .catch((error) => {
                notification['error']({
                    message: 'Failed',
                    description: 'Password reset failed!',
                });
            })
            .finally(() => {
                setLoading(false);
            });
    };
    return (
        <Form aria-disabled={loading} className="ps-Form--account-setting" onFinish={handleSubmitForm}>
            <div className="ps-form__content">
                <div className="form-group">
                    <Form.Item
                        name="newPassword"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your new password',
                            },
                        ]}>
                        <Input.Password
                            name="newPassword"
                            value={formData.newPassword}
                            className="form-control"
                            type="password"
                            placeholder="New Password"
                            onChange={handleChangeField}
                        />
                    </Form.Item>
                </div>

                <div className="form-group">
                    <Form.Item
                        name="confirmPassword"
                        dependencies={['newPassword']}
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password',
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
                                        new Error('New passwords do not match!')
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
                            onChange={handleChangeField}
                        />
                    </Form.Item>
                </div>
                <div className="form-group submit">
                    <button disabled={loading} className="ps-btn ps-btn--fullwidth">
                        {loading ? (
                            <>
                                Resetting Password... <Spin />
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

export default FormResetPassword;

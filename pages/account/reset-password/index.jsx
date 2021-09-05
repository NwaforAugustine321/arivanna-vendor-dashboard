import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import ContainerPage from '~/components/layouts/ContainerPage';
import ResetPassword from '../../../components/partials/account/ResetPassword';

const ResetPasswordPage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Reset Password',
        },
    ];
    return (
        <ContainerPage title="Reset Password" boxed={true}>
            <div className="ps-page--my-account">
                <BreadCrumb breacrumb={breadCrumb} />
                <ResetPassword />
            </div>
        </ContainerPage>
    );
};

export default ResetPasswordPage;

import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import ChangePassword from '~/components/partials/account/ChangePassword';
import ContainerPage from '~/components/layouts/ContainerPage';

const ChangePasswordPage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Change Password',
        },
    ];
    return (
        <ContainerPage title="Change Password" boxed={true}>
            <div className="ps-page--my-account">
                <BreadCrumb breacrumb={breadCrumb} />
                <ChangePassword />
            </div>
        </ContainerPage>
    );
};

export default ChangePasswordPage;

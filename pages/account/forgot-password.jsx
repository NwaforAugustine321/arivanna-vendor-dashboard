import React from 'react';

import BreadCrumb from '~/components/elements/BreadCrumb';
import ForgotPassword from '~/components/partials/account/ForgotPassword';
import ContainerPage from '~/components/layouts/ContainerPage';
import withAuth from '~/components/hoc/RouteAuth';
import { AccessLevel } from '~/utilities/constant-class';

const ForgotPassPage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Forgot Password',
        },
    ];
    return (
        <ContainerPage title="Forgot Password" boxed={true}>
            <div className="ps-page--my-account">
                <BreadCrumb breacrumb={breadCrumb} />
                <ForgotPassword />
            </div>
        </ContainerPage>
    );
};

export default ForgotPassPage;

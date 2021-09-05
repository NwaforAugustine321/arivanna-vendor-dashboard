import React from 'react';

import BreadCrumb from '~/components/elements/BreadCrumb';
import Login from '~/components/partials/account/Login';
import ContainerPage from '~/components/layouts/ContainerPage';
import withAuth from '~/components/hoc/RouteAuth';
import { AccessLevel } from '~/utilities/constant-class';

const LoginPage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Login',
        },
    ];
    return (
        <ContainerPage title="Login" boxed={true}>
            <div className="ps-page--my-account">
                <BreadCrumb breacrumb={breadCrumb} />
                <Login />
            </div>
        </ContainerPage>
    );
};

export default LoginPage;
// export default withAuth(LoginPage, AccessLevel.PUBLIC_ACCESS_LEVEL);

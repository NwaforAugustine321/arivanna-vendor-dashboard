import React from 'react';
import OpenOrder from '~/components/partials/account/OpenOrder';
import BreadCrumb from '~/components/elements/BreadCrumb';
import ContainerPage from '~/components/layouts/ContainerPage';
import withAuth from '~/components/hoc/RouteAuth';
import { AccessLevel } from '~/utilities/constant-class';

const OpenOrderPage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Open Order',
        },
    ];
    return (
        <ContainerPage title="Open Order" boxed={true}>
            <div className="ps-page--simple">
                <BreadCrumb breacrumb={breadCrumb} />
                <OpenOrder />
            </div>
        </ContainerPage>
    );
};

export default withAuth(OpenOrderPage, AccessLevel.USER_ACCESS_LEVEL);

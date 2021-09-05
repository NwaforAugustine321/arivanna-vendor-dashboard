import React from 'react';
import DigitalOrders from '~/components/partials/account/DigitalOrders';
import BreadCrumb from '~/components/elements/BreadCrumb';
import ContainerPage from '~/components/layouts/ContainerPage';
import withAuth from '~/components/hoc/RouteAuth';
import { AccessLevel } from '~/utilities/constant-class';

const LocalStoreOrdersPage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Local Store Orders',
        },
    ];
    return (
        <ContainerPage title="Local Store Orders" boxed={true}>
            <div className="ps-page--simple">
                <BreadCrumb breacrumb={breadCrumb} />
                <DigitalOrders />
            </div>
        </ContainerPage>
    );
};

export default withAuth(LocalStoreOrdersPage, AccessLevel.USER_ACCESS_LEVEL);

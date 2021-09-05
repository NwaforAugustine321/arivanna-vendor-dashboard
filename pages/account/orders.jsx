import React from 'react';
import Orders from '~/components/partials/account/Orders';
import ManageOrders from '~/components/partials/account/ManageOrders';
import BreadCrumb from '~/components/elements/BreadCrumb';
import ContainerPage from '~/components/layouts/ContainerPage';
import withAuth from '~/components/hoc/RouteAuth';
import { AccessLevel } from '~/utilities/constant-class';

const OrdersPage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Orders',
        },
    ];
    return (
        <ContainerPage title="Orders" boxed={true}>
            <div className="ps-page--simple">
                <BreadCrumb breacrumb={breadCrumb} />
                <ManageOrders />
            </div>
        </ContainerPage>
    );
};

export default withAuth(OrdersPage, AccessLevel.USER_ACCESS_LEVEL);

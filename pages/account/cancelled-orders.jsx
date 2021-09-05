import React from 'react';
import CancelledOrders from '~/components/partials/account/CancelledOrders';
import BreadCrumb from '~/components/elements/BreadCrumb';
import ContainerPage from '~/components/layouts/ContainerPage';
import withAuth from '~/components/hoc/RouteAuth';
import { AccessLevel } from '~/utilities/constant-class';

const CancelledOrderPage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Cancelled Orders',
        },
    ];
    return (
        <ContainerPage title="Cancelled Orders" boxed={true}>
            <div className="ps-page--simple">
                <BreadCrumb breacrumb={breadCrumb} />
                <CancelledOrders />
            </div>
        </ContainerPage>
    );
};

export default withAuth(CancelledOrderPage, AccessLevel.USER_ACCESS_LEVEL);

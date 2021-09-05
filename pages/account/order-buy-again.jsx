import React from 'react';
import OrderBuyAgain from '~/components/partials/account/OrderBuyAgain';
import BreadCrumb from '~/components/elements/BreadCrumb';
import ContainerPage from '~/components/layouts/ContainerPage';
import withAuth from '~/components/hoc/RouteAuth';
import { AccessLevel } from '~/utilities/constant-class';

const OrderBuyAgainPge = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Buy Again',
        },
    ];
    return (
        <ContainerPage title="Buy Again" boxed={true}>
            <div className="ps-page--simple">
                <BreadCrumb breacrumb={breadCrumb} />
                <OrderBuyAgain />
            </div>
        </ContainerPage>
    );
};

export default withAuth(OrderBuyAgainPge, AccessLevel.USER_ACCESS_LEVEL);

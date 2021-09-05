import React from 'react';
import OrderDetailPage from '../../../components/partials/account/Order-detail';
import ContainerPage from '~/components/layouts/ContainerPage';
import BreadCrumb from '~/components/elements/BreadCrumb';

const OrderDetail = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Orders',
            url: '/account/orders',
        },
        {
            text: 'Order detail',
        },
    ];
    return (
        <ContainerPage title="Digital Orders" boxed={true}>
            <div className="ps-page--simple">
                <BreadCrumb breacrumb={breadCrumb} />
                <OrderDetailPage />
            </div>
        </ContainerPage>
    );
};

export default OrderDetail;

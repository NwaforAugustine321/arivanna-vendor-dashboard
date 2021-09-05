import React from 'react';
import DigitalOrders from '~/components/partials/account/DigitalOrders';
import BreadCrumb from '~/components/elements/BreadCrumb';
import ContainerPage from '~/components/layouts/ContainerPage';
import withAuth from '~/components/hoc/RouteAuth';
import { AccessLevel } from '~/utilities/constant-class';

const DigitalOrdersPage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Digital Orders',
        },
    ];
    return (
        <ContainerPage title="Digital Orders" boxed={true}>
            <div className="ps-page--simple">
                <BreadCrumb breacrumb={breadCrumb} />
                <DigitalOrders />
            </div>
        </ContainerPage>
    );
};

export default withAuth(DigitalOrdersPage, AccessLevel.USER_ACCESS_LEVEL);

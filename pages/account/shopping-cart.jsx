import React from 'react';

import BreadCrumb from '~/components/elements/BreadCrumb';
import ShoppingCart from '~/components/partials/account/ShoppingCart';
import ContainerPage from '~/components/layouts/ContainerPage';
import withAuth from '~/components/hoc/RouteAuth';
import { AccessLevel } from '~/utilities/constant-class';
const ShoppingCartPage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Shopping Cart',
        },
    ];
    return (
        <ContainerPage title="Shopping Cart" boxed={true}>
            <div className="ps-page--simple">
                <BreadCrumb breacrumb={breadCrumb} />
                <ShoppingCart />
            </div>
        </ContainerPage>
    );
};

export default withAuth(ShoppingCartPage, AccessLevel.USER_ACCESS_LEVEL);

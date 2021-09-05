import React from 'react'
import Shipping from '~/components/partials/account/Shipping';
import BreadCrumb from '~/components/elements/BreadCrumb';
import ContainerPage from '~/components/layouts/ContainerPage';

const Shippings = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Shipping Information',
        },
    ];
    return (
        <ContainerPage title="Shipping Information">
            <div className="ps-page--shipping-information">
                <BreadCrumb breacrumb={breadCrumb} />
                <Shipping />
            </div>
        </ContainerPage>
    );
};

export default Shippings;

import React from 'react'
import BreadCrumb from '~/components/elements/BreadCrumb';
import ContainerPage from '~/components/layouts/ContainerPage';
import Donate from '~/components/partials/account/Donate';

const Shippings = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Donation Information',
        },
    ];
    return (
        <ContainerPage title="Shipping Information">
            <div className="ps-page--shipping-information">
                <BreadCrumb breacrumb={breadCrumb} />
                <Donate />
            </div>
        </ContainerPage>
    );
};

export default Shippings;

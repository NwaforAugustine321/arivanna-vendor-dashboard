import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import Donate from '~/components/partials/donate/Index';
import ContainerPage from '~/components/layouts/ContainerPage';
import withAuth from '~/components/hoc/RouteAuth';
import { AccessLevel } from './../../utilities/constant-class';

const DonatePage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Donate',
        },
    ];

    return (
        <ContainerPage title="Donation" boxed={true}>
            <div className="ps-page--single">
                <BreadCrumb breacrumb={breadCrumb} />
                <Donate />
            </div>
        </ContainerPage>
    );
};
export default withAuth(DonatePage, AccessLevel.USER_ACCESS_LEVEL);

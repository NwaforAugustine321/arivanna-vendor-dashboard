import React from 'react';

import BreadCrumb from '~/components/elements/BreadCrumb';
import Referral from '~/components/partials/account/Referral';
import ContainerPage from '~/components/layouts/ContainerPage';
import withAuth from '~/components/hoc/RouteAuth';
import { AccessLevel } from '~/utilities/constant-class';

const ReferralPage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Get referral code',
        },
    ];
    return (
        <ContainerPage title="Get Referral Code" boxed={true}>
            <div className="ps-page--my-account">
                <BreadCrumb breacrumb={breadCrumb} />
                <Referral />
            </div>
        </ContainerPage>
    );
};

export default withAuth(ReferralPage, AccessLevel.USER_ACCESS_LEVEL);

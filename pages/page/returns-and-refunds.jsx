import React from 'react';

import BreadCrumb from '~/components/elements/BreadCrumb';
import ContainerPage from '~/components/layouts/ContainerPage';
import withAuth from '~/components/hoc/RouteAuth';
import { AccessLevel } from '../../utilities/constant-class';
import ReturnsAndRefund from '~/components/partials/page/returns-and-refund/ReturnsAndRefund';
import FAQs from '~/components/partials/page/returns-and-refund/FAQs';

const ReturnsAndRefundPage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Returns and Refunds',
        },
    ];
    return (
        <ContainerPage title="Returns and refunds" boxed={true}>
            <div className="ps-page--single">
                <BreadCrumb breacrumb={breadCrumb} />
                <ReturnsAndRefund />
                <FAQs />
            </div>
        </ContainerPage>
    );
};
export default withAuth(ReturnsAndRefundPage, AccessLevel.ALWAYS_ACCESS_LEVEL);

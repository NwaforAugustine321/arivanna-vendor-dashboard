import React from 'react';

import BreadCrumb from '~/components/elements/BreadCrumb';
import BugReport from '~/components/partials/account/BugReport';
import ContainerPage from '~/components/layouts/ContainerPage';
import withAuth from '~/components/hoc/RouteAuth';
import { AccessLevel } from '~/utilities/constant-class';

const BugReportPage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Bug Report',
        },
    ];
    return (
        <ContainerPage title="BugReport" boxed={true}>
            <div className="ps-page--my-account">
                <BreadCrumb breacrumb={breadCrumb} />
                <BugReport />
            </div>
        </ContainerPage>
    );
};

export default BugReportPage;
// export default withAuth(BugReportPage, AccessLevel.PUBLIC_ACCESS_LEVEL);

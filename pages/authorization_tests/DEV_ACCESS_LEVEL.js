import React from 'react';
import ContainerPage from '~/components/layouts/ContainerPage';
import BreadCrumb from '~/components/elements/BreadCrumb';
import VendorBanner from '~/components/partials/vendor/VendorBanner';
import VendorAbout from '~/components/partials/vendor/VendorAbout';
import VendorMileStone from '~/components/partials/vendor/VendorMileStone';
import VendorBestFees from '~/components/partials/vendor/VendorBestFees';
import VendorTestimonials from '~/components/partials/vendor/VendorTestimonials';
import VendorFaqs from '~/components/partials/vendor/VendorFaqs';
import withAuth from '~/components/hoc/RouteAuth';
import { AccessLevel } from '~/utilities/constant-class';
const BecomeAVendorPage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Become a Vendor',
        },
    ];

    return (
        <ContainerPage title="Become a vendor" boxed={true}>
            <div className="ps-page--single">
                <BreadCrumb breacrumb={breadCrumb} />
                DEV_ACCESS_LEVEL
                <VendorBanner />
                <VendorAbout />
                <VendorMileStone />
                <VendorBestFees />
                <VendorTestimonials />
                <VendorFaqs />
                <VendorBanner />
            </div>
        </ContainerPage>
    );
};

//export default BecomeAVendorPage;
export default withAuth(BecomeAVendorPage, AccessLevel.DEV_ACCESS_LEVEL);

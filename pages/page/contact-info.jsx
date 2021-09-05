import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import ContactCustomerService from '~/components/partials/page/ContactCustomerService';
import ContainerPage from '~/components/layouts/ContainerPage';
import withAuth from '~/components/hoc/RouteAuth';
import { AccessLevel } from '~/utilities/constant-class';
const ContactUsPage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Contact Information',
        },
    ];

    return (
        <ContainerPage title="Contact Us" boxed={true}>
            <div className="ps-page--single" id="contact-info">
                <BreadCrumb breacrumb={breadCrumb} />
                <ContactCustomerService />
            </div>
        </ContainerPage>
    );
};

export default withAuth(ContactUsPage, AccessLevel.ALWAYS_ACCESS_LEVEL);

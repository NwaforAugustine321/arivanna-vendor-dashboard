import React, { useEffect } from 'react';
import ContainerDefault from '~/components/layouts/ContainerDefault';
import HeaderDashboard from '~/components/shared/headers/HeaderDashboard';
import { connect, useDispatch } from 'react-redux';
import { CheckLoginStatus } from '~/store/auth/action';
import withAuth from '~/components/hoc/withAuth';
import FormDonation from '~/components/shared/forms/FormDonation';

const DonationsPage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(CheckLoginStatus());
    }, []);
    return (
        <ContainerDefault title="Donations">
            <HeaderDashboard title="Donations" description="Arivanna Donations" />
            <section className="ps-dashboard ps-items-listing">
                <div className="ps-card__content w-100">
                    <FormDonation /> 
                </div>
                <div className="ps-section__right"></div>
            </section>
        </ContainerDefault>
    );
};
export default withAuth(connect((state) => state.app)(DonationsPage));

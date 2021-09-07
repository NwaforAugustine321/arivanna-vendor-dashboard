import React, { useEffect } from 'react';
import ContainerDefault from '~/components/layouts/ContainerDefault';
import HeaderDashboard from '~/components/shared/headers/HeaderDashboard';
import { connect, useDispatch } from 'react-redux';
import { CheckLoginStatus } from '~/store/auth/action';
// import withAuth from '~/components/hoc/withAuth';
import FormDonation from '~/components/shared/forms/FormBug';

const FormBug = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(CheckLoginStatus());
    }, []);
    return (
        <ContainerDefault title="Report Bug">
            <HeaderDashboard title="Report Bug" description="Arivanna Bug Report" />
            <section className="ps-dashboard ps-items-listing">
                <div className="ps-section__left">
                    <section className="ps-card">
                        <div className="ps-card__content">
                             <FormDonation /> 
                        </div>
                    </section>
                </div>
                <div className="ps-section__right"></div>
            </section>
        </ContainerDefault>
    );
};
export default (connect((state) => state.app)(FormBug));
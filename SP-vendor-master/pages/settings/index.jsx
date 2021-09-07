import React, { useEffect } from 'react';
import ContainerDefault from '~/components/layouts/ContainerDefault';
import FormAccountSettings from '~/components/shared/forms/FormAccountSettings';
import HeaderDashboard from '~/components/shared/headers/HeaderDashboard';
import { connect, useDispatch } from 'react-redux';
import { CheckLoginStatus } from '~/store/auth/action';
import withAuth from '~/components/hoc/withAuth';

const SettingsPage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(CheckLoginStatus());
    }, []);
    return (
        <ContainerDefault title="Settings">
            <HeaderDashboard title="Settings" description="Arivanna Settings" />
            <section className="ps-dashboard ps-items-listing">
                <div className="ps-section__left">
                    <section className="ps-card">
                        <div className="ps-card__header">
                            <h4>Account Settings</h4>
                        </div>
                        <div className="ps-card__content">
                            <FormAccountSettings />
                        </div>
                    </section>
                </div>
                <div className="ps-section__right"></div>
            </section>
        </ContainerDefault>
    );
};
export default withAuth(connect((state) => state.app)(SettingsPage));

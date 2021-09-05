import React from 'react';
import { AccessLevel } from '~/utilities/constant-class';
import withAuth from '~/components/hoc/RouteAuth';
import FormChangePassword from './modules/FormChangePassword';
import AccountMenuSidebar from './modules/AccountMenuSidebar';
import accountLinks from './accountlinks'

const ChangePassword = ({ id_user, token }) => {
   
    return (
        <section className="ps-my-account ps-page--account">
            <div className="container">
                <div className="row">
                 
                    <AccountMenuSidebar />
                    
                    <div className="col-lg-5 col-sm-8">
                        <div className="ps-page__content">
                            <div className="ps-section--account-setting">
                                <div className="ps-section__header">
                                    <h3>Change Password</h3>
                                </div>
                                <div className="ps-section__content">
                                    <FormChangePassword />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ChangePassword;

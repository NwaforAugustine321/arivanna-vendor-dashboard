import React from 'react'
import Payment from '~/components/partials/account/Payment';
import BreadCrumb from '~/components/elements/BreadCrumb';
import ContainerPage from '~/components/layouts/ContainerPage';
import PaymentDonate from '../../components/partials/account/PaymentDonate';

//  const Payments=()=>
//  {    
//      return(
//      <Payment/>
//      )
//  }
//   export default Payments
  const Payments = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: 'account/paymentDOnate',
        },
        {
            text: 'Donate',
        },
    ];
    return (
        <ContainerPage title="Payment">
            <div className="ps-page--Payments">
                <BreadCrumb breacrumb={breadCrumb} />
                <PaymentDonate />
            </div>
        </ContainerPage>
    );
};

export default Payments;
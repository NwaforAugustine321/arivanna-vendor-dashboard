import React from 'react'
import Payment from '~/components/partials/account/Payment';
import BreadCrumb from '~/components/elements/BreadCrumb';
import ContainerPage from '~/components/layouts/ContainerPage';

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
            url: 'account/payment',
        },
        {
            text: 'payment',
        },
    ];
    return (
        <ContainerPage title="Payment">
            <div className="ps-page--Payments">
                <BreadCrumb breacrumb={breadCrumb} />
                <Payment />
            </div>
        </ContainerPage>
    );
};

export default Payments;
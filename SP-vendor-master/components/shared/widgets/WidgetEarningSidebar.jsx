import React, { useState, useEffect } from 'react';
import VendorOrderRepository from "~/repositories/VendorOrderRepository";

const WidgetEarningSidebar = ({currency}) => {
  // console.log(currency)
  const [earnings, setEarnings] = useState(0);

    useEffect(() => {
        getEarnings();
    }, []);

    async function getEarnings() {
        let tempEarnings = 0;

        //__getVendorEarnings__
        let allOrdersResponse = await VendorOrderRepository.getAllOrders();
        if (allOrdersResponse) {
            allOrdersResponse.data.forEach(order => {
                if (order.isPaid === 1) {
                    tempEarnings += order.total * order.quantity;
                }
            });
            // format earnings to currency
            setEarnings(tempEarnings);
        }
    }

  return (
    <div className='ps-block--earning-count-wrapper'>
      <div className="ps-block--earning-count">
        <small>Total Earnings</small>
        <h3>{formatCurrency(earnings, currency)}</h3>
      </div>

      <CurrencyDropdown currency/>
    </div>
  );
};

export default WidgetEarningSidebar;


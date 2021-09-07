import React from "react";

const ModuleOrderBillingInformation = ({ paymentMethod, status }) => {
  return (
    <div className="ps-card ps-card--order-information ps-card--small">
      <div className="ps-card__header">
        <h4>Billing Information</h4>
      </div>
      <div className="ps-card__content">
        <p>
          <strong>Payment Type:</strong> {paymentMethod}
        </p>
        <p>
          <strong>Status:</strong> {status}
        </p>

        {/* <p>
					<strong>Provider:</strong> **** **** **** *2121
				</p>
				<p>
					<strong>Valid Date:</strong> 02-2025
				</p> */}
      </div>
    </div>
  );
};

export default ModuleOrderBillingInformation;

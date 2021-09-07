import React from 'react';

const ModuleOrderShippingInformation = ({ order }) => {
    return (
        <div className="ps-card ps-card--order-information ps-card--small">
            <div className="ps-card__header">
                <h4>Shipping Information</h4>
            </div>
            <div className="ps-card__content">
                <h5>
                    {order?.user_first_name} {order?.user_last_name}
                </h5>
                <p>
                    <strong>Address:</strong> {order?.user_address_shipping}
                </p>
                <p>
                    <strong>Phone No.:</strong> {order?.user_phone_number}
                </p>
                <p>
                    <strong>Email:</strong> {order?.user_email}
                </p>
            </div>
        </div>
    );
};

// export default withAuth(connect((state) => state.app)(ModuleOrderShippingInformation));
export default ModuleOrderShippingInformation;

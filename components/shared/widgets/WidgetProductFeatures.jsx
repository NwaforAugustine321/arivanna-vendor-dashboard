import React from 'react';
import NoShipping from '../../elements/products/NoShipping';

const WidgetProductFeatures = ({ isShippingAvailable }) => {
    return (
        <aside className="widget widget_product widget_features">
            {isShippingAvailable ? (
                <>
                    <p hidden>
                        <i className="icon-network"></i> Shipping worldwide
                    </p>
                    <p>
                        <i className="icon-3d-rotate"></i> 30 day returns if your not 100% satisfied! (See returns policy)
                    </p>
                    <p>
                        <i className="icon-receipt"></i> 100% Safe transaction 
                    </p>
                    <p>
                        <i className="icon-credit-card"></i> Paypal Gateway & Credit/Debit Card
                    </p>
                </>
            ) : (
                <NoShipping />
            )}
        </aside>
    );
};

export default WidgetProductFeatures;

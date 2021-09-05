import React from 'react';

function NoShipping() {
    return (
        <div className="shipping-unavailable-location">
            <p>
                <i className="icon-network"></i> Shipping not available to your
                country for this product!
            </p>
        </div>
    );
}

export default NoShipping;

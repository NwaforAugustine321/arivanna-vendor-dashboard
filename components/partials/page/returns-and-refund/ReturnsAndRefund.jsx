import React from 'react';
import GiftReturns from './GiftReturns';
import ManageReturns from './ManageReturns';
import ReturnGuidlines from './ReturnGuidlines';

const ReturnsAndRefund = () => (
    <div className="container">
        <div className="ps-section__action">
            <div className="ps-section__main">
                <ReturnGuidlines />
            </div>
            <div className="ps-section__side">
                <ManageReturns />
            </div>
        </div>
    </div>
);

export default ReturnsAndRefund;

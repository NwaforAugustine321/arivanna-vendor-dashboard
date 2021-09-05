import React from 'react';

const GiftReturns = () => (
    <div className="ps-gift-returns">
        <div className="ps-section__header">
            <h3>Gift Returns</h3>
        </div>
        <div className="ps-section__content">
            <p>
                Order number e.g 123-1234567-1234567{' '}
                <div className="ps-demo-unveil">
                    <a href="#">Where to find this?</a>
                    <div className="ps-eureka">
                        <h3>Where to find this?</h3>
                        <p>
                            The order number or order ID is a 17-digit code
                            found on the packing slip that came with your item
                        </p>

                        <img
                            src="/static/img/amazon.png"
                            alt="Where to get order number"
                        />
                    </div>
                </div>
            </p>
            <form>
                <input
                    type="text"
                    placeholder="Order number (include dashes)"
                />
                <button>Search</button>
            </form>
        </div>
    </div>
);

export default GiftReturns;

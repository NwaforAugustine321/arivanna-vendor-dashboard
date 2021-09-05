import React from 'react';
import Link from 'next/link';

const OpenOrder = () => (
    <div className="ps-order-tracking order-tracking-adjustment">
        <div className="container col-10 auto">
            <div className="row auto mb-5">
                <Link href="/account/profile mr-5">
                    <a><h5 className="order-caption">Your Account </h5></a>
                </Link>
                <Link href="/account/orders">
                    <a><h5 className="order-caption">&#8227; Your Orders </h5></a>
                </Link>
            </div>
            <div className="row order-details mb-5">
                <div><h3>Your Orders</h3></div>
                <div className="ps-search--mobile">
                    <form
                        className="ps-form--search-mobile"
                        action="/"
                        method="get">
                        <div className="form-group--nest">
                            <input
                                className="form-control search-mobile-input-border"
                                type="text"
                                placeholder="Search something..."
                            />
                            <button className="search-orders-text">
                                Search Orders
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="row orders-headers">
                <ul>
                    <li><Link href="/account/orders"><a>Orders</a></Link></li>
                    <li><Link href="/account/order-buy-again"><a>Buy Again</a></Link></li>
                    <li><Link href="/account/open-orders"><a>Open Orders</a></Link></li>
                    <li><Link href="/account/digital-orders"><a>Digital Orders</a></Link></li>
                    <li><Link href="/account/local-store-orders"><a>Local Store Orders</a></Link></li>
                    <li><Link href="/account/cancelled-orders"><a>Cancel Orders</a></Link></li>
                </ul>
            </div>
            <hr className="p-0" />
            <div className="order-in-past mt-5">
                <p>Looking for an order? All of your orders have shipped. 
                    <Link href="/account/orders"><a>View all Orders</a></Link>
                </p>
            </div>
        </div>
    </div>
);

export default OpenOrder;

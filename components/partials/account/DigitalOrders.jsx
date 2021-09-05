import React from 'react';
import Link from 'next/link';

const DigitalOrders = () => (
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
            <div className="mb-5 mt-5">
                0 orders placed in
                <select class="form-select form-select-sm" aria-label=".form-select-sm example">
                    <option selected>past 6 months</option>
                    <option value="1">last 30 days</option>
                    <option value="2">2021</option>
                    <option value="3">2020</option>
                </select>
            </div>
            <div className="order-in-past">
                <p>You have not placed any orders in past 6 months. <Link href="/accounts/orders"><a>View orders in 2021</a></Link></p>
            </div>
        </div>
    </div>
);

export default DigitalOrders;

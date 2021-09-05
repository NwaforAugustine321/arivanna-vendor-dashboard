import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import ManageOrdersTable from './modules/ManageOrdersTable';
import { AccessLevel } from '~/utilities/constant-class';
import withAuth from '~/components/hoc/RouteAuth';
import moment from 'moment';
import { currentYear } from '../../../utilities/common-helpers';
import api from '../../../api/handler';

import ProfileImage from '~/components/shared/ProfileImage';
import AccountMenuSidebar from './modules/AccountMenuSidebar';

class ManageOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id_user: props.id_user,
            orders: '',
            data: null,
            success: false,
            order_count: null,
            check_count: [],
            searchInput: '',
            searchData: null,
            select: false,
            search: false,
        };
    }

    //This handles the dropdown functionality
    receivedData = async () => {
        const data = { token: this.props.token };

        const route = `user/orders`;

        await api.handler.api_post(data, route).then((response) => {
            const data = response.data;

            const dataArray = [];
            dataArray.push(data);

            const newData = dataArray.flat();

            let dateRange;

            const todaysDate = new Date().toISOString();

            const firstDayOfYear = new Date(
                new Date().getFullYear(),
                0,
                1
            ).toISOString();
            const last7Days = moment().subtract(7, 'days').toISOString();

            const last30Days = moment().subtract(30, 'days').toISOString();

            const past3Months = moment().subtract(3, 'months').toISOString();

            //Get the range of dates between two dates
            const getDatesBetweenDates = (startDate, endDate) => {
                const listDate = [];
                const dateMove = new Date(startDate);
                let strDate = startDate;

                while (strDate < endDate) {
                    strDate = dateMove.toISOString().slice(0, 10);
                    listDate.push(strDate);
                    dateMove.setDate(dateMove.getDate() + 1);
                }
                return listDate;
            };

            if (this.state.orders.includes('last 7 days')) {
                dateRange = getDatesBetweenDates(last7Days, todaysDate);
            }
            if (this.state.orders.includes('last 30 days')) {
                dateRange = getDatesBetweenDates(last30Days, todaysDate);
            }
            if (this.state.orders.includes('past 3 months')) {
                dateRange = getDatesBetweenDates(past3Months, todaysDate);
            }
            if (this.state.orders.includes(currentYear())) {
                dateRange = getDatesBetweenDates(firstDayOfYear, todaysDate);
            }

            if (this.state.orders.includes(`${currentYear() - 1}`)) {
                dateRange = getDatesBetweenDates(
                    `${currentYear() - 1}-01-01`,
                    `${currentYear() - 1}-12-31`
                );
            }

            let tableData = [];

            let mainData = Array.isArray(data)
                ? newData.map((order) => {
                      return dateRange.includes(
                          new Date(order.order_created_at)
                              .toISOString()
                              .slice(0, 10)
                      )
                          ? tableData.push({
                                id: order.id_order_m2m_product,
                                orderId: order.id_order,
                                token: this.props.token,
                                title: order.product_title,
                                dateCreate: new Date(
                                    order.order_created_at
                                ).toDateString(),
                                quantity: order.quantity,
                                amount: order.total,
                                status: order.os_name,
                                ...order,
                            })
                          : null;
                  })
                : [];

            const checkDate = Array.isArray(data)
                ? data.map((order) =>
                      dateRange.includes(
                          new Date(order.order_created_at)
                              .toISOString()
                              .slice(0, 10)
                      )
                  )
                : [];

            let dateCount = [];

            for (let date of checkDate) {
                if (date === true) dateCount.push(date);
            }

            const postData = checkDate.includes(true) ? tableData : null;

            this.setState({
                success: response.success,
                check_count: dateCount,
                order_count: dateCount.length > 0 ? dateCount.length : null,
                data: postData,
                searchData: null,
                searchInput: '',
                select: true,
                search: false,
            });
        });
    };

    handleSearch = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    //For the search bar functionality
    searchOrder = async (e) => {
        e.preventDefault();
        const data = { token: this.props.token };
        const { searchInput } = this.state;

        const route = `user/orders`;

        await api.handler.api_post(data, route).then((response) => {
            const data = response.data;

            const dataArray = [];
            dataArray.push(data);

            const newData = dataArray.flat();

            let tableData = [];

            let mainData = Array.isArray(data)
                ? newData.map((order) => {
                      order.product_title
                          .toLowerCase()
                          .includes(searchInput.toLowerCase()) ||
                      order.product_desc
                          .toLowerCase()
                          .includes(searchInput.toLowerCase())
                          ? tableData.push({
                                id: order.id_order_m2m_product,
                                orderId: order.id_order,
                                token: this.props.token,
                                ...order,
                                title: order.product_title,
                                dateCreate: new Date(
                                    order.order_created_at
                                ).toDateString(),
                                quantity: order.quantity,
                                amount: order.total,
                                status: order.id_order_status,
                            })
                          : null;
                  })
                : [];

            const tableDataLength = tableData.length;
            const postData = tableDataLength > 0 ? tableData : null;

            this.setState({
                success: response.success,
                searchData: postData,
                order_count: tableDataLength > 0 ? tableDataLength : null,
                data: null,
                select: false,
                search: true,
            });
        });
    };

    handleChange = (e) => {
        this.setState({
            orders: e.target.value,
        });
        this.receivedData();
    };

    recentChange = () => {
        this.setState({
            orders: `${currentYear()}`,
            search: false,
            searchData: null,
            searchInput: '',
        });

        this.receivedData();
    };

    componentDidMount() {
        this.setState({
            orders: 'last 7 days',
            searchData: null,
            select: true,
            search: false,
        });
        this.receivedData();
    }

    render() {
        return (
            <section className="ps-my-account ps-page--account">
                <div className="container">
                    <div className="row">
                        <AccountMenuSidebar />

                        <div className="col-lg-9">
                            <div className="ps-page__content">
                                <div className="ps-section--account-setting">
                                    <h3>Your Orders</h3>

                                    <form
                                        className="ps-section__header ps-form--search-mobile mt-5"
                                        action="/"
                                        method="get">
                                        <div className="row mt-5">
                                            <div className="col-3">
                                                <div className="order-count">
                                                    {this.state.success &&
                                                    this.state.order_count !==
                                                        null
                                                        ? this.state.order_count
                                                        : 0}{' '}
                                                    {'order(s) placed in'}
                                                </div>
                                            </div>
                                            <div className="col-3 pl-0">
                                                {/* Display count of order items  */}
                                                <select
                                                    className="form-control form-search"
                                                    aria-label=".form-select-sm example"
                                                    value={this.state.orders}
                                                    onChange={this.handleChange.bind(
                                                        this
                                                    )}>
                                                    <option value="last 7 days">
                                                        last 7 days
                                                    </option>
                                                    <option value="last 30 days">
                                                        last 30 days
                                                    </option>
                                                    <option value="past 3 months">
                                                        past 3 months
                                                    </option>
                                                    <option
                                                        value={currentYear()}>
                                                        {currentYear()}
                                                    </option>
                                                    <option
                                                        value={
                                                            currentYear() - 1
                                                        }>
                                                        {currentYear() - 1}
                                                    </option>
                                                </select>
                                            </div>
                                            <div className="form-group--nest col-6">
                                                <input
                                                    className="form-control search-mobile-input-border"
                                                    placeholder="Search something..."
                                                    type="text"
                                                    value={
                                                        this.state.searchInput
                                                    }
                                                    name="searchInput"
                                                    onChange={this.handleSearch}
                                                />
                                                <button
                                                    className="search-orders-text"
                                                    onClick={this.searchOrder}>
                                                    Search
                                                </button>
                                            </div>
                                        </div>
                                    </form>

                                    <>
                                        <div className="ps-section__content">
                                            {this.state.data !== null ||
                                            this.state.searchData !== null ? (
                                                this.state.search === false &&
                                                this.state.select === true ? (
                                                    <ManageOrdersTable
                                                        data={this.state.data}
                                                    />
                                                ) : (
                                                    <ManageOrdersTable
                                                        data={
                                                            this.state
                                                                .searchData
                                                        }
                                                    />
                                                )
                                            ) : (
                                                <div className="order-in-past">
                                                    <p>
                                                        {this.state.search ===
                                                        false
                                                            ? `You have not placed any orders in ${this.state.orders}. `
                                                            : `No order matches "${this.state.searchInput}". `}
                                                        <a
                                                            href="#"
                                                            onClick={
                                                                this
                                                                    .recentChange
                                                            }>
                                                            {this.state
                                                                .orders ===
                                                            `${currentYear()}`
                                                                ? null
                                                                : `View orders in ${currentYear()}`}
                                                        </a>
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                        Contact customercare@utopiatech.io for
                                        returns.
                                    </>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

const mapStateToProps = (state) => {
    return state.auth;
};

export default connect(mapStateToProps)(
    withAuth(ManageOrders, AccessLevel.USER_ACCESS_LEVEL)
);

//side effect at FormChangeUserInformation.js

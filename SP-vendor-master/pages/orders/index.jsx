import React, { useEffect, useState } from "react";
import CardAllOrders from "~/components/shared/cards/CardAllOrders";
import CardSaleReport from "~/components/shared/cards/CardSaleReport";
import CardEarning from "~/components/shared/cards/CardEarning";
import CardStatics from "~/components/shared/cards/CardStatics";
import ContainerDashboard from "~/components/layouts/ContainerDashboard";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { toggleDrawerMenu } from "~/store/app/action";
import CardTopCountries from "~/components/shared/cards/CardTopCountries";
import withAuth from "~/components/hoc/withAuth";
import { connect } from "react-redux";
import { Pagination } from "antd";
import ContainerDefault from "~/components/layouts/ContainerDefault";
import HeaderDashboard from "~/components/shared/headers/HeaderDashboard";

const Index = (props) => {
  const Router = useRouter();
  const { page } = Router.query;
  const pageSize = 8;
  const [total, setTotal] = useState(1);

  const dispatch = useDispatch();
  useEffect(() => {
    Router.push(`/orders?page=1`);
    dispatch(toggleDrawerMenu(false));
  }, []);

  function handlePagination(page, pageSize) {
    Router.push(`/orders?page=${page}`);
  }

  return (
    <ContainerDefault title="Orders">
      <HeaderDashboard title="Orders" description="Arivanna Orders" />
      <section id="homepage">
        <div className="ps-section__left">
          <div className="row">
            <div className="col-xl-8 col-12">
              <CardSaleReport />
            </div>
            <div className="col-xl-4 col-12">
              <CardEarning />
            </div>
          </div>
          <CardAllOrders
            page={page}
            pageSize={pageSize}
            setTotal={setTotal}
          />
        </div>
        <div className="ps-section__right">
          <CardStatics />
          <CardTopCountries />
        </div>
        <div className="ps-shopping__footer text-center">
          <div className="ps-pagination">
            <Pagination
              total={total}
              pageSize
              responsive={true}
              showSizeChanger={false}
              // current={1}
              current={page !== undefined ? parseInt(page) : 1}
              onChange={(e) => handlePagination(e)}
            />
          </div>
        </div>
      </section>
    </ContainerDefault>
  );
};
export default withAuth(connect((state) => state.app)(Index));

/*
import React, { useEffect } from 'react';
import ContainerDefault from '~/components/layouts/ContainerDefault';
import TableOrdersItems from '~/components/shared/tables/TableOrdersItems';
import Pagination from '~/components/elements/basic/Pagination';
import { Select } from 'antd';
import Link from 'next/link';
import HeaderDashboard from '~/components/shared/headers/HeaderDashboard';
import { connect, useDispatch } from 'react-redux';
import { CheckLoginStatus } from '~/store/auth/action';
import withAuth from '~/components/hoc/withAuth';

const { Option } = Select;
const OrdersPage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(CheckLoginStatus());
    }, []);
    return (
        <ContainerDefault>
            <HeaderDashboard
                title="Orders"
                description="Arivanna Orders Listing"
            />
            <section className="ps-items-listing">
                <div className="ps-section__header simple">
                    <div className="ps-section__filter">
                        <form
                            className="ps-form--filter"
                            action="index.html"
                            method="get">
                            <div className="ps-form__left">
                                <div className="form-group">
                                    <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Search..."
                                    />
                                </div>
                                <div className="form-group">
                                    <Select
                                        placeholder="Status"
                                        className="ps-ant-dropdown"
                                        listItemHeight={20}>
                                        <Option value="active">Active</Option>
                                        <Option value="in-active">
                                            InActive
                                        </Option>
                                    </Select>
                                </div>
                            </div>
                            <div className="ps-form__right">
                                <button className="ps-btn ps-btn--gray">
                                    <i className="icon icon-funnel mr-2"></i>
                                    Filter
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="ps-section__actions">
                        <Link href="/products/create-product">
                            <a className="ps-btn success">
                                <i className="icon icon-plus mr-2"></i>New Order
                            </a>
                        </Link>
                        <a
                            className="ps-btn ps-btn--gray"
                            href="new-order.html">
                            <i className="icon icon-download2 mr-2"></i>Export
                        </a>
                    </div>
                </div>
                <div className="ps-section__content">
                    <TableOrdersItems />
                </div>
                <div className="ps-section__footer">
                    <p>Show 10 in 30 items.</p>
                    <Pagination />
                </div>
            </section>
        </ContainerDefault>
    );
};
export default withAuth(connect((state) => state.app)(OrdersPage));
*/

import React, { useState, useEffect } from "react";/*
import ContainerDefault from "~/components/layouts/ContainerDefault";
import Pagination from "~/components/elements/basic/Pagination";
import TableProjectItems from "./TableProjectItems";
import HeaderDashboard from "~/components/shared/headers/HeaderDashboard";
import { connect, useDispatch } from "react-redux";
import ModalDialog from "../../woocommerce_helper/modal_dialog";
import Link from "next/link";
import { Select } from "antd";
import { getAllProducts } from "~/woocommerce_helper/apiRequest";
import { setProducts } from "~/store/woocommerce/action";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";*/

function WooCommerce() {
  return <div></div>

}

export default WooCommerce


/*
const { Option } = Select;
const WooCommerce = ({ url, customerKey, customerSecret }) => {
  const [items, setItems] = useState([]);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  async function fetchWooCommerceProducts(event) {
    event.preventDefault();
    setLoading(true);
    const result = await getAllProducts(url, customerKey, customerSecret);
    setItems(result.data);
    setLoading(false);
    dispatch(setProducts(result.data));
  }
  const antIcon = <LoadingOutlined className="loading-gif" spin />;
  const apiLoading = loading ? (
    <div className="product-loader">
      <Spin size="large" indicator={antIcon} />
    </div>
  ) : null;
  return (
    <ContainerDefault title="WooCommerce-Integration">
      <ModalDialog />
      <HeaderDashboard
        title="WooCommerce"
        description="Arivanna - Woocommerce integration "
      />
      <div>{apiLoading}</div>
      <section className="ps-items-listing">
        <div className="ps-section__actions">
          <Link href="#">
            <a className="ps-btn success" onClick={fetchWooCommerceProducts}>
              <i className="icon icon-database mr-2" />
              View Products
            </a>
          </Link>

          <Link href="/woocommerce/create-product">
            <a className="ps-btn success">
              <i className="icon icon-plus mr-2" />
              New Product
            </a>
          </Link>
        </div>
        <div className="ps-section__header">
          <div className="ps-section__filter">
            <form className="ps-form--filter" action="index.html" method="get">
              <div className="ps-form__left">
                <div className="form-group">
                  <Select
                    placeholder="Select Category"
                    className="ps-ant-dropdown"
                    listItemHeight={20}
                  >
                    <Option value="clothing-and-apparel">
                      Clothing & Apparel
                    </Option>
                    <Option value="garden-and-kitchen">Garden & Kitchen</Option>
                  </Select>
                </div>
                <div className="form-group">
                  <Select
                    placeholder="Select Category"
                    className="ps-ant-dropdown"
                    listItemHeight={20}
                  >
                    <Option value="simple-product">Simple Product</Option>
                    <Option value="groupped-product">Groupped product</Option>
                  </Select>
                </div>
                <div className="form-group">
                  <Select
                    placeholder="Status"
                    className="ps-ant-dropdown"
                    listItemHeight={20}
                  >
                    <Option value="active">Active</Option>
                    <Option value="in-active">InActive</Option>
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
          <div className="ps-section__search">
            <form
              className="ps-form--search-simple"
              action="index.html"
              method="get"
            >
              <input
                className="form-control"
                type="text"
                placeholder="Search product"
              />
              <button>
                <i className="icon icon-magnifier"></i>
              </button>
            </form>
          </div>
        </div>
        <div className="ps-section__content">
          <TableProjectItems products={items} />
        </div>
        <div className="ps-section__footer">
          <p>Show 10 in 30 items.</p>
          <Pagination />
        </div>
      </section>
    </ContainerDefault>
  );
};

export default connect((state) => state.woocommerce)(WooCommerce);*/

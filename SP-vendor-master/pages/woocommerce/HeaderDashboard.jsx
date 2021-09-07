import React from "react";

import { connect, useDispatch } from "react-redux";
import { logOut } from '~/store/auth/action';
import Router from "next/router";
import { clearRecentOrders } from "~/store/dashboard/action";

const HeaderDashboard = ({
  title = "WooCommerce plugin",
  description = "Integrating with woocommerce",
  auth
}) => {
  const id_vendor = auth?.id_vendor;
  const dispatch = useDispatch();

  const onLogoutAction = (evt) => {
      evt.preventDefault();
      dispatch(logOut())
      dispatch(clearRecentOrders())
      Router.push("/")
  }

  return (
    <header className="header--dashboard">
      <div className="header__left">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div className="header__right">
        <a className="header__site-link" target='_blank' href={`https://arivanna.com/stores/${id_vendor}`}>
          <span>View your store</span>
          <a href="#" onClick={onLogoutAction}>
                    <i className="icon-exit-right"></i>
                </a>
        </a>
      </div>
    </header>
  );
};

export default HeaderDashboard;

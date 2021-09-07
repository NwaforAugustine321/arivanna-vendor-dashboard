import React from "react";
import Head from "next/head";
import FooterCopyright from "~/components/shared/footers/FooterCopyright";
import MenuSidebar from "~/components/shared/menus/MenuSidebar";
import WidgetEarningSidebar from "~/components/shared/widgets/WidgetEarningSidebar";
import WidgetUserWelcome from "~/components/shared/widgets/WidgetUserWelcome";
import HeaderDashboard from "~/components/shared/headers/HeaderDashboard";
import { connect, useDispatch } from "react-redux";
import { logOut } from "~/store/auth/action";
import { notification } from "antd";
import Router from "next/router";
import { clearRecentOrders } from "~/store/dashboard/action";
import DocumentValidationBanner from "../partials/account/DocumentValidationBanner";

const ContainerDashboard = ({ children, title }) => {
  let titleView;
  if (title !== undefined) {
    titleView = process.env.title + " | " + title;
  } else {
    titleView = process.env.title + " | " + process.env.titleDescription;
  }

  const dispatch = useDispatch();

  const onLogoutAction = async (evt) => {
      evt.preventDefault();
      dispatch(logOut());
      dispatch(clearRecentOrders())
      Router.push("/");
  };

  return (
    <div className="Arivanna-admin">
      <Head>
        <title>{titleView}</title>
      </Head>
      <main className="ps-main">
        <div className="ps-main__sidebar">
          <div className="ps-sidebar">
            <div className="ps-sidebar__top">
              <WidgetUserWelcome />
              <WidgetEarningSidebar />
            </div>
            <div className="ps-sidebar__content">
              <div className="ps-sidebar__center">
                <MenuSidebar />
              </div>
            </div>
            <div className="ps-sidebar__footer">
              <div style={{marginBottom:'20px'}} className="ps-block__action">
                <a
                  className="ps-btn ps-btn"
                  href="#"
                  onClick={onLogoutAction}
                >
                  Logout
                  <i className="icon-exit" style={{marginLeft:'10px', marginBottom:'10px'}}></i>
                </a>
              </div>
              <FooterCopyright />
            </div>
          </div>
        </div>
        <div className="ps-main__wrapper">
          <DocumentValidationBanner/>
          <HeaderDashboard />
          {children}
        </div>
      </main>
    </div>
  );
};

export default ContainerDashboard;

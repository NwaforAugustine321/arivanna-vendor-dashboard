import React from "react";
import { connect, useDispatch } from "react-redux";

const WidgetUserWelcome = ({ auth }) => {

  return (
    <div className="ps-block--user-wellcome">
      <div className="ps-block__left">
        <img style={{ maxHeight: "50px" }} src="/img/user/1.png" alt="" />
      </div>
      <div className="ps-block__right">
        <p>
          Hello,<a href="#">{auth?.business_name ?? "vendor"}</a>
        </p>
      </div>
   
    </div>
  );
};

export default connect((state) => ({ auth: state.auth }))(WidgetUserWelcome);

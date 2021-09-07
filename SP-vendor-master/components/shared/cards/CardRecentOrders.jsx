import React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import TableOrderSummary from "~/components/shared/tables/TableOrderSummary";
import VendorOrderRepository from "~/repositories/VendorOrderRepository";
import { fetchRecentOrders } from "~/store/dashboard/action";
import { Spin } from "antd";

const CardRecentOrders = ({ page, pageSize, setTotal }) => {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setLoading(true);
    VendorOrderRepository.getAllOrders()
      .then((result) => {
        if (result.success) {
          const recentOrders = result.data.splice(0, 5);
          setOrders(recentOrders);
          setLoading(false);
        }
      })
      .catch((err) => {
        dispatch(fetchRecentOrders([]));
        setLoading(false);
      });
  }, []);

  return (
    <div className="ps-card">
      <div className="ps-card__header">
        <h4>Recent Orders</h4>
      </div>

      <div className="ps-card__content">
        {loading ? (
          <Spin />
        ) : orders.length != 0 ? (
          <TableOrderSummary orders={orders} />
        ) : (
          <h3>No orders found!</h3>
        )}
      </div>
      {!loading && orders.length > 0 && (
        <div className="ps-card__footer">
          <Link href="/orders">
            <a className="ps-card__morelink">
              View Full Orders
              <i className="icon icon-chevron-right"></i>
            </a>
          </Link>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    orders: state.dashboard.orders,
  };
};

export default connect(mapStateToProps)(CardRecentOrders);

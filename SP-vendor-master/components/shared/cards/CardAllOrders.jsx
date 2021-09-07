import React from "react";
import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import TableOrderSummary from "~/components/shared/tables/TableOrderSummary";
import VendorOrderRepository from "~/repositories/VendorOrderRepository";
import { Spin } from "antd";

const CardAllOrders = () => {
  const [loading, setLoading] = useState(true);

  const [orders, setOrders] = useState([]);

  useEffect(async () => {
    setLoading(true);
    try {
      const response = await VendorOrderRepository.getAllOrders();
      if(response.success) {
        setOrders(response.data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }, []);

  return (
    <div className="ps-card">
      <div className="ps-card__header">
        <h4 hidden>Orders</h4>
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
    </div>
  );
};

export default CardAllOrders;

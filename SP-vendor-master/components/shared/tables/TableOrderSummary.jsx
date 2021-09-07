import moment from "moment";
import React, { useState, useEffect } from "react";
import { formatCurrency } from "~/utilities/product-helper";
import VendorOrderRepository from "~/repositories/VendorOrderRepository";
import Link from "next/link";
import { useRouter } from "next/router";
import { connect } from "react-redux";

const TableOrderSummary = ({ orders = [], currency }) => {
  const handleChange = async (e, order) => {
    const data = {
      id_order: order.id_order,
      id_order_status: {
        id_order_status: e,
        order_status: order_statuses[e - 1],
      },
      key: "vendor_order_update",
    };

    await VendorOrderRepository.updateOrder(data);
  };

  const router = useRouter();

  const handleOrderDetailView = (id_order) => {
    router.push(`/account/order-detail/${id_order}`);
  };

  // const order_statuses = [
  //   "Unpaid",
  //   "Paid",
  //   "Processing",
  //   "In Transit",
  //   "Order Completed",
  //   "Return Initiated",
  //   "Order Returned",
  //   "Processing Refund",
  //   "Refund Completed",
  //   "On Hold",
  //   "Cancelled"
  // ];

  // useEffect(() => {
  //   if (orders && orders.length !== 0) {
  //     orders.map((order) => {
  //       document.getElementById(order.id_order).value = order.id_order_status;
  //     });
  //   }
  // }, [orders]);

  return (
    <div className="table-responsive">
      <table className="table ps-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Payment</th>
            <th>Fullfillment</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, id) => {
            const order_status_log = JSON.parse(order.id_order_status);
            const logs_len = order_status_log.length;
            const last_order_status = order_status_log[logs_len - 1];

            return (
              <tr key={id}>
                <td>#{order.id_order}</td>
                <td>
                  <strong>
                    {order?.order_created_at &&
                      moment(order.order_created_at).format("MMM DD, YYYY")}
                  </strong>
                </td>
                <td>
                  {" "}
                  <a onClick={() => handleOrderDetailView(order.id_order)}>
                    <strong>{order.product_title}</strong>
                  </a>
                  {/* <a href="order-detail.html"> */}
                  {/* <strong>{order.product_title}</strong> */}
                  {/* </a> */}
                </td>
                <td>{order.quantity}</td>
                <td>
                  <span className="ps-badge success">
                    {order.isPaid === 1 ? "Paid" : "Not Paid"}
                  </span>
                </td>
                <td>
                  {
                    JSON.parse(order.id_order_status)[
                      JSON.parse(order.id_order_status).length - 1
                    ]?.order_status
                  }
                  {/* {
                  order.id_order_status[order.id_order_status.length - 1]
                    ?.order_status
                } */}

                  {/* {order.isPaid === 1 && (
                    <div className="form-group--select">
                      <select
                        id={order.id_order}
                        defaultValue={last_order_status?.id_order_status}
                        className="form-control"
                        onChange={(e) => handleChange(e.target.value, order)}
                      >
                        {(() => {
                          console.log(order);
                          if (last_order_status === undefined) return;

                          if (last_order_status.id_order_status == 10) {
                            const prev_order_status =
                              order_status_log[logs_len - 2];
                            if (prev_order_status.id_order_status != 3) {
                              return (
                                <option
                                  value={prev_order_status.id_order_status}
                                >
                                  {prev_order_status.order_status}
                                </option>
                              );
                            } else {
                              let ops = order_statuses.map((status, index) => {
                                if (index > 0 && index < 9) {
                                  return (
                                    <option value={index + 1}>{status}</option>
                                  );
                                }
                              });
                              return ops;
                            }
                          } else if (
                            last_order_status.id_order_status == 5 ||
                            last_order_status.id_order_status == 9
                          ) {
                            return (
                              <option value={last_order_status.id_order_status}>
                                {last_order_status.order_status}
                              </option>
                            );
                          } else {
                            let ops = order_statuses.map((status, index) => {
                              if (
                                last_order_status.id_order_status == index ||
                                last_order_status.id_order_status == index + 1
                              ) {
                                return (
                                  <option value={index + 1}>{status}</option>
                                );
                              }
                            });
                            return ops;
                          }
                        })()}
                        <option value={10}>On Hold</option>
                      </select>
                      <i className="icon-chevron-down mx-0"></i>
                    </div>
                  )} */}
                </td>
                <td>
                  <strong>
                    {formatCurrency(order?.total, currency, 0)}
                  </strong>
                </td>
                <td>
                  <div className="dropdown">
                    <a
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i className="icon-ellipsis"></i>
                    </a>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <a className="dropdown-item" href="#">
                        Edit
                      </a>
                      <a className="dropdown-item" href="#">
                        Delete
                      </a>
                    </div>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default connect(state => state.settings)(TableOrderSummary);

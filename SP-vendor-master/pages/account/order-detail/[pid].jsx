import React, { useEffect, useState } from 'react';
import ContainerDefault from '~/components/layouts/ContainerDefault';
import ModuleOrderShippingInformation from '~/components/partials/orders/ModuleOrderShippingInformation';
import ModuleOrderBillingInformation from '~/components/partials/orders/ModuleOrderBillingInformation';
import HeaderDashboard from '~/components/shared/headers/HeaderDashboard';
import { connect, useDispatch } from 'react-redux';
import { CheckLoginStatus } from '~/store/auth/action';
import withAuth from '~/components/hoc/withAuth';
import VendorOrderRepository from '~/repositories/VendorOrderRepository';
import { fetchRecentOrders } from '~/store/dashboard/action';
import { useRouter } from 'next/router';
import moment from 'moment';

const OrderDetailPage = () => {
	const router = useRouter();
	const { pid } = router.query;
	const [order, setOrder] = useState([]);
	const [inTransit, setInTransit] = useState([]);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(CheckLoginStatus());
		VendorOrderRepository.getAllOrders()
			.then((result) => {
				if (result.success) {
					result.data.map((order) => {
						if (order.id_order === Number(pid)) {
							setOrder(order);
							const order_status_log = JSON.parse(order.id_order_status);
							const logs_len = order_status_log.length;
							const last_order_status = order_status_log[logs_len - 1];
							if (last_order_status.order_status == 'In Transit') {
								setInTransit(true);
							}
						}
					});
				}
			})
			.catch((err) => {});
	}, []);

	return (
		<ContainerDefault title='Order Detail'>
			<HeaderDashboard title='Order Detail' description='Arivanna Order Detail' />
			<section className='ps-dashboard'>
				<div className='ps-section__left'>
					<div className='row'>
						<div className='col-md-4'>
							<ModuleOrderShippingInformation order={order} />
						</div>
						<div className='col-md-4'>
							<ModuleOrderBillingInformation paymentMethod={order.paymentMethod} isPaid={order.isPaid} />
						</div>
						{/* <div className='col-md-4'>
							<ModuleOrderShippingInformation order={order}/>
						</div> */}
					</div>
					<div className='ps-card ps-card--track-order'>
						<div className='ps-card__header'>
							<h4>{order.id_order}</h4>
						</div>
						<div className='ps-card__content'>
							<div className='table-responsive'>
								<table className='table ps-table'>
									<thead>
										<tr>
											<th>Product</th>
											<th>Quantity</th>
											<th>Price</th>
											<th>Total</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>
												<a href='#'>{order.product_title}</a>
											</td>
											<td>{order.quantity}</td>
											<td>${order.p2v_price}</td>
											<td>${order.quantity * order.p2v_price}</td>
										</tr>

										<tr>
											<td colSpan='3'>
												<strong>Sub Total:</strong>
											</td>
											<td>
												<strong>${order.total - order.shipping}</strong>
											</td>
										</tr>
										<tr>
											<td colSpan='3'>
												<strong>Shipping Charge:</strong>
											</td>
											<td>
												<strong>${order.shipping}</strong>
											</td>
										</tr>
										{/* <tr>
											<td colSpan='3'>
												<strong>Estimated:</strong>
											</td>
											<td>
												<strong>$12.00</strong>
											</td>
										</tr> */}
										<tr>
											<td colSpan='3'>
												<strong>Total:</strong>
											</td>
											<td>
												<strong>${order.total}</strong>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
				<div className='ps-section__right'>
					<div className='ps-card ps-card--track-order'>
						<div className='ps-card__header'>
							<h4>Track Order</h4>
						</div>
						<div className='ps-card__content'>
							<div className='ps-block--track-order'>
								<div className='ps-block__header'>
									<div className='row'>
										<div className='col-6'>
											<figure>
												<figcaption>Order ID:</figcaption>
												<p>{order.id_order}</p>
											</figure>
										</div>
										{(() => {
											if (inTransit === true) {
												return (
													<div className='col-6'>
														<figure>
															<figcaption>Tracking ID:</figcaption>
															<p>{order.id_order_m2m_product}</p>
														</figure>
													</div>
												);
											} else {
												return (
													<div className='col-6'>
														<figure>
															<figcaption>Tracking ID:</figcaption>
														</figure>
													</div>
												);
											}
										})()}
									</div>
								</div>
								<div className='ps-block__content'>
									<div className='ps-block__timeline'>
										<figure className='active'>
											<figcaption>Order Placed</figcaption>
											<p>{moment(order.order_created_at).format('MMM DD, YYYY h:mm a')}</p>
										</figure>
										{order.id_order_status == 1 && (
											<figure className='active'>
												<figcaption>Pending</figcaption>
											</figure>
										)}
										{order.id_order_status == 2 && (
											<figure className='active'>
												<figcaption>Payment Completed</figcaption>
											</figure>
										)}
										{order.id_order_status == 3 && (
											<figure className='active'>
												<figcaption>Order Recieved</figcaption>
											</figure>
										)}
										{order.id_order_status == 4 && (
											<figure className='active'>
												<figcaption>Processing</figcaption>
											</figure>
										)}
										{order.id_order_status == 5 && (
											<figure className='active'>
												<figcaption>Shipped</figcaption>
											</figure>
										)}
										{order.id_order_status == 6 && (
											<figure className='active'>
												<figcaption>Completed</figcaption>
											</figure>
										)}
										{order.id_order_status == 7 && (
											<figure className='active'>
												<figcaption>Return Initiated</figcaption>
											</figure>
										)}
										{order.id_order_status == 8 && (
											<figure className='active'>
												<figcaption>Order Returned</figcaption>
											</figure>
										)}
										{order.id_order_status == 9 && (
											<figure className='active'>
												<figcaption>Processing Refund</figcaption>
											</figure>
										)}
										{order.id_order_status == 10 && (
											<figure className='active'>
												<figcaption>Refund Completed</figcaption>
											</figure>
										)}
										{order.id_order_status == 11 && (
											<figure className='active'>
												<figcaption>On Hold</figcaption>
											</figure>
										)}
										{order.id_order_status == 12 && (
											<figure className='active'>
												<figcaption>Closed</figcaption>
											</figure>
										)}
										{order.id_order_status == 13 && (
											<figure className='active'>
												<figcaption>Cancelled</figcaption>
											</figure>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</ContainerDefault>
	);
};
export default withAuth(connect((state) => state.app)(OrderDetailPage));

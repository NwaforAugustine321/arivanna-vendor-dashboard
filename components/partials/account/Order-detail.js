import React, { useEffect, useState } from 'react';
import api from '../../../api/handler';
import ModuleOrderShippingInformation from '~/components/partials/account/modules/ ModuleOrderShippingInformation';
import ModuleOrderBillingInformation from '~/components/partials/account/modules/ModuleOrderBillingInformation';
import HeaderOrder from '~/components/layouts/modules/Header_order';
import OrdersRepository from '~/repositories/OrdersRepository';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { notification, Spin, Modal, Button } from 'antd';

const OrderDetailPage = (props) => {
    const [orderDetail, setOrderDetail] = useState([]);
    const [fetching, setfetching] = useState(false);
    const [orderStatuses, setOrderStatuses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [visible, setModalVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');
    const [modalTitle, setModalTitle] = useState('Title of the modal');
    const [orderStatusType, setOrderStatusType] = useState('');
    const data = { token: props.token };
    const route = `user/orders`;
    const router = useRouter();

    const { pid } = router.query;

    useEffect(() => {
        async function getProductDetail() {
            await api.handler.api_post(data, route).then((response) => {
                const data = response.data;
                const dataArray = [];
                dataArray.push(data);
                const newData = dataArray.flat();
                const mapData = newData.find((order) => {
                    return order.id_order_m2m_product === Number(pid);
                });
                setOrderDetail(mapData);
                setOrderStatuses(JSON.parse(mapData.id_order_status));
                setfetching(true);
            });
        }

        getProductDetail();
    }, []);

    const showModal = (orderStatusType) => {
        if (orderStatusType === 'Return Order') {
            setOrderStatusType('Return');
            setModalTitle(orderStatusType);
            setModalText('Are you sure you want to return this order?');
        }

        if (orderStatusType === 'Complete Order') {
            setOrderStatusType('Complete');
            setModalTitle(orderStatusType);
            setModalText(
                'Are you sure you want to complete and close this order?'
            );
        }

        setModalVisible(true);
    };

    const handleOk = async () => {
        setLoading(true);
        let data = {
            id_order: orderDetail.id_order,
            id_order_status: {
                id_order_status: '',
                order_status: '',
                datetime_updated: '',
            },
            key: 'buyer_order_update',
        };
        let res;

        if (orderStatusType === 'Return') {
            data.id_order_status.order_status = 'Return Initiated';
            data.id_order_status.id_order_status = 6;
            res = await OrdersRepository.requestOrderUpdate(data);
            setTimeout(() => {
                setModalVisible(false);
                setConfirmLoading(false);
            }, 2000);
        }

        if (orderStatusType === 'Complete') {
            data.id_order_status.order_status = 'Order Completed';
            data.id_order_status.id_order_status = 5;
            res = await OrdersRepository.requestOrderUpdate(data);
            setTimeout(() => {
                setModalVisible(false);
                setConfirmLoading(false);
            }, 2000);
        }
        setModalText('Loading');
        setConfirmLoading(true);

        if (res.success) {
            notification['success']({
                message: res.data.message,
                // description: res.data.message || res.data,
            });
            
        } else {
            notification['error']({
                message: `Error Occured`,
                description: res.data.message || res.data,
            });
        }
        setLoading(false);
    };

    const handleCancel = () => {
        setModalVisible(false);
    };

    return (
        <React.Fragment>
            <Modal
                title={modalTitle}
                visible={visible}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}>
                <p>{modalText}</p>
            </Modal>
            {loading ? (
                <Spin />
            ) : (
                <section className="ps-my-account ps-page--account">
                    <div className="container">
                        <div className="row">
                            <div title="Order Detail">
                                <HeaderOrder
                                    title="Order Detail"
                                    description="Arivanna Order Detail"
                                />

                                {fetching ? (
                                    <section className="ps-dashboard">
                                        <div className="ps-section__left">
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <ModuleOrderShippingInformation
                                                        userName={
                                                            props.user_first_name
                                                        }
                                                    />
                                                </div>
                                                <div className="col-md-4">
                                                    <ModuleOrderBillingInformation
                                                        paymentMethod={
                                                            orderDetail.paymentMethod
                                                                ? orderDetail.paymentMethod
                                                                : 'None'
                                                        }
                                                    />
                                                </div>
                                                <div className="col-md-4">
                                                    <ModuleOrderShippingInformation
                                                        userName={
                                                            props.user_first_name
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className="ps-card ps-card--track-order">
                                                <div className="ps-card__header">
                                                    <h4>
                                                        {
                                                            orderDetail.product_title
                                                        }
                                                    </h4>
                                                </div>
                                                <div className="ps-card__content">
                                                    <div className="table-responsive">
                                                        <table className="table ps-table">
                                                            <thead>
                                                                <tr>
                                                                    <th>
                                                                        Product
                                                                    </th>
                                                                    <th>
                                                                        Quantity
                                                                    </th>
                                                                    <th>
                                                                        Price
                                                                    </th>
                                                                    <th>
                                                                        Total
                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>
                                                                        <a href="#">
                                                                            {
                                                                                orderDetail.product_desc
                                                                            }
                                                                        </a>
                                                                    </td>
                                                                    <td>
                                                                        {
                                                                            orderDetail.quantity
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        {`$ ${orderDetail.p2v_price}`}
                                                                    </td>
                                                                    <td>
                                                                        {`$ ${orderDetail.total}`}
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td colSpan="3">
                                                                        <strong>
                                                                            Sub
                                                                            Total:
                                                                        </strong>
                                                                    </td>
                                                                    <td>
                                                                        <strong>
                                                                            {`$ ${orderDetail.p2v_price}`}
                                                                        </strong>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td colSpan="3">
                                                                        <strong>
                                                                            Shipping
                                                                            Charge:
                                                                        </strong>
                                                                    </td>
                                                                    <td>
                                                                        <strong>
                                                                            $24.00
                                                                        </strong>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td colSpan="3">
                                                                        <strong>
                                                                            Estimated:
                                                                        </strong>
                                                                    </td>
                                                                    <td>
                                                                        <strong>
                                                                            $12.00
                                                                        </strong>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td colSpan="3">
                                                                        <strong>
                                                                            Total:
                                                                        </strong>
                                                                    </td>
                                                                    <td>
                                                                        <strong>
                                                                            {`$ ${orderDetail.total}`}
                                                                        </strong>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="ps-block__header">
                                                <div className="row">
                                                    <div className="col-12">
                                                        <figure>
                                                            <figcaption>
                                                                Order ID:
                                                            </figcaption>
                                                            <p>
                                                                {
                                                                    orderDetail.id_order
                                                                }
                                                            </p>
                                                        </figure>
                                                    </div>
                                                    <div className="col-12">
                                                        <figure>
                                                            <figcaption>
                                                                Tracking ID:
                                                            </figcaption>
                                                            <p>
                                                                {
                                                                    orderDetail.id_order_m2m_product
                                                                }
                                                            </p>
                                                        </figure>
                                                    </div>
                                                    <div className="col-12">
                                                        <button
                                                            onClick={() =>
                                                                showModal(
                                                                    'Return Order'
                                                                )
                                                            }
                                                            className="ps-btn ps-btn--fullwidth">
                                                            Return Order
                                                        </button>
                                                    </div>
                                                    <div className="col-12">
                                                        <button
                                                            onClick={() =>
                                                                showModal(
                                                                    'Complete Order'
                                                                )
                                                            }
                                                            className="ps-btn ps-btn--fullwidth">
                                                            Complete Order
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="ps-section__right">
                                            <div className="ps-card ps-card--track-order">
                                                <div className="ps-card__header">
                                                    <h4>Track Order</h4>
                                                </div>

                                                <div className="ps-card__content">
                                                    <div className="ps-block--track-order">
                                                        <div className="ps-block__content">
                                                            <div className="ps-block__timeline">
                                                                {orderStatuses.map(
                                                                    (
                                                                        status
                                                                    ) => {
                                                                        return (
                                                                            <figure className="active">
                                                                                <figcaption>
                                                                                    {status.order_status ==
                                                                                    'Unpaid'
                                                                                        ? 'Order Placed'
                                                                                        : status.order_status}
                                                                                </figcaption>
                                                                                <p>
                                                                                    {status.datetime_updated.slice(
                                                                                        0,
                                                                                        11
                                                                                    )}
                                                                                    <small>
                                                                                        {status.datetime_updated.slice(
                                                                                            10,
                                                                                            16
                                                                                        )}
                                                                                    </small>
                                                                                </p>
                                                                            </figure>
                                                                        );
                                                                    }
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                ) : (
                                    <Spin />
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </React.Fragment>
    );
};

const mapStateToProps = (state) => {
    return state.auth;
};

export default connect(mapStateToProps)(OrderDetailPage);

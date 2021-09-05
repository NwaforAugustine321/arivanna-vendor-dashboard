import React, { Component, useState } from 'react';
import { Table, Divider, Tag } from 'antd';
import Link from 'next/link';
const ManageOrdersTable = ({ data }) => {
    const tableColumn = [
        {
            title: 'Order ID',
            dataIndex: 'orderId',
            rowKey: 'orderId',
            key: 'orderId',
            width: '120px',

            render: (text, record) => (
                <span href="/account/invoice-detail">{record.orderId}</span>
            ),
        },
        {
            title: 'Title',
            dataIndex: 'title',
            rowKey: 'title',
            key: 'title',
            render: (text, record) => (
                <Link
                    className="text-right"
                    href={`/account/order-detail/${record.id_order_m2m_product}`}>
                    {record.title}
                </Link>
            ),
        },
        {
            title: 'Date',
            rowKey: 'dateCreate',
            dataIndex: 'dateCreate',
            key: 'dateCreate',
            width: '120px',
        },
        {
            title: 'Quantity',
            rowKey: 'quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (text, record) => (
                <span className="text-right">{record.quantity}</span>
            ),
        },
        {
            title: 'Amount',
            rowKey: 'amount',
            dataIndex: 'amount',
            key: 'amount',
            render: (text, record) => (
                <span className="text-right">${record.amount}</span>
            ),
        },
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
            rowKey: 'status',
            width: '150px',
            render: (text, record) => (
                <span className="text-right">
                    {
                        JSON.parse(record.id_order_status)[
                            JSON.parse(record.id_order_status).length - 1
                        ]?.order_status
                    }
                    {/* {console.log(
                        JSON.parse(record.id_order_status)[
                            JSON.parse(record.id_order_status).length - 1
                        ]
                    )} */}
                </span>
            ),
        },
    ];

    return (
        <React.Fragment>
            <Table
                columns={tableColumn}
                dataSource={data}
                rowKey={(record) => record.id}
            />
        </React.Fragment>
    );
};

export default ManageOrdersTable;

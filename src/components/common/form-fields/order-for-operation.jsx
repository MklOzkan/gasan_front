import {
    Container,
    Row,
    Col,
    Table,
} from 'react-bootstrap';
import React from 'react';
import './order-for-operation.scss'

const OrderForOperation = ({ order }) => {
    return (
        <>
            <Container>
                <div className="table-wrapper">
                    {/* Table Header */}
                    <div className="table-head">
                        <Table className="table table-bordered text-center border-0">
                            <thead>
                                <tr>
                                    <th>Müşter Adı</th>
                                    <th>Gasan No</th>
                                    <th>Teslim Tarihi</th>
                                    <th>Sipariş Türü</th>
                                    <th>Sipariş Adedi</th>
                                    <th>Sipariş Durumu</th>
                                    {order.orderType === 'LIFT' ? (
                                        <th>Hazır Mil Adedi</th>
                                    ) : null}
                                </tr>
                            </thead>
                        </Table>
                    </div>
                    {/* Table Body */}
                    <div className="table-body">
                        <Table className="table table-bordered text-center border-0">
                            <tbody>
                                <tr>
                                    <td>{order.customerName}</td>
                                    <td>{order.gasanNo}</td>
                                    <td>{order.deliveryDate}</td>
                                    <td>{order.orderType}</td>
                                    <td>{order.orderQuantity}</td>
                                    <td>{order.orderStatus}</td>
                                    {order.orderType === 'LIFT' ? (
                                        <td>{order.readyMilCount}</td>
                                    ) : null}
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default OrderForOperation;

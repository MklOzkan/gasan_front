// src/components/orders/OrderList.jsx
import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { FaCheck, FaTimes, FaEdit, FaTrash } from 'react-icons/fa';

const OrderList = ({ orders, onEdit, onDelete }) => (
    <Table striped bordered hover>
        <thead>
            <tr>
                <th>Sipariş Durumu</th>
                <th>Müşteri Adı</th>
                <th>Sipariş Numarası</th>
                <th>Sipariş Tarihi</th>
                <th>Teslimat Tarihi</th>
                <th>Sipariş Türü</th>
                <th>Sipariş Miktarı</th>
                <th>Hazır Mil Adedi</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {orders.map((order) => (
                <tr key={order.orderNumber}>
                    <td>
                        {order.orderStatus === 'Completed' ? (
                            <FaCheck color="green" />
                        ) : (
                            <FaTimes color="red" />
                        )}
                    </td>
                    <td>{order.customerName}</td>
                    <td>{order.orderNumber}</td>
                    <td>{order.customerName}</td>
                    <td>{order.deliveryDate}</td>
                    <td>{order.orderType}</td>
                    <td>{order.orderQuantity}</td>
                    <td>
                        <Button variant="warning" onClick={() => onEdit(order)}>
                            <FaEdit />
                        </Button>{' '}
                        <Button
                            variant="danger"
                            onClick={() => onDelete(order.orderNumber)}
                        >
                            <FaTrash />
                        </Button>
                    </td>
                </tr>
            ))}
        </tbody>
    </Table>
);

export default OrderList;

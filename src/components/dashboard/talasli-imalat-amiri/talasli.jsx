'use client';

import React, { useState, useEffect } from 'react';
import {
    Container,
    Row,
    Col,
    Table,
    Pagination,
    Form,
    Button
} from 'react-bootstrap';
import PageHeader from '@/components/common/page-header';
import { useRouter } from 'next/navigation'; // Use Next.js router for redirection
import { updateOrderStatus } from '@/actions/order-actions'; // External function for API call
import styles from './talasli.module.scss';
import { swAlert } from '@/helpers/swal';
import { wait } from '@/utils/wait';

const Order = ({ data, currentPage, sortBy, sortOrder }) => {
    const { content, totalPages } = data;
    const [orders, setOrders] = useState(content); // State to hold orders
    const router = useRouter();
    const [isProcessing, setIsProcessing] = useState(false); // To track if an order is "İşlenmekte"

    // Check if any order has the status 'İşlenmekte'
    useEffect(() => {
        const isProcessingOrder = orders.some(
            (order) => order.orderStatus === 'İşlenmekte'
        );
        setIsProcessing(isProcessingOrder);

        return () => {
            console.log('cleanup');
        };
    }, [orders]);

    // Handle order status change (start or stop processing an order)
    const handleStatusChange = async (order, newStatus) => {
        console.log('orderId: ', order.id);
        await wait(2000); // Wait for 1 second
        
        try {
            const response = await updateOrderStatus(order.id, newStatus); // Call external functio
            console.log('API Response:', response); // Log the response for debugging
            if (response && response.success) {
                console.log('message', response.message);
                swAlert(response.message, 'success');
                await wait(2000); // Wait for 1 second
                window.location.reload(); // Basarili ise sayfayi yenile
            } else {
                console.error('Sipariş durumu güncellenemedi');
            }
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

    // Redirect the user based on orderType when the row is clicked
    const handleRowClick = (order) => {
            router.push(`/dashboard/talasli-imalat-amiri/lift/${order.id}`); // Use Next.js router for redirection
    };

    // Handle sorting change (set sortBy and sortOrder in the URL)
    const handleSortChange = (e) => {
        const { name, value } = e.target;
        const url = new URL(window.location);

        if (name === 'sortBy') {
            url.searchParams.set('sortBy', value);
        } else if (name === 'sortOrder') {
            url.searchParams.set('sortOrder', value);
        }

        window.location.href = url.toString();
    };

    // Handle sorting reset (Reset button functionality)
    const handleReset = () => {
        const url = new URL(window.location);
        url.searchParams.delete('sortBy');
        url.searchParams.delete('sortOrder');
        url.searchParams.delete('currentPage'); // Reset to the first page
        window.location.href = url.toString(); // Reload with cleared params
    };

    return (
        <>
            <PageHeader>Talasli Imalat Amiri</PageHeader>
            <main className={styles.main_container}>
                <div className={styles.row_container}>
                    <Col className={styles.colum_inner}>
                        <Form.Group controlId="sortBy">
                            <Form.Label>Sırala</Form.Label>
                            <Form.Control
                                as="select"
                                name="sortBy"
                                value={sortBy}
                                onChange={(e) => handleSortChange(e)}
                                className={styles.select}
                            >
                                <option value="orderDate">
                                    Sipariş Tarihi
                                </option>
                                <option value="deliveryDate">
                                    Teslim Tarihi
                                </option>
                                <option value="orderNumber">Sipariş No</option>
                                <option value="customerName">
                                    Müşteri Adı
                                </option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col className={styles.colum_inner}>
                        <Form.Group controlId="sortOrder">
                            <Form.Label>Siparişi Sırala</Form.Label>
                            <Form.Control
                                as="select"
                                name="sortOrder"
                                value={sortOrder}
                                onChange={(e) => handleSortChange(e)}
                                className={styles.select}
                            >
                                <option value="asc">Artan</option>
                                <option value="desc">Azalan</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col
                        className={`${styles.colum_inner} ${styles.outer_reset}`}
                    >
                        <Button
                            className={styles.inner_reset}
                            onClick={handleReset} // Reset sorting and pagination
                        >
                            Reset
                        </Button>
                    </Col>
                </div>
                <div className={styles.table_responsive}>
                    <table>
                        <thead className={styles.table_head}>
                            <tr>
                                <th>Siparis No</th>
                                <th>Müşter Adı</th>
                                <th>Gasan No</th>
                                <th>Sipariş No</th>
                                <th>Sipariş Tarihi</th>
                                <th>Teslim Tarihi</th>
                                <th>Sipariş Türü</th>
                                <th>Sipariş Adedi</th>
                                <th>Sipariş Durumu</th>
                                <th>Hazır Mil Adedi</th>
                                <th>Başla/Durdur</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, index) => (
                                <tr
                                    key={index}
                                    className={`${styles.table_body}`}
                                    onClick={() =>
                                        order.orderStatus === 'İşlenmekte'
                                            ? handleRowClick(order)
                                            : null
                                    } // Make the row clickable only if the status is 'İşlenmekte'
                                    style={{
                                        cursor:
                                            order.orderStatus === 'İşlenmekte'
                                                ? 'pointer'
                                                : 'default'
                                    }} // Change cursor style for clickable rows
                                >
                                    <td>{order.id}</td>
                                    <td>{order.customerName}</td>
                                    <td>{order.gasanNo}</td>
                                    <td>{order.orderNumber}</td>
                                    <td>{order.orderDate}</td>
                                    <td>{order.deliveryDate}</td>
                                    <td>{order.orderType}</td>
                                    <td>{order.orderQuantity}</td>
                                    <td>{order.orderStatus}</td>
                                    <td>{order.readyMilCount}</td>
                                    <td>
                                        {order.orderStatus ===
                                        'İşlenmeyi Bekliyor' ? (
                                            <Button
                                                className={styles.btn_container}
                                                variant="primary"
                                                //disabled={isProcessing} // Disable if another order is in progress
                                                onClick={(e) => {
                                                    e.stopPropagation(); // Prevent row click event
                                                    handleStatusChange(
                                                        order,
                                                        'İşlenmekte'
                                                    );
                                                }}
                                            >
                                                Basla
                                            </Button>
                                        ) : order.orderStatus ===
                                          'İşlenmekte' ? (
                                            <Button
                                                className={styles.btn_container}
                                                variant="danger"
                                                onClick={(e) => {
                                                    e.stopPropagation(); // Prevent row click event
                                                    handleStatusChange(
                                                        order,
                                                        'Beklemede'
                                                    );
                                                }}
                                            >
                                                Durdur
                                            </Button>
                                        ) : order.orderStatus ===
                                          'Beklemede' ? (
                                            <Button
                                                className={styles.btn_container}
                                                variant="success"
                                                onClick={(e) => {
                                                    e.stopPropagation(); // Prevent row click event
                                                    handleStatusChange(
                                                        order,
                                                        'İşlenmekte'
                                                    );
                                                }}
                                            >
                                                Tekrar Baslat
                                            </Button>
                                        ) : null}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Pagination>
                    {[...Array(totalPages).keys()].map((page) => (
                        <Pagination.Item
                            key={page}
                            active={page === currentPage}
                            onClick={() => handlePageChange(page)}
                        >
                            {page + 1}
                        </Pagination.Item>
                    ))}
                </Pagination>
            </main>
        </>
    );
};

export default Order;

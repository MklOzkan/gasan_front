'use client';

import React from 'react';
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
import styles from './kalite-kontrol-main-page.module.scss';
import { useRouter } from 'next/navigation';

const KaliteKontrol = ({ data, currentPage, sortBy, sortOrder }) => {
    const { content, totalPages } = data;
    const router = useRouter();


    const handleRowClick = (order) => {
        router.push(`/dashboard/kalite-kontrol-amiri/${order.id}`); // Use Next.js router for redirection
    };

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

    // Handle reset
    const handleReset = () => {
        const url = new URL(window.location);
        url.searchParams.set('sortBy', 'orderDate');
        url.searchParams.set('sortOrder', 'desc');
        url.searchParams.delete('currentPage'); 
        window.location.href = url.toString();
    };

    // Handle page change
    const handlePageChange = (page) => {
        const url = new URL(window.location);
        url.searchParams.set('currentPage', page);
        window.location.href = url.toString();
    };

    return (
        <>
            <PageHeader>Kalite Kontrol Amiri</PageHeader>
            <main className={styles.main_container}>
                <div className={styles.row_container}>
                    <Col className={styles.colum_inner}>
                        <Form.Group controlId="sortBy">
                            <Form.Label>Sırala</Form.Label>
                            <Form.Control
                                as="select"
                                name="sortBy"
                                value={sortBy}
                                onChange={handleSortChange}
                            >
                                <option value="orderDate">
                                    Sipariş Tarihi
                                </option>
                                <option value="deliveryDate">
                                    Teslim Tarihi
                                </option>
                                <option value="orderNumber">Sipaş No</option>
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
                                onChange={handleSortChange}
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
                            variant="secondary"
                            onClick={handleReset}
                        >
                            Reset
                        </Button>
                    </Col>
                </div>

                <div className={styles.table_responsive}>
                    <table>
                        <thead className={styles.table_head}>
                            <tr >
                                <th>Müşter Adı</th>
                                <th>Gasan No</th>
                                <th>Sipariş No</th>
                                <th>Sipariş Tarihi</th>
                                <th>Teslim Tarihi</th>
                                <th>Sipariş Türü</th>
                                <th>Sipariş Adedi</th>
                                <th>Sipariş Durumu</th>
                                <th>Hazır Mil Adedi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {content.map((order, index) => (
                                <tr
                                    key={index}
                                    className={`${styles.table_body}`}
                                    onClick={() => handleRowClick(order)}
                                >
                                    <td>{order.customerName}</td>
                                    <td>{order.gasanNo}</td>
                                    <td>{order.orderNumber}</td>
                                    <td>{order.orderDate}</td>
                                    <td>{order.deliveryDate}</td>
                                    <td>{order.orderType}</td>
                                    <td>{order.orderQuantity}</td>
                                    <td>{order.orderStatus}</td>
                                    <td>{order.readyMilCount}</td>
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

export default KaliteKontrol;

'use client';

import React from 'react';
import {
    Col,
    Pagination,
    Form,
    Button
} from 'react-bootstrap';
import PageHeader from '@/components/common/page-header';
import styles from './lift-montaj.module.scss';
import { useRouter } from 'next/navigation';

const LiftMontaj = ({ data, currentPage, sortBy, sortOrder }) => {
     const router = useRouter();
      const { content, page } = data;
      const { totalPages, number, totalElements, size } = page;

     const handleRowClick = (order) => {
         router.push(`/dashboard/lift-montaj-amiri/${order.id}`);
     };

    const handleSorting = (sortByField) => {
        const url = new URL(window.location);

        // If the sortBy is already set to the same field, toggle the sortOrder
        let currentSortOrder = url.searchParams.get('sortOrder') || 'asc';
        let newSortOrder = currentSortOrder === 'asc' ? 'desc' : 'asc';

        // Update the URL with the new sort parameters
        url.searchParams.set('sortBy', sortByField);
        url.searchParams.set('sortOrder', newSortOrder);

        // Navigate to the updated URL
        router.push(url.toString());
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
        url.searchParams.set('currentPage', page); // Set the new page number
        router.push(url.toString()); // Use router.push for navigation
    };

    return (
        <>
            <PageHeader>Lift Montaj Amiri </PageHeader>
            <main className={styles.main_container}>
                <div className={styles.button_container}>
                    <Col className={`${styles.outer_reset}`}>
                        <button
                            type="button"
                            className={styles.inner_reset}
                            onClick={handleReset} // Reset sorting and pagination
                        >
                            Sıralamayı Sıfırla
                        </button>
                    </Col>
                </div>
                <div className={styles.table_responsive}>
                    <table>
                        <thead className={styles.table_head}>
                            <tr>
                                <th
                                    style={{ cursor: 'pointer' }}
                                    onClick={() =>
                                        handleSorting('customerName')
                                    }
                                >
                                    Müşter Adı
                                    {sortBy === 'customerName' &&
                                        (sortOrder === 'asc' ? ' 🔼' : ' 🔽')}
                                </th>
                                <th>Gasan No</th>
                                <th>Sipariş No</th>
                                <th
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => handleSorting('orderDate')}
                                >
                                    Sipariş Tarihi
                                    {sortBy === 'orderDate' &&
                                        (sortOrder === 'asc' ? ' 🔼' : ' 🔽')}
                                </th>
                                <th
                                    style={{ cursor: 'pointer' }}
                                    onClick={() =>
                                        handleSorting('deliveryDate')
                                    }
                                >
                                    Teslim Tarihi
                                    {sortBy === 'deliveryDate' &&
                                        (sortOrder === 'asc' ? ' 🔼' : ' 🔽')}
                                </th>
                                <th
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => handleSorting('orderType')}
                                >
                                    Sipariş Türü
                                    {sortBy === 'orderType' &&
                                        (sortOrder === 'asc' ? ' 🔼' : ' 🔽')}
                                </th>
                                <th>Sipariş Adedi</th>
                                <th
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => handleSorting('orderStatus')}
                                >
                                    Durumu
                                    {sortBy === 'orderStatus' &&
                                        (sortOrder === 'asc' ? ' 🔼' : ' 🔽')}
                                </th>
                                <th>Hazır Mil Adedi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {content.map((order, index) => (
                                <tr
                                    key={index}
                                    className={`${styles.table_body}`}
                                    onClick={
                                        order.orderStatus ===
                                        'İşlenmeyi Bekliyor'
                                            ? null
                                            : () => handleRowClick(order)
                                    }
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

export default LiftMontaj;

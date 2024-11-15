'use client';

import React, { useState, useEffect } from 'react';
import {
    Button
} from 'react-bootstrap';
import PageHeader from '@/components/common/page-header';
import { useRouter } from 'next/navigation';
import { Paginations } from '@/components/common/Paginations';
import { updateOrderStatus } from '@/actions/order-actions';
import styles from './talasli.module.scss';
import { swAlert } from '@/helpers/swal';
import { wait } from '@/utils/wait';
import Spacer from '@/components/common/spacer';

const Order = ({ data, currentPage, sortBy, sortOrder }) => {
    const { content, page } = data;
    const { totalPages, number, totalElements, size } = page;
    const router = useRouter();
     const [currentUrl, setCurrentUrl] = useState('');

    // Check if any order has the status 'İşlenmekte'
    useEffect(() => {

        const url = new URL(window.location.href);

        setCurrentUrl(url.pathname);
        router.push(url.toString());
        
    }, [data, router]);

    // Handle order status change (start or stop processing an order)
    const handleStatusChange = async (order, newStatus) => {
        
        try {
            const response = await updateOrderStatus(order.id, newStatus); 
            if (response && response.success) {
                swAlert(response.message, 'success');
                await wait(2000);
            } else {
            }
        } catch (error) {
            swAlert('Bir hata oluştu. Lütfen tekrar deneyin.', 'error');
        }
    };

    const handleRowClick = (order) => {
            router.push(`/dashboard/talasli-imalat-amiri/lift/${order.id}`);
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
        window.location.href = url.toString();
    };

    const handlePageChange = (pageIn) => {
        const url = new URL(window.location);
        url.searchParams.set('currentPage', pageIn); // Set the new page number
        router.push(url.toString()); // Use router.push for navigation
    };

    return (
        <>
            <PageHeader>Talasli Imalat Amiri</PageHeader>
            <Spacer height={30} />
            <main className={styles.main_container}>
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
                                <th
                                    style={{ cursor: 'pointer' }}
                                    onClick={() =>
                                        handleSorting('gasanNo')
                                    }
                                >
                                    Gasan No{' '}
                                    {sortBy === 'gasanNo' &&
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
                                    Sipariş Durumu
                                    {sortBy === 'orderStatus' &&
                                        (sortOrder === 'asc' ? ' 🔼' : ' 🔽')}
                                </th>
                                <th>Hazır Mil Adedi</th>
                                <th>Başla/Durdur</th>
                            </tr>
                        </thead>
                        <tbody>
                            {content.map((order, index) => (
                                <tr
                                    key={index}
                                    className={
                                        order.orderStatus === 'İşlenmekte' ||
                                        order.orderStatus === 'Beklemede'
                                            ? `${styles.table_body} ${styles.islenmekte}`
                                            : order.orderStatus === 'Tamamlandı'
                                            ? `${styles.table_body} ${styles.tamamlandi}`
                                            : order.orderStatus ===
                                              'İptal Edildi'
                                            ? `${styles.table_body} ${styles.iptal}`
                                            : `${styles.table_body}`
                                    }
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
                                    <td>{order.customerName}</td>
                                    <td>{order.gasanNo}</td>
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
                                                    handleStatusChange(order);
                                                }}
                                            >
                                                Başla
                                            </Button>
                                        ) : order.orderStatus ===
                                          'İşlenmekte' ? (
                                            <Button
                                                className={styles.btn_container}
                                                variant="danger"
                                                onClick={(e) => {
                                                    e.stopPropagation(); // Prevent row click event
                                                    handleStatusChange(order);
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
                                                    handleStatusChange(order);
                                                }}
                                            >
                                                Tekrar Başlat
                                            </Button>
                                        ) : null}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Paginations
                    baseUrl={currentUrl}
                    currentPage={number + 1}
                    size={size}
                    totalPages={totalPages}
                />
            </main>
        </>
    );
};

export default Order;

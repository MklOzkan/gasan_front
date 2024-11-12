'use client';

import React, { useState, useEffect } from 'react';
import { Paginations } from '@/components/common/Paginations';
import PageHeader from '@/components/common/page-header';
import { useRouter } from 'next/navigation';
import Spacer from '@/components/common/spacer';
import styles from './block-lift.module.scss';

const BlockLift = ({ data, currentPage, sortBy, sortOrder }) => {
    const { content, page } = data;
    const { totalPages, number, totalElements, size } = page;
    const router = useRouter();
    const [currentUrl, setCurrentUrl] = useState('');
   
    useEffect(() => {
        const url = new URL(window.location.href);

        setCurrentUrl(url.pathname);
        router.push(url.toString());
    }, [data, router]);

    const handleRowClick = (order) => {
        router.push(`/dashboard/bloklift-montaj-amiri/${order.id}`);
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

    return (
        <>
            <PageHeader>Blok Lift Amiri</PageHeader>
            <Spacer height={20} />
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
                                    onClick={() => handleSorting('gasanNo')}
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
                                    Durumu
                                    {sortBy === 'orderStatus' &&
                                        (sortOrder === 'asc' ? ' 🔼' : ' 🔽')}
                                </th>
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
                                    onClick={
                                        order.orderStatus ===
                                        'İşlenmeyi Bekliyor'
                                            ? null
                                            : () => handleRowClick(order)
                                    }
                                >
                                    <td>{order.customerName}</td>
                                    <td>{order.orderDate}</td>
                                    <td>{order.deliveryDate}</td>
                                    <td>{order.orderType}</td>
                                    <td>{order.orderQuantity}</td>
                                    <td>{order.orderStatus}</td>
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

export default BlockLift;

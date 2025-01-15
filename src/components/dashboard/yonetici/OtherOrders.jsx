'use client';

import { useState, useEffect } from 'react';
import { Pagination } from 'react-bootstrap';
import { useRouter } from 'next/navigation';

import styles from '@/styles/dashboard/uretim/raporlar/customer-orders.module.scss';
import { Paginations } from '@/components/common/Paginations';

const OtherOrders = ({ orders, searchParams }) => {
    const { content, page } = orders;
    const { totalPages, number, totalElements, size } = page;
    const sortBy = searchParams.sortBy || 'orderDate';
    const sortOrder = searchParams.sortOrder || 'desc';
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [filteredContent, setFilteredContent] = useState(content);
    const [currentUrl, setCurrentUrl] = useState('');

    const resetSearch = () => setSearchTerm('');
    const resetStartDate = () => setStartDate('');
    const resetEndDate = () => setEndDate('');

    useEffect(() => {
        const url = new URL(window.location.href);

        setCurrentUrl(url.pathname);
        router.push(url.toString());
        
    }, [searchTerm, startDate, endDate, content, router]);

    const handleRowClick = (order) => {
        router.push(`/dashboard/yonetici-menu/musteri-islemleri/${order.id}`);
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
        <main className={styles.main_container}>
            <div className={styles.table_responsive}>
                <table>
                    <thead className={styles.table_head}>
                        <tr>
                            <th
                                style={{ cursor: 'pointer' }}
                                onClick={() => handleSorting('customerName')}
                            >
                                Müşteri Adı
                                {sortBy === 'customerName' &&
                                    (sortOrder === 'asc' ? ' 🔼' : ' 🔽')}
                            </th>
                            <th>Gasan No</th>
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
                                onClick={() => handleSorting('deliveryDate')}
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
                            <th>Hazır Mil</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredContent.map((order, index) => (
                            <tr
                                key={index}
                                className={`${styles.table_body} ${
                                    order.orderStatus ===
                                        'İşlenmeyi Bekliyor' ||
                                    order.orderStatus === 'İptal'
                                        ? order.orderStatus ===
                                          'İşlenmeyi Bekliyor'
                                            ? ''
                                            : styles.cancelled
                                        : order.orderStatus === 'İşlenmekte' ||
                                          order.orderStatus === 'Beklemede'
                                        ? styles.processing
                                        : styles.completed
                                }`}
                                onClick={() => handleRowClick(order)}
                            >
                                <td>{order.customerName}</td>
                                <td>{order.gasanNo}</td>
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
            <div className={styles.pagination}>
                <Paginations
                    baseUrl={currentUrl}
                    currentPage={number + 1}
                    size={size}
                    totalPages={totalPages}
                />
            </div>
        </main>
    );
};

export default OtherOrders;

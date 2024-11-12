'use client';

import { useEffect, useState } from 'react'
import { Paginations } from '@/components/common/Paginations';
import PageHeader from '@/components/common/page-header';
import { useRouter } from 'next/navigation'; // Use Next.js router for redirection
import Spacer from '@/components/common/spacer';
import { RxReset } from 'react-icons/rx';
import Link from 'next/link';
import styles from './musteri-islemleri.module.scss';

const MusteriIslemleri = ({ data, sortBy, sortOrder }) => {
    const { content, page } = data;
    const { totalPages, number, totalElements, size } = page;
    const [currentUrl, setCurrentUrl] = useState('');
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [filteredContent, setFilteredContent] = useState(content);
    const resetSearch = () => setSearchTerm('');
    const resetStartDate = () => setStartDate('');
    const resetEndDate = () => setEndDate('');

   useEffect(() => {
       const url = new URL(window.location.href);

       setCurrentUrl(url.pathname);

       if (searchTerm) url.searchParams.set('searchTerm', searchTerm);
       else url.searchParams.delete('searchTerm');
       if (startDate) url.searchParams.set('startDate', startDate);
       else url.searchParams.delete('startDate');
       if (endDate) url.searchParams.set('endDate', endDate);
       else url.searchParams.delete('endDate');

       setFilteredContent(content);
       router.push(url.toString());
   }, [data, searchTerm, startDate, endDate, content, router]);

    const handleRowClick = (order) => {
            router.push(
                `/dashboard/yonetici-menu/musteri-islemleri/${order.id}`
            );
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

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <>
            <PageHeader>Müşterİ İşlemlerİ</PageHeader>
            <Spacer height={30} />
            <div className={styles.filter_container}>
                <div>
                    <Link
                        href={
                            '/dashboard/yonetici-menu/musteri-islemleri/musteri-reports/'
                        }
                    >
                        All Report
                    </Link>
                </div>
                <div className={styles.search}>
                    <div className={styles.search_clear}>
                        <select name="" id=""></select>
                        <input
                            type="text"
                            placeholder="Arama"
                            value={searchTerm}
                            className={styles.search_input}
                            onChange={handleSearch}
                        />
                        {searchTerm && (
                            <button
                                onClick={resetSearch}
                                className={styles.clear_button}
                            >
                                <RxReset />
                            </button>
                        )}
                    </div>
                </div>
                <div className={styles.start_date}>
                    <label htmlFor="startDate" className="me-2">
                        Başlangıç Tarihi
                    </label>
                    <div className={styles.search_clear}>
                        <input
                            type="date"
                            name="startDate"
                            value={startDate}
                            className={styles.search_input}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                        {startDate && (
                            <button
                                onClick={resetStartDate}
                                className={styles.clear_button}
                            >
                                <RxReset />
                            </button>
                        )}
                    </div>
                </div>

                <div className={styles.end_date}>
                    <label htmlFor="endDate" className="me-2">
                        Bitiş Tarihi
                    </label>
                    <div className={styles.search_clear}>
                        <input
                            type="date"
                            name="endDate"
                            value={endDate}
                            className={styles.search_input}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                        {endDate && (
                            <button
                                onClick={resetEndDate}
                                className={styles.clear_button}
                            >
                                <RxReset />
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <Spacer height={10} />
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

export default MusteriIslemleri;
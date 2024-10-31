'use client';

import { useEffect, useState } from 'react'
import Pagination from 'react-bootstrap/Pagination'
import styles from './musteri-islemleri.module.scss'

import PageHeader from '@/components/common/page-header';
import { useRouter } from 'next/navigation'; // Use Next.js router for redirection
import { updateOrderStatus } from '@/actions/order-actions'; // External function for API call
import { swAlert } from '@/helpers/swal';
import { wait } from '@/utils/wait';
import Spacer from '@/components/common/spacer';
import { RxReset } from 'react-icons/rx';

const MusteriIslemleri = ({ data, currentPage, sortBy, sortOrder }) => {
    const { content, page } = data;
    const { totalPages, number, totalElements, size } = page;
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [filteredContent, setFilteredContent] = useState(content);

    const resetSearch = () => setSearchTerm('');
    const resetStartDate = () => setStartDate('');
    const resetEndDate = () => setEndDate('');

   useEffect(() => {
       let filteredData = content;

       // Apply search filter
       if (searchTerm) {
           filteredData = filteredData.filter((order) =>
               order.customerName
                   .toLowerCase()
                   .includes(searchTerm.toLowerCase())
           );
       }

       // Apply date range filter
       if (startDate) {
           filteredData = filteredData.filter(
               (order) => new Date(order.orderDate) >= new Date(startDate)
           );
       }
       if (endDate) {
           filteredData = filteredData.filter(
               (order) => new Date(order.orderDate) <= new Date(endDate)
           );
       }

       setFilteredContent(filteredData);
   }, [searchTerm, startDate, endDate, content]);

   console.log(content);

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

    const handlePageChange = (pageIn) => {
        const url = new URL(window.location);
        url.searchParams.set('currentPage', pageIn); // Set the new page number
        router.push(url.toString()); // Use router.push for navigation
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <>
            <PageHeader>Müşterİ İşlemlerİ</PageHeader>
            <Spacer height={30} />
            <div className={styles.filter_container}>
                <div className={styles.search}>
                    <div className={styles.search_clear}>
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
                                              'İşlenmeyi Bekliyor' ? '' : styles.cancelled
                                            : order.orderStatus ===
                                                  'İşlenmekte' ||
                                              order.orderStatus === 'Beklemede'
                                            ? styles.processing
                                            : styles.completed
                                    }`}
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
                    {[...Array(totalPages).keys()].map((pageIn) => (
                        <Pagination.Item
                            key={pageIn}
                            active={pageIn === number - 1}
                            onClick={() => handlePageChange(pageIn)}
                        >
                            {pageIn + 1}
                        </Pagination.Item>
                    ))}
                </Pagination>
            </main>
        </>
    );
};

export default MusteriIslemleri;
'use client';
import DataTable, { Column } from '@/components/common/form-fields/data-table';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import OrderToolbar from './OrderToolbar';
import PageHeader from '@/components/common/page-header';
import Spacer from '@/components/common/spacer';
import { FaPlus } from 'react-icons/fa';
import styles from './uretim-list.module.scss';
import OrderList from './OrderList';
import { useRouter } from 'next/navigation';
import { RxReset } from 'react-icons/rx';
import { BiReset } from 'react-icons/bi';

const Uretim = ({ data, sortBy, sortOrder }) => {
    const { content, page} = data;
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
        setCurrentUrl(new URL(window.location.href).pathname);

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
    }, [data, searchTerm, startDate, endDate, content]);

   

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


    const handlePageChange = (page) => {
        const url = new URL(window.location);
        url.searchParams.set('currentPage', page); // Set the new page number
        router.push(url.toString()); // Use router.push for navigation
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <>
            <PageHeader>Üretİm Planlama</PageHeader>
            <Spacer height={10} />
            <main className={styles.main_container}>
                <div className={styles.inner_container}>
                    <div className={styles.button_container}>
                        <Link
                            href="/dashboard/uretim/new"
                            className={styles.btn}
                            type="button"
                            title="Sipariş Oluştur"
                        >
                            <FaPlus />
                            Yeni Sipariş
                        </Link>
                    </div>
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
                                    onChange={(e) =>
                                        setStartDate(e.target.value)
                                    }
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
                </div>

                <OrderList
                    currentUrl={currentUrl}
                    orders={filteredContent}
                    totalPages={totalPages}
                    currentpage={number}
                    totalElements={totalElements}
                    sortBy={sortBy}
                    sortOrder={sortOrder}
                    handlePageChange={handlePageChange}
                    handleSorting={handleSorting}
                />

                {/* <DataTable
                    name="uretimList"
                    title="Sipariş Listesi"
                    dataSource={content}
                    dataKey="id"
                    totalPages={totalPages}
                    currentPage={number}
                    pageSize={size}
                >
                    <Column index={true}>#</Column>
                    <Column dataField="customerName">Müşteri Adı</Column>
                    <Column dataField="gasanNo">Gasan No</Column>
                    <Column dataField="orderNumber">Sipariş No</Column>
                    <Column dataField="orderDate">Sipariş Tarihi</Column>
                    <Column dataField="deliveryDate">Teslim Tarihi</Column>
                    <Column dataField="orderType">Sipariş Türü</Column>
                    <Column dataField="orderQuantity">Sipariş Miktarı</Column>
                    <Column dataField="readyMilCount">Hazir Mil Miktarı</Column>
                    <Column dataField="orderStatus">Sipariş Durumu</Column>

                    <Column template={handleToolbar}></Column>
                </DataTable> */}
            </main>
        </>
    );
};

export default Uretim;

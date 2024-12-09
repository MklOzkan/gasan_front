'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import PageHeader from '@/components/common/page-header';
import Spacer from '@/components/common/spacer';
import { FaPlus } from 'react-icons/fa';
import styles from './uretim-list.module.scss';
import OrderList from './OrderList';
import { useRouter } from 'next/navigation';
import { RxReset } from 'react-icons/rx';
import DownloadButton from '@/components/common/form-fields/DownloadButton';

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
                        <DownloadButton />
                        <Link
                            className={styles.btn}
                            href={
                                '/dashboard/yonetici-menu/musteri-islemleri/musteri-reports/'
                            }
                        >
                            Rapor
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
                    currentPage={number + 1}
                    totalElements={totalElements}
                    sortBy={sortBy}
                    sortOrder={sortOrder}
                    handlePageChange={handlePageChange}
                    handleSorting={handleSorting}
                    size={size}
                />
            </main>
        </>
    );
};

export default Uretim;

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
import { Col } from 'react-bootstrap';

const Uretim = ({ data, sortBy, sortOrder }) => {
    const { content, page} = data;
    const { totalPages, number, totalElements, size } = page;
    const [currentUrl, setCurrentUrl] = useState('');
    const router = useRouter();
    console.log('data :>> ', data);

    useEffect(() => {
        setCurrentUrl(new URL(window.location.href).pathname);
    }, [data]);

   

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


    // Handle sorting reset (Reset button functionality)
    const handleReset = () => {
        const url = new URL(window.location);
        url.searchParams.delete('sortBy');
        url.searchParams.delete('sortOrder');
        url.searchParams.delete('currentPage'); // Reset to the first page
        window.location.href = url.toString(); // Reload with cleared params
    };

    const handlePageChange = (page) => {
        const url = new URL(window.location);
        url.searchParams.set('currentPage', page); // Set the new page number
        router.push(url.toString()); // Use router.push for navigation
    };

    return (
        <>
            <PageHeader>Üretİm Planlama</PageHeader>
            <Spacer height={10} />
            <main className={styles.main_container}>
                <div className={styles.button_container}>
                    <Link
                        href="/dashboard/uretim/new"
                        className={styles.btn}
                        type="button"
                        title="Sipariş Oluştur"
                    >
                        <FaPlus /> Sipariş Oluştur
                    </Link>
                    <Spacer height={10} />
                    <Col
                        className={`${styles.outer_reset}`}
                    >
                        <button
                            type='button'
                            className={styles.inner_reset}
                            onClick={handleReset} // Reset sorting and pagination
                        >
                            Sıralamayı Sıfırla
                        </button>
                    </Col>
                </div>

                <OrderList
                    currentUrl={currentUrl}
                    orders={content}
                    totalPages={totalPages}
                    currentpage={number}
                    totalElements={totalElements}
                    sortBy={sortBy}
                    sortOrder={sortOrder}
                    handleReset={handleReset}
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

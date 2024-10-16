'use client';
import DataTable, { Column } from '@/components/common/form-fields/data-table';
import Link from 'next/link';
import React, { useEffect} from 'react';
import OrderToolbar from './OrderToolbar';
import PageHeader from '@/components/common/page-header';
import Spacer from '@/components/common/spacer';
import {
    FaPlus
} from 'react-icons/fa';
import styles from './uretim-list.module.scss';

const OrderList = ({ data }) => {
    const { content, totalPages, number, size } = data;

    useEffect(() => {
        console.log('data', data);
    }, [data]);

    const handleToolbar = (row) => {
        return <OrderToolbar row={row} />;
    };

    return (
        <>
            <PageHeader>Üretim Planlama</PageHeader>
            <Spacer height={50} />
            <main className={styles.main_container}>
                <Link
                    href="/dashboard/uretim/new"
                    className={styles.btn}
                    type='button'
                    title='Sipariş Oluştur'
                >
                    <FaPlus /> Sipariş Oluştur
                </Link>

                <DataTable
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
                </DataTable>
            </main>
        </>
    );
};

export default OrderList;

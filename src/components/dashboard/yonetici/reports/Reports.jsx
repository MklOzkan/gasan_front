'use client';

import React, { useEffect, useState } from 'react';
import { getAllReportAction } from '@/actions/yonetici-actions';
import DateSection from './DateSection.jsx';
import styles from './reports.module.scss';
import ReportSection from './ReportSection.jsx';
import PageHeader from '@/components/common/page-header.jsx';

const reportsOrder = ['LIFT', 'DAMPER', 'BLOKLIFT', 'PASLANMAZ'];

export default function Reports({ data }) {
    const activeReports = data?.returnBody2;
    const completedReports = data?.returnBody;
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const resetStartDate = () => setStartDate('');
    const resetEndDate = () => setEndDate('');
    const [filteredContent, setFilteredContent] = useState(completedReports);
    const tamamlanan = 'TAMAMLANAN ÜRETİM';
    const devamEden = 'DEVAM EDEN ÜRETİM';
    const totalOrdersActive = activeReports.reduce((acc, item) => {
        return acc + item.totalOrderCount;
    }, 0);

    const totalOrderQuantityActive = activeReports.reduce((acc, item) => {
        return acc + item.totalOrderQuantity;
    }, 0);

    const totalCompletedOrderQuantityActive = activeReports.reduce(
        (acc, item) => {
            return acc + item.completedOrderQuantity;
        },
        0
    );

    const totalScrapCountActive = activeReports.reduce((acc, item) => {
        return acc + item.totalScrapCount;
    }, 0);

    const totalOrders = filteredContent.reduce((acc, item) => {
        return acc + item.totalOrderCount;
    }, 0);

    const totalOrderQuantity = filteredContent.reduce((acc, item) => {
        return acc + item.totalOrderQuantity;
    }, 0);

    const totalCompletedOrderQuantity = filteredContent.reduce((acc, item) => {
        return acc + item.completedOrderQuantity;
    }, 0);

    const totalScrapCount = filteredContent.reduce((acc, item) => {
        return acc + item.totalScrapCount;
    }, 0);

    useEffect(() => {}, [data, startDate, endDate, filteredContent]);

    const sortedReports = [...activeReports].sort((a, b) => {
        return (
            reportsOrder.indexOf(a.orderType) -
            reportsOrder.indexOf(b.orderType)
        );
    });
    console.log(sortedReports);
    

    const handleSubmit = async (start, end) => {
        const response = await getAllReportAction(start, end);
        const data = response?.returnBody;
        console.log('data in handleSearch', data);
        setFilteredContent(data);
    };

    return (
        <>
            <PageHeader>Raporlar</PageHeader>
            <main className={styles.container}>
                <ReportSection
                    sortedReports={sortedReports}
                    totalOrders={totalOrdersActive}
                    totalOrderQuantity={totalOrderQuantityActive}
                    totalCompletedOrderQuantity={totalCompletedOrderQuantityActive}
                    totalScrapCount={totalScrapCountActive}
                    section={devamEden}
                />
                <div className={styles.copletedContainer}>
                    <DateSection
                        startDate={startDate}
                        endDate={endDate}
                        setStartDate={setStartDate}
                        setEndDate={setEndDate}
                        resetStartDate={resetStartDate}
                        resetEndDate={resetEndDate}
                        handleSubmit={handleSubmit}
                    />
                    <ReportSection
                        sortedReports={filteredContent}
                        totalOrders={totalOrders}
                        totalOrderQuantity={totalOrderQuantity}
                        totalCompletedOrderQuantity={
                            totalCompletedOrderQuantity
                        }
                        totalScrapCount={totalScrapCount}
                        section={tamamlanan}
                    />
                </div>
            </main>
        </>
    );
}

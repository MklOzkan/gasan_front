'use client';

import PageHeader from '@/components/common/page-header';
import React, { useEffect, useState } from 'react';
import KaliteKontrolChart from './KaliteKontrolChart';
import CurrentOrder from './CurrentOrderChart';
import OtherOrders from './CustomerOrders';
import Spacer from '@/components/common/spacer';
import styles from '@/styles/dashboard/uretim/raporlar/customer-reports.module.scss';
import MontajReports from './MontajReports';

const CustomerReports = ({ data, searchParams }) => {
    const {
        returnBody1,
        returnBody2,
        returnBody3,
        returnBody4,
        returnBody5,
        returnBody6,
        returnBody7,
        returnBody8,
        returnBody9
    } = data;
    const [montajHurda, setMontajHurda] = useState(0);
    const [kaliteHurda, setKaliteHurda] = useState(0);
    const [toggle, setToggle] = useState(false);
    const [operations, setOperations] = useState([]);

    useEffect(() => {
        if (returnBody1.orderType === 'Lift' || returnBody1.orderType === 'Paslanmaz') {
            setOperations(returnBody5 || []);
        } else if (returnBody1.orderType === 'Blok Lift'|| returnBody1.orderType === 'Damper') {
            setOperations(returnBody6 || []);
        } else {
            setOperations([]);
        }

        setKaliteHurda(
            returnBody8.reduce((acc, item) => acc + item.scrapCount, 0)
        );
        setMontajHurda(
            returnBody5.reduce((acc, item) => acc + item.scrapCountAfterTest, 0)
        );
    }, [returnBody1, returnBody5, returnBody8, returnBody6]);

    const handleToggle = () => {
        setToggle(!toggle);
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.order_container}>
                    <CurrentOrder
                        order={returnBody1}
                        production={returnBody2}
                        talasli={returnBody3}
                        polisaj={returnBody4}
                        lift={returnBody5}
                        blok={returnBody6}
                        boyaPaket={returnBody7}
                        kalite={returnBody8}
                    />
                </div>
                <div className={styles.blok_container}>
                    <div className={styles.outer_container}>
                        <div className={styles.chart_container}>
                            {returnBody8 &&
                                returnBody8.map((item, index) => (
                                    <KaliteKontrolChart
                                        key={index}
                                        kaliteKontrol={item}
                                    />
                                ))}
                        </div>
                        <button
                            className={styles.button}
                            onClick={() => {
                                handleToggle();
                            }}
                        >
                            {`Montaj'dakİ Hurda: ${montajHurda}`}
                        </button>
                        {toggle && (
                            <MontajReports
                                montaj={operations}
                                isToggleOpen={toggle}
                            />
                        )}
                        <h2 className={styles.h3}>
                            {`Kalİte Kontrol'dakİ Hurda: ${kaliteHurda}`}
                        </h2>
                        <h2 className={styles.h2}>
                            {`Toplam Hurda: ${montajHurda + kaliteHurda}`}
                        </h2>
                    </div>

                    <div className={styles.others_container}>
                        <OtherOrders
                            orders={returnBody9}
                            searchParams={searchParams}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default CustomerReports;

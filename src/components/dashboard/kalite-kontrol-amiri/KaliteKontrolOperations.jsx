'use client';

import PageHeader from '@/components/common/page-header';
import React from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import OrderForOperation from '@/components/common/form-fields/OrderInfo';
import Spacer from '@/components/common/spacer';
import { useRouter } from 'next/navigation';
import styles from './kalite-kontrol-operations.module.scss';

const kaliteKontrolStages = {
    AFTER_POLISAJ: 'Polisaj Sonrası',
    AFTER_MONTAJ: 'Montaj Sonrası',
    AFTER_EZME: 'Ezme Sonrası',
    AFTER_MIL_TASLAMA: 'Mil Taşlama Sonrası'
};

const KaliteKontrolOperations = ({ responses }) => {
    const { returnBody, returnBody3 } = responses;
    const router = useRouter();

    const handleRowClick = (stage) => {
        router.push(`/dashboard/kalite-kontrol-amiri/stage/${stage.id}`);
    };

    return (
        <main >
            <PageHeader>Kalite Kontrol Amiri</PageHeader>
            <Spacer height={5} />
            <OrderForOperation order={returnBody} />
                <div className={styles.table_container}>
                    <table>
                        <thead>
                            <tr className={styles.table_head}>
                                <th>Kontrol Aşaması</th>
                                <th>Onay Bekleyen Adet</th>
                            </tr>
                                </thead>
                                {returnBody3.map((stage, index) => (
                                <tbody
                                    key={index}
                                    onClick={() => handleRowClick(stage)}
                                        >
                                        {kaliteKontrolStages[
                                                stage.kaliteKontrolStage
                                            ] && (
                                                <tr className={styles.table_body}>
                                                    <td>
                                                        {
                                                            kaliteKontrolStages[
                                                                stage.kaliteKontrolStage
                                                            ]
                                                        }
                                                    </td>
                                                    <td>{stage.milCount}</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    ))}
                                </table>
                    </div>
            
        </main>
    );
};

export default KaliteKontrolOperations;

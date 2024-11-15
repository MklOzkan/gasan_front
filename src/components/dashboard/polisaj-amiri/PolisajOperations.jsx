'use client';

import PageHeader from '@/components/common/page-header';
import Spacer from '@/components/common/spacer';
import React from 'react';
import Container from 'react-bootstrap/Container';
import OrderForOperation from '@/components/common/form-fields/OrderInfo';
import OperationButton from '@/components/dashboard/polisaj-amiri/operation-fields/OperationButton';
import styles from '@/styles/pages/main-page.module.scss'

const PolisajProduction = ({ order }) => {
    const { returnBody, returnBody2, returnBody3 } = order;

    return (
        <main className={styles.main_container}>
            <PageHeader>Polisaj Amiri </PageHeader>
            <Spacer height={5} />
            <OrderForOperation order={returnBody} />
            <Spacer height={5} />
            <OperationButton
                order={returnBody}
                operation={returnBody2}
                productionProcess={returnBody3}
            />
        </main>
    );
};

export default PolisajProduction;

'use client';

import React, { useState} from 'react';
import PageHeader from '@/components/common/page-header';
import Spacer from '@/components/common/spacer';
import OrderForOperation from '@/components/common/form-fields/order-for-operation';
import styles from './lift.module.scss';
import OperationButton from '@/components/dashboard/talasli-imalat-amiri/operation-fields/operation-button';

const LiftOrder = ({ order }) => {
    
    const {returnBody, returnBody2, returnBody3 } = order

    return (
        <>
            <main className= {styles.main_container}>
                <PageHeader>
                    Talaşlı İmalat amİrİ
                </PageHeader>
                <Spacer height={5} />
                <OrderForOperation order={returnBody} />
                <Spacer height={0} />
                <OperationButton
                    order={returnBody}
                    operations={returnBody2}
                    productionProcess={returnBody3}
                />
            </main>
        </>
    );
};

export default LiftOrder;

import OrderForOperation from '@/components/common/form-fields/OrderInfo';
import React from 'react';
import styles from './blok-lift-operations.module.scss';
import PageHeader from '@/components/common/page-header';
import Spacer from '@/components/common/spacer';
import UpdateButtons from './operation-fields/UpdateButtons';

const BlokLiftOperations = ({ order }) => {
    const { returnBody, returnBody2, returnBody3 } = order;
    return (
        <>
            <PageHeader>Blok Lİft Montaj Amİrİ</PageHeader>
            <Spacer height={5} />
            <OrderForOperation order={returnBody} />
            <Spacer height={5} />
            <UpdateButtons order={returnBody} operations={returnBody2} />
        </>
    );
};

export default BlokLiftOperations;

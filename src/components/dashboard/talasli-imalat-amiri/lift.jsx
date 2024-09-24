'use client';
import {
    Container,
    Row,
    Col,
    Table,
    Pagination,
    Form,
    Button
} from 'react-bootstrap';
import React, { useState} from 'react';
import PageHeader from '@/components/common/page-header';
import Spacer from '@/components/common/spacer';
import OrderForOperation from '@/components/common/form-fields/order-for-operation';
import  './lift.scss';
import OperationButton from '@/components/common/operation-fields/operation-button';

const LiftOrder = ({ order }) => {
    
    const {returnBody, returnBody2, returnBody3 } = order

    return (
        <>
            <Container fluid>
                {' '}
                {/* CHANGED: Wrapped content in a Container for proper layout */}
                <PageHeader>
                    Talaşlı İmalat amİrİ
                </PageHeader>
                <Spacer height={10} />
                <OrderForOperation order={returnBody} />
                <Spacer height={20} />
                <OperationButton
                    order={returnBody}
                    operations={returnBody2}
                    productionProcess={returnBody3}
                />
            </Container>{' '}
            {/* CHANGED: Closed the Container */}
        </>
    );
};

export default LiftOrder;

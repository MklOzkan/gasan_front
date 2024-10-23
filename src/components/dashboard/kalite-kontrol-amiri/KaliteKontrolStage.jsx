'use client';
import { Container } from 'react-bootstrap';
import React, { useState } from 'react';
import PageHeader from '@/components/common/page-header';
import Spacer from '@/components/common/spacer';
import OrderForOperation from '@/components/common/form-fields/OrderInfo';
import './kalitekontrolstage.scss';
import OperationButton from '@/components/dashboard/kalite-kontrol-amiri/operation-fields/operation-button';

const KaliteKontrolStage = ({ responses }) => {
    const { returnBody, returnBody3 } = responses;
    const stages = {
        AFTER_POLISAJ: 'Polisaj Sonrası Kalite Kontrol',
        AFTER_MONTAJ: 'Montaj Sonrası Kalite Kontrol',
        AFTER_EZME: 'Ezme Sonrası Kalite Kontrol',
        AFTER_MIL_TASLAMA: 'Mil Taşlama Sonrası Kalite Kontrol'
    };

    return (
        <>
            <main>
                <PageHeader>Kalite Kontrol amİrİ</PageHeader>
                <h1 className="kalite-main kalite border">
                    {stages?.[returnBody3?.kaliteKontrolStage] ||
                        'Unknown Stage'}
                </h1>
                <Spacer height={5} />
                <OrderForOperation order={returnBody} />
                <Spacer height={30} />
                <OperationButton order={returnBody} stage={returnBody3} />
            </main>
        </>
    );
};

export default KaliteKontrolStage;

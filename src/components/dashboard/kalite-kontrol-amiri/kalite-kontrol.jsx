'use client';

import React from 'react';
import PageHeader from '@/components/common/page-header';
import Logout from '@/components/common/form-fields/logout-button.jsx';

const KaliteKontrolPage = () => {
    return (
        <>
            <PageHeader>
                KALİTE KONTROL AMİRİ
                <Logout />
            </PageHeader>
        </>
    );
};

export default KaliteKontrolPage;

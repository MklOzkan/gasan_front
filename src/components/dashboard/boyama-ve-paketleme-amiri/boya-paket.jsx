'use client';

import React from 'react';
import PageHeader from '@/components/common/page-header';
import Logout from '@/components/common/form-fields/logout-button.jsx';

const BoyaPaketPage = () => {
    return (
        <>
            <PageHeader>
                BOYA VE PAKETLEME AMİRİ
                <Logout />
            </PageHeader>
        </>
    );
};

export default BoyaPaketPage;

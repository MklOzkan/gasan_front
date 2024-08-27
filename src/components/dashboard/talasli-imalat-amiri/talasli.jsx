'use client';

import React from 'react';
import PageHeader from '@/components/common/page-header';
import Logout from '@/components/common/form-fields/logout-button.jsx';

const TalasliPage = () => {
    return (
        <>
            <PageHeader>
                TALASLI İMALAT AMİRİ
                <Logout />
            </PageHeader>
        </>
    );
};

export default TalasliPage;

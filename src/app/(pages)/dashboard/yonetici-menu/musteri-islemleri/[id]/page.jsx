import React from 'react';
import CustomerPage from '@/components/dashboard/yonetici/CustomerPage';
import { getReports } from '@/services/yonetici-service';
import PageHeader from '@/components/common/page-header';
import ErrorPage from '@/components/common/errors/ErrorPage';
import Spacer from '@/components/common/spacer';

const YoneticiPage = async ({ params, searchParams }) => {
    
    try {
       if (!params.id) throw new Error('id is required', params.id);

    const res = await getReports(params.id);

    return (
        <>
            <CustomerPage data={res}
            searchParams={searchParams}

            />
        </>
    ); 
    }catch (error) {
        return (
            <>
                <PageHeader>MÜsterİ Raporlari</PageHeader>
                <Spacer height={150} />
                <ErrorPage message={error.message} />
            </>
        ); 
    }
    
};

export default YoneticiPage;

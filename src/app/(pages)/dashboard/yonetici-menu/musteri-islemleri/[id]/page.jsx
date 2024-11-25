import React from 'react';
import { getCustomerReport } from '@/actions/yonetici-actions';
import CustomerPage from '@/components/dashboard/yonetici/CustomerPage';

const YoneticiPage = async({ params, searchParams }) => {
    if (!params.id) throw new Error('id is required', params.id);

    const res = await getCustomerReport(params.id);

    return (
        <>
            <CustomerPage data={res}
            searchParams={searchParams}

            />
        </>
    );
};

export default YoneticiPage;

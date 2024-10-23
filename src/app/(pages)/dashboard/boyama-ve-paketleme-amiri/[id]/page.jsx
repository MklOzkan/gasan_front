import React from 'react';
import { fetchOrderById } from '@/services/boyapaketlemeamiri-service';
import BoyaPaketOperations from '@/components/dashboard/boyama-ve-paketleme-amiri/BoyaPaketOperations';

const BoyaPaketPage = async ({ params }) => {
    if (!params.id) throw new Error('id is required', params.id);

    console.log('params from BoyaPaketPage', params);

    const res = await fetchOrderById(params.id); // This returns a Response object

    const order = await res.json();

    console.log('order from BoyaPaketPage', order);

    if (!res.ok) throw new Error(order.message || 'Failed to fetch order data');
    return (
        <>
            <BoyaPaketOperations order={order} />
        </>
    );
};

export default BoyaPaketPage;

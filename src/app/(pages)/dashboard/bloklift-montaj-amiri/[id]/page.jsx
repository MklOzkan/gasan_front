import React from 'react';
import { fetchOrderById } from '@/services/talasliimalamiri-service';
import BlokliftOperations from '@/components/dashboard/bloklift-montaj-amiri/BlokLiftOperations';

const BlokLiftPage = async ({ params }) => {
    if (!params.id) throw new Error('id is required', params.id);
    
    const res = await fetchOrderById(params.id); // This returns a Response object
    if (!res.ok) throw new Error(order.message || 'Failed to fetch order data');
    const order = await res.json();

    console.log('order from BlokLiftPage', order);
    return (
        <>
            <BlokliftOperations order={order} />
        </>
    );
};

export default BlokLiftPage;

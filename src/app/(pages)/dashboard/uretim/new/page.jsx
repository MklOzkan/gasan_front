import dynamic from 'next/dynamic';
import React from 'react';

const OrderCrateForm = dynamic(
    () => import('@/components/dashboard/uretim/OrderCreate.jsx'),
    {
        ssr: false // This disables server-side rendering for this component
    }
);


const OrderCreatePage = () => {
    return (
        <>
            <OrderCrateForm />
        </>
    );
};

export default OrderCreatePage;

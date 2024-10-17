import Polisaj from '@/components/dashboard/polisaj-amiri/polisaj';
import { fetchDataPolisaj } from '@/services/polisajamiri-service';
import React from 'react';
import styles from '@/styles/pages/main-page.module.scss';

const PolisajAmiri = async ({ searchParams }) => {
    const currentPage = parseInt(searchParams.currentPage, 10) || 0;
    const sortBy = searchParams.sortBy || 'orderDate';
    const sortOrder = searchParams.sortOrder || 'desc';

    const res = await fetchDataPolisaj(currentPage, 10, sortBy, sortOrder);

    const data = await res.json();

    if (res.status !== 200) {
    
        return <div>Error: {res.statusText}</div>;
    }
    return (
        <>
            <Polisaj
                data={data}
                currentPage={currentPage}
                sortBy={sortBy}
                sortOrder={sortOrder}
                className= {styles.main_page}
            />
        </>
    );
};

export default PolisajAmiri;

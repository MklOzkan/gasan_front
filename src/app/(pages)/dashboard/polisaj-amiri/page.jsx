import Polisaj from '@/components/dashboard/polisaj-amiri/polisaj';
import { fetchDataPolisaj } from '@/services/polisajamiri-service';
import React from 'react';
import styles from '@/styles/pages/main-page.module.scss';

const PolisajAmiri = async (props) => {
      const searchParams = await props.searchParams;
      const currentPage = Math.max(parseInt(searchParams.page, 10) || 1, 1);
      const sortBy = searchParams.sortBy || 'orderDate';
      const sortOrder = searchParams.sortOrder || 'desc';

    const res = await fetchDataPolisaj(currentPage - 1, 10, sortBy, sortOrder);
    
    if (res.status !== 200) {
        return <div>Error: {res.statusText}</div>;
    }

    const data = await res.json();

    
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

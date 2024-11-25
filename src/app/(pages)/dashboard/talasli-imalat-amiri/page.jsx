import TalasliPage from '@/components/dashboard/talasli-imalat-amiri/talasli';
import { fetchOrders } from '@/services/talasliimalamiri-service';
import React from 'react';
import styles from '@/styles/pages/main-page.module.scss';

const Talasli = async (props) => {
    const searchParams = await props.searchParams;
    const currentPage = Math.max(parseInt(searchParams.page, 10) || 1, 1);
    const sortBy = searchParams.sortBy || 'orderDate';
    const sortOrder = searchParams.sortOrder || 'desc';

    const res = await fetchOrders(currentPage-1, 10, sortBy, sortOrder);
    if (!res.ok) throw new Error(data.message);
    const data = await res.json(); 
    

    return (
        <>
            <TalasliPage
                data={data}
                currentPage={currentPage}
                sortBy={sortBy}
                sortOrder={sortOrder}
                className= {styles.main_page}
            />
        </>
    );
};

export default Talasli;

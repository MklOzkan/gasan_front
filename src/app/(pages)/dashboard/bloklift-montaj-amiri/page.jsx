import BlockLift from '@/components/dashboard/bloklift-montaj-amiri/bloklift';
import { fetchDataBlokLiftMontaj } from '@/services/blmontajamiri-service';
import styles from '@/styles/pages/main-page.module.scss';

const BLokLiftAmiri =async ({ searchParams }) => {
    const currentPage = parseInt(searchParams.currentPage, 10) || 0;
    const sortBy = searchParams.sortBy || 'orderDate';
    const sortOrder = searchParams.sortOrder || 'desc';

    const res = await fetchDataBlokLiftMontaj(currentPage, 10, sortBy, sortOrder);

    const data = await res.json();

    if (res.status !== 200) {
    
        return <div>Error: {res.statusText}</div>;
    }
    
    return (
        <>
            <BlockLift 
             data={data}
             currentPage={currentPage}
             sortBy={sortBy}
             sortOrder={sortOrder}
             className= {styles.main_page}
            />
        </>
    );
};

export default BLokLiftAmiri;

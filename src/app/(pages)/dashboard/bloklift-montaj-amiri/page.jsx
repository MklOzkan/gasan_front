import BlockLift from '@/components/dashboard/bloklift-montaj-amiri/bloklift';
import { fetchDataBlokLiftMontaj } from '@/services/blmontajamiri-service';
import styles from '@/styles/pages/main-page.module.scss';

const BLokLiftAmiri =async (props) => {
    const searchParams = await props.searchParams;
    const currentPage = Math.max(parseInt(searchParams.page, 10) || 1, 1);
    const sortBy = searchParams.sortBy || 'orderDate';
    const sortOrder = searchParams.sortOrder || 'desc';

    const res = await fetchDataBlokLiftMontaj(currentPage-1, 10, sortBy, sortOrder);
    if (res.status !== 200) {
        return <div>Error: {res.statusText}</div>;
    }
    const data = await res.json();
    
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

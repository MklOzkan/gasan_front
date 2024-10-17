
import Lift from '@/components/dashboard/lift-montaj-amiri/LiftMontaj';
import { fetchDataLiftMontaj } from '@/services/liftmontajamri-service';
import styles from '@/styles/pages/main-page.module.scss';


const LiftMontajPage = async ({ searchParams }) => {
    const currentPage = parseInt(searchParams.currentPage, 10) || 0;
    const sortBy = searchParams.sortBy || 'orderDate';
    const sortOrder = searchParams.sortOrder || 'desc';

    const res = await fetchDataLiftMontaj(currentPage, 10, sortBy, sortOrder);
    if(!res.ok) return <div>Error: {res.statusText}</div>;
    const data = await res.json();

    if (res.status !== 200) {
    
        return <div>Error: {res.statusText}</div>;
    }
    return (
        <>
            <Lift
                data={data}
                currentPage={currentPage}
                sortBy={sortBy}
                sortOrder={sortOrder}
                className= {styles.main_page}
            />
        </>
    );
};

export default LiftMontajPage;

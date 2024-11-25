
import Lift from '@/components/dashboard/lift-montaj-amiri/LiftMontaj';
import { fetchDataLiftMontaj } from '@/services/liftmontajamri-service';
import styles from '@/styles/pages/main-page.module.scss';


const LiftMontajPage = async (props) => {
    const searchParams = await props.searchParams;
    const currentPage = Math.max(parseInt(searchParams.page, 10) || 1, 1);
    const sortBy = searchParams.sortBy || 'orderDate';
    const sortOrder = searchParams.sortOrder || 'desc';

    const res = await fetchDataLiftMontaj(currentPage-1, 10, sortBy, sortOrder);
    if(!res.ok) return <div>Error: {res.statusText}</div>;
    const data = await res.json();

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

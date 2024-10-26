
import KaliteKontrol from '@/components/dashboard/kalite-kontrol-amiri/KaliteKontrolMainPage';
import { fetchDataKaliteKontrol } from '@/services/kalitekontrol-service';
import styles from '@/styles/pages/main-page.module.scss';


const KaliteKontrolAmiri = async ({ searchParams }) => {
    const currentPage = parseInt(searchParams.currentPage, 10) || 0;
    const sortBy = searchParams.sortBy || 'orderDate';
    const sortOrder = searchParams.sortOrder || 'desc';

    const res = await fetchDataKaliteKontrol(currentPage, 10, sortBy, sortOrder);

    const data = await res.json();

    if (res.status !== 200) {
    
        return <div>Error: {res.statusText}</div>;
    }
    return (
        <>
            <KaliteKontrol
                data={data}
                currentPage={currentPage}
                sortBy={sortBy}
                sortOrder={sortOrder}
                className= {styles.main_page}
            />
        </>
    );
};

export default KaliteKontrolAmiri;

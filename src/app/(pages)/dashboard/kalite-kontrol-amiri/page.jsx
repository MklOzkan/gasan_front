
import KaliteKontrol from '@/components/dashboard/kalite-kontrol-amiri/KaliteKontrolMainPage';
import { fetchDataKaliteKontrol } from '@/services/kalitekontrol-service';
import styles from '@/styles/pages/main-page.module.scss';


const KaliteKontrolAmiri = async(props)=> {
    const searchParams = await props.searchParams;
    const currentPage = Math.max(parseInt(searchParams.page, 10) || 1, 1);
    const sortBy = searchParams.sortBy || 'orderDate';
    const sortOrder = searchParams.sortOrder || 'desc';

    const res = await fetchDataKaliteKontrol(currentPage -1, 10, sortBy, sortOrder);

    const data = await res.json();

    if (res.status !== 200) {
    
        return <div>Hata: Siparişler getirilirken hata oluştu.</div>;
    }
    return (
        <>
            <KaliteKontrol
                data={data}
                currentPage={currentPage}
                sortBy={sortBy}
                sortOrder={sortOrder}
                className={styles.main_page}
            />
        </>
    );
};

export default KaliteKontrolAmiri;

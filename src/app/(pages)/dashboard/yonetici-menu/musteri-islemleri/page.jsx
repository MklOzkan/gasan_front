import MusteriIslemleri from '@/components/dashboard/yonetici/MusteriIslemleri';
import { getOrders } from '@/services/uretimplanlama-service';

const MusteriIslemleriPage = async ({searchParams}) => {
    const currentPage = parseInt(searchParams.currentPage, 10) || 0;
    const sortBy = searchParams.sortBy || 'orderDate';
    const sortOrder = searchParams.sortOrder || 'desc';
    

    const res = await getOrders(currentPage, 10, sortBy, sortOrder);
    const data = await res.json();

    if (!res.ok) throw new Error(data.message);


    return (
        <>
            <MusteriIslemleri
                data={data}
                currentPage={currentPage}
                sortBy={sortBy}
                sortOrder={sortOrder}
            />
        </>
    );
      
      
};

export default MusteriIslemleriPage;

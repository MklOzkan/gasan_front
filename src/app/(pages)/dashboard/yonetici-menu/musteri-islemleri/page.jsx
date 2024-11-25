import MusteriIslemleri from '@/components/dashboard/yonetici/MusteriIslemleri';
import { getOrders } from '@/services/uretimplanlama-service';

const MusteriIslemleriPage = async (props) => {
    const searchParams = await props.searchParams;
    const currentPage = Math.max(parseInt(searchParams.page, 10) || 1, 1);
    const sortBy = searchParams.sortBy || 'orderDate';
    const sortOrder = searchParams.sortOrder || 'desc';
    const searchTerm = searchParams.searchTerm || '';
    const startDate = searchParams.startDate || '';
    const endDate = searchParams.endDate || '';
    
    const res = await getOrders(currentPage-1, 10, sortBy, sortOrder, searchTerm, startDate, endDate);
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


import { fetchOrderById } from '@/services/liftmontajamri-service';
import LiftOperations from '@/components/dashboard/lift-montaj-amiri/LiftOperations';

const LiftPage = async ({ params }) => {
    if (!params.id) throw new Error('id is required', params.id);

    const res = await fetchOrderById(params.id); // This returns a Response object
    if (!res.ok) throw new Error(order.message || 'Failed to fetch order data');
    const order = await res.json();

    console.log('order from LiftPage', order);
    return (
        <>
            <LiftOperations order={order} />
        </>
    );
};

export default LiftPage;

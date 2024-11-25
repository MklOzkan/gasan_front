import React from 'react'
import { fetchOrderById } from '@/services/talasliimalamiri-service'
import TalasliOperations from '@/components/dashboard/talasli-imalat-amiri/TalasliOperations';

const TalasliPage = async ({params}) => {
  if (!params.id) throw new Error("id is required" ,params.id);

  const res = await fetchOrderById(params.id); // This returns a Response object

  const order = await res.json();

  if (!res.ok) throw new Error(order.message || 'Failed to fetch order data');
  return (
    <>
      <TalasliOperations order={order} />
    </>
  )
}

export default TalasliPage;
import React from 'react'
import { getOrderAndStage } from '@/services/kalitekontrol-service';
import KaliteKontrolStage from '@/components/dashboard/kalite-kontrol-amiri/KaliteKontrolStage';

const KaliteKontrolPage = async ({params}) => {
  if (!params.id) throw new Error("id is required" ,params.id);

  const res = await getOrderAndStage(params.id); // This returns a Response object

  const responses = await res.json();


  if (!res.ok) throw new Error(responses.message || 'Failed to fetch order data');
  return (
    <>
      <KaliteKontrolStage responses={responses} />
    </>
  )
}

export default KaliteKontrolPage
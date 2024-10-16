'use client';

import PageHeader from '@/components/common/page-header';
import React from 'react';
import  Table  from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import OrderForOperation from '@/components/common/form-fields/order-for-operation';
import Spacer from '@/components/common/spacer';
import { useRouter } from 'next/navigation';
import './kalite-kontrol-operations.scss';

const kaliteKontrolStages = {
  AFTER_POLISAJ: "Polisaj Sonrası",
  AFTER_MONTAJ: "Montaj Sonrası",
  AFTER_EZME: "Ezme Sonrası",
  AFTER_MIL_TASLAMA: "Mil Taşlama Sonrası",
};

const KaliteKontrolOperations = ({ responses }) => {
  const { returnBody, returnBody3 } = responses;
  const router = useRouter();
  console.log('returnBody3 from KaliteKontrolOperations', returnBody3);

  const handleRowClick = (stage) => {
    router.push(`/dashboard/kalite-kontrol-amiri/stage/${stage.id}`);
  };

  return (
      <main fluid>
          <PageHeader>Kalite Kontrol Amiri</PageHeader>
          <Spacer height={5} />
          <OrderForOperation order={returnBody} />

          <main className="table-container">
              <div className="table-wrapper">
                  <table className="container-head text-center ">
                      <thead className="table-head">
                          <tr className="mb-3">
                              <th className="border-3">Kontrol Aşaması</th>
                              <th className="border-3">
                                  Onay Bekleyen Adet
                              </th>
                          </tr>
                      </thead>
                      {returnBody3.map((stage, index) => (
                          <tbody
                              key={index}
                              className="stage-button"
                              onClick={() => handleRowClick(stage)}
                          >
                              {kaliteKontrolStages[
                                  stage.kaliteKontrolStage
                              ] && (
                                  <tr className="table-body">                                    
                                      <td>
                                          {
                                              kaliteKontrolStages[
                                                  stage.kaliteKontrolStage
                                              ]
                                          }
                                      </td>
                                      <td>{stage.milCount}</td>
                                  </tr>
                              )}
                          </tbody>
                      ))}
                  </table>
              </div>
          </main>
      </main>
  );
};

export default KaliteKontrolOperations;

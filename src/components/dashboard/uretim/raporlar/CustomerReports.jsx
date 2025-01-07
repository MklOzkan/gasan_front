import PageHeader from '@/components/common/page-header'
import React from 'react'
import KaliteKontrolChart from './KaliteKontrolChart'
import CurrentOrder from './CurrentOrderChart';
import OtherOrders from './CustomerOrders';
import Spacer from '@/components/common/spacer';
import styles from '@/styles/dashboard/uretim/raporlar/customer-reports.module.scss';

const CustomerReports = ({data, searchParams}) => {
    const { returnBody1, 
            returnBody2,
            returnBody3,
            returnBody4,
            returnBody5,
            returnBody6,
            returnBody7,
            returnBody8,
            returnBody9
    } = data;
    
    const totalHurda = returnBody8.reduce((acc, item) => acc + item.scrapCount, 0);
    // console.log('blok', returnBody6)
    // let scrapCount = 0;
    // if (returnBody1.orderType === 'DAMPER') {
    //     scrapCount = returnBody6
    //         .filter(
    //             (item) =>
    //                 item.operationType === 'BORU_KAPAMA' &&
    //                 item.operationType === 'BORU_KAYNAK'
    //         )
    //         .reduce((acc, item) => acc + item.scrapCountAfterTest, 0);
    // }
    // let scrapCountAfterMontaj = 0;
    // if (returnBody1.orderType === 'DAMPER') {
    //     scrapCountAfterMontaj = returnBody6
    //         .filter(
    //             (item) =>
    //                 item.operationType !== 'BORU_KAPAMA' ||
    //                 item.operationType !== 'BORU_KAYNAK'
    //         )
    //         .reduce((acc, item) => acc + item.scrapCountAfterTest, 0);
    // }

    // console.log('scrapCountAfterMontaj', scrapCountAfterMontaj);


    

  return (
      <>
          <PageHeader> Müşterİ Raporlari </PageHeader>
          <Spacer height={20} />
          <div className={styles.container}>
              <div className={styles.order_container}>
                  <CurrentOrder
                      order={returnBody1}
                      production={returnBody2}
                      talasli={returnBody3}
                      polisaj={returnBody4}
                      lift={returnBody5}
                      blok={returnBody6}
                      boyaPaket={returnBody7}
                      kalite={returnBody8}
                  />
              </div>
              <div className={styles.blok_container}>
                  <div className={styles.outer_container}>
                      <div className={styles.chart_container}>
                      {returnBody8 &&
                          returnBody8.map((item, index) => (
                              <KaliteKontrolChart
                                  key={index}
                                  kaliteKontrol={item}
                              />
                          ))}
                      
                      </div>
                      <h2 className={styles.h2}>Toplam Hurda: {totalHurda}</h2>
                  </div>
                  
                  <div className={styles.others_container}>
                      <OtherOrders
                          orders={returnBody9}
                          searchParams={searchParams}
                      />
                  </div>
              </div>
          </div>
      </>
  );
}

export default CustomerReports;
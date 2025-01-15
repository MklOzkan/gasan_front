"use client";

import { useEffect, useState } from 'react';
import styles from '@/styles/dashboard/uretim/raporlar/montaj-reports.module.scss';
import { config } from '@/helpers/config';

export default function MontajReports({ montaj, isToggleOpen }) {
    const [toggle, setToggle] = useState(false);
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const list = config.talasliList;
    console.log('data', data);

    useEffect(() => {
        const method = () => {
            let total = 0;
            montaj.forEach((item) => {
                total += item.scrapCountAfterTest;
            });
            setTotal(total);
        }
        method();
        setToggle(isToggleOpen);
        setData(montaj || []);
    }, [montaj, isToggleOpen]);
  return (
      <div className={styles.container}>
          <div className={styles.table_container}>
              {data ?
                  data.map((item, index) => (
                      <div key={index} className={styles.montaj}>
                          <table className={styles.table}>
                              <tr>
                                  <th>{list[item.operationType]}{ 'sdfsf'}</th>
                              </tr>
                              <tr>
                                  <td>{item.scrapCountAfterTest}</td>
                              </tr>
                          </table>
                      </div>
                  )) : <p>Veri yok</p>}
          </div>
      </div>
  );
}

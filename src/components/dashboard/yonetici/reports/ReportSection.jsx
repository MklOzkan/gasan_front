import React from 'react';

import styles from './reportSection.module.scss';

export default function ReportSection({
    sortedReports,
    totalOrders,
    totalOrderQuantity,
    totalCompletedOrderQuantity,
    totalScrapCount,
    section
}) {
    return (
        <div className={styles.container}>
            <div className={styles.sectionContainer}>{section}</div>
            <div className={styles.products_container}>
                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr className={styles.tableHead}>
                                <th>Ürün Tipi</th>
                                <th>Toplam Sipariş</th>
                                <th>Üretim Hedefi</th>
                                <th>Üretim</th>
                                <th>Hurda</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedReports && sortedReports.length > 0 ? (
                                sortedReports.map((item, index) => (
                                    <tr
                                        key={index}
                                        className={styles.tableBody}
                                    >
                                        <td>{item.orderType}</td>
                                        <td>{item.totalOrderCount}</td>
                                        <td>{item.totalOrderQuantity}</td>
                                        <td>{item.completedOrderQuantity}</td>
                                        <td>{item.totalScrapCount}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr className={styles.tableBody}>
                                    <td
                                        colSpan="5"
                                        style={{ textAlign: 'center' }}
                                    >
                                        Herhangi bir rapor bulunamadi
                                    </td>
                                </tr>
                            )}
                            <tr className={styles.totalContainer}>
                                <td></td>
                                <td>{totalOrders}</td>
                                <td>{totalOrderQuantity}</td>
                                <td>{totalCompletedOrderQuantity}</td>
                                <td>{totalScrapCount}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

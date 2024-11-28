import { config } from '@/helpers/config';
import styles from './reportSection.module.scss';
import DateSection from './DateSection';

const reportsOrder = ['LIFT', 'DAMPER', 'BLOKLIFT', 'PASLANMAZ'];

export default function ReportSection({
    sortedReports = [], // default to an empty array
    totalOrders = 0,
    totalOrderQuantity = 0,
    totalCompletedOrderQuantity = 0,
    totalScrapCount = 0,
    section,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    resetStartDate,
    resetEndDate,
    handleSubmit
}) {
    // Create a map for quick lookup of sortedReports data by orderType
    const reportsMap = sortedReports.reduce((acc, report) => {
        acc[report.orderType] = report;
        return acc;
    }, {});

    return (
        <div className={styles.container}>
            {section === 'TAMAMLANAN ÜRETİM' ? (
                <DateSection
                    startDate={startDate}
                    endDate={endDate}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                    resetStartDate={resetStartDate}
                    resetEndDate={resetEndDate}
                    handleSubmit={handleSubmit}
                />
            ): <div className={styles.emptyDiv}></div>}
            <div className={styles.sectionContainer}> {section}</div>
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
                            {reportsOrder.map((orderType, index) => {
                                const report = reportsMap[orderType] || {}; // Get the report data or default to an empty object
                                return (
                                    <tr
                                        key={index}
                                        className={styles.tableBody}
                                    >
                                        <td>{config.talasliList[orderType]}</td>
                                        <td>{report.totalOrderCount || 0}</td>
                                        <td>
                                            {report.totalOrderQuantity || 0}
                                        </td>
                                        <td>
                                            {report.completedOrderQuantity || 0}
                                        </td>
                                        <td>{report.totalScrapCount || 0}</td>
                                    </tr>
                                );
                            })}
                            <tr className={styles.totalContainer}>
                                <td>Toplam</td>
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

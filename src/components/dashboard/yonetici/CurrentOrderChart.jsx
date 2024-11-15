'use client';


import { Bar } from 'react-chartjs-2';
import {
    Chart,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip
} from 'chart.js';
import { config } from '@/helpers/config';
import styles from './current-order.module.scss';

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip);

const CurrentOrder = ({
    order,
    production,
    talasli,
    polisaj,
    lift,
    blok,
    boyaPaket,
    kalite
}) => {
    const talasliOperations = config.talasliOperations;
    const liftOperations = config.liftOperations;
    const blokOperations = config.blOperationsForBL;
    const damperOperations = config.blOperationsForDamper;
    const boyaPaketOperations = config.boyapaketOperations;

    const talasliList = config.talasliList;

    const compareOperationsTalasli = (a, b) => {
        return (
            talasliOperations.indexOf(a.operationType) -
            talasliOperations.indexOf(b.operationType)
        );
    };

    const compareOperationsLift = (a, b) => {
        return (
            liftOperations.indexOf(a.operationType) -
            liftOperations.indexOf(b.operationType)
        );
    };

    const compareOperationsBlok = (a, b) => {
        if (order.orderType === 'DAMPER') {
            return (
                damperOperations.indexOf(a.operationType) -
                damperOperations.indexOf(b.operationType)
            );
        } else {
            return (
            blokOperations.indexOf(a.operationType) -
            blokOperations.indexOf(b.operationType)
        );}
        
    };

    const compareBoyaPaket = (a, b) => {
        return (
            boyaPaketOperations.indexOf(a.operationType) -
            boyaPaketOperations.indexOf(b.operationType)
        );
    };

    const sortedTalasli = talasli.sort(compareOperationsTalasli);
    const sortedLift = lift.sort(compareOperationsLift);
    const sortedBlok = blok.sort(compareOperationsBlok);
    const sortedBoyaPaket = boyaPaket.sort(compareBoyaPaket);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const calculatePercentage = (completed, remaining) => {
        const total = order.orderQuantity;
        return total > 0 ? ((completed / total) * 100).toFixed(1) : '0';
    };

    // Helper function to create chart data for each operation
    const createChartData = (operation) => {
        const completedPercentage = calculatePercentage(
            operation.completedQuantity,
            operation.remainingQuantity
        );
        const remainingPercentage = (100 - completedPercentage).toFixed(1);

        return {
            labels: [''],
            datasets: [
                {
                    label: 'Tamamlanan',
                    data: [completedPercentage],
                    backgroundColor: 'green'
                },
                {
                    label: 'Kalan',
                    data: [remainingPercentage],
                    backgroundColor: 'yellow'
                }
            ]
        };
    };

    // Chart options to display a horizontal bar chart without unnecessary elements
    const chartOptions = {
        indexAxis: 'y', // Horizontal bar chart
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return `${context.dataset.label}: ${context.raw}%`;
                    }
                }
            }
        },
        scales: {
            x: {
                display: false,
                stacked: true,
                max: 100 // Represents 100% for a complete bar
            },
            y: {
                display: false,
                stacked: true
            }
        }
    };

    // Function to render each operation category
    const renderOperationCharts = (operations, title) =>
        operations &&
        operations.length > 0 && (
            <div key={title} className={styles.operationSection}>
                {/* <h2 className={styles.operationTitle}>{title}</h2> */}
                {operations.map((operation, index) => (
                    <div key={index} className={styles.chartContainer}>
                        <div className={styles.chartWrapper}>
                            <h3 className={styles.operationType}>
                                {talasliList[operation.operationType]}
                            </h3>
                            <div className={styles.bar}>
                                <Bar
                                    data={createChartData(operation)}
                                    options={chartOptions}
                                />
                            </div>
                        </div>
                        <div className={styles.percentageLabels}>
                            <span className={styles.completedLabel}>
                                Tamamlanan:{' '}
                                {calculatePercentage(
                                    operation.completedQuantity,
                                    operation.remainingQuantity
                                )}
                                %
                            </span>
                            <span className={styles.remainingLabel}>
                                Kalan:{' '}
                                {(
                                    100 -
                                    calculatePercentage(
                                        operation.completedQuantity,
                                        operation.remainingQuantity
                                    )
                                ).toFixed(1)}
                                %
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        );

    return (
        <main className={styles.container}>
            <div className={styles.info_container}>
                <h1 className={styles.customer_info}>{order.customerName}</h1>
                <h2 className={styles.customer_info}>{order.orderType}</h2>
            </div>
            <div className={styles.date_container}>
                <h2 className={styles.date}>
                    Sipariş Miktarı: {order.orderQuantity}
                </h2>
                <h2 className={styles.date}>
                    Üretilen: {order.finalProductQuantity}
                </h2>
            </div>
            <div className={styles.date_section}>
                <div className={styles.date_container}>
                    <h2 className={styles.date}>
                        Sipariş T. :{`${formatDate(order.orderDate)}`}
                    </h2>
                    <h2 className={styles.date}>
                        Teslim T. :{`${formatDate(order.deliveryDate)}`}
                    </h2>
                </div>

                {production.startDate ? (
                    <>
                        <div className={styles.date_container}>
                            <h2 className={styles.date}>
                                Başlama T. :{' '}
                                {production.startDate
                                    ? formatDate(production.startDate)
                                    : '--/--/----'}
                            </h2>
                            <h2 className={styles.date}>
                                Bitiş T. :{' '}
                                {production.endDate
                                    ? formatDate(production.endDate)
                                    : '--/--/----'}
                            </h2>
                        </div>
                    </>
                ) : (
                    <h2 className={styles.date}>Üretim başlamadı...</h2>
                )}
            </div>

            {renderOperationCharts(sortedTalasli, 'Talaşlı İşlemleri')}
            {polisaj && renderOperationCharts([polisaj], 'Polisaj İşlemleri')}
            {renderOperationCharts(sortedLift, 'Lift Montaj İşlemleri')}
            {renderOperationCharts(sortedBlok, 'Blok Lift Montaj İşlemleri')}
            {renderOperationCharts(sortedBoyaPaket, 'Boya ve Paket İşlemleri')}
        </main>
    );
};

export default CurrentOrder;

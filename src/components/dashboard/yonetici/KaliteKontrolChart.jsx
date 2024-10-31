'use client';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { config } from '@/helpers/config';
import styles from './kalite-kontrol-chart.module.scss';
ChartJS.register(ArcElement, Tooltip, Legend);

const OrderChart = ({ kaliteKontrol }) => {
    const labels = ['Onay', 'Hurda'];
    const values = [kaliteKontrol.approveCount, kaliteKontrol.scrapCount];
    const chartData = [kaliteKontrol.approveCount, kaliteKontrol.scrapCount];
    const backgroundColor = ['#36A2EB', '#FFCE56'];
    const kaliteKontrolStage = config.talasliList;

    // Check if all values are zero
    const hasData = values.some((value) => value > 0);

    const data = {
        labels: hasData ? labels : ['No Data Available'],
        datasets: [
            {
                data: hasData ? values : [1], // Single data point for no data
                backgroundColor: hasData ? backgroundColor : ['#d3d3d3'] // Gray color for no data
            }
        ]
    };
    
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        borderColor: '#fff',
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    generateLabels: (chart) => {
                        const { data } = chart;
                        return data.labels.map((label, i) => ({
                            text: `${label}: ${data.datasets[0].data[i]}`, // Customize the label with the count
                            fillStyle: data.datasets[0].backgroundColor[i],
                            hidden: false,
                            index: i
                        }));
                    }
                }
            }
        }
    };

    return (
        <div className={styles.chart}>
            <h3 className={styles.name}>
                {kaliteKontrolStage[kaliteKontrol.kaliteKontrolStage]}
            </h3>
            <Pie data={data} options={options} />
        </div>
    );
};

export default OrderChart
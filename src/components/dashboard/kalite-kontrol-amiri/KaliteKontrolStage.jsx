'use client';

import PageHeader from '@/components/common/page-header';
import Spacer from '@/components/common/spacer';
import OrderForOperation from '@/components/common/form-fields/OrderInfo';
import styles from './kalite-kontrol-stage.module.scss';
import OperationButton from '@/components/dashboard/kalite-kontrol-amiri/operation-fields/operation-button';

const KaliteKontrolStage = ({ responses }) => {
    const { returnBody, returnBody3 } = responses;
    const stages = {
        AFTER_POLISAJ: 'Polİsaj Sonrası Kalİte Kontrol',
        AFTER_MONTAJ: 'Montaj Sonrası Kalİte Kontrol',
        AFTER_EZME: 'Ezme Sonrası Kalİte Kontrol',
        AFTER_MIL_TASLAMA: 'Mİl Taşlama Sonrası Kalİte Kontrol'
    };

    return (
        <>
            <Spacer height={-20} />
            <main>
                <h1 className={`${styles.kalite_container} ${styles.kalite} border`}>
                    {stages?.[returnBody3?.kaliteKontrolStage] ||
                        'Unknown Stage'}
                </h1>
                <Spacer height={5} />
                <OrderForOperation order={returnBody} />
                <Spacer height={30} />
                <OperationButton order={returnBody} stage={returnBody3} />
            </main>
        </>
    );
};

export default KaliteKontrolStage;

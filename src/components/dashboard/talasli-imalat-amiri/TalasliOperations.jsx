'use client';

import PageHeader from '@/components/common/page-header';
import Spacer from '@/components/common/spacer';
import OrderForOperation from '@/components/common/form-fields/OrderInfo';
import styles from '@/styles/pages/main-page.module.scss';
import OperationsScreen from '@/components/dashboard/talasli-imalat-amiri/operation-fields/OperationsScreen';

const TalasliOperations = ({ order }) => {
    const { returnBody, returnBody2, returnBody3 } = order;

    return (
        <>
            <PageHeader>Talaşlı İmalat amİrİ</PageHeader>
            <main className={styles.main_page}>
                
                <Spacer height={5} />
                <OrderForOperation order={returnBody} />
                <Spacer height={0} />
                <OperationsScreen
                    order={returnBody}
                    operations={returnBody2}
                    productionProcess={returnBody3}
                />
            </main>
        </>
    );
};

export default TalasliOperations;

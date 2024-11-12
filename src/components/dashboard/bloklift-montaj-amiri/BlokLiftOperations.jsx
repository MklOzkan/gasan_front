import OrderForOperation from '@/components/common/form-fields/OrderInfo';
import styles from './blok-lift-operations.module.scss';
import PageHeader from '@/components/common/page-header';
import Spacer from '@/components/common/spacer';
import UpdateButtons from './operation-fields/UpdateButtons';

const BlokLiftOperations = ({ order }) => {
    const { returnBody, returnBody2, returnBody3 } = order;
    console.log('returnBody 3', returnBody3);
    return (
        <>
            <PageHeader>Blok Lift Montaj Amiri</PageHeader>
            <main className={styles.main_page}>
                <Spacer height={5} />
                <OrderForOperation order={returnBody} />
                <Spacer height={5} />
                <div>
                    <UpdateButtons
                        order={returnBody}
                        operations={returnBody2}
                    />
                </div>
            </main>
        </>
    );
};

export default BlokLiftOperations;

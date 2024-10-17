import OrderForOperation from '@/components/common/form-fields/OrderInfo';
import styles from './lift-operations.module.scss';
import PageHeader from '@/components/common/page-header';
import Spacer from '@/components/common/spacer';


const LiftOperations = ({order}) => {
  const { returnBody, returnBody2, returnBody3 } = order;
  return (
      <>
          <PageHeader>Lift Montaj Amiri</PageHeader>
          <main className={styles.main_page}>
              <Spacer height={5} />
              <OrderForOperation order={returnBody} />
          </main>
      </>
  );
}

export default LiftOperations
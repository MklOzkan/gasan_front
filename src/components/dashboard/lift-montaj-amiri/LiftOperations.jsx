import OrderForOperation from '@/components/common/form-fields/OrderInfo';
import styles from './lift-operations.module.scss';
import PageHeader from '@/components/common/page-header';
import Spacer from '@/components/common/spacer';
import UpdateButtons from './operation-fields/UpdateButtons';


const LiftOperations = ({order}) => {
  const { returnBody, returnBody2, returnBody3 } = order;
  return (
      <>
          <PageHeader>Lift Montaj Amiri</PageHeader>
          <main className={styles.main_page}>
              <Spacer height={5} />
              <OrderForOperation order={returnBody} />
              <Spacer height={5} />
              <div >
                  <UpdateButtons order={returnBody} operations={returnBody2} />
                  
              </div>
          </main>
      </>
  );
}

export default LiftOperations
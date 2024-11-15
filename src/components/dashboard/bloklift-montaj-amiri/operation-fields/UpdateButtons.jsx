'use client';

import styles from './update-buttons.module.scss';
import { useState, useEffect } from 'react';
import InfoAndRollBack from './InfosAndRollBack';
import {
    blMontajAction,
    boruKapamaAction,
    gazDolumAction,
    testAction,
    boruKaynakAction
} from '@/actions/bloklift_actions';
import { swAlert } from '@/helpers/swal';
import ScrapOperation from '@/components/common/scrap-for-montaj/ScrapOperation';
const operationList = {
    BORU_KAPAMA: 'BORU KAPAMA',
    BORU_KAYNAK: 'BORU KAYNAK',
    BLOK_LIFT_MONTAJ: 'BLOK LİFT MONTAJ',
    GAZ_DOLUM: 'GAZ DOLUM',
    TEST: 'TEST'
};

const operationOrderForBlokLift = [
    'BLOK_LIFT_MONTAJ',
    'BORU_KAPAMA',
    'GAZ_DOLUM',
    'TEST',
];
const operationOrderForDamper = ['BORU_KAPAMA','BORU_KAYNAK','BLOK_LIFT_MONTAJ', 'GAZ_DOLUM', 'TEST'];

const UpdateButtons = ({order, operations}) => {
    const [isPopupOpen, setIsPopupOpen] = useState(null); 
    const [productionQuantity, setProductionQuantity] = useState('');
    const [operationColors, setOperationColors] = useState([]);
    let damperOperations = [];
    let blokliftOperations = [];
    

    useEffect(() => {

        const setColor = (operation) => {
            if (
                operation.completedQuantity >= order.orderQuantity &&
                operation.remainingQuantity <= 0
            ) {
                return 'green';
            } else if (operation.remainingQuantity > 0) {
                return 'yellow';
            } else if (
                operation.completedQuantity < order.orderQuantity &&
                operation.remainingQuantity <= 0
            ) {
                return 'grey';
            }
        };

        const updatedColors = operations.map((operation) =>setColor(operation));
        setOperationColors(updatedColors);

    }, [operations, order]);

    const compareOperations = (a, b) => {
        
            if (order && order.orderType === 'DAMPER') {

                return (
                operationOrderForDamper.indexOf(a.operationType) -
                operationOrderForDamper.indexOf(b.operationType));
            } else if (order && order.orderType === 'BLOKLIFT') {
                return (
                operationOrderForBlokLift.indexOf(a.operationType) -
                operationOrderForBlokLift.indexOf(b.operationType));
            }
        
    };

    const sortedOperations = operations.sort(compareOperations);

    if (order && order.orderType === 'DAMPER') {
        sortedOperations.filter((operation) => damperOperations.push(operation));
    } else if (order && order.orderType === 'BLOK_LIFT') {
        operations.filter((operation) => {
            if (operation.operationType !== 'BORU_KAYNAK') {
                blokliftOperations.push(operation);
            }
        });
    }

    const togglePopup = (operationId) => {
        setIsPopupOpen((prev) => (prev === operationId ? null : operationId)); 
    };

    const handleQuantityChange = (e) => {
        const value = e.target.value;
        if (value > 0) {
            setProductionQuantity(value);
        } else {
            setProductionQuantity('');
        }
    };


    const handleSubmit = async (operationId, operationType, producedAmount) => {
        try {
            const formData = new FormData();

            formData.append('operationType', operationType);
            formData.append('completedQuantity', parseInt(producedAmount, 10));

            let response;

            switch (operationType) {
                case 'BORU_KAYNAK':
                    response = await boruKaynakAction(formData, operationId, order.id);
                    break;
                case 'BLOK_LIFT_MONTAJ':
                    response = await blMontajAction(formData, operationId, order.id);
                    break;
                case 'BORU_KAPAMA':
                    response = await boruKapamaAction(formData,operationId,order.orderType, order.id);
                    break;
                case 'GAZ_DOLUM':
                    response = await gazDolumAction(formData, operationId, order.id);
                    break;
                case 'TEST':
                    response = await testAction(formData, operationId, order.id);
                    break;
                default:
                    throw new Error(`Unknown operation type: ${operationType}`);
            }

            if (response.success) {
                swAlert(response.message, 'success');
            } else {
                swAlert(response.message, 'error');
            }
        } catch (error) {
            swAlert(error.message, 'error');
        } finally {
            togglePopup();
            setProductionQuantity('');
        }
    };

  return (
      <main className={styles.main_container}>
          <div className={styles.inner_container}>
              {Array.isArray(sortedOperations) &&
              sortedOperations.length > 0 ? (
                  sortedOperations.map((operation, index) => (
                      <div key={index}>
                          <div>
                              <button
                                  onClick={() => togglePopup(operation.id)}
                                  className={`${styles.polygon_button} ${
                                      styles[`index-${index}`]
                                  }
                                      ${styles[operationColors[index]]}
                                      `}
                                  disabled={operation.remainingQuantity <= 0}
                              >
                                  {operationList[operation.operationType]}
                              </button>
                          </div>
                          {isPopupOpen === operation.id && (
                              <div className={styles.popup}>
                                  <div
                                      className={styles.popup_backdrop}
                                      onClick={() => togglePopup(null)}
                                  ></div>
                                  <div className={styles.popup_inner}>
                                      <h2>Üretilen Adedi Giriniz</h2>
                                      <input
                                          type="number"
                                          min={0}
                                          value={productionQuantity}
                                          onChange={handleQuantityChange}
                                      />
                                      <div className={styles.popup_button}>
                                          <button
                                              onClick={() =>
                                                  // Log entire operation object
                                                  handleSubmit(
                                                      operation.id,
                                                      operation.operationType,
                                                      productionQuantity
                                                  )
                                              }
                                              className={styles.onay_button}
                                              disabled={
                                                  productionQuantity === ''
                                              }
                                              type="number"
                                              min={0}
                                          >
                                              Onayla
                                          </button>
                                          <button
                                              onClick={togglePopup}
                                              className={styles.iptal_button}
                                          >
                                              İptal
                                          </button>
                                      </div>
                                  </div>
                              </div>
                          )}
                          {operation.operationType === 'BLOK_LIFT_MONTAJ' &&
                              order.orderType === 'DAMPER' && (
                                  <button
                                      onClick={() => togglePopup(operation.id)}
                                      className={`${styles.kalite_kontrol_button}`}
                                      disabled={true}
                                  >
                                      Kalite Kontrol
                                  </button>
                              )}
                      </div>
                  ))
              ) : (
                  <p>Mevcut işlem yok.</p>
              )}
          </div>
          <div className={styles.info_container}>
              <div className={styles.table_container}>
                  <table className={styles.mil_pipe}>
                      <tbody>
                          <tr className={styles.mil}>
                              <td>Üretilen Toplam Mil</td>
                              <td>=</td>
                              {operations
                                  .filter(
                                      (operation) =>
                                          operation.operationType ===
                                          'BLOK_LIFT_MONTAJ'
                                  )
                                  .map((operation, index) => (
                                      <td key={index}>{operation.milCount}</td>
                                  ))}
                          </tr>
                          <tr className={styles.mil}>
                              <td>Üretilen Toplam Boru</td>
                              <td>=</td>
                              {operations
                                  .filter(
                                      (operation) =>
                                          operation.operationType ===
                                          'BLOK_LIFT_MONTAJ'
                                  )
                                  .map((operation, index) => (
                                      <td key={index}>{operation.pipeCount}</td>
                                  ))}
                          </tr>
                          <tr className={styles.mil}>
                              <td>Biten Montaj</td>
                              <td>=</td>
                              {operations
                                  .filter(
                                      (operation) =>
                                          operation.operationType === 'TEST'
                                  )
                                  .map((operation, index) => (
                                      <td key={index}>
                                          {operation.completedQuantity}
                                      </td>
                                  ))}
                          </tr>
                      </tbody>
                  </table>
              </div>
              <InfoAndRollBack order={order} operations={sortedOperations} />
          </div>
          <ScrapOperation operations={sortedOperations} order={order} />
      </main>
  );
}

export default UpdateButtons
'use client';

import styles from './update-buttons.module.scss';
import { useState, useEffect } from 'react';

const operationOrder = [
    'BORU_KAPAMA',
    'BORU_KAYNAK',
    'LIFT_MONTAJ',
    'GAZ_DOLUM',
    'BASLIK_TAKMA'
];

const UpdateButtons = ({order, operations}) => {
    const [isPopupOpen, setIsPopupOpen] = useState(null); 
    const [productionQuantity, setProductionQuantity] = useState('');

    useEffect(() => {
        console.log('Operations:', operations);
    }, [operations]);

    const compareOperations = (a, b) => {
        return (
            operationOrder.indexOf(a.operationType) -
            operationOrder.indexOf(b.operationType)
        );
    };

    const sortedOperations = operations.sort(compareOperations);

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

            formData.append('productionProcessId', productionProcess.id);
            formData.append('operationType', operationType);
            formData.append('completedQuantity', parseInt(producedAmount, 10));

            let response;

            switch (operationType) {
                case 'BORU_KESME_HAVSA':
                    response = await boruKesmeAction(formData, operationId);
                    break;
                case 'MIL_KOPARMA':
                    response = await milKoparmaAction(formData, operationId);
                    break;
                case 'MIL_TORNALAMA':
                    response = await milTornalamaAction(formData, operationId);
                    break;
                case 'MIL_TASLAMA':
                    response = await milTaslamaAction(formData, operationId);
                    break;
                case 'ISIL_ISLEM':
                    response = await isilIslemAction(formData, operationId);
                    break;
                case 'EZME':
                    response = await ezmeAction(formData, operationId);
                    break;
                default:
                    throw new Error(`Unknown operation type: ${operationType}`);
            }

            console.log('Response:', response);

            if (response.success) {
                swAlert(response.message);
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
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
          <div>
              {Array.isArray(sortedOperations) &&
              sortedOperations.length > 0 ? (
                  sortedOperations
                      .filter(
                          (operation) =>
                              operation.operationType === 'BORU_KAPAMA' ||
                              operation.operationType == 'BORU_KAYNAK'
                      )
                      .map((operation, index) => (
                          <div key={index}>
                              <div>
                                  <button
                                      onClick={() => togglePopup(operation.id)}
                                      className={`${styles.polygon_button} ${
                                          styles[`index-${index}`]
                                      }`}
                                  >
                                      {operation.operationType}
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
                                                  className={
                                                      styles.iptal_button
                                                  }
                                              >
                                                  İptal
                                              </button>
                                          </div>
                                      </div>
                                  </div>
                              )}
                          </div>
                      ))
              ) : (
                  <p>Mevcut işlem yok.</p>
              )}
          </div>
          <div>
              {Array.isArray(sortedOperations) &&
              sortedOperations.length > 0 ? (
                  sortedOperations
                      .filter(
                          (operation) =>
                              operation.operationType !== 'BORU_KAPAMA' &&
                              operation.operationType !== 'BORU_KAYNAK'
                      )
                      .map((operation, index) => (
                          <div key={index}>
                              <div>
                                  <button
                                      onClick={() => togglePopup(operation.id)}
                                      className={`${styles.polygon_button} ${
                                          styles[`index-${index}`]
                                      }`}
                                  >
                                      {operation.operationType}
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
                                                  className={
                                                      styles.iptal_button
                                                  }
                                              >
                                                  İptal
                                              </button>
                                          </div>
                                      </div>
                                  </div>
                              )}
                              {operation.operationType === 'LIFT_MONTAJ' && (
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
      </main>
  );
}

export default UpdateButtons
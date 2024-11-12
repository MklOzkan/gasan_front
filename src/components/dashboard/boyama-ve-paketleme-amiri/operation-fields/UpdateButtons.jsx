'use client';

import styles from './update-buttons.module.scss';
import React, { useEffect, useState } from 'react';
import InfoAndRollBack from './InfosAndRollBack';
import { boyaAction, paketlemeAction } from '@/actions/boya_paket-actions';
import { swAlert } from '@/helpers/swal';

const operationOrder = [
    'BOYA',
    'PAKETLEME'
];

const UpdateButtons = ({ order, operations }) => {
    const [isPopupOpen, setIsPopupOpen] = useState(null);
    const [productionQuantity, setProductionQuantity] = useState('');
    const [operationColors, setOperationColors] = useState([]);

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

        console.log('Operations:', operations);
    }, [operations, order]);

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

            formData.append('operationType', operationType);
            formData.append('completedQuantity', parseInt(producedAmount, 10));

            let response;

            switch (operationType) {
                case 'BOYA':
                    response = await boyaAction(formData, operationId, order.id);
                    break;
                case 'PAKETLEME':
                    response = await paketlemeAction(formData, operationId, order.id);
                    break;
                default:
                    throw new Error(`Bilinmeyen islem türü: ${operationType}`);
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
                                                className={styles.iptal_button}
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
            <div className={styles.info_container}>
                
                <InfoAndRollBack order={order} operations={sortedOperations} />
            </div>
        </main>
    );
};

export default UpdateButtons;

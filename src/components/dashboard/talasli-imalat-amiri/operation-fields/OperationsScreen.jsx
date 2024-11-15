import React, { useEffect, useState } from 'react';
import styles from './operations-screen.module.scss';
import ButtonColumn from './ButtonsForEachOperation';
import OperationsInfo from './InfosAndRollBack';
import {
    milKoparmaAction,
    milTornalamaAction,
    milTaslamaAction,
    isilIslemAction,
    boruKesmeAction,
    ezmeAction
} from '@/actions/talasli-actions';
import { swAlert } from '@/helpers/swal';

const OperationButton = ({order, operations, productionProcess}) => {
    const [isPopupOpen, setIsPopupOpen] = useState(null); // **Highlight: Initialize state as null**
    const [productionQuantity, setProductionQuantity] = useState('');
    const operationOrder = [
        'MIL_KOPARMA',
        'MIL_TORNALAMA',
        'MIL_TASLAMA',
        'ISIL_ISLEM',
        'EZME',
        'BORU_KESME_HAVSA'
    ];

    useEffect(() => {
    }, [operations, order]);

    const compareOperations = (a, b) => {
        return (
            operationOrder.indexOf(a.operationType) -
            operationOrder.indexOf(b.operationType)
        );
    };

    // Sort the operations array
    const sortedOperations = operations.sort(compareOperations);

    const togglePopup = (operationId) => {
        setIsPopupOpen((prev) => (prev === operationId ? null : operationId)); // **Highlight: Toggle between null and the specific operationId**
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
            // Construct the payload
            const formData = new FormData();

            // Append the fields to the FormData object

            formData.append('productionProcessId', productionProcess.id);
            formData.append('operationType', operationType);
            formData.append('completedQuantity', parseInt(producedAmount, 10));

            // Declare response variable
            let response;

            // Determine which action to call based on operation type
            switch (operationType) {
                case 'BORU_KESME_HAVSA':
                    response = await boruKesmeAction(formData, operationId, order.id);
                    break;
                case 'MIL_KOPARMA':
                    response = await milKoparmaAction(formData, operationId, order.id);
                    break;
                case 'MIL_TORNALAMA':
                    response = await milTornalamaAction(formData, operationId, order.id);
                    break;
                case 'MIL_TASLAMA':
                    response = await milTaslamaAction(formData, operationId, order.id);
                    break;
                case 'ISIL_ISLEM':
                    response = await isilIslemAction(formData, operationId, order.id);
                    break;
                case 'EZME':
                    response = await ezmeAction(formData, operationId, order.id);
                    break;
                default:
                    throw new Error(`Unknown operation type: ${operationType}`);
            }

            if (response.success) {
                swAlert(response.message, 'success');
            }else{
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
        <>
            <main className={styles.main_container}>
                <div className={styles.buttons}>
                    {Array.isArray(sortedOperations) &&
                    sortedOperations.length > 0 ? (
                        sortedOperations
                            .filter(
                                (operation) =>
                                    operation.operationType !==
                                    'BORU_KESME_HAVSA'
                            )
                            .map((operation, index) => (
                                <div
                                    key={index}
                                    className={styles.other_buttons}
                                >
                                        <ButtonColumn
                                            order={order}
                                            operation={operation}
                                            list={sortedOperations}
                                            index={index}
                                            togglePopup={togglePopup}
                                            isPopupOpen={isPopupOpen}
                                            handleQuantityChange={
                                                handleQuantityChange
                                            }
                                            handleSubmit={handleSubmit}
                                            productionQuantity={
                                                productionQuantity
                                            }
                                        />
                                </div>
                            ))
                    ) : (
                        <p>No operations available</p>
                    )}
                </div>
                    
                <div className={styles.info_boru_container}>
                    <div className={styles.borukesme_button}>
                        {sortedOperations
                            .filter(
                                (operation) =>
                                    operation.operationType ===
                                    'BORU_KESME_HAVSA'
                            )
                            .map((operation, index) => (
                                <ButtonColumn
                                    key={index}
                                    operation={operation}
                                    order={order}
                                    index={index}
                                    togglePopup={togglePopup}
                                    isPopupOpen={isPopupOpen}
                                    handleQuantityChange={handleQuantityChange}
                                    handleSubmit={handleSubmit}
                                    productionQuantity={productionQuantity}
                                    list={sortedOperations}
                                />
                            ))}
                    </div>
                    <div className={styles.operation_info}>
                        <OperationsInfo
                            operations={sortedOperations}
                            productionProcess={productionProcess}
                            order={order}
                        />
                    </div>
                </div>
            </main>
        </>
    );
};

export default OperationButton;

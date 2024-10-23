import React, { useEffect, useState } from 'react';
import styles from './operation-button.module.scss';
import ButtonColumn from './button-column';
import OperationsInfo from './operation-table';
import {
    polisajAction
} from '@/actions/polisaj-actions';
import { swAlert, swConfirm } from '@/helpers/swal';

const OperationButton = ({order, operation, productionProcess}) => {
    const [isPopupOpen, setIsPopupOpen] = useState(null); // **Highlight: Initialize state as null**
    const [productionQuantity, setProductionQuantity] = useState('');
    
    useEffect(() => {
        console.log('Operations:', operation);
    }, [operation]);


    

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
            const response = await polisajAction(formData, operationId, order.id); 

            if (response.success) {
                swAlert(response.message);
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
                <div className={styles.borukesme_button}>
                    <ButtonColumn
                        operation={operation}
                        order={order}
                        togglePopup={togglePopup}
                        isPopupOpen={isPopupOpen}
                        handleQuantityChange={handleQuantityChange}
                        handleSubmit={handleSubmit}
                        productionQuantity={productionQuantity}
                    />
                </div>
                <div className={styles.info_button}>
                    <OperationsInfo
                        operation={operation}
                        productionProcess={productionProcess}
                        order={order}
                    />
                </div>
            </main>
        </>
    );
};

export default OperationButton;

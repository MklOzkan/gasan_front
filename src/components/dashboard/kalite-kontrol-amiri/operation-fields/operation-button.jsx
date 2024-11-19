import React, { useEffect, useState } from 'react';
import {
    Row,
    Col
} from 'react-bootstrap';
import styles from './operation-button.module.scss';
import ButtonColumn from './button-column';
import OperationsInfo from './operation-table';
import {
    afterEzmeAction,
    afterMilTaslamaAction,
    afterMontajAction,
    afterPolisajAction,

} from '@/actions/kalite-kontrol-actions';
import { swAlert} from '@/helpers/swal';

const OperationButton = ({order,  stage}) => {
    const [isPopupOpen, setIsPopupOpen] = useState(null); // **Highlight: Initialize state as null**
    const [productionQuantity, setProductionQuantity] = useState('');

    useEffect(() => {
    }, [stage, order]);


   const togglePopup = (stageId) => {
       setIsPopupOpen((prev) => (prev === stageId ? null : stageId)); 
   };


    const handleQuantityChange = (e) => {
        const value = e.target.value;
        if (value > 0) {
            setProductionQuantity(value);
        } else {
            setProductionQuantity('');
        }
    };

    const handleSubmit = async (operationId, kaliteKontrolStage, producedAmount, buttonName) => {
    
        try {
            // Construct the payload
            const formData = new FormData();

            // Append the fields to the FormData object
            formData.append('kaliteKontrolStage', kaliteKontrolStage);
            formData.append('operationField', buttonName);
            formData.append(`${buttonName}`, parseInt(producedAmount, 10));

            // Declare response variable
            let response;
            if(kaliteKontrolStage === 'AFTER_POLISAJ') {
                response = await afterPolisajAction(formData, operationId, order.id);
            } else if(kaliteKontrolStage === 'AFTER_MONTAJ') {
                response = await afterMontajAction(formData, operationId, order.id);
            } else if(kaliteKontrolStage === 'AFTER_EZME') {
                response = await afterEzmeAction(formData, operationId, order.id);
            } else if(kaliteKontrolStage === 'AFTER_MIL_TASLAMA') {
                response = await afterMilTaslamaAction(formData, operationId, order.id);
            }

            if (response.success) {
                swAlert(response.message, 'success', '', 4000);
            } else {
                swAlert(response.message, 'error', '', 4000);
            }
        } catch (error) {
            swAlert(error.message, 'error', '', 4000);
        } finally {
            togglePopup();
            setProductionQuantity('');
        }
    };

    
    return (
        
            <div className={styles.main_container}>
                <div className={styles.buttons}>
                            <ButtonColumn
                                order={order}
                                stage={stage}
                                isPopupOpen={isPopupOpen}
                                handleQuantityChange={handleQuantityChange}
                                togglePopup={togglePopup}
                                handleSubmit={handleSubmit}
                                productionQuantity={productionQuantity}
                            />
                </div>
                <div className={styles.info_table}>
                    
                        <OperationsInfo stage={stage} />
                    
                </div>
            </div>
        
    );
};

export default OperationButton;

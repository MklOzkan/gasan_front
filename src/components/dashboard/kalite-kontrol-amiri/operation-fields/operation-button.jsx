import React, { useState } from 'react';
import {
    Container,
    Row,
    Col,
    Table,
    Pagination,
    Form,
    Button,
    BookMark
} from 'react-bootstrap';
import './operation-button.scss';
import ButtonColumn from './button-column';
import OperationsInfo from './operation-table';
import {
    afterEzmeAction,
    afterMilTaslamaAction,
    afterMontajAction,
    afterPolisajAction,

} from '@/actions/kalite-kontrol-actions';
import { swAlert, swConfirm } from '@/helpers/swal';
import { response } from '@/helpers/form-validation';

const OperationButton = ({order,  stage}) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false); // **Highlight: Initialize state as null**
    const [productionQuantity, setProductionQuantity] = useState('');
    const operationOrder = [
        'MIL_KOPARMA',
        'MIL_TORNALAMA',
        'MIL_TASLAMA',
        'ISIL_ISLEM',
        'EZME',
        'BORU_KESME_HAVSA'
    ];


   const togglePopup = () => {
       setIsPopupOpen(!isPopupOpen); // Toggle the popup state
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
        console.log('operationId:', operationId);
        console.log('operationType:', kaliteKontrolStage);
        console.log('producedAmount:', producedAmount);
        console.log('buttonName:', buttonName);
    
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
                response = await afterPolisajAction(formData, operationId);
            } else if(kaliteKontrolStage === 'AFTER_MONTAJ') {
                response = await afterMontajAction(formData, operationId);
            } else if(kaliteKontrolStage === 'AFTER_EZME') {
                response = await afterEzmeAction(formData, operationId);
            } else if(kaliteKontrolStage === 'AFTER_MIL_TASLAMA') {
                response = await afterMilTaslamaAction(formData, operationId);
            }

            if (response.success) {
                swAlert(response.message);
                setTimeout(() => {   
                    window.location.reload();
                }, 1000);
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
            <Container className="d-flex gap-5 justify-content-center operation_button ">
                <Row className="d-inline-block me-5">
                    
                            
                                <Col className="d-flex gap-1">
                                    <div>
                                        <ButtonColumn
                                            order={order}
                                            stage={stage}
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
                                </Col>
                            
                </Row>
                <Row className="d-flex flex-column ms-4">
                    <Col>
                        <OperationsInfo
                            stage={stage}
                        />
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default OperationButton;

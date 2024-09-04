'use client';

import React, { useState } from 'react';
import { Container, Form, Card, Modal } from 'react-bootstrap';
import { createOrderAction, } from '@/actions/order-actions';
import { swAlert } from '@/helpers/swal';
import { initialResponse } from '@/helpers/form-validation';
import { SubmitButton, TextInput } from '@/components/common/form-fields';
import { useFormState } from "react-dom";
import { useRouter } from 'next/navigation';

const OrderForm = () => {
    const [state, setState] = useState( initialResponse);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        setState(initialResponse);

        const response = await createOrderAction(formData);
        setState(response);
        console.log('response from order-form', response);
        
        if (response.ok) {
            swAlert(response.message, 'success');
            router.push('/dashboard/uretim');
        } else if (state.message) {
            
            swAlert(state.message, 'error');
        }

    };
    
    return (
        <Container
            fluid
            className="d-flex justify-content-center align-items-center "
            style={{ minHeight: '100vh' }}
        >
            <Card style={{ maxWidth: '600px', width: '100%' }}>
                <Card.Body>
                    <Card.Title>Yeni Siparis</Card.Title>
                    <Form noValidate onSubmit={handleSubmit}>
                        <TextInput
                            type="text"
                            name="customerName"
                            className="mb-3"
                            label="Müşteri Adı"
                            error={state?.errors?.customerName}
                            required
                        />

                        <TextInput
                            type="text"
                            name="gasanNo"
                            className="mb-3"
                            label="Gasan No"
                            error={state?.errors?.gasanNo}
                            required
                        />

                        <TextInput
                            type="text"
                            name="orderNumber"
                            className="mb-3"
                            label="Sipariş No"
                            error={state?.errors?.orderNumber}
                            required
                        />

                        <TextInput
                            type="date"
                            name="deliveryDate"
                            className="mb-3"
                            label="Teslim Tarihi"
                            error={state?.errors?.deliveryDate}
                            required
                        />

                        <TextInput
                            type="text"
                            name="orderType"
                            className="mb-3"
                            label="Sipariş Türü"
                            error={state?.errors?.orderType}
                            required
                        />

                        <TextInput
                            type="number"
                            name="orderQuantity"
                            className="mb-3"
                            label="Sipariş Miktarı"
                            error={state?.errors?.orderQuantity}
                            required
                        />

                        <TextInput
                            type="number"
                            name="readyMilCount"
                            className="mb-3"
                            label="Hazir Mil Miktarı"
                            error={state?.errors?.readyMilCount}
                            required
                        />

                        <TextInput
                            type="text"
                            name="orderStatus"
                            className="mb-3"
                            label="Sipariş Durumu"
                            value={'İşlenmeyi Bekliyor'}
                            readOnly
                        />
                        <SubmitButton />
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default OrderForm;

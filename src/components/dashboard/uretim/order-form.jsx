'use client';

import React, { useEffect, useState } from 'react';
import { Container, Form, Card } from 'react-bootstrap';
import { createOrderAction } from '@/actions/order-actions';
import { swAlert } from '@/helpers/swal';
import { initialResponse } from '@/helpers/form-validation';
import { SubmitButton, TextInput } from '@/components/common/form-fields';
import { useRouter } from 'next/navigation';

const OrderForm = () => {
    const [state, setState] = useState(initialResponse);
    const [formValues, setFormValues] = useState({
        customerName: '',
        gasanNo: '',
        orderNumber: '',
        deliveryDate: '',
        orderType: '',
        orderQuantity: '',
        readyMilCount: '', // Optional field
        orderStatus: 'İşlenmeyi Bekliyor' // Default value
    });
    const [isFormValid, setIsFormValid] = useState(false);
    const router = useRouter();

    // Handle form value changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value
        }));
    };

    // Check if all required fields are filled
    useEffect(() => {
        const {
            customerName,
            gasanNo,
            orderNumber,
            deliveryDate,
            orderType,
            orderQuantity
        } = formValues;

        // Check if all required fields (except readyMilCount) are filled
        if (
            customerName &&
            gasanNo &&
            orderNumber &&
            deliveryDate &&
            orderType &&
            orderQuantity
        ) {
            setIsFormValid(true);
        } else {
            setIsFormValid(false);
        }
    }, [formValues]);

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
                            value={formValues.customerName}
                            onChange={handleChange}
                            error={state?.errors?.customerName}
                            required
                        />

                        <TextInput
                            type="text"
                            name="gasanNo"
                            className="mb-3"
                            label="Gasan No"
                            value={formValues.gasanNo}
                            onChange={handleChange}
                            error={state?.errors?.gasanNo}
                            required
                        />

                        <TextInput
                            type="text"
                            name="orderNumber"
                            className="mb-3"
                            label="Sipariş No"
                            value={formValues.orderNumber}
                            onChange={handleChange}
                            error={state?.errors?.orderNumber}
                            required
                        />

                        <TextInput
                            type="date"
                            name="deliveryDate"
                            className="mb-3"
                            label="Teslim Tarihi"
                            value={formValues.deliveryDate}
                            onChange={handleChange}
                            error={state?.errors?.deliveryDate}
                            required
                        />

                        <TextInput
                            type="text"
                            name="orderType"
                            className="mb-3"
                            label="Sipariş Türü"
                            value={formValues.orderType}
                            onChange={handleChange}
                            error={state?.errors?.orderType}
                            required
                        />

                        <TextInput
                            type="number"
                            name="orderQuantity"
                            className="mb-3"
                            label="Sipariş Miktarı"
                            value={formValues.orderQuantity}
                            onChange={handleChange}
                            error={state?.errors?.orderQuantity}
                            required
                        />

                        <TextInput
                            type="number"
                            name="readyMilCount"
                            className="mb-3"
                            label="Hazir Mil Miktarı"
                            value={formValues.readyMilCount}
                            onChange={handleChange}
                            error={state?.errors?.readyMilCount}
                        />

                        <TextInput
                            type="text"
                            name="orderStatus"
                            className="mb-3"
                            label="Sipariş Durumu"
                            value={'İşlenmeyi Bekliyor'}
                            readOnly
                        />
                        <SubmitButton disabled={!isFormValid} />
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default OrderForm;

'use client';

import React, { useState } from 'react';
import {
    Container,
    Form,
    Card,
} from 'react-bootstrap';
import {  updateOrderAction } from '@/actions/order-actions';
import { swAlert } from '@/helpers/swal';
import { initialResponse } from '@/helpers/form-validation';
import {
    SubmitButton,
    TextInput
} from '@/components/common/form-fields';
import { useRouter } from 'next/navigation';
import PageHeader from '@/components/common/page-header';

const orderTypes = ['Lift', 'Damper', 'Blok Lift', 'Paslanmaz'];

const OrderEdit = ({ order}) => {
     const [state, setState] = useState(initialResponse);
     const router = useRouter();
     const [orderType, setOrderType] = useState('');

     if (!order || !order.returnBody) {
         return <div>Loading...</div>; // Handle loading state when `order` or `order.returnBody` is not available
     }

     const { returnBody } = order;
     console.log('order', order);

     const handleSubmit = async (e) => {
         e.preventDefault();
         const formData = new FormData(e.target);
         const response = await updateOrderAction(formData);

         if (response.ok) {
             swAlert(response.message, 'success');
             router.push('/dashboard/uretim');
         } else if (state.message) {
             swAlert(state.message, 'error');
         }
     };

    return (
        <>
            <PageHeader>SİPARİŞİ GÜNCELLE</PageHeader>
            <Container
                fluid
                className="d-flex justify-content-center align-items-center"
                style={{ minHeight: '100vh' }}
            >
                <Card style={{ maxWidth: '600px', width: '100%' }}>
                    <Card.Body>
                        <Form noValidate onSubmit={handleSubmit}>
                            <input
                                type="hidden"
                                name="id"
                                value={returnBody.id}
                            />
                            <TextInput
                                type="text"
                                name="customerName"
                                className="mb-3"
                                label="Müşteri Adı"
                                error={state?.errors?.customerName}
                                defaultValue={returnBody.customerName}
                                required
                            />

                            <TextInput
                                type="text"
                                name="gasanNo"
                                className="mb-3"
                                label="Gasan No"
                                error={state?.errors?.gasanNo}
                                defaultValue={returnBody.gasanNo}
                                required
                            />

                            <TextInput
                                type="text"
                                name="orderNumber"
                                className="mb-3"
                                label="Sipariş No"
                                error={state?.errors?.orderNumber}
                                defaultValue={returnBody.orderNumber}
                                required
                            />

                            <TextInput
                                type="date"
                                name="deliveryDate"
                                className="mb-3"
                                label="Teslim Tarihi"
                                error={state?.errors?.deliveryDate}
                                defaultValue={returnBody.deliveryDate}
                                required
                            />

                            <TextInput
                                type="text"
                                name="orderType"
                                className="mb-3"
                                label="Sipariş Türü"
                                error={state?.errors?.orderType}
                                defaultValue={returnBody.orderType} // **Initial value from the database**
                                onChange={(e) => {
                                    setOrderType(e.target.value);
                                }} // **onChange function is not
                                required
                                options={orderTypes} // **Dropdown options for order type**
                            />

                            <TextInput
                                type="number"
                                name="orderQuantity"
                                className="mb-3"
                                label="Sipariş Miktarı"
                                error={state?.errors?.orderQuantity}
                                defaultValue={returnBody.orderQuantity}
                                required
                            />

                            <TextInput
                                type="number"
                                name="readyMilCount"
                                className="mb-3"
                                label="Hazir Mil Miktarı"
                                error={state?.errors?.readyMilCount}
                                defaultValue={orderType !== 'Lift'? 0:returnBody.readyMilCount}
                                required
                                disabled={orderType !== 'Lift'} // **Disable the field based on the selected order type**
                            />

                            <TextInput
                                type="text"
                                name="orderStatus"
                                className="mb-3"
                                label="Sipariş Durumu"
                                defaultValue={returnBody.orderStatus}
                                required
                            />
                            <SubmitButton />
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};

export default OrderEdit;

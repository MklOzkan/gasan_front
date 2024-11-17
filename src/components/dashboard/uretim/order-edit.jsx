'use client';

import React, { useEffect, useState } from 'react';
import {
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
import styles from './order-form.module.scss';

const orderTypes = ['Lift', 'Damper', 'Blok Lift', 'Paslanmaz'];

const orders = {
    LIFT: 'Lift',
    DAMPER: 'Damper',
    BLOK_LIFT: 'Blok Lift',
    PASLANMAZ: 'Paslanmaz'
};

const orderStatuses = ['İşlenmeyi Bekliyor', 'İşlenmekte', 'İptal Edildi', 'Beklemede'];

const OrderEdit = ({ order}) => {
     const [state, setState] = useState(initialResponse);
     const router = useRouter();
    const [orderType, setOrderType] = useState(order?.returnBody?.orderType);
    const [milCount, setMilCount] = useState(order?.returnBody?.readyMilCount);
    const [readyMilCount, setReadyMilCount] = useState(
        order?.returnBody?.orderType === 'Lift'
            ? order?.returnBody?.readyMilCount || 0
            : 0
    );

    useEffect(() => {

        if (orderType === 'Lift') {
        setReadyMilCount(milCount || 0); // Set to milCount if Lift
    } else {
            setReadyMilCount(0);
        }

    }, [orderType, readyMilCount, milCount, order]);

    
    console.log('order type onchange: ', orderType, readyMilCount);

     if (!order || !order.returnBody) {
         return <div>Loading...</div>; // Handle loading state when `order` or `order.returnBody` is not available
     }

    const { returnBody } = order;
    console.log('return.orderType', returnBody.orderType);
    console.log('milCount', milCount);

    const calculatedReadyMilCount =
        orderType !== 'Lift'
            ? readyMilCount // Use state if orderType is not 'Lift'
            : milCount;

     const handleSubmit = async (e) => {
         e.preventDefault();
         const formData = new FormData(e.target);
         console.log('formData in orderEdit', formData);
         const response = await updateOrderAction(formData);
            console.log('response', response);
         if (response.success) {
             swAlert(response.message, 'success');
             router.push('/dashboard/uretim');
         } else {
             swAlert(response.message, 'error', '', 3000);
             router.push('/dashboard/uretim');
         }
     };

    return (
        <>
            <PageHeader>SİPARİŞİ GÜNCELLE</PageHeader>
            <main className={styles.main_container}>
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
                                title="Oluşturulmuş olan siparişlerin 'Sipariş Türü' daha sonra değiştirilemez."
                                error={state?.errors?.orderType}
                                value={orderType}
                                disabled
                                required
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
                                label="Hazır Mil Miktarı"
                                error={state?.errors?.readyMilCount}
                                onChange={(e) => {
                                    setMilCount(e.target.value); // Update state with the new value
                                }}
                                value={calculatedReadyMilCount} // Use calculated value
                                required
                                disabled={orderType !== 'Lift'} // **Disable the field based on the selected order type**
                            />

                            <TextInput
                                type="text"
                                name="orderStatus"
                                className="mb-3"
                                label="Sipariş Durumu"
                                // disabled={
                                //     returnBody.orderStatus !==
                                //     'İşlenmeyi Bekliyor'
                                // }
                                defaultValue={returnBody.orderStatus}
                                required
                                options={orderStatuses}
                            />
                            <SubmitButton title="Güncelle" />
                        </Form>
                    </Card.Body>
                </Card>
            </main>
        </>
    );
};

export default OrderEdit;

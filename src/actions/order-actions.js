// src/actions/orders-actions.js
'use server';

import { revalidatePath } from 'next/cache';
import {
    createOrder,
    updateOrder,
    deleteOrder,
    downloadOrders
} from '@/services/uretimplanlama-service';
import {
    YupValidationError,
    response,
    convertFormDataToJSON,
    transformYupErrors
} from '@/helpers/form-validation';

export const createOrderAction = async (formData) => {
    try {
        console.log('formData======================', formData);
        const fields = convertFormDataToJSON(formData);
        const res = await createOrder(fields);

        revalidatePath('/dashboard/urun-planlama');
        return response(true, 'Order created successfully');
    } catch (err) {
        if (err instanceof YupValidationError) {
            return transformYupErrors(err.inner);
        }
        throw err;
    }
};

export const updateOrderAction = async (orderNumber, formData) => {
    try {
        const fields = convertFormDataToJSON(formData);
        const res = await updateOrder(orderNumber, fields);

        revalidatePath('/dashboard/urun-planlama');
        return response(true, 'Order updated successfully');
    } catch (err) {
        if (err instanceof YupValidationError) {
            return transformYupErrors(err.inner);
        }
        throw err;
    }
};

export const deleteOrderAction = async (orderNumber) => {
    try {
        const res = await deleteOrder(orderNumber);

        revalidatePath('/dashboard/urun-planlama');
        return response(true, 'Order deleted successfully');
    } catch (err) {
        throw err;
    }
};

export const downloadOrdersAction = async (filters) => {
    try {
        const res = await downloadOrders(filters);
        return res;
    } catch (err) {
        throw err;
    }
};

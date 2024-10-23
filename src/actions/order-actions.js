'use server';

import { revalidatePath } from 'next/cache';
import {
    createOrder,
    updateOrder,
    deleteOrder,
    downloadOrders,
    updateStatus,
    finishOrder
} from '@/services/uretimplanlama-service';
import {
    YupValidationError,
    response,
    convertFormDataToJSON,
    transformYupErrors
} from '@/helpers/form-validation';
import { OrderSchema } from '@/helpers/schemas/order-schema';
import { wait } from '@/utils/wait';

export const createOrderAction = async (formData) => {
    try {
        console.log(
            'formData from createOrderAction======================',
            formData
        );
        const fields = convertFormDataToJSON(formData);

        OrderSchema.validateSync(fields, { abortEarly: false });

        const res = await createOrder(fields);
        const data = await res.json();

        if(!res.ok) {
            return response(false, data.message || 'Bir hata oluştu');
        }

        revalidatePath('/dashboard/urun-planlama');
        return response(true, data.message || 'Sipariş başarıyla oluşturuldu');
    } catch (err) {
        if (err instanceof YupValidationError) {
            return transformYupErrors(err.inner);
        }
         throw err;
    }
};

export const updateOrderAction = async (formData) => {
    if (!formData.get('id')) throw new Error('Id is missing');
    try {
        const fields = convertFormDataToJSON(formData);

        const res = await updateOrder(fields);

        revalidatePath('/dashboard/urun-planlama');
        return response(true, 'Sipariş başarıyla güncellendi');
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
        const data = await res.json();
        if (!res.ok) {
            return {
                success: false,
                message: data.message || 'Bir hata oluştu'
            };
        }
        return {
            success: true, 
            message: 'Sipariş başarıyla silindi'
        };
    } catch (err) {
       if (err instanceof YupValidationError) {
            return transformYupErrors(err.inner);
        }
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

export const updateOrderStatus = async (orderId) => {
    console.log('orderId in Update Order Status', orderId);
    try {
        const res = await updateStatus(orderId);
        console.log('res in Update Order Status', res);

        const data = await res.json();
        console.log( 'data in Update Order Status', data.message);

        if(!res.ok){
            throw new Error(data?.message || 'Bir hata oluştu');
        }
            revalidatePath('/dashboard/talasli-imalat-amiri');
            return { success: true, message: data?.message || 'Sipariş durumu başarıyla güncellendi' };

    
    } catch (err) {
        console.error('Error in updateOrderStatus:', err);
        throw err;
    }
};

export const finishOrderAction = async (orderId) => {
    try {
        const res = await finishOrder(orderId);
        const data = await res.json();
        if (!res.ok) {
            return {
                success: false,
                message: data.message || 'Bir hata oluştu'
            };
        }
        return {
            success: true,
            message: 'Sipariş başarıyla silindi'
        };
    } catch (err) {
        if (err instanceof YupValidationError) {
            return transformYupErrors(err.inner);
        }
        throw err;
    }
};



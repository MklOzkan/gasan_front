'use server';

import { revalidatePath } from 'next/cache';

import {
    YupValidationError,
    response,
    convertFormDataToJSON,
    transformYupErrors
} from '@/helpers/form-validation';

import { updatePolisaj, rollBackLastChange } from '@/services/polisajamiri-service';

export const polisajAction = async (formData, operationId, orderId) => {
    try {

        const fields = convertFormDataToJSON(formData);
        const res = await updatePolisaj(fields, operationId);
        const data = await res.json();

        if (!res.ok) {
            return {
                success: false,
                message: data.message || 'Bir hata oluştu'
            };
        }
        revalidatePath(`/dashboard/polisaj-amiri/${orderId}`);
        return {
            success: true,
            message: data.message || 'Sipariş başarıyla güncellendi'
        };
    } catch (err) {
        if (err instanceof YupValidationError) {
            return transformYupErrors(err.inner);
        }
        throw err;
    }
};

export const rollBackLastChangeAction = async (operationId, orderId) => {
    try {
        const res = await rollBackLastChange(operationId);
        const data = await res.json();

        if (!res.ok) {
            return {
                success: false,
                message: data.message || 'Bir hata oluştu'
            };
        }
        revalidatePath(`/dashboard/polisaj-amiri/${orderId}`);
        return {
            success: true,
            message: data.message || 'Sipariş başarıyla güncellendi'
        };
    } catch (err) {
        if (err instanceof YupValidationError) {
            return transformYupErrors(err.inner);
        }
        throw err;
    }
};
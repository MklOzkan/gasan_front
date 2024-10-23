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
        console.log('formData from milTornalamaAction:', formData, operationId);

        const fields = convertFormDataToJSON(formData);
        const res = await updatePolisaj(fields, operationId);
        const data = await res.json();

        if (!res.ok) {
            throw new Error(`${data.message}`);
        }
        revalidatePath(`/dashboard/polisaj-amiri/${orderId}`);
        return {
            success: true,
            message: data.message || 'Sipariş başarıyla güncellendi'
        };
    } catch (err) {
        console.error('Error in milTornalamaAction:', err);
        if (err instanceof YupValidationError) {
            return transformYupErrors(err.inner);
        }
        throw err;
    }
};

export const rollBackLastChangeAction = async (operationId, orderId) => {
    try {
        console.log('formData from boruKesmeActıon:', operationId);
        const res = await rollBackLastChange(operationId);
        const data = await res.json();

        if (!res.ok) {
            throw new Error(`${data.message}`);
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
'use server';

import { revalidatePath } from 'next/cache';

import {
    YupValidationError,
    response,
    convertFormDataToJSON,
    transformYupErrors
} from '@/helpers/form-validation';

import {
    updateBoya,
    updatePaketleme,
    rollBackLastChange
} from '@/services/boyapaketlemeamiri-service';

export const boyaAction = async (formData, operationId) => {
    try {
        console.log('formData from boruKaynakAction:', formData, operationId);

        const fields = convertFormDataToJSON(formData);
        const res = await updateBoya(fields, operationId);
        const data = await res.json();

        if (!res.ok) {
            throw new Error(`${data.message}`);
        }

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

export const paketlemeAction = async (formData, operationId) => {
    try {
        console.log('formData from updateLiftMontaj:', formData, operationId);

        const fields = convertFormDataToJSON(formData);
        const res = await updatePaketleme(fields, operationId);
        const data = await res.json();

        if (!res.ok) {
            throw new Error(`${data.message}`);
        }

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

export const rollBackLastChangeAction = async (operationId) => {
    try {
        console.log('formData from rollBackLastChangeAction:', operationId);
        const res = await rollBackLastChange(operationId);
        const data = await res.json();

        if (!res.ok) {
            throw new Error(`${data.message}`);
        }

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

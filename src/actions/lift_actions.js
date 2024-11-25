'use server';

import { revalidatePath } from 'next/cache';

import {
    YupValidationError,
    response,
    convertFormDataToJSON,
    transformYupErrors
} from '@/helpers/form-validation';

import {
    updateBoruKaynak,
    updateBoruKapama,
    updateLiftMontaj,
    updateGazDolum,
    updateBaslikTakma,
    rollBackLastChange
} from '@/services/liftmontajamri-service';

export const boruKaynakAction = async (formData, operationId, orderId) => {
    try {

        const fields = convertFormDataToJSON(formData);
        const res = await updateBoruKaynak(fields, operationId);
        const data = await res.json();

        if (!res.ok) {
            return {
                success: false,
                message: data.message || 'Bir hata oluştu'
            };
        }
        revalidatePath(`/dashboard/lift-montaj-amiri/${orderId}`);
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

export const liftMontajAction = async (formData, operationId, orderId) => {
    try {

        const fields = convertFormDataToJSON(formData);
        const res = await updateLiftMontaj(fields, operationId);
        const data = await res.json();

        if (!res.ok) {
            return {
                success: false,
                message: data.message || 'Bir hata oluştu'
            };
        }
        revalidatePath(`/dashboard/lift-montaj-amiri/${orderId}`);
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

export const boruKapamaAction = async (formData, operationId, orderId) => {
    try {

        const fields = convertFormDataToJSON(formData);
        const res = await updateBoruKapama(fields, operationId);
        const data = await res.json();

        if (!res.ok) {
            return {
                success: false,
                message: data.message || 'Bir hata oluştu'
            };
        }
        revalidatePath(`/dashboard/lift-montaj-amiri/${orderId}`);
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
export const gazDolumAction = async (formData, operationId, orderId) => {
    try {

        const fields = convertFormDataToJSON(formData);
        const res = await updateGazDolum(fields, operationId);
        const data = await res.json();

        if (!res.ok) {
            return {
                success: false,
                message: data.message || 'Bir hata oluştu'
            };
        }
        revalidatePath(`/dashboard/lift-montaj-amiri/${orderId}`);
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

export const baslikTakmaAction = async (formData, operationId, orderId) => {
    try {

        const fields = convertFormDataToJSON(formData);
        const res = await updateBaslikTakma(fields, operationId);
        const data = await res.json();

        if (!res.ok) {
            return {
                success: false,
                message: data.message || 'Bir hata oluştu'
            };
        }
        revalidatePath(`/dashboard/lift-montaj-amiri/${orderId}`);
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
        revalidatePath(`/dashboard/lift-montaj-amiri/${orderId}`);
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

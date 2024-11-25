'use server';

import { revalidatePath } from 'next/cache';

import {
    YupValidationError,
    response,
    convertFormDataToJSON,
    transformYupErrors
} from '@/helpers/form-validation';

import {
    updateAFterEzme,
    updateAFterPolisaj,
    updateAFterMilTaslama,
    updateAFterMontaj,
    rollbackAfterMontaj,
    rollbackAfterPolisaj,
    rollbackAfterEzme,
    rollbackAfterMilTaslama
} from '@/services/kalitekontrol-service';

export const afterEzmeAction = async (formData, operationId, orderId) => {
    try {

        const fields = convertFormDataToJSON(formData);
        const res = await updateAFterEzme(fields, operationId);
        const data = await res.json();

        if (!res.ok) {
            return {
                success: false,
                message: data.message || 'Bir hata oluştu'
            };
        }
        revalidatePath(`/dashboard/kalite-kontrol-amiri/stage/${orderId}`);
        return {
            success: true,
            message: data.message || 'Başarıyla güncellendi'
        };
    } catch (err) {
        if (err instanceof YupValidationError) {
            return transformYupErrors(err.inner);
        }
        throw err;
    }
};

export const afterMilTaslamaAction = async (formData, operationId, orderId) => {
    try {

        const fields = convertFormDataToJSON(formData);
        const res = await updateAFterMilTaslama(fields, operationId);
        const data = await res.json();

        if (!res.ok) {
            return {
                success: false,
                message: data.message || 'Bir hata oluştu'
            };
        }
        revalidatePath(`/dashboard/kalite-kontrol-amiri/stage/${orderId}`);
        return {
            success: true,
            message: data.message || 'Başarıyla güncellendi'
        };
    } catch (err) {
        if (err instanceof YupValidationError) {
            return transformYupErrors(err.inner);
        }
        throw err;
    }
};

export const afterMontajAction = async (formData, operationId, orderId) => {
    try {

        const fields = convertFormDataToJSON(formData);
        const res = await updateAFterMontaj(fields, operationId);
        const data = await res.json();

        if (!res.ok) {
            return {
                success: false,
                message: data.message || 'Bir hata oluştu'
            };
        }
        revalidatePath(`/dashboard/kalite-kontrol-amiri/stage/${orderId}`);
        return {
            success: true,
            message: data.message || 'Başarıyla güncellendi'
        };
    } catch (err) {
        if (err instanceof YupValidationError) {
            return transformYupErrors(err.inner);
        }
        throw err;
    }
};

export const afterPolisajAction = async (formData, operationId, orderId) => {
    try {

        const fields = convertFormDataToJSON(formData);
        const res = await updateAFterPolisaj(fields, operationId);
        const data = await res.json();

        if (!res.ok) {
            return {
                success: false,
                message: data.message || 'Bir hata oluştu'
            };
        }
        revalidatePath(`/dashboard/kalite-kontrol-amiri/stage/${orderId}`);
        return {
            success: true,
            message: data.message || 'Başarıyla güncellendi'
        };
    } catch (err) {
        if (err instanceof YupValidationError) {
            return transformYupErrors(err.inner);
        }
        throw err;
    }
};

export const rollBackPolisajAction = async (formData, operationId, orderId) => {
    try {

        const fields = convertFormDataToJSON(formData);
        const res = await rollbackAfterPolisaj(fields, operationId);
        const data = await res.json();

        if (!res.ok) {
            return {
                success: false,
                message: data.message || 'Bir hata oluştu'
            };
        }
        revalidatePath(`/dashboard/kalite-kontrol-amiri/stage/${orderId}`);
        return {
            success: true,
            message: data.message || 'Başarıyla güncellendi'
        };
    } catch (err) {
        if (err instanceof YupValidationError) {
            return transformYupErrors(err.inner);
        }
        throw err;
    }
};

export const rollBackMontajAction = async (formData, operationId, orderId) => {
    try {

        const fields = convertFormDataToJSON(formData);
        const res = await rollbackAfterMontaj(fields, operationId);
        const data = await res.json();

        if (!res.ok) {
            return {
                success: false,
                message: data.message || 'Bir hata oluştu'
            };
        }
        revalidatePath(`/dashboard/kalite-kontrol-amiri/stage/${orderId}`);
        return {
            success: true,
            message: data.message || 'Başarıyla güncellendi'
        };
    } catch (err) {
        if (err instanceof YupValidationError) {
            return transformYupErrors(err.inner);
        }
        throw err;
    }
};

export const rollBackEzmeAction = async (formData, operationId, orderId) => {
    try {

        const fields = convertFormDataToJSON(formData);
        const res = await rollbackAfterEzme(fields, operationId);
        const data = await res.json();

        if (!res.ok) {
            return {
                success: false,
                message: data.message || 'Bir hata oluştu'
            };
        }
        revalidatePath(`/dashboard/kalite-kontrol-amiri/stage/${orderId}`);
        return {
            success: true,
            message: data.message || 'Başarıyla güncellendi'
        };
    } catch (err) {
        if (err instanceof YupValidationError) {
            return transformYupErrors(err.inner);
        }
        throw err;
    }
};

export const rollBackMilTaslamaAction = async (formData, operationId, orderId) => {
    try {

        const fields = convertFormDataToJSON(formData);
        const res = await rollbackAfterMilTaslama(fields, operationId);
        const data = await res.json();

        if (!res.ok) {
            return {
                success: false,
                message: data.message || 'Bir hata oluştu'
            };
        }
        revalidatePath(`/dashboard/kalite-kontrol-amiri/stage/${orderId}`);
        return {
            success: true,
            message: data.message || 'Başarıyla güncellendi'
        };
    } catch (err) {
        if (err instanceof YupValidationError) {
            return transformYupErrors(err.inner);
        }
        throw err;
    }
};
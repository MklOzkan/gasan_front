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
    rollbackAfterEzme
} from '@/services/kalitekontrol-service';

export const afterEzmeAction = async (formData, operationId) => {
    try {
        console.log('formData from milKoparmaAction:', formData, operationId);

        const fields = convertFormDataToJSON(formData);
        const res = await updateAFterEzme(fields, operationId);
        const data = await res.json();

        if (!res.ok) {
            throw new Error(`${data.message}`);
        }

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

export const afterMilTaslamaAction = async (formData, operationId) => {
    try {
        console.log('formData from milKoparmaAction:', formData, operationId);

        const fields = convertFormDataToJSON(formData);
        const res = await updateAFterMilTaslama(fields, operationId);
        const data = await res.json();

        if (!res.ok) {
            throw new Error(`${data.message}`);
        }

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

export const afterMontajAction = async (formData, operationId) => {
    try {
        console.log('formData from milKoparmaAction:', formData, operationId);

        const fields = convertFormDataToJSON(formData);
        const res = await updateAFterMontaj(fields, operationId);
        const data = await res.json();

        if (!res.ok) {
            throw new Error(`${data.message}`);
        }

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

export const afterPolisajAction = async (formData, operationId) => {
    try {
        console.log('formData from milKoparmaAction:', formData, operationId);

        const fields = convertFormDataToJSON(formData);
        const res = await updateAFterPolisaj(fields, operationId);
        const data = await res.json();

        if (!res.ok) {
            throw new Error(`${data.message}`);
        }

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

export const rollPolisajAction = async (formData, operationId) => {
    try {
        console.log('formData from milKoparmaAction:', formData, operationId);

        const fields = convertFormDataToJSON(formData);
        const res = await rollbackAfterPolisaj(fields, operationId);
        const data = await res.json();

        if (!res.ok) {
            throw new Error(`${data.message}`);
        }

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

export const rollbackMontajAction = async (formData, operationId) => {
    try {
        console.log('formData from milKoparmaAction:', formData, operationId);

        const fields = convertFormDataToJSON(formData);
        const res = await rollbackAfterMontaj(fields, operationId);
        const data = await res.json();

        if (!res.ok) {
            throw new Error(`${data.message}`);
        }

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

export const rollBackEzmeAction = async (formData, operationId) => {
    try {
        console.log('formData from milKoparmaAction:', formData, operationId);

        const fields = convertFormDataToJSON(formData);
        const res = await rollbackAfterEzme(fields, operationId);
        const data = await res.json();

        if (!res.ok) {
            throw new Error(`${data.message}`);
        }

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
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
    updateBLMontaj,
    updateBoruKapama,
    updateGazDolum,
    updateTest,
    rollBackLastChange
    
} from '@/services/blmontajamiri-service';

export const boruKaynakAction = async (formData, operationId) => {
    try {
        console.log('formData from boruKaynakAction:', formData, operationId);

        const fields = convertFormDataToJSON(formData);
        const res = await updateBoruKaynak(fields, operationId);
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

export const blMontajAction = async (formData, operationId) => {
    try {
        console.log('formData from blMontajAction:', formData, operationId);

        const fields = convertFormDataToJSON(formData);
        const res = await updateBLMontaj(fields, operationId);
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

export const boruKapamaAction = async (formData, operationId) => {
    try {
        console.log('formData from boruKapamaAction:', formData, operationId);

        const fields = convertFormDataToJSON(formData);
        const res = await updateBoruKapama(fields, operationId);
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
export const gazDolumAction = async (formData, operationId) => {
    try {
        console.log('formData from gazDolumAction:', formData, operationId);

        const fields = convertFormDataToJSON(formData);
        const res = await updateGazDolum(fields, operationId);
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

export const testAction = async (formData, operationId) => {
    try {
        console.log('formData from testAction:', formData, operationId);

        const fields = convertFormDataToJSON(formData);
        const res = await updateTest(fields, operationId);
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

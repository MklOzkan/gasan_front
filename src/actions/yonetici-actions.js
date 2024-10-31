'use server';

import {
    YupValidationError,
    convertFormDataToJSON,
    response,
    transformYupErrors
} from '@/helpers/form-validation';
import { updatePassword, getReports } from '@/services/yonetici-service';
import { revalidatePath } from 'next/cache';

export const updatePasswordAction = async (prevState, formData) => {
    try {
        const fields = convertFormDataToJSON(formData);

        const res = await updatePassword(formData);
        const data = await res.json();

        if (!res.ok) {
            return response(false, data?.mesage);
        }

        revalidatePath('/dashboard/yonetici-menu');
        return response(true, data?.message);
    } catch (err) {
        if (err instanceof YupValidationError) {
            return transformYupErrors(err.inner);
        }
        throw err;
    }
};

export const getCustomerReport = async (orderId) => {
    try {
        const res = await getReports(orderId);

        if (!res.ok) {
            throw new Error(res.mesage || 'Raporlar getirilirken bir hata oluştu');
        }

        const data = await res.json();
        revalidatePath(`/dashboard/yonetici-menu/musteri-islemleri/${orderId}`);
        return data;
    } catch (err) {
        throw err;
    }
}

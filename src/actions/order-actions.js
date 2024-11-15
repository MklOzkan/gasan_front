'use server';

import { revalidatePath } from 'next/cache';
import {
    createOrder,
    updateOrder,
    deleteOrder,
    downloadOrders,
    updateStatus,
    finishOrder,
    downloadExcelFile
} from '@/services/uretimplanlama-service';
import {
    YupValidationError,
    response,
    convertFormDataToJSON,
    transformYupErrors
} from '@/helpers/form-validation';
import { OrderSchema } from '@/helpers/schemas/order-schema';

export const createOrderAction = async (formData) => {
    try {
        const fields = convertFormDataToJSON(formData);
        OrderSchema.validateSync(fields, { abortEarly: false });

        const res = await createOrder(fields);
        const data = await res.json();

        if (!res.ok) {
            return {
                success: false,
                message: data.message || 'Bir hata oluştu'
            };
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
        revalidatePath('/dashboard/urretim');
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
    try {
        const res = await updateStatus(orderId);

        const data = await res.json();

        if (!res.ok) {
            return {
                success: false,
                message: data.message || 'Bir hata oluştu'
            };
        }
            revalidatePath('/dashboard/talasli-imalat-amiri');
            return { success: true, message: data?.message || 'Sipariş durumu başarıyla güncellendi' };

    
    } catch (err) {
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
        revalidatePath('/dashboard/uretim');
        return {
            success: true,
            message: data.message || 'Sipariş başarıyla tamamlandı'
        };
    } catch (err) {
        if (err instanceof YupValidationError) {
            return transformYupErrors(err.inner);
        }
        throw err;
    }
};

// export const downloadction = async (formData) => {

//     console.log('formData', formData);
//     try {
//         const fields = convertFormDataToJSON(formData);

//         console.log('fields', fields);

//         const res = await downloadExcelFile(fields);
       

//         if (!res.ok) {
//             return {
//                 success: false,
//                 message: 'Dosya indirme işlemi sırasında bir hata oluştu'
//             };
//         }

//         return response(true, 'Excel dosyası başarıyla indirildi');
//     } catch (err) {
//         if (err instanceof YupValidationError) {
//             return transformYupErrors(err.inner);
//         }
//         throw err;
//     }
// };



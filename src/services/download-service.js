import { getAuthHeader } from '@/helpers/auth-helpers';
const { config } = require('@/helpers/config');

const API_URL = config.api.baseUrl;


export const downloadExcelFile = async (startDate = '', endDate = '') => {
    const response = await fetch(
        `${API_URL}/orders/download?startDate=${startDate}&endDate=${endDate}`,
        {
            method: 'GET',
            headers: await getAuthHeader()
        }
    );
    console.log(response);
    if (!response.ok) {
        return {
            success: false,
            message: 'İndirme işlemi sırasında bir hata oluştu.'
        };
    }
    try {
        const blob = await response.blob();
        console.log('blob', blob);
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'orders.xlsx';
    document.body.appendChild(a);
    a.click();
    a.remove();
        return {
            ok: true,
            message: 'Excel dosyası başarıyla indirildi.'
        };
    }catch(err){
        console.log(err);
    }

    
};

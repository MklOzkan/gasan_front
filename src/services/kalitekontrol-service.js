import { getAuthHeader } from '@/helpers/auth-helpers';

const { config } = require('@/helpers/config');

const API_URL = config.api.baseUrl;

export const fetchDataKaliteKontrol = async (
    page = 0,
    size = 10,
    sort = 'orderDate',
    type = 'desc'
) => {
    const qs = `page=${page}&size=${size}&sort=${sort}&type=${type}`;
        const response = await fetch(
            `${API_URL}/orders/getAllOrdersForSupervisor?${qs}`,
            {
                method: 'GET',
                headers: await getAuthHeader()
            }
        );
        console.log('RESPONSE STATUS:', response.status);
        return response;
};

export const getMultipleResponses = async (orderId) => {
    const response = await fetch(
        `${API_URL}/kalitekontrol/getAllForOrder/${orderId}`,
        {
            method: 'GET',
            headers: await getAuthHeader()
        }
    );
    return response;
};

export const getOrderAndStage = async (orderId) => {
    const response = await fetch(
        `${API_URL}/kalitekontrol/getOrderAndStage/${orderId}`,
        {
            method: 'GET',
            headers: await getAuthHeader()
        }
    );
    return response;
};

export const updateAFterMontaj = async (payload, orderId) => {
    const response = await fetch(
        `${API_URL}/kalitekontrol/aftermontaj/${orderId}`,
        {
            method: 'PUT',
            headers: await getAuthHeader(),
            body: JSON.stringify(payload)
        }
    );
    return response;
};

export const updateAFterMilTaslama = async (payload, orderId) => {
    const response = await fetch(
        `${API_URL}/kalitekontrol/aftermiltaslama/${orderId}`,
        {
            method: 'PUT',
            headers: await getAuthHeader(),
            body: JSON.stringify(payload)
        }
    );
    return response;
};

export const updateAFterPolisaj = async (payload, orderId) => {
    const response = await fetch(
        `${API_URL}/kalitekontrol/afterpolisaj/${orderId}`,
        {
            method: 'PUT',
            headers: await getAuthHeader(),
            body: JSON.stringify(payload)
        }
    );
    return response;
};

export const updateAFterEzme = async (payload, orderId) => {
    const response = await fetch(
        `${API_URL}/kalitekontrol/afterezme/${orderId}`,
        {
            method: 'PUT',
            headers: await getAuthHeader(),
            body: JSON.stringify(payload)
        }
    );
    return response;
};

export const rollbackAfterMontaj = async (payload, orderId) => {
    const response = await fetch(
        `${API_URL}/kalitekontrol/rollbackAfterMontaj/${orderId}`,
        {
            method: 'PUT',
            headers: await getAuthHeader(),
            body: JSON.stringify(payload)
        }
    );
    return response;
};

export const rollbackAfterPolisaj = async (payload, orderId) => {
    const response = await fetch(
        `${API_URL}/kalitekontrol/rollbackAfterPolisaj/${orderId}`,
        {
            method: 'PUT',
            headers: await getAuthHeader(),
            body: JSON.stringify(payload)
        }
    );
    return response;
};

export const rollbackAfterEzme = async (payload, orderId) => {
    const response = await fetch(
        `${API_URL}/kalitekontrol/rollbackAfterEzme/${orderId}`,
        {
            method: 'PUT',
            headers: await getAuthHeader(),
            body: JSON.stringify(payload)
        }
    );
    return response;
};


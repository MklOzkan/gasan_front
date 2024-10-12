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

export const getMultipleResponses = async (operationId) => {
    const response = await fetch(
        `${API_URL}/kalitekontrol/getAllForOrder/${operationId}`,
        {
            method: 'GET',
            headers: await getAuthHeader()
        }
    );
    return response;
};

export const getOrderAndStage = async (operationId) => {
    const response = await fetch(
        `${API_URL}/kalitekontrol/getOrderAndStage/${operationId}`,
        {
            method: 'GET',
            headers: await getAuthHeader()
        }
    );
    return response;
};

export const updateAFterMontaj = async (payload, operationId) => {
    const response = await fetch(
        `${API_URL}/kalitekontrol/aftermontaj/${operationId}`,
        {
            method: 'PUT',
            headers: await getAuthHeader(),
            body: JSON.stringify(payload)
        }
    );
    return response;
};

export const updateAFterMilTaslama = async (payload, operationId) => {
    const response = await fetch(
        `${API_URL}/kalitekontrol/aftermiltaslama/${operationId}`,
        {
            method: 'PUT',
            headers: await getAuthHeader(),
            body: JSON.stringify(payload)
        }
    );
    return response;
};

export const updateAFterPolisaj = async (payload, operationId) => {
    const response = await fetch(
        `${API_URL}/kalitekontrol/afterpolisaj/${operationId}`,
        {
            method: 'PUT',
            headers: await getAuthHeader(),
            body: JSON.stringify(payload)
        }
    );
    return response;
};

export const updateAFterEzme = async (payload, operationId) => {
    const response = await fetch(
        `${API_URL}/kalitekontrol/afterezme/${operationId}`,
        {
            method: 'PUT',
            headers: await getAuthHeader(),
            body: JSON.stringify(payload)
        }
    );
    console.log('RESPONSE:', response);
    return response;
};

export const rollbackAfterMontaj = async (payload, operationId) => {
    const response = await fetch(
        `${API_URL}/kalitekontrol/rollbackAfterMontaj/${operationId}`,
        {
            method: 'PUT',
            headers: await getAuthHeader(),
            body: JSON.stringify(payload)
        }
    );
    return response;
};

export const rollbackAfterPolisaj = async (payload, operationId) => {
    const response = await fetch(
        `${API_URL}/kalitekontrol/rollbackAfterPolisaj/${operationId}`,
        {
            method: 'PUT',
            headers: await getAuthHeader(),
            body: JSON.stringify(payload)
        }
    );
    return response;
};

export const rollbackAfterEzme = async (payload, operationId) => {
    console.log('payload in rollbackAfterEzme:', payload)
    const response = await fetch(
        `${API_URL}/kalitekontrol/rollbackAfterEzme/${operationId}`,
        {
            method: 'PUT',
            headers: await getAuthHeader(),
            body: JSON.stringify(payload)
        }
    );
    console.log('operationField in Json:', payload.operationField);
    return response;
};

export const rollbackAfterMilTaslama = async (payload, operationId) => {
    console.log('payload in rollbackAfterMiltaslama:', payload);
    const response = await fetch(
        `${API_URL}/kalitekontrol/rollbackAfterMilTaslama/${operationId}`,
        {
            method: 'PUT',
            headers: await getAuthHeader(),
            body: JSON.stringify(payload)
        }
    );
    return response;
};


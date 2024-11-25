import { getAuthHeader } from '@/helpers/auth-helpers';

const { config } = require('@/helpers/config');

const API_URL = config.api.baseUrl;

export const fetchDataBlokLiftMontaj = async (
    page = 0,
    size = 10,
    sort = 'orderDate',
    type = 'desc'
) => {
    const qs = `page=${page}&size=${size}&sort=${sort}&type=${type}`;
    const response = await fetch(
        `${API_URL}/orders/getOrdersForBLMontajAmiri?${qs}`,
        {
            method: 'GET',
            headers: await getAuthHeader()
        }
    );
    return response;
};

export const fetchOrderById = async (orderId) => {
    const response = await fetch(
        `${API_URL}/orders/getResponsesForBlokLift/${orderId}`,
        {
            method: 'GET',
            headers: await getAuthHeader()
        }
    );
    return response;
};

export const updateBoruKaynak = async (payload, orderId) => {
    const response = await fetch(
        `${API_URL}/montaj/boruKaynakForBL/${orderId}`,
        {
            method: 'PUT',
            headers: await getAuthHeader(),
            body: JSON.stringify(payload)
        }
    );
    return response;
};

export const updateBLMontaj = async (payload, orderId) => {
    const response = await fetch(
        `${API_URL}/montaj/montajOperationForBL/${orderId}`,
        {
            method: 'PUT',
            headers: await getAuthHeader(),
            body: JSON.stringify(payload)
        }
    );
    return response;
};

export const updateBoruKapama = async (payload, orderId) => {
    const response = await fetch(
        `${API_URL}/montaj/boruKapamaForBL/${orderId}`,
        {
            method: 'PUT',
            headers: await getAuthHeader(),
            body: JSON.stringify(payload)
        }
    );
    return response;
};

export const updateGazDolum = async (payload, orderId) => {
    const response = await fetch(
        `${API_URL}/montaj/gazDolumOperationForBL/${orderId}`,
        {
            method: 'PUT',
            headers: await getAuthHeader(),
            body: JSON.stringify(payload)
        }
    );
    return response;
};

export const updateTest = async (payload, orderId) => {
    const response = await fetch(`${API_URL}/montaj/testOperation/${orderId}`, {
        method: 'PUT',
        headers: await getAuthHeader(),
        body: JSON.stringify(payload)
    });
    return response;
};

export const rollBackLastChange = async (operationId) => {
    const response = await fetch(
        `${API_URL}/montaj/removelastchangeForBL/${operationId}`,
        {
            method: 'PUT',
            headers: await getAuthHeader()
        }
    );
    return response;
};

export const updateScrap = async (payload, id) => {
    const response = await fetch(
        `${API_URL}/montaj/updateScrapCount/${id}`,
        {
            method: 'PUT',
            headers: await getAuthHeader(),
            body: JSON.stringify(payload)
        }
    );
    return response;
};

export const rollBackScrap = async (operationId) => {
    const response = await fetch(
        `${API_URL}/montaj/rollBackScrapForBL/${operationId}`,
        {
            method: 'PUT',
            headers: await getAuthHeader()
        }
    );
    return response;
};
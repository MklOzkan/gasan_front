"use server";

import { getAuthHeader } from '@/helpers/auth-helpers';

const { config } = require('@/helpers/config');

const API_URL = config.api.baseUrl;

export const fetchDataBoyama= async (
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
        return response;
};

export const fetchOrderById = async (orderId) => {
    const response = await fetch(
        `${API_URL}/orders/getResponsesForBoyaPaket/${orderId}`,
        {
            method: 'GET',
            headers: await getAuthHeader()
        }
    );
    return response;
};

export const updateBoya = async (payload, orderId) => {
    const response = await fetch(
        `${API_URL}/boyavepaket/boyaOperation/${orderId}`,
        {
            method: 'PUT',
            headers: await getAuthHeader(),
            body: JSON.stringify(payload)
        }
    );
    return response;
};

export const updatePaketleme = async (payload, orderId) => {
    const response = await fetch(
        `${API_URL}/boyavepaket/paketOperation/${orderId}`,
        {
            method: 'PUT',
            headers: await getAuthHeader(),
            body: JSON.stringify(payload)
        }
    );
    return response;
};

export const rollBackLastChange = async (operationId) => {
    const response = await fetch(
        `${API_URL}/boyavepaket/rollback/${operationId}`,
        {
            method: 'PUT',
            headers: await getAuthHeader()
        }
    );
    return response;
};
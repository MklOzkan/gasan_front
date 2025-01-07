"use server";

import { getAuthHeader } from '@/helpers/auth-helpers';

const { config } = require('@/helpers/config');

const API_URL = config.api.baseUrl;

export const fetchDataLiftMontaj = async (
    page = 0,
    size = 10,
    sort = 'orderDate',
    type = 'desc'
) => {
    const qs = `page=${page}&size=${size}&sort=${sort}&type=${type}`;
        const response = await fetch(
            `${API_URL}/orders/getOrdersForLiftMontajAmiri?${qs}`,
            {
                method: 'GET',
                headers: await getAuthHeader()
            }
        );
        return response;
};

export const fetchOrderById = async (orderId) => {
    const response = await fetch(
        `${API_URL}/orders/getResponsesForLift/${orderId}`,
        {
            method: 'GET',
            headers: await getAuthHeader()
        }
    );
    return response;
};

export const updateBoruKaynak = async (payload, orderId) => {
    const response = await fetch(
        `${API_URL}/montaj/boruKaynakForLift/${orderId}`,
        {
            method: 'PUT',
            headers: await getAuthHeader(),
            body: JSON.stringify(payload)
        }
    );
    return response;
};

export const updateLiftMontaj = async (payload, orderId) => {
    const response = await fetch(
        `${API_URL}/montaj/montajOperationForLift/${orderId}`,
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
        `${API_URL}/montaj/boruKapamaForLift/${orderId}`,
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
        `${API_URL}/montaj/gazDolumOperationForLift/${orderId}`,
        {
            method: 'PUT',
            headers: await getAuthHeader(),
            body: JSON.stringify(payload)
        }
    );
    return response;
};

export const updateBaslikTakma = async (payload, orderId) => {
    const response = await fetch(
        `${API_URL}/montaj/baslikTakmaOperation/${orderId}`,
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
        `${API_URL}/montaj/removelastchangeForLift/${operationId}`,
        {
            method: 'PUT',
            headers: await getAuthHeader()
        }
    );
    return response;
};

export const rollBackScrap = async (operationId) => {
    const response = await fetch(
        `${API_URL}/montaj/rollBackScrapForLift/${operationId}`,
        {
            method: 'PUT',
            headers: await getAuthHeader()
        }
    );
    return response;
};
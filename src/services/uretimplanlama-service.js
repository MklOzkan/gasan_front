"use server";

import { getAuthHeader } from '@/helpers/auth-helpers';
const { config } = require('@/helpers/config');

const API_URL = config.api.baseUrl;



export const getOrders = async (
    page = 0,
    size = 10,
    sort = 'orderDate',
    type = 'desc',
    searchTerm,
    startDate,
    endDate
) => {
    const qs = `page=${page}&size=${size}&sort=${sort}&type=${type}&searchTerm=${searchTerm}&startDate=${startDate}&endDate=${endDate}`;
    const response = await fetch(`${API_URL}/orders/getAllOrders?${qs}`, {
        method: 'GET',
        headers: await getAuthHeader()
    });
    if (!response.ok) {
        throw new Error(`Error fetching orders: ${response.statusText}`);
    }
    return response;
};

export const createOrder = async (orderData) => {
    const response = await fetch(`${API_URL}/orders/createOrder`, {
        method: 'POST',
        headers: (await getAuthHeader()),
        body: JSON.stringify(orderData)
    });
    return response;
};

export const updateOrder = async (payload) => {
    const response = await fetch(`${API_URL}/orders/updateOrder/${payload.id}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
        headers: await getAuthHeader()
    });
    return response;
    
};

export const deleteOrder = async (orderNumber) => {
    const response = await fetch(
        `${API_URL}/orders/deleteOrder/${orderNumber}`,
        {
            method: 'DELETE',
            headers: await getAuthHeader()
        }
    );
    if (!response.ok) {
        throw new Error(`Error deleting order: ${response.statusText}`);
    }
    return response;
};

export const downloadOrders = async (filters = {}) => {
    const qs = new URLSearchParams(filters).toString();
    const response = await fetch(`${API_URL}/orders/download/excel?${qs}`, {
        headers: await getAuthHeader()
    });
    if (!response.ok) {
        throw new Error(`Error downloading orders: ${response.statusText}`);
    }
    return response.blob(); // For downloading the Excel file
};

export const getOrderById = async (id) => {
    const response = await fetch(`${API_URL}/orders/getOrderById/${id}`, {
        method: 'GET',
        headers: await getAuthHeader()
    });

    if (!response.ok) {
        throw new Error(`Error fetching order: ${response.statusText}`);
    }

    return response; // Return the order data as JSON
};

export const updateStatus = async (orderId) => {
    const response = await fetch(`${API_URL}/orders/startStop/${orderId}`, {
        method: 'PUT',
        headers:  await getAuthHeader()
    });
    return response;
};

export const finishOrder = async (orderId) => {
    const response = await fetch(
        `${API_URL}/orders/finishOrder/${orderId}`,
        {
            method: 'PUT',
            headers: await getAuthHeader()
        }
    );
    if (!response.ok) {
        throw new Error(`Error deleting order: ${response.statusText}`);
    }
    return response;
};





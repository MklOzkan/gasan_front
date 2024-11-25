import { getAuthHeader } from "@/helpers/auth-helpers";

const { config} = require("@/helpers/config");

const API_URL = config.api.baseUrl;

export const getAllOrdersByPage = async (
    page = 0,
    size = 20,
    sort = 'name',
    type = 'desc'
) => {
    const qs = `page=${page}&size=${size}&sort=${sort}&type=${type}`;
    try {
        const response = await fetch(`${API_URL}/admin/getAll?${qs}`, {
            headers: await getAuthHeader()
        });
        if (!response.ok) {
            throw new Error(`Error fetching admins: ${response.statusText}`);
        }
        return response.json(); // Automatically parse JSON response
    } catch (error) {
        throw error;
    }
};

export const updatePassword = async ( payload) => {
     const username = payload.get('username');
     const newPassword = payload.get('newPassword');

    return fetch(`${API_URL}/users/updatePassword/${username}`, {
        method: 'PUT',
        headers: {
            ...(await getAuthHeader()),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ newPassword : newPassword })
    });
    
};

export const getReports = async (orderId) => {
    const response = fetch(`${API_URL}/yonetici/reports/${orderId}`, {
        method: 'GET',
        headers: await getAuthHeader()
    });

    return response;
}

export const getAllReports = async (startDate = '', endDate = '') => {
    const response = fetch(
        `${API_URL}/yonetici/getCompletedAndActiveReports?startDate=${startDate}&endDate=${endDate}`,
        {
            method: 'GET',
            headers: await getAuthHeader()
        }
    );

    return response;
};
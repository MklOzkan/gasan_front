const { config } = require('@/helpers/config');

const API_URL = config.api.baseUrl;

export const login = async (payload) => {
    
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response;
};

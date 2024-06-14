import axios from 'axios';

const BASE_URL = 'http://103.164.54.252:8000/api';

export const login = async (username, password) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/login`, {
            username,
            password,
        });
        localStorage.setItem('access', response.data.access);
        if (response.data.refresh) {
            localStorage.setItem('refresh', response.data.refresh);
        }
        return response.data;
    } catch (error) {
        throw error.response.data.message || 'Something went wrong';
    }
};

export const getUsers = async () => {
    const token = localStorage.getItem('access');
    if (!token) {
        throw new Error('No token found');
    }
    try {
        const response = await axios.get(`${BASE_URL}/users`, {
            headers: {
                Authorization: `Bearer ${token}`
            }

        });

        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

export const getArticle = async () => {
    const token = localStorage.getItem('access');
    if (!token) {
        throw new Error('No token found');
    }
    try {
        const response = await axios.get(`${BASE_URL}/articles`, {
            headers: {
                Authorization: `Bearer ${token}`
            }

        });

        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

export const handleDelete = async (usersId) => {
    const token = localStorage.getItem('access');
    if (!token) {
        throw new Error('No token found');
    }
    try {

        const response = await axios.delete(`${BASE_URL}/users/${usersId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (response.status == 200) {
            console.log(`User with ID ${usersId} has been deleted.`);
            window.location.reload();
        } else {
            console.error(`Failed to delete user with ID ${usersId}.`);

        }
    } catch (error) {
        console.error('Error deleting user:', error);

    }
}

export const getProfile = async () => {
    const token = localStorage.getItem('access');
    if (!token) {
        throw new Error('No token found');
    }
    try {
        const response = await axios.get(`${BASE_URL}/auth/me`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        );
        return response.data;
    } catch (error) {
        console.error('Error fetching profile:', error);
        throw error;
    }
}

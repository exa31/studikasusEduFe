import axios from "axios";

export const login = async (email, password) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_API_ENDPOINT_USER}/login`, {
            email,
            password,
        });
        const data = res.data;
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const register = async (full_name, email, password) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_API_ENDPOINT_USER}/register`, {
            full_name,
            email,
            password,
        });
        const data = res.data;
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const logout = async (token) => {
    let config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    try {
        const res = await axios.post(`${import.meta.env.VITE_API_ENDPOINT_USER}/logout`, {}, config);
        const data = res.data;
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const auth = async () => {
    const token = localStorage.getItem('token');
    let config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    try {
        const res = await axios.get(`${import.meta.env.VITE_API_ENDPOINT_USER}/me`, config);
        const data = res.data;
        return data;
    } catch (error) {
        console.log(error);
    }
}
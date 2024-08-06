import axios from "axios";

export const getCart = async () => {
    const token = localStorage.getItem("token");
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    try {
        const response = await axios.get(import.meta.env.VITE_API_ENDPOINT_STORE + "/carts", config);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const addCart = async (productId) => {
    const token = localStorage.getItem("token");
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await axios.put(import.meta.env.VITE_API_ENDPOINT_STORE + "/carts/add", productId, config);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const reduceCart = async (productId) => {
    const token = localStorage.getItem("token");
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await axios.put(import.meta.env.VITE_API_ENDPOINT_STORE + "/carts/reduce", productId, config);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const removeCart = async (productId) => {
    const token = localStorage.getItem("token");
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await axios.put(import.meta.env.VITE_API_ENDPOINT_STORE + "/carts/remove", productId, config);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
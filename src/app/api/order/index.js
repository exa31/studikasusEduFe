import axios from "axios";

export const createOrder = async (order) => {
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    try {
        const res = await axios.post(`${import.meta.env.VITE_API_ENDPOINT_STORE}/order`, order, config);
        const data = res.data;
        return data;

    } catch (error) {
        console.log(error);
    }
}

export const paidInvoice = async (order_id) => {
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    try {
        const res = await axios.put(`${import.meta.env.VITE_API_ENDPOINT_STORE}/order/${order_id}`, {}, config);
        const data = res.data;
        return data;
    } catch (error) {
        console.log(error);
    }
}
import axios from "axios";

export const getInvoices = async ({ params }) => {
    const token = localStorage.getItem('token');
    let config = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }
    try {
        const res = await axios.get(`${import.meta.env.VITE_API_ENDPOINT_STORE}/invoices/${params.order_id}`, config);
        const data = res.data;
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const getAllInvoices = async () => {
    const token = localStorage.getItem('token');
    let config = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }
    try {
        const res = await axios.get(`${import.meta.env.VITE_API_ENDPOINT_STORE}/invoices`, config);
        const data = res.data;
        return data;
    } catch (error) {
        console.log(error);
    }
}
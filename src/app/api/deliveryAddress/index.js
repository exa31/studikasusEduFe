import axios from "axios";

export const getDeliveryAddress = async () => {
    const token = localStorage.getItem('token');
    let config = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }
    try {
        const res = await axios.get(`${import.meta.env.VITE_API_ENDPOINT_STORE}/delivery-addresses`, config);
        const data = res.data;
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const createDeliveryAddress = async (payload) => {
    const token = localStorage.getItem('token');
    let config = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }
    try {
        const res = await axios.post(`${import.meta.env.VITE_API_ENDPOINT_STORE}/delivery-addresses`, payload, config);
        const data = res.data;
        return data;
    } catch (error) {
        console.log(error);
    }
}
//jadi params ini sudah pasti dapet apabila ada yg menggunakan titik dua spt ini :id
export const getDeliveryAddressById = async ({ params }) => {
    const token = localStorage.getItem('token');
    let config = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }
    try {
        const res = await axios.get(`${import.meta.env.VITE_API_ENDPOINT_STORE}/delivery-addresses/${params.id}`, config);
        const data = res.data;
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const updateDeliveryAddress = async (payload, id) => {
    const token = localStorage.getItem('token');

    let config = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }
    try {
        const res = await axios.put(`${import.meta.env.VITE_API_ENDPOINT_STORE}/delivery-addresses/${id}`, payload, config);
        const data = res.data;
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const deleteDeliveryAddress = async (id) => {
    const token = localStorage.getItem('token');
    let config = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }
    try {
        const res = await axios.delete(`${import.meta.env.VITE_API_ENDPOINT_STORE}/delivery-addresses/${id}`, config);
        const data = res.data;
        return data;
    } catch (error) {
        console.log(error);
    }
}
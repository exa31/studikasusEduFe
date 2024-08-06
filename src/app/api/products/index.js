import axios from 'axios';

export const products = async (payload) => {
    const { skip = 0, limit = 12, tag = [], category = '', q = '' } = payload
    try {
        const res = await axios.get(`${import.meta.env.VITE_API_ENDPOINT_STORE}/products?limit=${limit}&skip=${skip}&tags=${tag}&category=${category}&q=${q}`)
        const data = res.data
        return data
    } catch (error) {
        console.log(error)
    }
}

export const productsDashboard = async () => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_API_ENDPOINT_STORE}/products`)
        const data = res.data
        return data
    } catch (error) {
        console.log(error)
    }
}

export const productById = async ({ params }) => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_API_ENDPOINT_STORE}/products/${params.id}`)
        const data = res.data
        return data
    } catch (error) {
        console.log(error)
    }
}

export const updateProduct = async (id, data) => {
    const token = localStorage.getItem('token')
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }
    try {
        const res = await axios.put(`${import.meta.env.VITE_API_ENDPOINT_STORE}/products/${id}`, data, config)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const deleteProduct = async (id) => {
    const token = localStorage.getItem('token')
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }
    try {
        const res = await axios.delete(`${import.meta.env.VITE_API_ENDPOINT_STORE}/products/${id}`, config)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const createProduct = async (data) => {
    const token = localStorage.getItem('token')
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }
    try {
        console.log(data)
        const res = await axios.post(`${import.meta.env.VITE_API_ENDPOINT_STORE}/products`, data, config)
        return res.data
    } catch (error) {
        console.log(error)
    }
}
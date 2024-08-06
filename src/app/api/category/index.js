import axios from "axios";

export const categories = async () => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_API_ENDPOINT_STORE}/categories`)
        const data = res.data
        return data
    } catch (error) {
        console.log(error)
    }
}

export const categoriesByName = async (name) => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_API_ENDPOINT_STORE}/categories/${name}`)
        const data = res.data
        return data
    } catch (error) {
        console.log(error)
    }
}
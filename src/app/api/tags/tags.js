import axios from 'axios'

export const tags = async () => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_API_ENDPOINT_STORE}/tags`)
        const data = res.data
        return data
    } catch (error) {
        console.log(error)
    }
}
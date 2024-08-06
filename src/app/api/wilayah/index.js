import axios from "axios";

export const getKelurahan = async (id) => {
    try {
        const res = await axios.get(`https://exa31.github.io/api-wilayah-indonesia/api/villages/${id}.json`);
        const data = res.data;
        return data;
    } catch (error) {
        console.log(error);
    }
};

export const getKecamatan = async (id) => {
    try {
        const res = await axios.get(`https://exa31.github.io/api-wilayah-indonesia/api/districts/${id}.json`);
        const data = res.data;
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const getKota = async (id) => {
    try {
        const res = await axios.get(`https://exa31.github.io/api-wilayah-indonesia/api/regencies/${id}.json`);
        const data = res.data;
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const getProvinsi = async () => {
    try {
        const res = await axios.get(`https://exa31.github.io/api-wilayah-indonesia/api/provinces.json`);
        const data = res.data;
        return data;
    } catch (error) {
        console.log(error);
    }
}
import axios from "../../axios";

export const getFoodByIdAPI = async (id: any) => {
    return await axios({
        method: "GET",
        url: "/menu/id",
        params: { m_id: id },
    });
}

export const addFoodAPI = async (data: any) => {
    return await axios.get("http://localhost:5000/api/menu");
}

export const getFoodByParamsAPI = async (data: any) => {
    return await axios.get("http://localhost:5000/api/menu");
}

export const getSumFoodAPI = async (data: any) => {
    return await axios.get("http://localhost:5000/api/menu/num/sum");
}

export const uploadImageAPI = async (data: any) => {
    return await axios({
        method: "POST",
        url: "/menu/image",
        data,
    });
}

export const updateFoodAPI = async (data: any) => {
    return await axios({
        method: "PUT",
        url: "/menu",
        params: data,
    });
}

export const deleteFoodAPI = async (id: any) => {
    return await axios({
        method: "DELETE",
        url: "/menu",
        params: { m_id: id },
    });
}

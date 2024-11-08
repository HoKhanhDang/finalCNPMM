import axios from "../../axios";

export const getCustomerByIdAPI = async (id: number) => {
    return await axios({
        method: "GET",
        url: `/user/client/${id}`,
        params: {_id: id },
    });
};
export const getSumCustomerAPI = async (data: any) => {
    return await axios({
        method: "GET",
        url: "/user/client/sum",
        params: data,
    });
};
export const getCustomerByParamsAPI = async (data: any) => {
    return await axios({
        method: "GET",
        url: "/user/client",
        params: data,
    });
};
export const changeStatusCustomerAPI = async (data: any) => {
    return await axios({
        method: "PUT",
        url: `/user/status/${data._id}`,
        data,
    });
};

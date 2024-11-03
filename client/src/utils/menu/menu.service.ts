import axios from "../../axios";

export const getMenuAPI = async (params: any) => {
    return await axios({
        method: "GET",
        url: "/menu",
        params: params,
    });
};

export const getSpecialMenuAPI = async () => {
    return await axios({
        method: "GET",
        url: "/menu/special-menu",
    });
};

export const getFoodDetailAPI = async (id: number) => {
    return await axios({
        method: "GET",
        url: `/menu/id`,
        params: {
            m_id: id,
        },
    });
};

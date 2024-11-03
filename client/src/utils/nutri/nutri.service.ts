import axios from "../../axios";

export const getFoodNutritionAPI = async (params: any) => {
    return await axios({
        method: "GET",
        url: "/nutrition",
        params: params,
    });
}
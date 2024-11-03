import { getFoodNutritionAPI } from "./nutri.service";
import { INutrition } from "../../types/INutrition";

export const getFoodNutrition = async (params: any) => {
    try {
        const rs = await getFoodNutritionAPI(params);
        return rs?.data.data[0] as INutrition;
    } catch (error) {
        console.log(error);
    }
};

import {getNutritionByIdAPI} from "../../pages/Menu/nutrition.service";

export const getNutritionByID = async (id: any) : Promise<({
    nutritional_info_id: number;
    calories: number;
    proteins: number;
    carbs: number;
    fats: number;
})> => {
    const rs = await getNutritionByIdAPI(id);
    return rs?.data.data[0];
}
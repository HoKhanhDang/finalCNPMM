import { NutritionalInfo, INutritionalInfo } from './nutriModel'; // Đảm bảo đường dẫn chính xác

// Thêm thông tin dinh dưỡng
const AddNutritionService = async (nutrition: {
    item_id?: number; // Optional nếu có thể là null
    calories: number;
    carbs: number;
    proteins: number;
    fats: number;
}): Promise<INutritionalInfo> => {
    const newNutrition = new NutritionalInfo(nutrition);
    
    try {
        return await newNutrition.save(); // Lưu thông tin dinh dưỡng vào MongoDB
    } catch (error) {
        throw new Error(`Error adding nutrition: ${error}`);
    }
};

// Cập nhật thông tin dinh dưỡng
const UpdateNutritionService = async (nutrition: {
    nutritional_info_id: string; // Sử dụng string cho ObjectId
    calories: number;
    carbs: number;
    proteins: number;
    fats: number;
}): Promise<INutritionalInfo | null> => {
    const { nutritional_info_id, calories, carbs, proteins, fats } = nutrition;

    try {
        const updatedNutrition = await NutritionalInfo.findByIdAndUpdate(
            nutritional_info_id,
            { calories, carbs, proteins, fats },
            { new: true } // Trả về tài liệu đã cập nhật
        );

        if (!updatedNutrition) {
            throw new Error("Nutrition information not found");
        }

        return updatedNutrition; // Trả về thông tin dinh dưỡng đã cập nhật
    } catch (error) {
        throw new Error(`Error updating nutrition: ${error}`);
    }
};

// Lấy thông tin dinh dưỡng theo item_id
const GetNutritionService = async (item_id: string): Promise<INutritionalInfo | null> => {
    try {
        return await NutritionalInfo.findOne({ _id: item_id }); // Lấy thông tin dinh dưỡng theo item_id
    } catch (error) {
        throw new Error(`Error fetching nutrition: ${error}`);
    }
};

export {
    AddNutritionService,
    UpdateNutritionService,
    GetNutritionService
};
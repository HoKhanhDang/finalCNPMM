import { Ingredient, IIngredient } from "./ingredientModel";

// Lấy tất cả nguyên liệu
const GetIngredientService = async (): Promise<IIngredient[]> => {
  try {
    return await Ingredient.find();
  } catch (error) {
    throw new Error(`Error fetching ingredients: ${error}`);
  }
};

// Thêm mới nguyên liệu
const AddIngredientService = async (ingredientData: {
  name: string;
  stock: number;
  is_available: boolean;
  unit: string;
}): Promise<IIngredient> => {
  const newIngredient = new Ingredient(ingredientData);
  try {
    return await newIngredient.save();
  } catch (error) {
    throw new Error(`Error adding ingredient: ${error}`);
  }
};

// Xóa nguyên liệu theo ID
const DeleteIngredientService = async (
  ingredientId: string
): Promise<IIngredient | null> => {
  try {
    return await Ingredient.findByIdAndDelete(ingredientId);
  } catch (error) {
    throw new Error(`Error deleting ingredient: ${error}`);
  }
};

// Lấy nguyên liệu theo ID
const GetIngredientByIdService = async (
  ingredientId: string
): Promise<IIngredient | null> => {
  try {
    return await Ingredient.findById(ingredientId);
  } catch (error) {
    throw new Error(`Error fetching ingredient by ID: ${error}`);
  }
};

// Lấy nguyên liệu theo các tham số tìm kiếm
const GetIngredientByParamsService = async (params: {
  search?: string;
  is_available?: string;
  page?: number;
  limit?: number;
}): Promise<IIngredient[]> => {
  const { search, is_available, page = 1, limit = 10 } = params;
  const query: any = {};

  if (search) {
    query.$or = [{ name: new RegExp(search, "i") }, { _id: search }];
  }

  if (is_available !== undefined) {
    query.is_available = is_available === "true";
  }

  try {
    return await Ingredient.find(query)
      .limit(limit)
      .skip((page - 1) * limit);
  } catch (error) {
    throw new Error(`Error fetching ingredients by params: ${error}`);
  }
};

// Đếm số lượng nguyên liệu theo tham số
const GetSumIngredientByParamsService = async (params: {
  search?: string;
  is_available?: string;
}): Promise<number> => {
  const { search, is_available } = params;
  const query: any = {};

  if (search) {
    query.$or = [{ name: new RegExp(search, "i") }, { _id: search }];
  }

  if (is_available !== undefined) {
    query.is_available = is_available === "true";
  }

  try {
    return await Ingredient.countDocuments(query);
  } catch (error) {
    throw new Error(`Error counting ingredients: ${error}`);
  }
};

// Cập nhật nguyên liệu theo ID
const UpdateIngredientService = async (ingredientData: {
  name: string;
  stock: number;
  is_available: boolean;
  unit: string;
  ingredient_id: string;
}): Promise<IIngredient | null> => {
  const { ingredient_id, name, stock, is_available, unit } = ingredientData;

  try {
    return await Ingredient.findByIdAndUpdate(
      ingredient_id,
      { name, stock, is_available, unit },
      { new: true }
    );
  } catch (error) {
    throw new Error(`Error updating ingredient: ${error}`);
  }
};

export {
  GetIngredientService,
  AddIngredientService,
  DeleteIngredientService,
  GetIngredientByIdService,
  GetIngredientByParamsService,
  GetSumIngredientByParamsService,
  UpdateIngredientService,
};

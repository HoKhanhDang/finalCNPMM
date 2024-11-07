import { Request, Response } from "express";

import {
  GetIngredientService,
  AddIngredientService,
  DeleteIngredientService,
  GetIngredientByIdService,
  GetIngredientByParamsService,
  GetSumIngredientByParamsService,
  UpdateIngredientService,
} from "./ingredientMg.service";

import {
  AddIngredientToMenuService,
  RemoveIngredientFromMenuService,
  UpdateIngredientFromMenuService,
  GetIngredientFromMenuService,
  DeleteAllIngredientsFromMenuService,
} from "./listIngredientMg.service";

//Ingradient
const GetIngredient = async (req: Request, res: Response) => {
  console.log("GetIngredient");
  try {
    const result = await GetIngredientService();
    return res
      .status(200)
      .json({ message: "Ingredients fetched successfully", result });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
const GetIngredientByParams = async (req: Request, res: Response) => {
  console.log("GetIngredientByParams", req.query);
  const { search, is_available, page, limit } = req.query;

  try {
    const result = await GetIngredientByParamsService({
      search: search as string,
      is_available: is_available as string,
      page: Number(page),
      limit: Number(limit),
    });
    return res
      .status(200)
      .json({ message: "Ingredients fetched successfully", result });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
const GetSumIngredientByParams = async (req: Request, res: Response) => {
  console.log("GetSumIngredientByParams", req.query);
  const { search, is_available } = req.query;
  try {
    const result = await GetSumIngredientByParamsService({
      search: search as string,
      is_available: is_available as string,
    });
    return res
      .status(200)
      .json({ message: "Ingredients fetched successfully", result });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
const GetIngredientById = async (req: Request, res: Response) => {
  console.log("GetIngredientById", req.params);
  const { i_id } = req.params;
  if (!i_id) {
    return res.status(400).json({ message: "Ingredient id is required" });
  }
  try {
    const result = await GetIngredientByIdService(i_id as string);
    return res
      .status(200)
      .json({ message: "Ingredient fetched successfully", result });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
const AddIngredient = async (req: Request, res: Response) => {
  console.log("AddIngredient", req.body);
  const { name, stock, is_available, unit } = req.body;
  if (!name || stock === undefined || is_available === undefined) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const result = await AddIngredientService({
      name: name as string,
      stock: Number(stock),
      is_available: Boolean(is_available),
      unit: unit as string,
    });
    return res
      .status(201)
      .json({ message: "Ingredient added successfully", result });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
const DeleteIngredient = async (req: Request, res: Response) => {
  console.log("DeleteIngredient", req.params);
  const { i_id } = req.params;
  if (!i_id) {
    return res.status(400).json({ message: "Ingredient id is required" });
  }
  try {
    const result = await DeleteIngredientService(i_id as string);
    return res
      .status(200)
      .json({ message: "Ingredient deleted successfully", result });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
const UpdateIngredient = async (req: Request, res: Response) => {
  console.log("UpdateIngredient", req.body);
  const { i_id, name, stock, is_available, unit } = req.body;
  if (!i_id || !name || stock === undefined || is_available === undefined) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const result = await UpdateIngredientService({
      ingredient_id: i_id as string,
      name: name as string,
      stock: Number(stock),
      is_available: Boolean(is_available),
      unit: unit as string,
    });
    return res
      .status(200)
      .json({ message: "Ingredient updated successfully", result });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

//menuitemingredients
const AddIngredientToMenu = async (req: Request, res: Response) => {
  console.log("AddIngredientToMenu", req.body);
  const { item_id, ingredient_id, quantity_required } = req.body;
  if (!item_id || !ingredient_id || !quantity_required) {
    return res
      .status(400)
      .json({ message: "Ingredient id and Menu id is required" });
  }
  try {
    const result = await AddIngredientToMenuService({
      item_id: item_id as string,
      ingredient_id: ingredient_id as string,
      quantity_required: Number(quantity_required),
    });
    return res
      .status(201)
      .json({ message: "Ingredient added to menu successfully", result });
  } catch (err: any) {
    if (err.code === "ER_DUP_ENTRY") {
      return res
        .status(400)
        .json({ code: "ER_DUP_ENTRY", message: "Ingredient already exists" });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
};
const RemoveIngredientFromMenu = async (req: Request, res: Response) => {
  console.log("RemoveIngredientFromMenu", req.params);
  const { menu_item_ingredient_id } = req.params;
  if (!menu_item_ingredient_id) {
    return res
      .status(400)
      .json({ message: "Menu item ingredient id is required" });
  }
  try {
    const result = await RemoveIngredientFromMenuService({
      menu_item_ingredient_id: menu_item_ingredient_id as string,
    });
    return res.status(200).json({
      message: "Ingredient removed from menu successfully",
      result,
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
const UpdateIngredientFromMenu = async (req: Request, res: Response) => {
  console.log("UpdateIngredientFromMenu", req.body, req.params);
  const { quantity_required } = req.body;
  const { menu_item_ingredient_id } = req.params;
  if (!menu_item_ingredient_id || !quantity_required) {
    return res.status(400).json({
      message: "Menu item ingredient id and quantity required is required",
    });
  }
  try {
    const result = await UpdateIngredientFromMenuService({
      menu_item_ingredient_id: menu_item_ingredient_id as string,
      quantity_required: Number(quantity_required),
    });
    return res.status(200).json({
      message: "Ingredient updated in menu successfully",
      result,
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
const GetIngredientsFromMenu = async (req: Request, res: Response) => {
  console.log("GetIngredientsFromMenu", req.query);
  const { itemId } = req.query;
  if (!itemId) {
    return res.status(400).json({ message: "Item id is required" });
  }
  try {
    const result = await GetIngredientFromMenuService({
      item_id: itemId as string,
    });
    return res
      .status(200)
      .json({ message: "Ingredients fetched successfully", result });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
const DeleteAllIngredientsFromMenu = async (req: Request, res: Response) => {
  console.log("DeleteAllIngredientsFromMenu", req.params);
  const { item_id } = req.params;
  if (!item_id) {
    return res.status(400).json({ message: "Item id is required" });
  }
  try {
    const result = await DeleteAllIngredientsFromMenuService({
      item_id: item_id as string,
    });

    return res
      .status(200)
      .json({ message: "Ingredients deleted all successfully", result });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export {
  GetIngredient,
  GetIngredientByParams,
  GetIngredientById,
  AddIngredient,
  DeleteIngredient,
  UpdateIngredient,
  GetSumIngredientByParams,
  AddIngredientToMenu,
  RemoveIngredientFromMenu,
  UpdateIngredientFromMenu,
  GetIngredientsFromMenu,
  DeleteAllIngredientsFromMenu,
};

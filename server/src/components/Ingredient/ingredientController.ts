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

    return res.status(200).json({
      message: "Ingredients fetched successfully",
      result, // result là mảng chứa đối tượng { Sum: total }
    });
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
  const { i_id } = req.params;
  const { name, stock, is_available, unit } = req.body;
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

export {
  GetIngredient,
  GetIngredientByParams,
  GetIngredientById,
  AddIngredient,
  DeleteIngredient,
  UpdateIngredient,
  GetSumIngredientByParams,
};

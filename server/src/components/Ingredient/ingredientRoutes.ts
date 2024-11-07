import { Router } from "express";
import {
  GetIngredientByParams,
  GetIngredientById,
  AddIngredient,
  DeleteIngredient,
  GetSumIngredientByParams,
  UpdateIngredient,
  GetIngredient,
} from "./ingredientController";

const router = Router();
//Collection Ingredients
router.get("/sum", GetSumIngredientByParams);
router.get("/:i_id", GetIngredientById);
router.get("/", GetIngredient);
router.get("/", GetIngredientByParams);

router.post("/", AddIngredient);
router.delete("/:i_id", DeleteIngredient);
router.put("/", UpdateIngredient);

export default router;

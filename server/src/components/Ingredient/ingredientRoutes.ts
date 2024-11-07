import { Router } from "express";
import {
  GetIngredientByParams,
  GetIngredientById,
  AddIngredient,
  DeleteIngredient,
  GetSumIngredientByParams,
  AddIngredientToMenu,
  RemoveIngredientFromMenu,
  UpdateIngredientFromMenu,
  GetIngredientsFromMenu,
  UpdateIngredient,
  GetIngredient,
  DeleteAllIngredientsFromMenu,
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

//Collection MenuItemIngredients
router.post("/menu/", AddIngredientToMenu);
router.delete("/menu/:menu_item_ingredient_id", RemoveIngredientFromMenu);
router.put("/menu/:menu_item_ingredient_id", UpdateIngredientFromMenu);
router.get("/menu/test", GetIngredientsFromMenu); //get by query of item_id
router.delete("/menu/all/:item_id", DeleteAllIngredientsFromMenu);

export default router;

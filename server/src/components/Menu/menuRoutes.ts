import { Router } from "express";
import {
    AddMenu,
    DeleteMenu,
    UpdateMenu,
    GetMenuById,
    GetAllMenu,
    GetMenuByParams,
    GetSumMenuByParams,
    GetSpecialMenu,
} from "./menuController";
import uploadCloud from "../../config/cloudinary.config";
import StaffController from "../User/Staff/staffController";

const router = Router();

router.post("/", AddMenu);
router.put("/", UpdateMenu);
router.delete("/", DeleteMenu);

router.get("/:id", GetMenuById);
router.get("/", GetMenuByParams);
router.get("/all", GetAllMenu);
router.get("/sum", GetSumMenuByParams);
router.get("/special-menu", GetSpecialMenu);

router.post("/image", uploadCloud.single("image"), StaffController.UploadImage);
export default router;

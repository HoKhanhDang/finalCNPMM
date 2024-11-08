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
import StaffController from "../User/Admin/adminController";

const router = Router();

router.post("/", AddMenu);
router.put("/", UpdateMenu);
router.delete("/", DeleteMenu);

// router.get("/all", GetAllMenu);
router.get("/", GetMenuByParams);
router.get("/:id", GetMenuById);

router.get("/num/sum", GetSumMenuByParams);
router.get("/more/special-menu", GetSpecialMenu);

router.post("/image", uploadCloud.single("image"), StaffController.UploadImage);
export default router;

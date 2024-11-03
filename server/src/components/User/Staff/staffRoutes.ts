import { Router } from "express";
import uploadCloud  from "../../../config/cloudinary.config";
import verifyToken from "../../../middlewares/verify-token";
const router = Router();

import StaffControllder from "./staffController";

router.get("/getSumStaff", verifyToken, StaffControllder.GetSumStaff);
router.get("/getStaffByParams", verifyToken, StaffControllder.GetStaffsByParams);
router.get("/getAllStaff", verifyToken, StaffControllder.GetAllStaff);
router.post("/addStaff", verifyToken, StaffControllder.AddStaff);
router.delete("/deleteStaff", verifyToken, StaffControllder.DeleteStaff);
router.put("/updateStaff", verifyToken, StaffControllder.UpdateStaff);
router.get("/getStaffById", verifyToken, StaffControllder.GetUserById);

router.put("/updateProfile", verifyToken, StaffControllder.UpdateProfile);
router.put("/updatePermission", verifyToken, StaffControllder.UpdatePermission);

router.post(
    "/uploadImage",
    verifyToken,
    uploadCloud.single("image"),
    StaffControllder.UploadImage
);

export default router;

import { Router } from "express";
import { GetAllNotification, GetNotificationById, AddNotification,ChangeIsRead } from "./notificationController";

const router = Router();

router.get("/", GetAllNotification)
router.post("/", AddNotification)
router.get("/:id", GetNotificationById);
router.put("/isRead", ChangeIsRead)

export default router;
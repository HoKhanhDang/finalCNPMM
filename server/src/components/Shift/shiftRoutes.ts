import { Router } from "express";
const router = Router();

import {
    getShifts,
    addShift,
    deleteShift
} from "./shiftController";

router.get("/", getShifts);
router.post("/", addShift);
router.delete("/:shift_id", deleteShift);

export default router;
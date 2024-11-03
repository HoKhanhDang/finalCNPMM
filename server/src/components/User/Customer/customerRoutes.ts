import { Router } from "express";

import CustomerController from "./customerController";
const {
    Login,
    Register,
    createNewAccessToken,
    changePassword,
} = require("../Auth/Admin/authController");

const router = Router();
import verifyToken from "../../../middlewares/verify-token";
//request

//auth
router.post("/login", Login);
router.post("/register", Register);
router.get("/token", createNewAccessToken);
router.put("/changePassword", changePassword);

//admin api
router.get("/getSumCustomer", verifyToken, CustomerController.GetSumCustomer);
router.get("/getCustomerByParams", verifyToken, CustomerController.GetCustomersByParams);
router.get("/getCustomerById", CustomerController.GetUserById);
router.post("/status", verifyToken, CustomerController.updateStatus);
router.get("/shipper", CustomerController.GetShipper);

export default router;

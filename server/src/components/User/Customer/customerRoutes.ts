import { Router } from "express";

import CustomerController from "./customerController";

import AuthAdmin from "../Auth/Admin/authController";

const router = Router();
import verifyToken from "../../../middlewares/verify-token";
//request

//auth
router.post("/login", AuthAdmin.Login);
router.post("/register", AuthAdmin.Register);
router.put("/changePassword", AuthAdmin.changePassword);

//admin api
router.get("/getSumCustomer", verifyToken, CustomerController.GetSumCustomer);
router.get("/getCustomerByParams", verifyToken, CustomerController.GetCustomersByParams);
router.get("/getCustomerById", CustomerController.GetUserById);
router.post("/status", verifyToken, CustomerController.updateStatus);
router.get("/shipper", CustomerController.GetShipper);

export default router;

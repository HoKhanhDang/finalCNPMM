const express = require("express");
const router = express.Router();

import AuthCustomer from "./customerController";

router.post("/login", AuthCustomer.loginController);
router.post("/request-otp", AuthCustomer.requestOtpController);
router.post("/verify-otp", AuthCustomer.verifyOtpController);
router.post("/register", AuthCustomer.registerController);

export default router;

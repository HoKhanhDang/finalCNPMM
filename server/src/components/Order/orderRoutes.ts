import { Router } from "express";
const router = Router();

import {
    CreateOrderAPI,
    GetOrderByCustomerIdAPI,
    GetSumOrderAPI,
    GetOrderByParamsAPI,
    GetOrderItemsAPI,
    ChangeStatusAPI,
    CancelOrderAPI,
    GetShipperOrderAPI,
    AddOrderItemsAPI,
    GetOrderByIdAPI
} from "./orderController";

router.post("/", CreateOrderAPI); 
router.post("/items", AddOrderItemsAPI); 

router.get("/sum", GetSumOrderAPI); 
router.get("/", GetOrderByParamsAPI); 
router.get("/customer/:customer_id", GetOrderByCustomerIdAPI); 
router.get("/orderDetail/:order_id", GetOrderByIdAPI); 
router.get("/items", GetOrderItemsAPI); 
router.get("/shipper", GetShipperOrderAPI); 

router.put("/status", ChangeStatusAPI); 
router.put("/cancel", CancelOrderAPI);

export default router;
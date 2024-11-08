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
    GetOrderByIdAPI,
    GetShipperOrderAPI,
    AddOrderItemsAPI,
    GetOrderDetailByIdAPI
} from "./orderController";

router.post("/", CreateOrderAPI); 
router.post("/items", AddOrderItemsAPI); 

router.get("/detail/items", GetOrderItemsAPI);
router.get("/sum", GetSumOrderAPI);
router.get("/", GetOrderByParamsAPI);
router.get("/:id", GetOrderByIdAPI);
router.get("/customer/:customer_id", GetOrderByCustomerIdAPI); 
router.get("/orderDetail/:order_id", GetOrderDetailByIdAPI); 
// router.get("/shipper", GetShipperOrderAPI); 

router.put("/status", ChangeStatusAPI); 
router.put("/cancel", CancelOrderAPI);

export default router;
import { Request, Response } from "express";
import {
    GetSumOrderService,
    GetOrderByParamsService,
    GetOrderByCustomerIdService,
    GetOrderItemsService,
    ChangeStatusService,
    CancelOrderService,
    GetShipperOrderService,
    CreateOrderService,
    GetOrderByIdService,
    AddOrderItemService,
    GetOrderDetailByIdService,
} from "./order.service";

const CreateOrderAPI = async (req: Request, res: Response) => {
    const { user_id, total_price, message, payment_method, address, lng, lat } = req.body;
    
    if (user_id == null || total_price == null) {
        return res.status(400).json({ message: "User id and total price are required" });
    }

    try {
        const result = await CreateOrderService({
            user_id: Number(user_id),
            total_price: Number(total_price),
            message: message || null,
            payment_method: payment_method || null,
            address: address || null,
            lng: lng ? Number(lng) : null,
            lat: lat ? Number(lat) : null,
        });
        return res.status(201).json({ message: "Order created successfully", result });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const AddOrderItemsAPI = async (req: Request, res: Response) => {
    const { order_id, item_id, quantity, price, title, image } = req.body;

    if (order_id == null || item_id == null || quantity == null) {
        return res.status(400).json({ message: "Order id, item id, and quantity are required" });
    }

    try {
        const result = await AddOrderItemService({
            order_id: Number(order_id),
            item_id: Number(item_id),
            quantity: Number(quantity),
            price: Number(price),
            title,
            image,
        });
        return res.status(201).json({ message: "Order item added successfully", result });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const GetOrderByCustomerIdAPI = async (req: Request, res: Response) => {
    const { customer_id } = req.params;

    if (!customer_id) {
        return res.status(400).json({ message: "User id is required" });
    }

    try {
        const result = await GetOrderByCustomerIdService({ user_id: Number(customer_id) });
        return res.status(200).json({ message: "Order fetched successfully", result });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const GetOrderDetailByIdAPI = async (req: Request, res: Response) => {
    const order_id = req.params.order_id;

    if (!order_id) {
        return res.status(400).json({ message: "Orderdetail id is required" });
    }

    try {
        const result = await GetOrderDetailByIdService(Number(order_id));
        if (!result) {
            return res.status(404).json({ message: "Orderdetail not found" });
        }
        return res.status(200).json({ message: "Orderdetail fetched successfully", result });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error " + err });
    }
};

const GetOrderByIdAPI = async (req: Request, res: Response) => {
    const id = req.params.order_id;

    if (!id) {
        return res.status(400).json({ message: "Orderdetail id is required" });
    }

    try {
        const result = await GetOrderByIdService(Number(id));
        if (!result) {
            return res.status(404).json({ message: "Orderdetail not found" });
        }
        return res.status(200).json({ message: "Orderdetail fetched successfully", result });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error " + err });
    }
};

const GetSumOrderAPI = async (req: Request, res: Response) => {
    const { search, status, create_at, history } = req.query;
    
    try {
        const result = await GetSumOrderService({
            search: search as string,
            status: status as string,
            create_at: create_at as string,
            history: history as string,
        });
        return res.status(200).json({ message: "Sum order fetched successfully", result });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const GetOrderByParamsAPI = async (req: Request, res: Response) => {
    const { page = 1, limit = 10, search, status, create_at, history } = req.query;

    try {
        const result = await GetOrderByParamsService({
            search: search as string,
            status: status as string,
            create_at: create_at as string,
            limit: Number(limit),
            page: Number(page),
            history: history as string,
        });
        return res.status(200).json({ message: "Orders fetched successfully", result });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const GetOrderItemsAPI = async (req: Request, res: Response) => {
    try {
        const result = await GetOrderItemsService();
        return res.status(200).json({ message: "Order items fetched successfully", result });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const ChangeStatusAPI = async (req: Request, res: Response) => {
    const { order_id, status, user_id, delivery_time } = req.body;

    if (!order_id || !status) {
        return res.status(400).json({ message: "Order id and status are required" });
    }

    try {
        const result = await ChangeStatusService({
            order_id: Number(order_id),
            status: status as 'Pending' | 'Processing' | 'Packed' | 'Delivering' | 'Delivered' | 'Successfully' | 'Cancelled',
            delivery_time: delivery_time ? new Date(delivery_time) : null,
            user_id: user_id ? Number(user_id) : undefined,
        });
        return res.status(200).json({ message: "Status updated successfully", result });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const CancelOrderAPI = async (req: Request, res: Response) => {
    const { order_id, message } = req.body;

    if (!order_id) {
        return res.status(400).json({ message: "Order id is required" });
    }

    try {
        const result = await CancelOrderService({
            order_id: Number(order_id),
            message: message || null,
        });
        return res.status(200).json({ message: "Order cancelled successfully", result });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const GetShipperOrderAPI = async (req: Request, res: Response) => {
    const { shipper_id } = req.query;

    if (!shipper_id) {
        return res.status(400).json({ message: "Shipper id is required" });
    }

    try {
        const result = await GetShipperOrderService({ shipper_id: Number(shipper_id) });
        return res.status(200).json({ message: "Orders fetched successfully", result });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export {
    CreateOrderAPI,
    AddOrderItemsAPI,
    GetOrderByCustomerIdAPI,
    GetSumOrderAPI,
    GetOrderByParamsAPI,
    GetOrderByIdAPI,
    GetOrderItemsAPI,
    ChangeStatusAPI,
    CancelOrderAPI,
    GetShipperOrderAPI,
    GetOrderDetailByIdAPI,
};
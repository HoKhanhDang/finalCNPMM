import { Request, Response } from "express";

import CustomerService from "./customer.service";

const GetShipper = async (req: Request, res: Response) => {
    const { user_id } = req.query;
    if (!user_id) {
        return res.status(400).json({ message: "user_id is required!" });
    }

    try {
        const result = await CustomerService.GetShipperService({
            user_id: parseInt(user_id as string),
        });
        return res.status(200).json({
            status: 200,
            message: result.message,
            data: result.data,
        });
    } catch (err: any) {
        return res.status(500).json({ message: err.message });
    }
};

const GetUserById = async (req: Request, res: Response) => {
    const { _id } = req.query;
    if (!_id) {
        return res.status(400).json({ message: "ID is required!" });
    }

    try {
        const result = await CustomerService.GetUserByIdService({
            user_id: parseInt(_id as string),
        });
        res.status(200).json({
            message: result.message,
            data: result.data,
        });
    } catch (err: any) {
        return res.status(500).json({ message: err.message });
    }
};
const updateStatus = async (req: Request, res: Response) => {
    const { _id, status } = req.query;
    if (!_id || !status) {
        return res.status(400).json({ message: "ID and status are required!" });
    }

    try {
        const result = await CustomerService.UpdateStatusService({
            user_id: parseInt(_id as string),
            status: status as string,
        });
        res.status(200).json({
            message: result.message,
            data: result.data,
        });
    } catch (err: any) {
        return res.status(500).json({ message: err.message });
    }
};

const GetCustomersByParams = async (req: Request, res: Response) => {
    let queryObj = { ...req.query };

    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    const page = parseInt((req.query.page as string) || "1");

    try {
        const result = await CustomerService.GetCustomersByParamsService(
            queryObj,
            page
        );
        res.status(200).json({
            message: result.message,
            data: result.data,
            length: result.length,
            total: result.total,
        });
    } catch (err: any) {
        return res.status(500).json({ message: err.message });
    }
};

const GetSumCustomer = async (req: Request, res: Response) => {
    let queryObj = { ...req.query };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    try {
        const result = await CustomerService.GetSumCustomerService(queryObj);
        res.status(200).json({
            message: result.message,
            total: result.total,
        });
    } catch (err: any) {
        return res.status(500).json({ message: err.message });
    }
};

export default {
    updateStatus,
    GetCustomersByParams,
    GetSumCustomer,
    GetUserById,
    GetShipper,
};

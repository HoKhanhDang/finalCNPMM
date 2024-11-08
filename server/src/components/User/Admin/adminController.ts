import { Request, Response } from "express";
import StaffService from "./admin.service";

interface CustomRequest extends Request {
    file: any;
}

const GetUserById = async (req: Request, res: Response) => {
    const { user_id } = req.params;
    if (!user_id) {
        return res.status(400).json({ message: "ID is required!" });
    }

    try {
        const result = await StaffService.GetUserByIdService(
            parseInt(user_id as string)
        );
        res.status(200).json({
            message: result.message,
            data: result.data,
        });
    } catch (err: any) {
        return res.status(500).json({ message: err.message });
    }
};

const AddStaff = async (req: Request, res: Response) => {
    const { name, phone, email, username, role, permission } = req.query;

    if (!name || !phone || !email || !username || !role) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        const result = await StaffService.AddStaffService({
            name: name as string,
            phone: phone as string,
            email: email as string,
            username: username as string,
            role: role as string,
            permission,
        });
        res.status(200).json({
            message: result.message,
            data: result.data,
        });
    } catch (err: any) {
        if (err.message.includes("already exist")) {
            return res.status(409).json({ message: err.message });
        }
        return res.status(500).json({ message: err.message });
    }
};

const DeleteStaff = async (req: Request, res: Response) => {
    const { user_id } = req.params;
    if (!user_id) {
        return res.status(400).json({ message: "ID is required!" });
    }

    try {
        const result = await StaffService.DeleteStaffService(
            parseInt(user_id as string)
        );
        res.status(200).json({
            message: result.message,
            data: result.data,
        });
    } catch (err: any) {
        return res.status(500).json({ message: err.message });
    }
};

const GetSumStaff = async (req: Request, res: Response) => {
    let queryObj = { ...req.query };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    try {
        const result = await StaffService.GetSumStaffService(queryObj);
        res.status(200).json({
            message: result.message,
            total: result.total,
        });
    } catch (err: any) {
        return res.status(500).json({ message: err.message });
    }
};

const GetStaffsByParams = async (req: Request, res: Response) => {
    let queryObj = { ...req.query };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    const page = parseInt((req.query.page as string) || "1");

    try {
        const result = await StaffService.GetStaffsByParamsService(
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

const UpdateUser = async (req: Request, res: Response) => {
    const { user_id } = req.params;
    const { name, phone, email, username, role, status, image } = req.body;

    if (!user_id) {
        return res.status(400).json({ message: "ID is required!" });
    }

    try {
        // Check if it's a profile update or a full staff update
        const isProfileUpdate = !username && !role && !status;

        const result = isProfileUpdate
            ? await StaffService.UpdateProfileService({
                  user_id: parseInt(user_id as string),
                  name: name as string,
                  phone: phone as string,
                  image: image as string,
              })
            : await StaffService.UpdateStaffService({
                  user_id: parseInt(user_id as string),
                  name: name as string,
                  phone: phone as string,
                  email: email as string,
                  username: username as string,
                  role: role as string,
                  status: status as string,
              });

        res.status(200).json({
            message: result.message,
            data: result.data,
        });
    } catch (err: any) {
        if (err.message.includes("already exist")) {
            return res.status(409).json({ message: err.message });
        }
        return res.status(500).json({ message: err.message });
    }
};

const UpdatePermission = async (req: Request, res: Response) => {
    const { user_id} = req.params;
    const{ permission } = req.body;

    if (!user_id) {
        return res.status(400).json({ message: "ID is required!" });
    }

    try {
        const result = await StaffService.UpdatePermissionService({
            user_id: parseInt(user_id as string),
            permission,
        });
        res.status(200).json({
            message: result.message,
            data: result.data,
        });
    } catch (err: any) {
        return res.status(500).json({ message: err.message });
    }
};

const GetAllStaff = async (req: Request, res: Response) => {
    try {
        const result = await StaffService.GetAllStaffService();
        res.status(200).json({
            message: result.message,
            data: result.data,
        });
    } catch (err: any) {
        return res.status(500).json({ message: err.message });
    }
};

const UploadImage = async (req: Request, res: Response) => {
    const reqCustom = req as CustomRequest;
    return res.status(200).json({
        message: "Upload image successfully",
        data: reqCustom.file,
    });
};

export default {
    GetUserById,
    AddStaff,
    DeleteStaff,
    GetSumStaff,
    GetStaffsByParams,
    UpdateUser,
    UpdatePermission,
    GetAllStaff,
    UploadImage,
};

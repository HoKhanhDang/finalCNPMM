import User from "../user.model";

const GetShipperService = async (data: { user_id: number }) => {
    const { user_id } = data;

    try {
        const shipper = await User.findOne({ user_id, role: "shipper" });
        if (!shipper) {
            throw new Error("Shipper not found");
        }
        return {
            message: "Get shipper by user_id successfully",
            data: shipper,
        };
    } catch (error) {
        throw error;
    }
};

const GetUserByIdService = async (data: { user_id: number }) => {
    const { user_id } = data;

    try {
        const user = await User.findOne({ user_id });
        if (!user) {
            throw new Error("User not found");
        }
        return {
            message: "Get user by id successfully",
            data: user,
        };
    } catch (error) {
        throw error;
    }
};

const UpdateStatusService = async (data: {
    user_id: number;
    status: string;
}) => {
    const { user_id, status } = data;

    try {
        const user = await User.findOneAndUpdate(
            { user_id },
            { status },
            { new: true }
        );
        if (!user) {
            throw new Error("User not found");
        }
        return {
            message: "Update status successfully",
            data: user,
        };
    } catch (error) {
        throw error;
    }
};
const GetCustomersByParamsService = async (queryObj: any, page: number) => {
    const limit = 5;
    const skip = page ? (page - 1) * limit : 0;

    let query: any = { role: "user" };

    for (const key in queryObj) {
        if (key === "status") {
            query["status"] = queryObj[key];
        } else if (key === "role") {
            query["role"] = queryObj[key];
        } else if (queryObj[key] !== "") {
            const searchRegex = new RegExp(queryObj[key], "i");
            query["$or"] = [
                { user_id: { $regex: searchRegex } },
                { fullName: { $regex: searchRegex } },
                { phone: { $regex: searchRegex } },
                { email: { $regex: searchRegex } },
            ];
        }
    }

    try {
        const users = await User.find(query).limit(limit).skip(skip);
        const total = await User.countDocuments(query);

        return {
            message: "Get users by params successfully",
            data: users,
            length: users.length,
            total,
        };
    } catch (error) {
        throw error;
    }
};

const GetSumCustomerService = async (queryObj: any) => {
    let query: any = { role: "user" };

    for (const key in queryObj) {
        if (key === "status") {
            query["status"] = queryObj[key];
        } else if (key === "role") {
            query["role"] = queryObj[key];
        } else if (queryObj[key] !== "") {
            const searchRegex = new RegExp(queryObj[key], "i");
            query["$or"] = [
                { user_id: { $regex: searchRegex } },
                { fullName: { $regex: searchRegex } },
                { phone: { $regex: searchRegex } },
                { email: { $regex: searchRegex } },
            ];
        }
    }

    try {
        const total = await User.countDocuments(query);

        return {
            message: "Get total customers successfully",
            total,
        };
    } catch (error) {
        throw error;
    }
};

export default {
    GetShipperService,
    GetUserByIdService,
    UpdateStatusService,
    GetCustomersByParamsService,
    GetSumCustomerService,
};

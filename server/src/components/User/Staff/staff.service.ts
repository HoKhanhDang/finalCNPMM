import User from "../user.model";

const checkValid = async (email: string, phone: string) => {
    const emailExists = await User.findOne({ email });
    if (emailExists) {
        return 410; // Email đã tồn tại
    }

    const phoneExists = await User.findOne({ phone });
    if (phoneExists) {
        return 411; // Số điện thoại đã tồn tại
    }

    return 200; // Hợp lệ
};
const GetUserByIdService = async (user_id: number) => {
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
const AddStaffService = async (data: {
    name: string;
    phone: string;
    email: string;
    username: string;
    role: string;
    permission?: any;
}) => {
    const { name, phone, email, username, role, permission } = data;

    if (!email || !phone) {
        throw new Error("Email and phone must be provided");
    }
    const validStatus = await checkValid(email, phone);
    if (validStatus === 410) {
        throw new Error("Email is already exist");
    } else if (validStatus === 411) {
        throw new Error("Phone number is already exist");
    }

    try {
        const newUser = new User({
            fullName: name,
            phone,
            email,
            username,
            role,
            permissions: permission || {},
            status: "active", // hoặc giá trị mặc định
            password: "defaultpassword", // Bạn nên tạo một mật khẩu mặc định hoặc yêu cầu người dùng đặt mật khẩu
        });

        await newUser.save();

        return {
            message: "Add staff successfully",
            data: newUser,
        };
    } catch (error) {
        throw error;
    }
};
const UpdateStaffService = async (data: {
    user_id: number;
    name?: string;
    phone?: string;
    email?: string;
    username?: string;
    role?: string;
    status?: string;
}) => {
    const { user_id, name, phone, email, username, role, status } = data;

    try {
        const updatedUser = await User.findOneAndUpdate(
            { user_id },
            { fullName: name, phone, email, username, role, status },
            { new: true }
        );

        if (!updatedUser) {
            throw new Error("User not found");
        }

        return {
            message: "Update staff successfully",
            data: updatedUser,
        };
    } catch (error) {
        throw error;
    }
};
const DeleteStaffService = async (user_id: number) => {
    try {
        const deletedUser = await User.findOneAndDelete({ user_id });
        if (!deletedUser) {
            throw new Error("User not found");
        }

        return {
            message: "Delete staff successfully",
            data: deletedUser,
        };
    } catch (error) {
        throw error;
    }
};
const GetSumStaffService = async (queryObj: any) => {
    // Xây dựng query
    let query: any = { role: { $ne: "user" } }; // role not like 'user'

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
                { username: { $regex: searchRegex } },
            ];
        }
    }

    try {
        const total = await User.countDocuments(query);

        return {
            message: "Get total staff successfully",
            total,
        };
    } catch (error) {
        throw error;
    }
};
const GetStaffsByParamsService = async (queryObj: any, page: number) => {
    const limit = 5;
    const skip = page ? (page - 1) * limit : 0;

    let query: any = { role: { $ne: "user" } };

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
                { username: { $regex: searchRegex } },
            ];
        }
    }

    try {
        const staffs = await User.find(query).limit(limit).skip(skip);
        const total = await User.countDocuments(query);

        return {
            message: "Get staffs by params successfully",
            data: staffs,
            length: staffs.length,
            total,
        };
    } catch (error) {
        throw error;
    }
};
const UpdateProfileService = async (data: {
    user_id: number;
    name?: string;
    phone?: string;
    image?: string;
}) => {
    const { user_id, name, phone, image } = data;

    try {
        const updatedUser = await User.findOneAndUpdate(
            { user_id },
            { fullName: name, phone, image },
            { new: true }
        );

        if (!updatedUser) {
            throw new Error("User not found");
        }

        return {
            message: "Update profile successfully",
            data: updatedUser,
        };
    } catch (error) {
        throw error;
    }
};
const UpdatePermissionService = async (data: {
    user_id: number;
    permission: any;
}) => {
    const { user_id, permission } = data;

    try {
        const updatedUser = await User.findOneAndUpdate(
            { user_id },
            { permissions: permission || {} },
            { new: true }
        );

        if (!updatedUser) {
            throw new Error("User not found");
        }

        return {
            message: "Update permission successfully",
            data: updatedUser,
        };
    } catch (error) {
        throw error;
    }
};
const GetAllStaffService = async () => {
    try {
        const staffs = await User.find({
            role: { $nin: ["user", "admin"] },
        });

        return {
            message: "Get all staff successfully",
            data: staffs,
        };
    } catch (error) {
        throw error;
    }
};

export default {
    AddStaffService,
    DeleteStaffService,
    GetAllStaffService,
    GetStaffsByParamsService,
    GetSumStaffService,
    GetUserByIdService,
    UpdateProfileService,
    UpdateStaffService,
    UpdatePermissionService,
}

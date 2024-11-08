import { MenuItem } from './menuModel'; // Đảm bảo đường dẫn chính xác

// Thêm món ăn vào menu
const AddMenuService = async (menu: {
    title: string;
    price: number;
    description: string;
    image: string;
    category: string;
}) => {
    try {
        const newMenuItem = new MenuItem(menu);
        const result = await newMenuItem.save();
        return result;
    } catch (err) {
        throw new Error(`Error adding menu item: ${err}`);
    }
};

// Cập nhật món ăn trong menu
const UpdateMenuService = async (menu: {
    title: string;
    price: number;
    description: string;
    image: string;
    category: string;
    id: number;
}) => {
    const { id, ...updateData } = menu;
    try {
        const result = await MenuItem.findByIdAndUpdate(id, updateData, { new: true });
        return result;
    } catch (err) {
        throw new Error(`Error updating menu item: ${err}`);
    }
};

// Xóa món ăn trong menu
const DeleteMenuService = async (id: number) => {
    try {
        const result = await MenuItem.findByIdAndDelete(id);
        return result;
    } catch (err) {
        throw new Error(`Error deleting menu item: ${err}`);
    }
};

// Lấy menu theo tham số
const GetMenuByParamsService = async (params: {
    page: number;
    limit: number;
    title?: string;
    category?: string;
    availability?: boolean;
}) => {
    const { page, limit, title, category, availability } = params;
    const query: any = {};

    if (title) {
        query.title = { $regex: title, $options: 'i' };
    }
    if (category) {
        query.category = category;
    }
    if (availability !== undefined) {
        query.availability = availability;
    }

    const numberPage = (page - 1) * limit;
    
    try {
        const result = await MenuItem.find(query)
            .skip(numberPage)
            .limit(limit);
        return result;
    } catch (err) {
        throw new Error(`Error getting menu items: ${err}`);
    }
};

const GetAllMenuService = async () => {
    try {
        const result = await MenuItem.find(); // Lấy tất cả món ăn
        return {
            message: "All menu items fetched successfully",
            data: result,
        };
    } catch (error) {
        throw new Error(`Error getting all menu items: ${error}`);
    }
};

// Lấy tổng số món ăn theo tham số
const GetSumMenuByParamsService = async (params: {
    title?: string;
    category?: string;
    availability?: boolean;
}) => {
    const query: any = {};

    if (params.title) {
        query.title = { $regex: params.title, $options: 'i' };
    }
    if (params.category) {
        query.category = params.category;
    }
    if (params.availability !== undefined) {
        query.availability = params.availability;
    }

    try {
        const count = await MenuItem.countDocuments(query);
        return { Sum: count };
    } catch (err) {
        throw new Error(`Error getting menu item count: ${err}`);
    }
};

// Lấy món ăn theo ID
const GetMenuByIdService = async (id: string) => {
    try {
        const result = await MenuItem.findOne({ _id: id });;
        return result;
    } catch (err) {
        throw new Error(`Error getting menu item by ID: ${err}`);
    }
};

// Lấy món ăn đặc biệt
const GetSpecialMenuService = async () => {
    try {
        const result = await MenuItem.find({ category: "Special" });
        return result;
    } catch (err) {
        throw new Error(`Error getting special menu items: ${err}`);
    }
};

export {
    AddMenuService,
    UpdateMenuService,
    GetAllMenuService,
    DeleteMenuService,
    GetMenuByParamsService,
    GetSumMenuByParamsService,
    GetMenuByIdService,
    GetSpecialMenuService
};
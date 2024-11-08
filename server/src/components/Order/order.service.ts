import { Order, IOrder, IOrderItem, OrderItem } from './orderModel';
import { convertDay } from "../../utils/Order";

const CreateOrderService = async (params: {
    user_id: number; // ID người dùng
    total_price: number | null; // Tổng giá đơn hàng
    message?: string; // Tin nhắn kèm theo
    payment_method: string | null; // Phương thức thanh toán
    address: string | null; // Địa chỉ giao hàng
    lng?: number | null; // Kinh độ
    lat?: number | null; // Vĩ độ
}): Promise<IOrder> => {
    const data = new Order({
        order_id: await getNextOrderId(), // Lấy ID đơn hàng tiếp theo
        user_id: params.user_id,
        total_price: params.total_price,
        message: params.message || null,
        address: params.address,
        payment_method: params.payment_method,
        create_at: new Date(), // Thời gian tạo đơn hàng
        status: "Pending", // Trạng thái ban đầu
        lng: params.lng || null,
        lat: params.lat || null,
        delivery_time: null,
        shipper_id: null,
});

    const order = new Order(data);
    return await order.save();
};

const AddOrderItemService = async (params: {
    order_id: number; // ID đơn hàng
    item_id: number; // ID món
    quantity: number; // Số lượng
    price: number; // Giá của món
    title: string; // Tên món
    image: string; // Hình ảnh món
}): Promise<IOrderItem> => {
    const { order_id, item_id, quantity, price, title, image } = params;
    const orderItem = new OrderItem({
        order_id,
        item_id,
        quantity,
        price,
        title,
        image,
    });
    const newOrderItem = new OrderItem(orderItem);
    return await newOrderItem.save();
};

const GetSumOrderService = async (params: {
    search?: string; // Tìm kiếm theo ID hoặc tên
    status?: string; // Trạng thái đơn hàng
    create_at?: string; // Ngày tạo đơn hàng
    history?: string; // Lịch sử đơn hàng
}): Promise<number> => {
    const { search, status, create_at, history } = params;
    const query: any = {};
    
    if (search) {
        query.$or = [
            { user_id: { $regex: search, $options: 'i' } },
            { order_id: { $regex: search, $options: 'i' } }
        ];
    }
    
    if (history !== "1") {
        if (status) {
            query.status = { $regex: status, $options: 'i' };
        }
        query.status = { $nin: ['Cancelled', 'Successfully'] };
    } else {
        query.status = { $in: ['Successfully', 'Cancelled'] };
    }
    
    if (create_at) {
        query.create_at = { $gte: new Date(convertDay(create_at) || "") };
    }
    
    return await Order.countDocuments(query);
};

const GetOrderByParamsService = async (params: {
    search?: string; // Tìm kiếm
    status?: string; // Trạng thái
    create_at?: string; // Ngày tạo
    limit: number; // Giới hạn số lượng trả về
    page: number; // Trang
    history?: string; // Lịch sử
}): Promise<IOrder[]> => {
    const { search, status, create_at, limit, page, history } = params;
    const query: any = {};
    
    if (search) {
        query.$or = [
            { user_id: { $regex: search, $options: 'i' } },
            { order_id: { $regex: search, $options: 'i' } }
        ];
    }
    
    if (history !== "1") {
        if (status) {
            query.status = { $regex: status, $options: 'i' };
        }
        query.status = { $nin: ['Cancelled', 'Successfully'] };
    } else {
        query.status = { $in: ['Successfully', 'Cancelled'] };
    }
    
    if (create_at) {
        query.create_at = { $gte: new Date(create_at) };
    }
    
    return await Order.find(query).limit(limit).skip(limit * (page - 1));
};

const GetOrderByCustomerIdService = async (params: {
    user_id: number; // ID người dùng
}): Promise<IOrder[]> => {
    const { user_id } = params;
    return await Order.find({ user_id });
};

const GetOrderDetailByIdService = async (order_id: number): Promise<IOrderItem[] | null> => {
    return await OrderItem.find({ order_id });
};

const GetOrderByIdService = async (order_id: number): Promise<IOrder[] | null> => {
    return await Order.find({ _id: order_id });
};

const GetOrderItemsService = async (): Promise<IOrderItem[]> => {
    return await OrderItem.find();
};

const ChangeStatusService = async (params: {
    order_id: number; // ID đơn hàng
    status: 'Pending' | 'Processing' | 'Packed' | 'Delivering' | 'Delivered' | 'Successfully' | 'Cancelled'; // Trạng thái mới
    delivery_time?: Date | null; // Thời gian giao hàng
    user_id?: number | null; // ID người giao hàng
}): Promise<IOrder | null> => {
    const { order_id, status, delivery_time, user_id } = params;
    const updateData: any = { status };

    if (delivery_time) {
        updateData.delivery_time = delivery_time;
    }
    
    if (user_id !== undefined) {
        updateData.shipper_id = user_id; // Giả sử user_id là số
    }

    return await Order.findOneAndUpdate({ order_id }, updateData, { new: true });
};

const CancelOrderService = async (params: {
    order_id: number; // ID đơn hàng
    message: string; // Tin nhắn kèm theo
}): Promise<IOrder | null> => {
    const { order_id, message } = params;
    return await Order.findOneAndUpdate(
        { order_id },
        { status: 'Cancelled', message },
        { new: true }
    );
};

const GetShipperOrderService = async (params: {
    shipper_id: number; // ID người giao hàng
}): Promise<IOrder[]> => {
    const { shipper_id } = params;
    return await Order.find({ status: 'Delivering', shipper_id });
};

// Helper function to get the next order ID
async function getNextOrderId(): Promise<number> {
    const lastOrder = await Order.findOne().sort({ order_id: -1 });
    return lastOrder ? lastOrder.order_id + 1 : 1; // Bắt đầu từ 1 nếu không có đơn hàng nào
}

export {
    CreateOrderService,
    AddOrderItemService,
    GetSumOrderService,
    GetOrderByParamsService,
    GetOrderByCustomerIdService,
    GetOrderDetailByIdService,
    GetOrderItemsService,
    ChangeStatusService,
    GetOrderByIdService,
    CancelOrderService,
    GetShipperOrderService,
};
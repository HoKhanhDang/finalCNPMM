import {
    GetOrderByIdAPI,
    GetOrderItemsAPI,
    getShipperByIdAPI,
} from "../../utils/order/order.service";

export const GetOrder = async (id: number) => {
    const rs = await GetOrderByIdAPI(id);

    const data = await Promise.all(
        rs.data.result.map(async (item: any) => {
            const orderItems = await GetOrderItemsAPI(item.order_id);
            return {
                ...item,
                orderItems: orderItems.data.result,
            };
        })
    );
    return data;
};

export const GetShipper = async (id: number) => {
    const rs = await getShipperByIdAPI(id);
    return rs.data.rs.data[0];
};

export const GetItemsOrderByOrderID = async (id: number) => {
    const orderItems = await GetOrderItemsAPI(id);

    return orderItems.data.result;
};

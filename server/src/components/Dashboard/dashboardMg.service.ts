type TotalOrderResult = { total_order: number };
type TotalProfitResult = { profit: string };
type TotalUserResult = { total_user: number };
type TotalViewResult = { total_view: number };
type TotalOrderLastMonthResult = { total_order: number };
type TotalProfitLastMonthResult = { profit: string };
type TotalUserLastMonthResult = { total_user: number };
type TotalViewLastMonthResult = { total_view: number };

import View from "./viewModel";
import { Order, OrderItem } from "../Order/orderModel";
import User from "../User/user.model";

// Hàm tính tổng lượt xem của tháng trước
export const GetTotalViewLastMonthService =
  async (): Promise<TotalViewLastMonthResult> => {
    try {
      // Lấy thời gian đầu tháng trước và đầu tháng hiện tại
      const startOfLastMonth = new Date();
      startOfLastMonth.setMonth(startOfLastMonth.getMonth() - 1);
      startOfLastMonth.setDate(1);
      startOfLastMonth.setHours(0, 0, 0, 0);

      const startOfCurrentMonth = new Date();
      startOfCurrentMonth.setDate(1);
      startOfCurrentMonth.setHours(0, 0, 0, 0);

      // Thực hiện đếm tài liệu trong khoảng thời gian từ đầu tháng trước đến đầu tháng hiện tại
      const total_view = await View.countDocuments({
        create_at: { $gte: startOfLastMonth, $lt: startOfCurrentMonth },
      });

      return { total_view };
    } catch (err) {
      console.error("Error executing queries:", err);
      throw err;
    }
  };

// Hàm tính tổng lượt xem trong tháng hiện tại
export const GetTotalViewCurrentMonthService =
  async (): Promise<TotalViewResult> => {
    try {
      // Xác định đầu tháng hiện tại và đầu tháng sau
      const startOfCurrentMonth = new Date();
      startOfCurrentMonth.setDate(1);
      startOfCurrentMonth.setHours(0, 0, 0, 0);

      const startOfNextMonth = new Date(startOfCurrentMonth);
      startOfNextMonth.setMonth(startOfNextMonth.getMonth() + 1);

      // Đếm số tài liệu có create_at nằm trong tháng hiện tại
      const total_view = await View.countDocuments({
        create_at: { $gte: startOfCurrentMonth, $lt: startOfNextMonth },
      });

      return { total_view };
    } catch (err) {
      console.error("Error executing queries:", err);
      throw err;
    }
  };

export const GetTotalOrderLastMonthService = async (): Promise<
  TotalOrderLastMonthResult[]
> => {
  try {
    const result = await Order.aggregate([
      {
        $match: {
          create_at: {
            $gte: new Date(new Date().setMonth(new Date().getMonth() - 1)),
            $lt: new Date(),
          },
        },
      },
      {
        $count: "total_order",
      },
    ]);
    return result;
  } catch (err) {
    console.error("Error executing queries:", err);
    throw err;
  }
};

export const GetTotalUserLastMonthService = async (): Promise<
  TotalUserLastMonthResult[]
> => {
  try {
    const result = await User.aggregate([
      {
        $match: {
          create_at: {
            $gte: new Date(new Date().setMonth(new Date().getMonth() - 1)),
            $lt: new Date(),
          },
        },
      },
      {
        $count: "total_user",
      },
    ]);
    return result;
  } catch (err) {
    console.error("Error executing queries:", err);
    throw err;
  }
};

export const GetTotalProfitLastMonthService = async (): Promise<
  TotalProfitLastMonthResult[]
> => {
  try {
    const result = await Order.aggregate([
      {
        $match: {
          status: "Successfully",
          create_at: {
            $gte: new Date(new Date().setMonth(new Date().getMonth() - 1)),
            $lt: new Date(),
          },
        },
      },
      {
        $group: {
          _id: null,
          profit: { $sum: "$total_price" },
        },
      },
    ]);
    return result;
  } catch (err) {
    console.error("Error executing queries:", err);
    throw err;
  }
};

export const GetTotalOrderCurrentMonthService = async (): Promise<
  TotalOrderResult[]
> => {
  try {
    const result = await Order.aggregate([
      {
        $match: {
          create_at: {
            $gte: new Date(new Date().setDate(1)), // Bắt đầu từ đầu tháng
            $lt: new Date(
              new Date(new Date().setMonth(new Date().getMonth() + 1)).setDate(
                1
              )
            ),
          },
        },
      },
      {
        $count: "total_order",
      },
    ]);
    return result;
  } catch (err) {
    console.error("Error executing queries:", err);
    throw err;
  }
};

export const GetTotalUserCurrentMonthService = async (): Promise<
  TotalUserResult[]
> => {
  try {
    const result = await User.aggregate([
      {
        $match: {
          create_at: {
            $gte: new Date(new Date().setDate(1)), // Bắt đầu từ đầu tháng
            $lt: new Date(
              new Date(new Date().setMonth(new Date().getMonth() + 1)).setDate(
                1
              )
            ), // Trước đầu tháng tiếp theo
          },
        },
      },
      {
        $count: "total_user",
      },
    ]);
    return result;
  } catch (err) {
    console.error("Error executing queries:", err);
    throw err;
  }
};

export const GetTotalProfitCurrentMonthService = async (): Promise<
  TotalProfitResult[]
> => {
  try {
    const result = await Order.aggregate([
      {
        $match: {
          status: "Successfully",
          create_at: {
            $gte: new Date(new Date().setDate(1)), // Bắt đầu từ đầu tháng
            $lt: new Date(
              new Date(new Date().setMonth(new Date().getMonth() + 1)).setDate(
                1
              )
            ), // Trước đầu tháng tiếp theo
          },
        },
      },
      {
        $group: {
          _id: null,
          profit: { $sum: "$total_price" },
        },
      },
    ]);
    return result;
  } catch (err) {
    console.error("Error executing queries:", err);
    throw err;
  }
};

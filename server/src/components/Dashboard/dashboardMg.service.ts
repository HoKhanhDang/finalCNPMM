type TotalOrderResult = { total_order: number };
type TotalProfitResult = { profit: string };
type TotalUserResult = { total_user: number };
type TotalViewResult = { total_view: number };
type TotalOrderLastMonthResult = { total_order: number };
type TotalProfitLastMonthResult = { profit: string };
type TotalUserLastMonthResult = { total_user: number };
type TotalViewLastMonthResult = { total_view: number };

import View from "./viewModel";

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


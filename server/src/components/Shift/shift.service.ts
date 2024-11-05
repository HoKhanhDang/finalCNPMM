import { Shift, IShift } from "./shiftModel"; // Nhập model Shift từ shiftModel

export const getShiftsService = async (): Promise<IShift[]> => {
    try {
        const shifts = await Shift.find(); // Lấy tất cả các ca làm việc
        return shifts;
    } catch (err) {
        throw new Error(`Error fetching shifts: ${err}`);
    }
};

export const addShiftService = async (params: {
    staffId: number;
    staffName: string;
    start: Date; // Giữ nguyên kiểu Date
    end: Date;   // Giữ nguyên kiểu Date
    title: string;
}): Promise<IShift> => {
    const newShift = new Shift(params); // Tạo một đối tượng Shift mới

    try {
        const savedShift = await newShift.save(); // Lưu ca làm việc vào cơ sở dữ liệu
        return savedShift; // Trả về ca làm việc đã lưu
    } catch (err) {
        throw new Error(`Error adding shift: ${err}`);
    }
};

export const deleteShiftService = async (shiftID: string): Promise<{ affectedRows: number }> => {
    try {
        const result = await Shift.deleteOne({ _id: shiftID }); // Xóa ca làm việc theo ID
        return { affectedRows: result.deletedCount }; // Trả về số dòng bị ảnh hưởng
    } catch (err) {
        throw new Error(`Error deleting shift: ${err}`);
    }
};
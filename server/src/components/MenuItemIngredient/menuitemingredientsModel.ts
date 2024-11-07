import mongoose, { Schema, Document } from "mongoose";

// Định nghĩa interface cho MenuItemIngredient
interface IMenuItemIngredient extends Document {
  item_id: string | null;
  ingredient_id: string | null;
  quantity_required: number | null;
}

// Định nghĩa schema cho MenuItemIngredient
const MenuItemIngredientSchema: Schema = new Schema<IMenuItemIngredient>(
  {
    item_id: {
      type: String, // Sử dụng String thay vì string
      required: true, // Thêm thuộc tính required nếu muốn bắt buộc trường này
    },
    ingredient_id: {
      type: String, // Sử dụng String thay vì string
      required: true, // Thêm thuộc tính required nếu muốn bắt buộc trường này
      ref: "Ingredient", // Thêm ref để liên kết với collection ingredient
    },
    quantity_required: {
      type: Number,
      default: 0, // Có thể dùng giá trị mặc định là 0 thay vì null nếu cần
    },
  },
  {
    timestamps: true, // Thêm createdAt và updatedAt tự động
  }
);

// Tạo model từ schema
const MenuItemIngredient = mongoose.model<IMenuItemIngredient>(
  "MenuItemIngredient",
  MenuItemIngredientSchema
);

export { MenuItemIngredient, IMenuItemIngredient };

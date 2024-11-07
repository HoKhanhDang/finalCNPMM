import mongoose, { Document, Schema } from "mongoose";

export interface IOrder extends Document {
  order_id: number;
  user_id: number;
  total_price: number | null;
  delivery_time: Date | null;
  create_at: Date;
  payment_method: string | null;
  lng: number | null;
  lat: number | null;
  message: string | null;
  address: string | null;
  status:
    | "Pending"
    | "Processing"
    | "Packed"
    | "Delivering"
    | "Delivered"
    | "Successfully"
    | "Cancelled"
    | null;
  shipper_id: number | null;
}

const OrderSchema = new Schema<IOrder>({
  order_id: { type: Number, required: true, unique: true },
  user_id: { type: Number, default: null },
  total_price: { type: Schema.Types.Decimal128, default: null },
  delivery_time: { type: Date, default: null },
  create_at: { type: Date, default: Date.now }, // Set default to current date
  payment_method: { type: String, default: null },
  lng: { type: Number, default: null },
  lat: { type: Number, default: null },
  message: { type: String, default: null },
  address: { type: String, default: null },
  status: {
    type: String,
    enum: [
      "Pending",
      "Processing",
      "Packed",
      "Delivering",
      "Delivered",
      "Successfully",
      "Cancelled",
    ],
    default: null,
  },
  shipper_id: { type: Number, default: null },
});

// Define the interface for Order Item
export interface IOrderItem extends Document {
  order_id: number;
  item_id: number;
  quantity: number;
  price: number;
  title: string;
  image: string;
}

// Define schema for Order Item
const OrderItemSchema: Schema = new Schema<IOrderItem>({
  order_id: { type: Number, required: true },
  item_id: { type: Number, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  title: { type: String, required: true },
  image: { type: String, required: true },
});

// Create models from schemas
const Order = mongoose.model<IOrder>("Order", OrderSchema);
const OrderItem = mongoose.model<IOrderItem>("OrderItem", OrderItemSchema);

export { Order, OrderItem };

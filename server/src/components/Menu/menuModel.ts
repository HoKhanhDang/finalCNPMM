import mongoose, { Document, Schema } from 'mongoose';

export enum Category {
  Food = 'Food',
  Beverage = 'Beverage',
  Special = 'Special',
}

export interface IMenuItem extends Document {
  item_id: number;
  title?: string;
  price?: number;
  description?: string;
  availability?: boolean;
  category?: Category;
  image?: string;
  tag?: string;
}

const menuItemSchema: Schema = new Schema({
  item_id: { type: Number, required: true, unique: true, autoIncrement: true },
  title: { type: String, default: null },
  price: { type: Schema.Types.Decimal128, default: null },
  description: { type: String },
  availability: { type: Boolean, default: true },
  category: { type: String, enum: Object.values(Category), default: null },
  image: { type: String, default: null },
  tag: { type: String, default: null },
}, {
  timestamps: true,
});

export const MenuItem = mongoose.model<IMenuItem>('MenuItem', menuItemSchema);
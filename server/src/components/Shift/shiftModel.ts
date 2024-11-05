import mongoose, { Document, Schema } from 'mongoose';

interface IShift extends Document {
    staffId: number;
    staffName: string;
    start: Date;
    end: Date;
    title: string;
}

const ShiftSchema: Schema = new Schema({
    staffId: {
        type: Number,
        required: true,
    },
    staffName: {
        type: String,
        required: true,
    },
    start: {
        type: Date,
        required: true,
    },
    end: {
        type: Date,
        required: true,
    },
    title: {
        type: String,
        required: true,
    }
}, {
    timestamps: true // Tự động thêm createdAt và updatedAt
});

const Shift = mongoose.model<IShift>('Shift', ShiftSchema);

export { Shift, IShift };
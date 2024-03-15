import { Schema, model } from 'mongoose';

const TestSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Test = model('Test', TestSchema);

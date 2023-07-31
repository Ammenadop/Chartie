import mongoose from "mongoose";

const chartSchema = new mongoose.Schema(
  {
    date_title: {
      type: String,
      required: true,
      unique: true,
    },
    date_value: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Chart", chartSchema);
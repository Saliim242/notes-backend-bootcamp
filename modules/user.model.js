import mongoose from "mongoose";

// lets make user scheema

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Please Enter User FullName"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please Enter User Email"],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Please Enter User Password"],
      trim: true,
    },
    createdDate: {
      type: Date,
      default: Date.now(),
    },
  },
  { timeseries: true }
);

export const User = mongoose.model("User", userSchema);

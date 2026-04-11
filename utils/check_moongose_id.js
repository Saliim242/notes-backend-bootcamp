import mongoose from "mongoose";

// Function to check if an ID is a valid ObjectId
export const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

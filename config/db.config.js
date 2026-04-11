import mongoose from "mongoose";

//Set up default mongoose connection

export const connectionDB = async () => {
  try {
    // Connect to Db
    const db = await mongoose.connect(process.env.MONG_URL);

    // lest display the connection success and the connection Name
    console.log(`Connected to MongoDB Successfylly ${db.connection.name}`);
  } catch (error) {
    // lets displat The Error message and some fedback to the console
    console.error("Error connecting to MongoDB:", error.message);
    // lets exit the process
    process.exit(1);
  }
};

import mongoose from "mongoose";

// Connect to MongoDB
export const connect = async (): Promise<void> => {
  await mongoose.connect(process.env.MONGO_URI as string, {
    dbName: process.env.DATABASE_NAME!,
  });
};

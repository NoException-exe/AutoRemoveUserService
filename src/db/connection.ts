import mongoose from "mongoose";

// Connect to MongoDB
export const connect = async (): Promise<typeof mongoose> => {
  return await mongoose.connect(process.env.MONGO_URI as string, {
    dbName: process.env.DATABASE_NAME!,
  });
};

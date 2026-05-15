import mongoose from "mongoose";
export default async function connectDb(): Promise<void> {
  const URI = process.env.MONGODB_URI;
  if (!URI) {
    throw new Error("URI missing....");
  }
  const db = await mongoose.connect(URI!);
  if (db) {
    console.log("Db connection successfully");
  }
}

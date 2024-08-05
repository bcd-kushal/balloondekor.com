// libraries
import mongoose, { Mongoose } from "mongoose";

// env variables
const uri: string | undefined =
  process.env.BALLOONDEKOR_MONGODB_URI;
const dbName: string | undefined =
  process.env.BALLOONDEKOR_DB_NAME;

if (!uri) {
  throw new Error(
    "Please add your MONGODB_URI to .env"
  );
}
if (!dbName) {
  throw new Error(
    "Please add your DB_NAME to .env"
  );
}

// cache for the connection
let cachedConn: Mongoose | null = null;
let cachedPromise: Promise<Mongoose> | null =
  null;

// const addEventListeners = () => {
//   mongoose.connection.on("connected", () =>
//     console.log("MongoDB Connected")
//   );
//   mongoose.connection.on("open", () =>
//     console.log("MongoDB Connection Open")
//   );
//   mongoose.connection.on("disconnected", () =>
//     console.log("MongoDB Disconnected")
//   );
//   mongoose.connection.on("reconnected", () =>
//     console.log("MongoDB Reconnected")
//   );
//   mongoose.connection.on("disconnecting", () =>
//     console.log("MongoDB Disconnecting")
//   );
//   mongoose.connection.on("close", () =>
//     console.log("MongoDB Close")
//   );
// };

const connectDB = async (): Promise<Mongoose> => {
  if (cachedConn) {
    return cachedConn;
  }

  if (!cachedPromise) {
    cachedPromise = mongoose
      .connect(uri as string, {
        dbName,
        minPoolSize: 1,
        maxPoolSize: 3,
        socketTimeoutMS: 60 * 1000,
        serverSelectionTimeoutMS: 60 * 1000,
        maxIdleTimeMS: 1 * 1000
      })
      .then((mongoose) => {
        // addEventListeners();
        cachedConn = mongoose;

        return mongoose;
      });
  }

  cachedConn = await cachedPromise;

  return cachedConn;
};

export default connectDB;

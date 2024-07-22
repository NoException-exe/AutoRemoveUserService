import mongoose from "mongoose";
import { connect } from "./db/connection";
import { User, OldUser } from "./db/models/users";
import { TUser } from "./types/types";
import cron from "node-cron";

/**
 * Retrieves an array of users whose expiration date is less than 30 days from the current date.
 *
 * @return {Promise<TUser[]>} A promise that resolves to an array of users.
 */
async function findUsersExpired(): Promise<TUser[]> {
  return await User.find({
    expiration_date: {
      $lt: new Date(new Date().setDate(new Date().getDate() - 30)),
    },
  });
}

/**
 * Saves the user data to the OldUser collection.
 *
 * @param {TUser} user - The user object containing the data to be saved.
 * @return {Promise<void>} A promise that resolves when the data is successfully saved.
 */
const saveOldUser = async (user: TUser): Promise<void> => {
  const data = {
    discordID: user.discordID,
    username: user.username,
    password: user.password,
    activation_date: user.activation_date,
    expiration_date: user.expiration_date,
    status: user.status,
    isBlocked: user.isBlocked,
    hwid: user.hwid,
    location: user.location,
    blockedLocation: user.blockedLocation,
    hardware: user.hardware,
    blockedHardware: user.blockedHardware,
  };

  try {
    await OldUser.create(data);
  } catch (err) {
    console.log(err);
  }
};

/**
 * Connects to MongoDB, retrieves expired users, saves them to the OldUser collection, and deletes the users.
 *
 * @return {Promise<typeof mongoose>} A promise that resolves when the process is complete.
 */
async function main(): Promise<void> {
  // Connect to MongoDB
  await connect()
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));

  // Retrieve expired users
  const users = await findUsersExpired();

  // Check if there are any expired users
  if (users.length === 0) {
    console.log("No expired users found");

    // Disconnect from MongoDB
    mongoose.connection.close();
    console.log("Disconnected from MongoDB");
    return;
  }

  // Save users to OldUser collection
  for (const user of users) {
    await saveOldUser(user);
    console.log(`Saved user ${user.discordID} to OldUser collection`);
  }

  // Delete users from User collection
  try {
    await User.deleteMany({
      expiration_date: {
        $lt: new Date(new Date().setDate(new Date().getDate() - 30)),
      },
    });
    console.log("Deleted expired users from User collection");
  } catch (err) {
    console.log(err);
  } finally {
    // Disconnect from MongoDB
    mongoose.connection.close();
    console.log("Disconnected from MongoDB");
  }
}

// Run the main task only once
let firstStert = true;
if (firstStert) {
  main().catch((err) => console.log("Error running main task:", err));
  firstStert = false;
}

// Schedule the task to run every 12 hours
cron.schedule("0 */12 * * *", () => {
  console.log("Running scheduled task");
  main().catch((err) => console.log("Error running main task:", err));
});

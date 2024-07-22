"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connection_1 = require("./db/connection");
const users_1 = require("./db/models/users");
const node_cron_1 = __importDefault(require("node-cron"));
async function findUsersExpired() {
    return await users_1.User.find({
        expiration_date: {
            $lt: new Date(new Date().setDate(new Date().getDate() - 30)),
        },
    });
}
const saveOldUser = async (user) => {
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
        await users_1.OldUser.create(data);
    }
    catch (err) {
        console.log(err);
    }
};
async function main() {
    await (0, connection_1.connect)()
        .then(() => console.log("Connected to MongoDB"))
        .catch((err) => console.log(err));
    const users = await findUsersExpired();
    if (users.length === 0) {
        console.log("No expired users found");
        mongoose_1.default.connection.close();
        console.log("Disconnected from MongoDB");
        return;
    }
    for (const user of users) {
        await saveOldUser(user);
        console.log(`Saved user ${user.discordID} to OldUser collection`);
    }
    try {
        await users_1.User.deleteMany({
            expiration_date: {
                $lt: new Date(new Date().setDate(new Date().getDate() - 30)),
            },
        });
        console.log("Deleted expired users from User collection");
    }
    catch (err) {
        console.log(err);
    }
    finally {
        mongoose_1.default.connection.close();
        console.log("Disconnected from MongoDB");
    }
}
let firstStert = true;
if (firstStert) {
    main().catch((err) => console.log("Error running main task:", err));
    firstStert = false;
}
node_cron_1.default.schedule("0 */12 * * *", () => {
    console.log("Running scheduled task");
    main().catch((err) => console.log("Error running main task:", err));
});
//# sourceMappingURL=script.js.map
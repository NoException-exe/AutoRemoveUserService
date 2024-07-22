"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = require("./db/connection");
const oldusers_1 = require("./db/models/oldusers");
const users_1 = require("./db/models/users");
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
        await oldusers_1.OldUser.create(data);
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
    await Promise.all(users.map(async (user) => {
        try {
            await saveOldUser(user);
            console.log(`Saved user ${user.discordID} to OldUser collection`);
        }
        catch (err) {
            console.log(err);
        }
    }));
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
}
main();
//# sourceMappingURL=script.js.map
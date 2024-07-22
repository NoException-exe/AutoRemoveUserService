"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
const mongoose_1 = require("mongoose");
const connect = async () => {
    await mongoose_1.default.connect(process.env.MONGO_URI, {
        dbName: process.env.DATABASE_NAME,
    });
};
exports.connect = connect;
//# sourceMappingURL=connection.js.map
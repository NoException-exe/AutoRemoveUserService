"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const locationSchema = new mongoose_1.Schema({
    ip_address: { type: String, required: true },
    country_name: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    continent_name: { type: String, required: true },
    continent_code: { type: String, required: true },
    federative_unite: { type: String, required: true },
});
const hardwareSchema = new mongoose_1.Schema({
    desktop: { type: String, required: true },
    cpu: { type: String, required: true },
    gpu: { type: String, required: true },
    ram: { type: Number, required: true },
    mac: { type: String, required: true },
});
const userSchema = new mongoose_1.Schema({
    discordID: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    activation_date: {
        type: Date,
        required: true,
    },
    expiration_date: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
    },
    isBlocked: {
        type: Boolean,
    },
    hwid: {
        type: String,
    },
    location: {
        type: locationSchema,
    },
    blockedLocation: {
        type: hardwareSchema,
    },
    hardware: {
        type: hardwareSchema,
    },
    blockedHardware: {
        type: locationSchema,
    },
}, { timestamps: true });
exports.User = (0, mongoose_1.model)("users", userSchema);
//# sourceMappingURL=users.js.map
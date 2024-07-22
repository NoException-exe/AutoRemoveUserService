"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OldUser = exports.User = void 0;
const mongoose_1 = require("mongoose");
const locationSchema = new mongoose_1.Schema({
    ip_address: { type: String },
    country_name: { type: String },
    city: { type: String },
    state: { type: String },
    continent_name: { type: String },
    continent_code: { type: String },
    federative_unite: { type: String },
});
const hardwareSchema = new mongoose_1.Schema({
    desktop: { type: String },
    cpu: { type: String },
    gpu: { type: String },
    ram: { type: Number },
    mac: { type: String },
});
const userSchema = new mongoose_1.Schema({
    discordID: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        lowercase: true,
    },
    password: {
        type: String,
    },
    activation_date: {
        type: Date,
    },
    expiration_date: {
        type: Date,
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
exports.OldUser = (0, mongoose_1.model)("oldusers", userSchema);
//# sourceMappingURL=users.js.map
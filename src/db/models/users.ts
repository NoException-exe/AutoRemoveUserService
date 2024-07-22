import { model, Schema } from "mongoose";
import { TUser, THardware, TLocation } from "../../types/types";

// Create Schemas
const locationSchema = new Schema<TLocation>({
  ip_address: { type: String, required: true },
  country_name: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  continent_name: { type: String, required: true },
  continent_code: { type: String, required: true },
  federative_unite: { type: String, required: true },
});

const hardwareSchema = new Schema<THardware>({
  desktop: { type: String, required: true },
  cpu: { type: String, required: true },
  gpu: { type: String, required: true },
  ram: { type: Number, required: true },
  mac: { type: String, required: true },
});

const userSchema = new Schema<TUser>(
  {
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
  },
  { timestamps: true }
);

export const User = model<TUser>("users", userSchema);

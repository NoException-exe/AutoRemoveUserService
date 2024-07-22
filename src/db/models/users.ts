import { model, Schema } from "mongoose";
import { TUser, THardware, TLocation } from "../../types/types";

// Create Schemas
const locationSchema = new Schema<TLocation>({
  ip_address: { type: String },
  country_name: { type: String },
  city: { type: String },
  state: { type: String },
  continent_name: { type: String },
  continent_code: { type: String },
  federative_unite: { type: String },
});

const hardwareSchema = new Schema<THardware>({
  desktop: { type: String },
  cpu: { type: String },
  gpu: { type: String },
  ram: { type: Number },
  mac: { type: String },
});

const userSchema = new Schema<TUser>(
  {
    discordID: {
      type: String,
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
  },
  { timestamps: true }
);

export const User = model<TUser>("users", userSchema);
export const OldUser = model<TUser>("oldusers", userSchema);

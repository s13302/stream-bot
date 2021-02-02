import mongoose, { Schema, Document } from 'mongoose';

import db from '../db';

export interface ISettings extends Document {
  accessToken: string;
  refreshToken: string;
  createdAt: Date;
  expiresAt: Date;

  isValid(): boolean;
}

const SettingsSchema = new Schema({
  accessToken: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: new Date(Date.now()).toUTCString(),
  },
  expiresAt: {
    type: Date,
    required: true,
  },
}, {
  versionKey: false,
});

SettingsSchema.methods = {
  ...SettingsSchema.methods,
  isValid() {
    return (this.expiresAt.getTime() > Date.now());
  },
};

const model = db.model<ISettings>('Settings', SettingsSchema);

export default model;

import mongoose from 'mongoose';

import db from '../db';

const SettingsSchema = new mongoose.Schema({
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

export default db.model('Settings', SettingsSchema);

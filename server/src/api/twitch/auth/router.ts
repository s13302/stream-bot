import express from 'express';
import axios from 'axios';

import { SettingsModel } from '../../../db/models';

const router = express.Router();

const baseUrl = 'https://id.twitch.tv/oauth2/';

const authAPI = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
});

router.get('/', (_, res) => {
  const urlParams = new URLSearchParams({
    client_id: process.env.TWITCH_CLIENT_ID,
    redirect_uri: process.env.TWITCH_REDIRECT_URI,
    response_type: 'code',
    scope: ['channel:moderate', 'chat:read', 'chat:edit', 'whispers:read'].join(' '),
  });
  res.redirect(`${baseUrl}authorize?${urlParams}`);
});

router.get('/authorized', async (_, res, next) => {
  try {
    const tokenExists = await SettingsModel.exists({});
    res.json({
      authorized: tokenExists,
    });
  } catch (err) {
    next(err);
  }
});

router.get('/callback', async (req, res, next) => {
  const {
    error,
    error_description: errorDescription,
    code,
  } = req.query;
  if (error) {
    return next(new Error(errorDescription.toString()));
  }
  try {
    const urlParams = new URLSearchParams({
      client_id: process.env.TWITCH_CLIENT_ID,
      client_secret: process.env.TWITCH_CLIENT_SECRET,
      code: code.toString(),
      grant_type: 'authorization_code',
      redirect_uri: process.env.TWITCH_REDIRECT_URI,
    });
    const response = await authAPI.post(`/token?${urlParams}`, {});
    const {
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_in: expiresIn,
    } = response.data;
    const expiresAt = Date.now() + (expiresIn * 1000);
    const settings = new SettingsModel({
      accessToken,
      refreshToken,
      expiresAt,
    });
    await settings.save();
    res.redirect('http://localhost:8090/');
  } catch (err) {
    return next(err);
  }
});

export default router;

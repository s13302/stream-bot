import express from 'express';

import authRouter from './auth/router';
import { getChannelInfo, getUser } from '../../external/twitch.api';
import { SettingsModel } from '../../db/models';

const router = express.Router();

router.use('/auth', authRouter);

router.get('/user', async (_, res, next) => {
  try {
    const settingsModel = await SettingsModel.findOne();
    const user = await getUser(settingsModel);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.get('/channel', async (req, res, next) => {
  const {
    broadcasterId,
  } = req.query;
  try {
    const settingsModel = await SettingsModel.findOne();
    const channel = await getChannelInfo(settingsModel, broadcasterId.toString());
    res.json(channel);
  } catch (err) {
    next(err);
  }
})

export default router;

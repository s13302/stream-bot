import express from 'express';

import twitchRouter from './twitch/router';

const router = express.Router();

router.use('/twitch', twitchRouter);

export default router;

import axios, { AxiosResponse } from 'axios';

import {
  ChannelModel,
  SettingsModel,
  UserModel,
  IChannel,
  ISettings,
  IUser,
} from '../db/models/index';

const oAuthApi = axios.create({
  baseURL: 'https://id.twitch.tv/oauth2/',
  timeout: 10000,
});

const hellixApi = axios.create({
  baseURL: 'https://api.twitch.tv/helix/',
  timeout: 10000,
});

export async function doRefreshToken(settingsModel: ISettings): Promise<ISettings> {
  const urlParams = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: settingsModel.refreshToken,
    client_id: process.env.TWITCH_CLIENT_ID,
    client_secret: process.env.TWITCH_CLIENT_SECRET,
  });
  const response = await oAuthApi.post(`/token?${urlParams}`, {});
  const {
    data: {
      error,
      refresh_token: refreshToken,
      access_token: accessToken,
      expires_in: expiresIn,
    },
  } = response;
  const expiresAt = Date.now() + (expiresIn * 1000);
  await settingsModel.deleteOne();
  return new Promise<ISettings>((resolve, reject) => {
    if (error) return reject(error);
    resolve(new SettingsModel({
      refreshToken,
      accessToken,
      expiresAt,
    }));
  });
}

async function refreshTokenIfNeeded(settingsModel: ISettings): Promise<ISettings> {
  if (!settingsModel) {
    throw new Error('You need to login to twitch first');
  }
  if (!settingsModel.isValid()) {
    return doRefreshToken(settingsModel);
  }
  return new Promise((resolve) => {
    resolve(settingsModel);
  });
}

async function sendGetRequest(endpoint: string, settingsModel: ISettings): Promise<AxiosResponse> {
  const settings = await refreshTokenIfNeeded(settingsModel);
  return hellixApi.get(endpoint, {
    headers: {
      Authorization: `Bearer ${settings.accessToken}`,
      'Client-Id': process.env.TWITCH_CLIENT_ID,
    },
  });
}

export async function getUser(settingsModel: ISettings, login?: string, id?: string): Promise<IUser> {
  const urlParams = new URLSearchParams({
  });
  if (id) {
    urlParams.append('id', id);
  }
  if (login) {
    urlParams.append('login', login);
  }
  const response = await sendGetRequest(`/users?${urlParams}`, settingsModel);
  const {
    error,
    id: twitchId,
    display_name: displayName,
    login: twitchLogin,
    type,
    profile_image_url: profileImageUrl,
  } = response.data.data[0];
  return new Promise((resolve, reject) => {
    if (error) return reject(error);
    resolve(new UserModel({
      twitchId,
      displayName,
      type,
      profileImageUrl,
      login: twitchLogin,
    }));
  });
}

export async function getChannelInfo(settingsModel: ISettings, broadcasterId: string): Promise<IChannel> {
  const urlParams = new URLSearchParams({
    broadcaster_id: broadcasterId,
  });
  const response = await sendGetRequest(`/channels?${urlParams}`, settingsModel);
  const {
    error,
    data: [{
      broadcaster_name: broadcasterName,
      game_name: gameName,
      title,
    }],
  } = response.data;
  return new Promise((resolve, reject) => {
    if (error) return reject(error);
    resolve(new ChannelModel({
      broadcasterName,
      gameName,
      title,
    }));
  });
}

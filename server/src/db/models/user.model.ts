export interface IUser {
  twitchId: string,
  displayName: string;
  login: string;
  type?: string;
  profileImageUrl?: string;
}

export default class UserModel implements IUser {
  twitchId: string;
  displayName: string;
  login: string;
  type?: string;
  profileImageUrl?: string;

  constructor(doc: any) {
    this.twitchId = doc.twitchId;
    this.displayName = doc.displayName;
    this.login = doc.login;
    this.type = doc.type;
    this.profileImageUrl = doc.profileImageUrl;
  }
}

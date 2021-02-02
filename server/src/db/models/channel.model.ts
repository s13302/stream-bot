export interface IChannel {
  broadcasterName: string;
  gameName: string;
  title: string;
}

export default class ChannelModel implements IChannel {
  broadcasterName: string;
  gameName: string;
  title: string;

  constructor(doc: any) {
    this.broadcasterName = doc.broadcasterName;
    this.gameName = doc.gameName;
    this.title = doc.title;
  }
}

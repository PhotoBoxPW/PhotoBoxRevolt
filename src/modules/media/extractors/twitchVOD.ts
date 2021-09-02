import Extractor from '../extractor';
import needle from 'needle';

export default class TwitchVOD extends Extractor {
  regex = /https?:\/\/(?:www\.)?twitch\.tv\/videos\/(\d+)/;

  vodIDs = new Map<string, string>();

  async extract(match: RegExpMatchArray) {
    if (!this.vodIDs.has(match[1])) {
      const response = await needle('get', `https://api.twitch.tv/helix/videos?id=${match[1]}`, {
        headers: { 'Client-Id': 'kimne78kx3ncx6brgo4mv6wki5h1ko' }
      });

      if (response.statusCode === 400) return;
      this.vodIDs.set(
        match[1],
        response.body.data[0].thumbnail_url.replace('%{width}', '1430').replace('%{height}', '800')
      );
    }

    return this.vodIDs.get(match[1])!;
  }

  clearCache() {
    this.vodIDs.clear();
  }
}

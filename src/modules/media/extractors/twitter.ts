import Extractor from '../extractor';
import needle from 'needle';
import config from 'config';

export default class Twitter extends Extractor {
  regex = /https?:\/\/twitter\.com\/\w+\/status\/(\d{17,19})(?:\/(?:(?:video|photo)\/(\d))?)?/;

  token?: string;
  tweetIDs = new Map<string, string>();

  get hasKeys() {
    return (
      config.has('api.twitter.consumer') &&
      config.has('api.twitter.secret') &&
      !!config.get('api.twitter.consumer') &&
      !!config.get('api.twitter.secret')
    );
  }

  async refreshToken() {
    const response = await needle(
      'post',
      'https://api.twitter.com/oauth2/token',
      'grant_type=client_credentials',
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            config.get('api.twitter.consumer') + ':' + config.get('api.twitter.secret'),
            'binary'
          ).toString('base64')}`
        }
      }
    );
    if (response.statusCode === 403) throw new Error('Invalid Twitter Credentials');
    this.token = response.body.access_token;
  }

  async extract(match: RegExpMatchArray): Promise<string | void> {
    const [, twitterID, mediaIDStr] = match;
    const mediaID = parseInt(mediaIDStr) - 1 || 0;
    const key = twitterID + ':' + mediaID;

    if (!this.tweetIDs.has(key)) {
      if (!this.hasKeys) return;
      if (!this.token) await this.refreshToken();

      const response = await needle('get', `https://api.twitter.com/1.1/statuses/show/${twitterID}.json`, {
        headers: { Authorization: `Bearer ${this.token}` }
      });

      if (response.statusCode === 404) return;
      else if (response.statusCode === 403) {
        await this.refreshToken();
        return await this.extract(match);
      } else {
        const twitterData = response.body;
        if (twitterData && twitterData.extended_entities && twitterData.extended_entities.media) {
          const media =
            twitterData.extended_entities.media[mediaID] || twitterData.extended_entities.media[0];
          this.tweetIDs.set(key, media.media_url_https);
        } else return;
      }
    }

    return this.tweetIDs.get(match[1])!;
  }

  clearCache() {
    this.tweetIDs.clear();
  }
}

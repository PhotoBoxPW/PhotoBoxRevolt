import Extractor from '../extractor';

export default class Imgur extends Extractor {
  regex = /https?:\/\/(?:i\.)?imgur\.com\/(?!(?:a|gallery|(?:t(?:opic)?|r)\/[^/]+)\/)([a-zA-Z0-9]+)/;

  async extract(match: RegExpMatchArray) {
    return `https://i.imgur.com/${match[1]}.png`;
  }
}

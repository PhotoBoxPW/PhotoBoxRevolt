import Extractor from '../extractor';
import needle from 'needle';

export default class TwitchClip extends Extractor {
  regex =
    /https?:\/\/(?:clips\.twitch\.tv\/(?:embed\?.*?\bclip=|(?:[^/]+\/)*)|(?:www\.)?twitch\.tv\/[^/]+\/clip\/)([a-zA-Z]+)/;

  clipIDs = new Map<string, string>();

  async extract(match: RegExpMatchArray) {
    if (!this.clipIDs.has(match[1])) {
      const response = await needle(
        'post',
        'https://gql.twitch.tv/gql',
        [
          {
            operationName: 'incrementClipViewCount',
            variables: { input: { slug: match[1] } },
            extensions: {
              persistedQuery: {
                version: 1,
                sha256Hash: '6b2f169f994f2b93ff68774f6928de66a1e8cdb70a42f4af3a5a1ecc68ee759b'
              }
            }
          }
        ],
        { headers: { 'Client-Id': 'kimne78kx3ncx6brgo4mv6wki5h1ko' }, json: true }
      );
      if (response.body[0].errors) return;

      this.clipIDs.set(match[1], response.body[0].data.updateClipViewCount.clip.id);
    }

    return `https://clips-media-assets2.twitch.tv/AT-cm%7C${this.clipIDs.get(match[1])!}-preview-480x272.jpg`;
  }

  clearCache() {
    this.clipIDs.clear();
  }
}

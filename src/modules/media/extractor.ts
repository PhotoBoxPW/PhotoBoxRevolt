import { VoltareClient } from 'voltare';
import { PhotoBoxConfig } from '../../bot';

export default class Extractor {
  name = this.constructor.name;
  regex: RegExp | null = null;
  client: VoltareClient<PhotoBoxConfig>;

  constructor(client: VoltareClient<PhotoBoxConfig>) {
    this.client = client;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async extract(match: RegExpMatchArray, url: string): Promise<string | void> {}

  clearCache() {}
}

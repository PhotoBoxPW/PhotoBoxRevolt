import { VoltareClient } from 'voltare';
import { TextCommand } from '../../../util/abstracts';

export default class AnimeProtestCommand extends TextCommand {
  endpoint = 'animeprotest';

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'animeprotest',
      description: '3D women are NOT important!',
      aliases: ['3dwomen', '3dw', 'animesign']
    });

    this.filePath = __filename;
  }
}

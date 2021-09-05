import { VoltareClient } from 'voltare';
import { PictureEndpointCommand } from '../../../util/abstracts';

export default class KoalaCommand extends PictureEndpointCommand {
  url = 'https://some-random-api.ml/img/koala';
  credit = 'some-random-api.ml';
  katex = {
    emoji: '🐨',
    text: 'Koala!',
    textColor: '#ffffff',
    bgColor: '#95a5a6'
  };

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'koala',
      description: 'Get a random koala.',
      aliases: ['🐨', ':koala:']
    });

    this.filePath = __filename;
  }
}

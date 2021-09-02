import { VoltareClient } from 'voltare';
import { PictureEndpointCommand } from '../../../util/abstracts';

export default class KoalaCommand extends PictureEndpointCommand {
  url = 'https://some-random-api.ml/img/koala';
  credit = 'some-random-api.ml';

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'koala',
      description: 'Get a random koala.',
      aliases: ['🐨', ':koala:']
    });

    this.filePath = __filename;
  }
}

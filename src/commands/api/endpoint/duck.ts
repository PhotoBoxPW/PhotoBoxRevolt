import { VoltareClient } from 'voltare';
import { PictureEndpointCommand } from '../../../util/abstracts';

export default class DuckCommand extends PictureEndpointCommand {
  url = 'https://random-d.uk/api/v2/random?format=json';
  credit = 'random-d.uk';

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'duck',
      description: 'Get a random duck.',
      aliases: ['duk', 'quack', 'quak', '🦆', ':duck:']
    });

    this.filePath = __filename;
  }
}

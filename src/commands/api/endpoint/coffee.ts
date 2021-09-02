import { VoltareClient } from 'voltare';
import { PictureEndpointCommand } from '../../../util/abstracts';

export default class CoffeeCommand extends PictureEndpointCommand {
  url = 'https://coffee.alexflipnote.dev/random.json';
  credit = 'coffee.alexflipnote.dev';

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'coffee',
      description: 'Get some coffee.',
      aliases: ['☕', ':coffee:']
    });

    this.filePath = __filename;
  }
}

import { VoltareClient } from 'voltare';
import { PictureEndpointCommand } from '../../../util/abstracts';

export default class GoatCommand extends PictureEndpointCommand {
  url = 'https://hi.snaz.in/api/v1/goat/random.json';
  credit = 'hi.snaz.in';

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'goat',
      description: 'Get a random goat.',
      aliases: ['🐐', ':goat:']
    });

    this.filePath = __filename;
  }
}

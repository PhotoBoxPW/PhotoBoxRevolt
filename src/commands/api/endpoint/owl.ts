import { VoltareClient } from 'voltare';
import { PictureEndpointCommand } from '../../../util/abstracts';

export default class OwlCommand extends PictureEndpointCommand {
  url = 'http://pics.floofybot.moe/owl';

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'owl',
      description: 'Get a random owl.',
      aliases: ['🦉', ':owl:']
    });

    this.filePath = __filename;
  }
}

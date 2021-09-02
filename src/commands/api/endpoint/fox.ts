import { VoltareClient } from 'voltare';
import { PictureEndpointCommand } from '../../../util/abstracts';

export default class FoxCommand extends PictureEndpointCommand {
  url = 'https://randomfox.ca/floof/';
  credit = 'randomfox.ca';

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'fox',
      description: 'Get a random fox.',
      aliases: ['floof', '🦊', ':fox_face:']
    });

    this.filePath = __filename;
  }
}

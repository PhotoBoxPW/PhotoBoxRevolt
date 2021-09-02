import { VoltareClient } from 'voltare';
import { PictureEndpointCommand } from '../../../util/abstracts';

export default class BirdCommand extends PictureEndpointCommand {
  url = 'http://shibe.online/api/birds?count=1';
  credit = 'shibe.online';

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'bird',
      description: 'Get a random bird.',
      aliases: ['birb', '🐦', ':bird:']
    });

    this.filePath = __filename;
  }
}

import { VoltareClient } from 'voltare';
import { PictureEndpointCommand } from '../../../util/abstracts';

export default class ShibeCommand extends PictureEndpointCommand {
  url = 'http://shibe.online/api/shibes?count=1';
  credit = 'shibe.online';
  katex = {
    text: 'Shibe!',
    textColor: '#ffffff',
    bgColor: '#A38552'
  };

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'shibe',
      description: 'Get a random shibe.',
      aliases: ['doge']
    });

    this.filePath = __filename;
  }
}

import { VoltareClient } from 'voltare';
import { PictureEndpointCommand } from '../../../util/abstracts';

export default class BunnyCommand extends PictureEndpointCommand {
  url = 'https://hi.snaz.in/api/v1/snek/random.json';
  credit = 'hi.snaz.in';
  katex = {
    emoji: '🐍',
    text: 'Snake!',
    textColor: '#ffffff',
    bgColor: '#4cd137'
  };

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'snake',
      description: 'Get a random snake.',
      aliases: ['🐍', 'snek', ':snake:']
    });

    this.filePath = __filename;
  }
}

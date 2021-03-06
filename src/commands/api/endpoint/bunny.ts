import { VoltareClient } from 'voltare';
import { PictureEndpointCommand } from '../../../util/abstracts';

export default class BunnyCommand extends PictureEndpointCommand {
  url = 'https://hi.snaz.in/api/v1/bunnies/random.json';
  credit = 'hi.snaz.in \\& bunnies.media';
  katex = {
    emoji: '🐇',
    text: 'Bunny!',
    textColor: '#333333',
    bgColor: '#ecf0f1'
  };

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'bunny',
      description: 'Get a random bunny.',
      aliases: ['bun', 'rabbit', '🐰', '🐇', ':rabbit:', ':rabbit2:']
    });

    this.filePath = __filename;
  }
}

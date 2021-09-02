import { VoltareClient } from 'voltare';
import { PictureEndpointCommand } from '../../../util/abstracts';

export default class EightBallCommand extends PictureEndpointCommand {
  url = 'https://hi.snaz.in/api/v1/eightball/random.json';
  credit = 'hi.snaz.in';

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: '8ball',
      description: 'Ask the eight ball.',
      aliases: ['🎱', ':8ball:'],
      metadata: {
        usage: '[question]'
      }
    });

    this.filePath = __filename;
  }
}

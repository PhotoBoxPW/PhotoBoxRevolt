import { VoltareClient } from 'voltare';
import { PictureEndpointCommand } from '../../../util/abstracts';

export default class GoatCommand extends PictureEndpointCommand {
  url = 'https://hi.snaz.in/api/v1/goat/random.json';
  credit = 'hi.snaz.in';
  katex = {
    emoji: '🐐',
    text: 'Goat!',
    textColor: '#333333',
    bgColor: '#bdc3c7'
  };

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'goat',
      description: 'Get a random goat.',
      aliases: ['🐐', ':goat:']
    });

    this.filePath = __filename;
  }
}

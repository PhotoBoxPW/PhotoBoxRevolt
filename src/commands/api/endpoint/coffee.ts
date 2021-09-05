import { VoltareClient } from 'voltare';
import { PictureEndpointCommand } from '../../../util/abstracts';

export default class CoffeeCommand extends PictureEndpointCommand {
  url = 'https://coffee.alexflipnote.dev/random.json';
  credit = 'coffee.alexflipnote.dev';
  katex = {
    emoji: '☕',
    text: 'Coffee!',
    textColor: '#ffffff',
    bgColor: '#6C5937'
  };

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'coffee',
      description: 'Get some coffee.',
      aliases: ['☕', ':coffee:']
    });

    this.filePath = __filename;
  }
}

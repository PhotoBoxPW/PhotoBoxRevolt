import { VoltareClient } from 'voltare';
import { PictureEndpointCommand } from '../../../util/abstracts';

export default class OwlCommand extends PictureEndpointCommand {
  url = 'http://pics.floofybot.moe/owl';
  katex = {
    emoji: '🦉',
    text: 'Owl!',
    textColor: '#ffffff',
    bgColor: '#e58e26'
  };

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'owl',
      description: 'Get a random owl.',
      aliases: ['🦉', ':owl:']
    });

    this.filePath = __filename;
  }
}

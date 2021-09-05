import { VoltareClient } from 'voltare';
import { PictureEndpointCommand } from '../../../util/abstracts';

export default class DogCommand extends PictureEndpointCommand {
  url = 'https://random.dog/woof.json';
  credit = 'random.dog';
  katex = {
    emoji: '🐕',
    text: 'Dog!',
    textColor: '#ffffff',
    bgColor: '#A38552'
  };

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'dog',
      description: 'Get a random dog.',
      aliases: ['🐶', '🐕', ':dog:', ':dog2:', ':guide_dog:', ':service_dog:']
    });

    this.filePath = __filename;
  }
}

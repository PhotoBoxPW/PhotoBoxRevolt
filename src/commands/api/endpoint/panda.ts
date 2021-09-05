import { VoltareClient } from 'voltare';
import { PictureEndpointCommand } from '../../../util/abstracts';

export default class PandaCommand extends PictureEndpointCommand {
  url = 'https://some-random-api.ml/img/panda';
  credit = 'some-random-api.ml';
  katex = {
    emoji: '🐼',
    text: 'Panda!',
    textColor: '#ffffff',
    bgColor: '#576574'
  };

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'panda',
      description: 'Get a random panda.',
      aliases: ['🐼', ':panda_face:']
    });

    this.filePath = __filename;
  }
}

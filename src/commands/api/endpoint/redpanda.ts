import { VoltareClient } from 'voltare';
import { PictureEndpointCommand } from '../../../util/abstracts';

export default class RedPandaCommand extends PictureEndpointCommand {
  url = 'https://some-random-api.ml/img/red_panda';
  credit = 'some-random-api.ml';
  katex = {
    emoji: '🐼',
    text: 'Red Panda!',
    textColor: '#ffffff',
    bgColor: '#e84118'
  };

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'redpanda',
      description: 'Get a random red panda.',
      aliases: ['🔴🐼', '🟥🐼', 'rpanda']
    });

    this.filePath = __filename;
  }
}

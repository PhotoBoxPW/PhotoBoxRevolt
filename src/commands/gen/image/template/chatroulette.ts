import { VoltareClient } from 'voltare';
import { ImageCommand } from '../../../../util/abstracts';

export default class ChatRouletteCommand extends ImageCommand {
  endpoint = 'chatroulette';

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'chatroulette',
      description: 'Shocking!',
      category: 'Image Generation - Image Template',
      aliases: ['cr'],
      metadata: {
        credit: 'shitpost'
      }
    });

    this.filePath = __filename;
  }
}

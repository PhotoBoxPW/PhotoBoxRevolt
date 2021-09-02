import { VoltareClient } from 'voltare';
import { ImageCommand } from '../../../../util/abstracts';

export default class SquidwardsTVCommand extends ImageCommand {
  endpoint = 'squidwardstv';

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'squidwardstv',
      description: 'No wait, Put that back on!',
      category: 'Image Generation - Image Template',
      aliases: ['squidward'],
      metadata: {
        credis: 'shitpost'
      }
    });

    this.filePath = __filename;
  }
}

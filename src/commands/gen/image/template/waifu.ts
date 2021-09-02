import { VoltareClient } from 'voltare';
import { ImageCommand } from '../../../../util/abstracts';

export default class WaifuCommand extends ImageCommand {
  endpoint = 'waifu';

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'waifu',
      description: 'Use this if you think a waifu is trash.',
      category: 'Image Generation - Image Template',
      metadata: {
        credit: 'korra'
      }
    });

    this.filePath = __filename;
  }
}

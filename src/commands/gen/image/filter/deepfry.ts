import { VoltareClient } from 'voltare';
import { GIFImageCommand } from '../../../../util/abstracts';

export default class DeepfryCommand extends GIFImageCommand {
  endpoint = 'deepfry';

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'deepfry',
      description: '🅱️',
      category: 'Image Generation - Filters',
      aliases: ['df', '🍟', ':fries:'],
      metadata: {
        imageType: 'filter'
      }
    });

    this.filePath = __filename;
  }
}

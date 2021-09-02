import { VoltareClient } from 'voltare';
import { GIFImageCommand } from '../../../../util/abstracts';

export default class FlopCommand extends GIFImageCommand {
  endpoint = 'flop';

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'flop',
      description: 'Flip an image vertically.',
      category: 'Image Generation - Filters',
      aliases: ['verticalflip'],
      metadata: {
        imageType: 'filter'
      }
    });

    this.filePath = __filename;
  }
}

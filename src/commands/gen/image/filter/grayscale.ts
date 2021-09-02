import { VoltareClient } from 'voltare';
import { GIFImageCommand } from '../../../../util/abstracts';

export default class GrayscaleCommand extends GIFImageCommand {
  endpoint = 'grayscale';

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'grayscale',
      description: 'Grayscale images.',
      category: 'Image Generation - Filters',
      aliases: ['greyscale'],
      metadata: {
        imageType: 'filter'
      }
    });

    this.filePath = __filename;
  }
}

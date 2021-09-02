import { VoltareClient } from 'voltare';
import { GIFImageCommand } from '../../../../util/abstracts';

export default class PixelsortCommand extends GIFImageCommand {
  endpoint = 'pixelsort';

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'pixelsort',
      description: 'Sort pixels on an image.',
      category: 'Image Generation - Filters',
      metadata: {
        imageType: 'filter'
      }
    });

    this.filePath = __filename;
  }
}

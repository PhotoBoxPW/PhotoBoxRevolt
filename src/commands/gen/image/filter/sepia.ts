import { VoltareClient } from 'voltare';
import { GIFImageCommand } from '../../../../util/abstracts';

export default class SepiaCommand extends GIFImageCommand {
  endpoint = 'sepia';

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'sepia',
      description: 'Put a sepia filter on an image.',
      category: 'Image Generation - Filters',
      metadata: {
        imageType: 'filter'
      }
    });

    this.filePath = __filename;
  }
}

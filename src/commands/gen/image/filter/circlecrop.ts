import { VoltareClient } from 'voltare';
import { GIFImageCommand } from '../../../../util/abstracts';

export default class CircleCropCommand extends GIFImageCommand {
  endpoint = 'circlecrop';

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'circlecrop',
      description: 'Crops an image into a circle.',
      category: 'Image Generation - Filters',
      metadata: {
        imageType: 'filter'
      }
    });

    this.filePath = __filename;
  }
}

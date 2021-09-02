import { VoltareClient } from 'voltare';
import { GIFImageCommand } from '../../../../util/abstracts';

export default class FlipCommand extends GIFImageCommand {
  endpoint = 'flip';

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'flip',
      description: 'Flip an image horizontally.',
      category: 'Image Generation - Filters',
      metadata: {
        imageType: 'filter'
      }
    });

    this.filePath = __filename;
  }
}

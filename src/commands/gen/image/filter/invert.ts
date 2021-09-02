import { VoltareClient } from 'voltare';
import { GIFImageCommand } from '../../../../util/abstracts';

export default class InvertCommand extends GIFImageCommand {
  endpoint = 'invert';

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'invert',
      description: 'Invert images.',
      category: 'Image Generation - Filters',
      metadata: {
        imageType: 'filter'
      }
    });

    this.filePath = __filename;
  }
}

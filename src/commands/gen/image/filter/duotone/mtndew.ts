import { VoltareClient } from 'voltare';
import { GIFImageCommand } from '../../../../../util/abstracts';

export default class MtnDewCommand extends GIFImageCommand {
  endpoint = 'mtndew';

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'mtndew',
      description: 'Do the dew.',
      category: 'Image Generation - Duotone Filters'
    });

    this.filePath = __filename;
  }
}

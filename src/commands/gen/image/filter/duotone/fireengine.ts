import { VoltareClient } from 'voltare';
import { GIFImageCommand } from '../../../../../util/abstracts';

export default class FireEngineCommand extends GIFImageCommand {
  endpoint = 'fireengine';

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'fireengine',
      description: 'Mixing the fire.',
      category: 'Image Generation - Duotone Filters'
    });

    this.filePath = __filename;
  }
}

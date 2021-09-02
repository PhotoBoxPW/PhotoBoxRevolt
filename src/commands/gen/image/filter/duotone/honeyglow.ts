import { VoltareClient } from 'voltare';
import { GIFImageCommand } from '../../../../../util/abstracts';

export default class HoneyglowCommand extends GIFImageCommand {
  endpoint = 'honeyglow';

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'honeyglow',
      description: 'Sweet honey.',
      category: 'Image Generation - Duotone Filters'
    });

    this.filePath = __filename;
  }
}

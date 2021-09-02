import { VoltareClient } from 'voltare';
import { ImageCommand } from '../../../../util/abstracts';

export default class DissectorCommand extends ImageCommand {
  endpoint = 'dissector';

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'dissector',
      description: 'Oh god...',
      category: 'Image Generation - Image Template',
      metadata: {
        credit: 'shitpost'
      }
    });

    this.filePath = __filename;
  }
}

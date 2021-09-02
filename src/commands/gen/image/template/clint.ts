import { VoltareClient } from 'voltare';
import { ImageCommand } from '../../../../util/abstracts';

export default class ClintCommand extends ImageCommand {
  endpoint = 'clint';

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'clint',
      description: 'Uh...',
      category: 'Image Generation - Image Template',
      metadata: {
        credit: 'blargbot'
      }
    });

    this.filePath = __filename;
  }
}

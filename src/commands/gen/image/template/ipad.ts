import { VoltareClient } from 'voltare';
import { ImageCommand } from '../../../../util/abstracts';

export default class IPadCommand extends ImageCommand {
  endpoint = 'ipad';

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'ipad',
      description: 'Better than a kindle.',
      category: 'Image Generation - Image Template',
      metadata: {
        credit: 'dankmemer'
      }
    });

    this.filePath = __filename;
  }
}

import { VoltareClient } from 'voltare';
import { ImageCommand } from '../../../../util/abstracts';

export default class ArtCommand extends ImageCommand {
  endpoint = 'art';

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'art',
      description: 'Stan from Gravity Falls calls you art.',
      category: 'Image Generation - Image Template',
      metadata: {
        credit: 'blargbot'
      }
    });

    this.filePath = __filename;
  }
}

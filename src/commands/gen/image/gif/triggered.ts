import { VoltareClient } from 'voltare';
import { ImageCommand } from '../../../../util/abstracts';

export default class TriggeredCommand extends ImageCommand {
  endpoint = 'triggered';

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'triggered',
      description: 'Shows everyone how triggered you are.',
      category: 'Image Generation - GIFs',
      aliases: ['trigger'],
      metadata: {
        credit: 'blargbot'
      }
    });

    this.filePath = __filename;
  }
}

import { VoltareClient } from 'voltare';
import { ImageCommand } from '../../../../util/abstracts';

export default class DistortCommand extends ImageCommand {
  endpoint = 'distort';

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'distort',
      description: 'You. Are. Art.',
      category: 'Image Generation - Filters',
      metadata: {
        credit: 'blargbot',
        imageType: 'filter'
      },
      throttling: {
        usages: 1,
        duration: 10,
        bypass: ['voltare.elevated']
      }
    });

    this.filePath = __filename;
  }
}

import { VoltareClient } from 'voltare';
import { ImageCommand } from '../../../../util/abstracts';

export default class DisabilityCommand extends ImageCommand {
  endpoint = 'disability';

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'disability',
      description: 'eyes',
      category: 'Image Generation - Image Template',
      metadata: {
        credit: 'dankmemer'
      }
    });

    this.filePath = __filename;
  }
}

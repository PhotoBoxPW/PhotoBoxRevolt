import { VoltareClient } from 'voltare';
import { ImageCommand } from '../../../../util/abstracts';

export default class AmericaCommand extends ImageCommand {
  endpoint = 'america';

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'america',
      description: 'America.',
      category: 'Image Generation - GIFs',
      metadata: {
        credit: 'dankmemer'
      }
    });

    this.filePath = __filename;
  }
}

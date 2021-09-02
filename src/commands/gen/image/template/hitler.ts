import { VoltareClient } from 'voltare';
import { ImageCommand } from '../../../../util/abstracts';

export default class HitlerCommand extends ImageCommand {
  endpoint = 'hitler';

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'hitler',
      description: "No, it's much worse than you think. It's a Family Guy reference.",
      category: 'Image Generation - Image Template',
      metadata: {
        credit: 'dankmemer'
      }
    });

    this.filePath = __filename;
  }
}

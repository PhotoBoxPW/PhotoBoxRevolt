import { VoltareClient } from 'voltare';
import { ImageCommand } from '../../../../util/abstracts';

export default class RobloxCommand extends ImageCommand {
  endpoint = 'roblox';

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'roblox',
      description: 'oof!',
      category: 'Image Generation - Image Template',
      metadata: {
        credit: 'dankmemer'
      }
    });

    this.filePath = __filename;
  }
}

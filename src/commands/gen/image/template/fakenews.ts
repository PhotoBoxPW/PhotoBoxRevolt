import { VoltareClient } from 'voltare';
import { ImageCommand } from '../../../../util/abstracts';

export default class FakeNewsCommand extends ImageCommand {
  endpoint = 'fakenews';

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'fakenews',
      description: "IT'S ALL FAKE!",
      category: 'Image Generation - Image Template',
      metadata: {
        credit: 'dankmemer'
      }
    });

    this.filePath = __filename;
  }
}

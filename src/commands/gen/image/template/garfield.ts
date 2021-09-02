import { VoltareClient } from 'voltare';
import { ImageCommand } from '../../../../util/abstracts';

export default class GarfieldCommand extends ImageCommand {
  endpoint = 'garfield';

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'garfield',
      description: "Someone isn't allowed here.",
      category: 'Image Generation - Image Template',
      metadata: {
        credit: 'dankmemer'
      }
    });

    this.filePath = __filename;
  }
}

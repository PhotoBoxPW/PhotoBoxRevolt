import { VoltareClient } from 'voltare';
import { ImageCommand } from '../../../../util/abstracts';

export default class RIPCommand extends ImageCommand {
  endpoint = 'rip';

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'rip',
      description: 'R.I.P.: Now with a tombstone.',
      category: 'Image Generation - Image Template',
      aliases: ['💀', '☠️', 'tombstone', ':skull:', ':skull_and_crossbones:'],
      metadata: {
        credit: 'dankmemer'
      }
    });

    this.filePath = __filename;
  }
}

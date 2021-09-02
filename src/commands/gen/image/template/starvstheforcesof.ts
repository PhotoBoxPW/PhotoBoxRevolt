import { VoltareClient } from 'voltare';
import { ImageCommand } from '../../../../util/abstracts';

export default class SVTFOCommand extends ImageCommand {
  endpoint = 'starvstheforcesof';

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'starvstheforcesof',
      description: 'WHO DOES STAR FIGHT ON THE NEXT EPISODE?',
      category: 'Image Generation - Image Template',
      aliases: ['svtfo', 'starbutterfly'],
      metadata: {
        credit: 'blargbot'
      }
    });

    this.filePath = __filename;
  }
}

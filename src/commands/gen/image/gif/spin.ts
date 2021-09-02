import { VoltareClient } from 'voltare';
import { GIFImageCommand } from '../../../../util/abstracts';

export default class SpinCommand extends GIFImageCommand {
  endpoint = 'spin';

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'spin',
      description: "Spin an image, 'round and 'round.",
      category: 'Image Generation - GIFs'
    });

    this.filePath = __filename;
  }
}

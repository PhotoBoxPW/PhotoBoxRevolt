import { VoltareClient } from 'voltare';
import { GIFImageCommand } from '../../../../util/abstracts';

export default class HueSpinGIFCommand extends GIFImageCommand {
  endpoint = 'huespingif';

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'huespingif',
      description: 'Hue! Spin! GIF!',
      category: 'Image Generation - GIFs',
      aliases: ['hsg'],
      throttling: {
        usages: 1,
        duration: 30,
        bypass: ['voltare.elevated']
      }
    });

    this.filePath = __filename;
  }
}

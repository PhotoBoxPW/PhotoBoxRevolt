import { VoltareClient } from 'voltare';
import { GIFImageCommand } from '../../../../util/abstracts';

export default class GlitchGIFCommand extends GIFImageCommand {
  endpoint = 'glitchgif';

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'glitchgif',
      description: 'Glitches an image into a GIF.',
      category: 'Image Generation - GIFs'
    });

    this.filePath = __filename;
  }
}

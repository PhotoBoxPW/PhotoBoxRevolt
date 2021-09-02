import { VoltareClient } from 'voltare';
import { ImageCommand } from '../../../../util/abstracts';

export default class GlitchCommand extends ImageCommand {
  endpoint = 'glitch';

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'glitch',
      description: 'Glitch images.',
      category: 'Image Generation - Filters',
      metadata: {
        imageType: 'filter'
      }
    });

    this.filePath = __filename;
  }
}

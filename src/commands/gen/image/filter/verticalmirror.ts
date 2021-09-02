import { VoltareClient } from 'voltare';
import { MirrorImageCommand } from '../../../../util/abstracts';

export default class VerticalMirrorCommand extends MirrorImageCommand {
  endpoint = 'verticalmirror';

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'verticalmirror',
      description: 'Mirror an image vertically.',
      category: 'Image Generation - Filters',
      aliases: ['vmirror']
    });

    this.filePath = __filename;
  }
}

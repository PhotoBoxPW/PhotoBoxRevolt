import { VoltareClient } from 'voltare';
import { MirrorImageCommand } from '../../../../util/abstracts';

export default class MirrorCommand extends MirrorImageCommand {
  endpoint = 'mirror';

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'mirror',
      description: 'Mirror an image horizontally.',
      category: 'Image Generation - Filters',
      aliases: ['hmirror']
    });

    this.filePath = __filename;
  }
}

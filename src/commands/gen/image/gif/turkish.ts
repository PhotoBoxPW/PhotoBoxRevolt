import { VoltareClient } from 'voltare';
import { ImageCommand } from '../../../../util/abstracts';

export default class TurkishCommand extends ImageCommand {
  endpoint = 'turkish';

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'turkish',
      description: 'Yes.',
      category: 'Image Generation - GIFs'
    });

    this.filePath = __filename;
  }
}

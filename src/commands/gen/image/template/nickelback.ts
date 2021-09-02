import { VoltareClient } from 'voltare';
import { ImageCommand } from '../../../../util/abstracts';

export default class NickelbackCommand extends ImageCommand {
  endpoint = 'nickelback';

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'nickelback',
      description: 'Everytime it makes me laugh.',
      category: 'Image Generation - Image Template',
      aliases: ['photograph']
    });

    this.filePath = __filename;
  }
}

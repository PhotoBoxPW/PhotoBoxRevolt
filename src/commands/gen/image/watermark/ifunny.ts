import { VoltareClient } from 'voltare';
import { ImageCommand } from '../../../../util/abstracts';

export default class IFunnyCommand extends ImageCommand {
  endpoint = 'ifunny';

  constructor(client: VoltareClient<any>) {
    super(client, {
      name: 'ifunny',
      description: 'Nothing is original.',
      category: 'Image Generation - Watermark'
    });

    this.filePath = __filename;
  }
}
